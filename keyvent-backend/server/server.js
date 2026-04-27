const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || "mongodb+srv://keyventin_db_user:moIgn7043OPb3eom@cluster0.9cnuop2.mongodb.net/";
const dbName = process.env.MONGODB_DATABASE || "keyvent";
let db;

console.log('Attempting to connect to MongoDB with URI:', mongoUri.replace(/\/\/(.*?):(.*?)@/, '//****:****@')); // Log URI without credentials

// Connect to MongoDB
MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB successfully');
    db = client.db(dbName);
    console.log('Using database:', dbName);
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
    console.error('Failed to connect to MongoDB. Server will start but database operations will fail.');
  });

// Configure CORS options
const allowedOrigins = ['https://keyvent.in', 'https://www.keyvent.in', 'http://localhost:3000'];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware with specific options
app.use(cors(corsOptions));

// Belt-and-suspenders: ensure CORS headers are present even on error responses
// emitted before the route handler runs (e.g. multer rejections).
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  next();
});

// Middleware
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const ALLOWED_IMAGE_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif'
]);

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 20                    // per request (frontend chunks at 8)
  },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_IMAGE_MIME.has(file.mimetype)) {
      return cb(new Error(`Unsupported file type: ${file.mimetype}`));
    }
    cb(null, true);
  }
});

// Helper functions for MongoDB operations
const getVenuesCollection = () => db.collection('venues');
const getContactSubmissionsCollection = () => db.collection('contact_submissions');
const getPhotographersCollection = () => db.collection('photographers');
const getReturnGiftsCollection = () => db.collection('return_gifts');
const getMakeoverArtistsCollection = () => db.collection('makeover_artists');
const getDecoratorsCollection = () => db.collection('decorators');

// Routes

// Get all venues
app.get('/api/venues', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const venues = await getVenuesCollection().find({}).toArray();
    res.json({ success: true, venues });
  } catch (error) {
    console.error('Error in GET /api/venues:', error);
    res.status(500).json({ success: false, message: 'Error fetching venues', error: error.message });
  }
});

// Get a single venue by ID
app.get('/api/venues/:id', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const venueId = req.params.id;
    const venue = await getVenuesCollection().findOne({ _id: new ObjectId(venueId) });
    
    if (!venue) {
      return res.status(404).json({ success: false, message: 'Venue not found' });
    }
    
    res.json({ success: true, venue });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching venue', error: error.message });
  }
});

// Add a new venue
app.post('/api/venues', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    // Process images - keep uploaded image URLs as they are
    const processData = { ...req.body };
    
    // No need to modify images that are already proper URLs from uploads
    // The frontend should send proper /uploads/ URLs from the upload endpoint
    
    const newVenue = {
      ...processData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await getVenuesCollection().insertOne(newVenue);
    newVenue._id = result.insertedId;
    
    res.json({ success: true, venue: newVenue, message: 'Venue added successfully' });
  } catch (error) {
    console.error('Error in POST /api/venues:', error);
    res.status(500).json({ success: false, message: 'Error adding venue', error: error.message });
  }
});

// Update a venue
app.put('/api/venues/:id', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    // Process images - keep uploaded image URLs as they are
    const updateData = { ...req.body };
    
    // No need to modify images that are already proper URLs from uploads
    // The frontend should send proper /uploads/ URLs from the upload endpoint
    
    const venueId = req.params.id;
    updateData.updatedAt = new Date();
    
    const result = await getVenuesCollection().updateOne(
      { _id: new ObjectId(venueId) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'Venue not found' });
    }
    
    const updatedVenue = await getVenuesCollection().findOne({ _id: new ObjectId(venueId) });
    res.json({ success: true, venue: updatedVenue, message: 'Venue updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating venue', error: error.message });
  }
});

// Delete a venue
app.delete('/api/venues/:id', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const venueId = req.params.id;
    const result = await getVenuesCollection().deleteOne({ _id: new ObjectId(venueId) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Venue not found' });
    }
    
    res.json({ success: true, message: 'Venue deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting venue', error: error.message });
  }
});

// Get all photographers
app.get('/api/photographers', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const photographers = await getPhotographersCollection().find({}).toArray();
    res.json({ success: true, photographers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching photographers', error: error.message });
  }
});

// Add a new photographer
app.post('/api/photographers', async (req, res) => {
  try {
    console.log('Received photographer data:', req.body);
    
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const newPhotographer = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('Saving photographer to database:', newPhotographer);
    const result = await getPhotographersCollection().insertOne(newPhotographer);
    newPhotographer._id = result.insertedId;
    
    console.log('Photographer saved successfully:', newPhotographer);
    res.json({ success: true, photographer: newPhotographer, message: 'Photographer added successfully' });
  } catch (error) {
    console.error('Error adding photographer:', error);
    res.status(500).json({ success: false, message: 'Error adding photographer', error: error.message });
  }
});

// Upload images
const uploadHandler = upload.array('images', 20);

app.post('/api/upload', (req, res) => {
  uploadHandler(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err.code || '', err.message);
      let status = 400;
      let message = err.message || 'Upload failed';
      if (err.code === 'LIMIT_FILE_SIZE') {
        status = 413;
        message = 'A file exceeds the 10MB per-file limit.';
      } else if (err.code === 'LIMIT_FILE_COUNT') {
        status = 413;
        message = 'Too many files in a single request (max 20).';
      } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        message = `Unexpected field: ${err.field}`;
      }
      return res.status(status).json({ success: false, message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
    res.json({ success: true, images: imageUrls, message: 'Images uploaded successfully' });
  });
});

// Get all return gifts
app.get('/api/return-gifts', async (req, res) => {
  try {
    console.log('Fetching return gifts');
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const returnGifts = await getReturnGiftsCollection().find({}).toArray();
    console.log('Return gifts fetched:', returnGifts);
    res.json({ success: true, returnGifts });
  } catch (error) {
    console.error('Error fetching return gifts:', error);
    res.status(500).json({ success: false, message: 'Error fetching return gifts', error: error.message });
  }
});

// Add a new return gift
app.post('/api/return-gifts', async (req, res) => {
  try {
    console.log('Received return gift data:', req.body);
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const newReturnGift = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('Saving return gift to database:', newReturnGift);
    const result = await getReturnGiftsCollection().insertOne(newReturnGift);
    newReturnGift._id = result.insertedId;
    
    console.log('Return gift saved successfully:', newReturnGift);
    res.json({ success: true, returnGift: newReturnGift, message: 'Return gift added successfully' });
  } catch (error) {
    console.error('Error adding return gift:', error);
    res.status(500).json({ success: false, message: 'Error adding return gift', error: error.message });
  }
});

// Get all makeover artists
app.get('/api/makeover-artists', async (req, res) => {
  try {
    console.log('Fetching makeover artists');
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const makeoverArtists = await getMakeoverArtistsCollection().find({}).toArray();
    console.log('Makeover artists fetched:', makeoverArtists);
    res.json({ success: true, makeoverArtists });
  } catch (error) {
    console.error('Error fetching makeover artists:', error);
    res.status(500).json({ success: false, message: 'Error fetching makeover artists', error: error.message });
  }
});

// Get a specific makeover artist by ID
app.get('/api/makeover-artists/:id', async (req, res) => {
  try {
    console.log('Fetching makeover artist by ID:', req.params.id);
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const artistId = req.params.id;
    const makeoverArtist = await getMakeoverArtistsCollection().findOne({ 
      $or: [
        { _id: new ObjectId(artistId) },
        { id: artistId }
      ]
    });
    
    if (!makeoverArtist) {
      return res.status(404).json({ success: false, message: 'Makeover artist not found' });
    }
    
    console.log('Makeover artist fetched:', makeoverArtist);
    res.json({ success: true, makeoverArtist });
  } catch (error) {
    console.error('Error fetching makeover artist:', error);
    res.status(500).json({ success: false, message: 'Error fetching makeover artist', error: error.message });
  }
});

// Add a new makeover artist
app.post('/api/makeover-artists', async (req, res) => {
  try {
    console.log('Received makeover artist data:', req.body);
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const newMakeoverArtist = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    console.log('Saving makeover artist to database:', newMakeoverArtist);
    const result = await getMakeoverArtistsCollection().insertOne(newMakeoverArtist);
    newMakeoverArtist._id = result.insertedId;
    
    console.log('Makeover artist saved successfully:', newMakeoverArtist);
    res.json({ success: true, makeoverArtist: newMakeoverArtist, message: 'Makeover artist added successfully' });
  } catch (error) {
    console.error('Error adding makeover artist:', error);
    res.status(500).json({ success: false, message: 'Error adding makeover artist', error: error.message });
  }
});

// Get all decorators
app.get('/api/decorators', async (req, res) => {
  try {
    console.log('Fetching decorators');
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const decorators = await getDecoratorsCollection().find({}).toArray();
    console.log('Decorators fetched:', decorators);
    res.json({ success: true, decorators });
  } catch (error) {
    console.error('Error fetching decorators:', error);
    res.status(500).json({ success: false, message: 'Error fetching decorators', error: error.message });
  }
});

// Get a specific decorator by ID
app.get('/api/decorators/:id', async (req, res) => {
  try {
    console.log('Fetching decorator by ID:', req.params.id);
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const decoratorId = req.params.id;
    const decorator = await getDecoratorsCollection().findOne({ 
      $or: [
        { _id: new ObjectId(decoratorId) },
        { id: decoratorId }
      ]
    });
    
    if (!decorator) {
      return res.status(404).json({ success: false, message: 'Decorator not found' });
    }
    
    console.log('Decorator fetched:', decorator);
    res.json({ success: true, decorator });
  } catch (error) {
    console.error('Error fetching decorator:', error);
    res.status(500).json({ success: false, message: 'Error fetching decorator', error: error.message });
  }
});

// Add a new decorator
app.post('/api/decorators', async (req, res) => {
  try {
    console.log('Received decorator data:', req.body);
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const newDecorator = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    console.log('Saving decorator to database:', newDecorator);
    const result = await getDecoratorsCollection().insertOne(newDecorator);
    newDecorator._id = result.insertedId;
    
    console.log('Decorator saved successfully:', newDecorator);
    res.json({ success: true, decorator: newDecorator, message: 'Decorator added successfully' });
  } catch (error) {
    console.error('Error adding decorator:', error);
    res.status(500).json({ success: false, message: 'Error adding decorator', error: error.message });
  }
});

// Get contact form submissions
app.get('/api/contact-submissions', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const submissions = await getContactSubmissionsCollection().find({}).toArray();
    res.json({ success: true, submissions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contact submissions', error: error.message });
  }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const submission = {
      ...req.body,
      timestamp: new Date()
    };
    
    const result = await getContactSubmissionsCollection().insertOne(submission);
    submission._id = result.insertedId;
    
    res.json({ success: true, submission, message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting contact form', error: error.message });
  }
});

// Debug endpoint to check image visibility
app.get('/api/debug/images', async (req, res) => {
  try {
    console.log('Debug images endpoint called');
    
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    // Get all venues
    const venues = await getVenuesCollection().find({}).toArray();
    console.log('Found venues:', venues.length);
    
    // Return all venues with their image information
    const venueInfo = venues.map(v => ({
      name: v.name,
      images: v.images,
      gallery: v.Gallery
    }));
    
    res.json({ 
      success: true, 
      venues: venueInfo,
      message: 'Debug information retrieved successfully'
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    res.status(500).json({ success: false, message: 'Error retrieving debug information', error: error.message });
  }
});

// JSON error handler — ensures error responses still carry CORS headers
// (set earlier by the cors middleware) instead of falling through to
// Express's default HTML error page.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Allow large multipart uploads to take longer than the default 2 min.
// Must be paired with matching proxy_read_timeout / proxy_send_timeout in Nginx.
server.requestTimeout = 5 * 60 * 1000;
server.headersTimeout = 6 * 60 * 1000;
server.keepAliveTimeout = 65 * 1000;