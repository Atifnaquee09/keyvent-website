const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || "mongodb+srv://Atif:eNBGlSs7TqtNYErM@cluster0.ngecrax.mongodb.net/";
const dbName = process.env.MONGODB_DATABASE || "keyvent";
let db;

// Connect to MongoDB
MongoClient.connect(mongoUri, { })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

const upload = multer({ storage: storage });

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
    
    const newVenue = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await getVenuesCollection().insertOne(newVenue);
    newVenue._id = result.insertedId;
    
    res.json({ success: true, venue: newVenue, message: 'Venue added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding venue', error: error.message });
  }
});

// Update a venue
app.put('/api/venues/:id', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const venueId = req.params.id;
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };
    
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
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const newPhotographer = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await getPhotographersCollection().insertOne(newPhotographer);
    newPhotographer._id = result.insertedId;
    
    res.json({ success: true, photographer: newPhotographer, message: 'Photographer added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding photographer', error: error.message });
  }
});

// Upload images
app.post('/api/upload', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }
    
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    res.json({ success: true, images: imageUrls, message: 'Images uploaded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error uploading images', error: error.message });
  }
});

// Get all return gifts
app.get('/api/return-gifts', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const returnGifts = await getReturnGiftsCollection().find({}).toArray();
    res.json({ success: true, returnGifts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching return gifts', error: error.message });
  }
});

// Add a new return gift
app.post('/api/return-gifts', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const newReturnGift = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await getReturnGiftsCollection().insertOne(newReturnGift);
    newReturnGift._id = result.insertedId;
    
    res.json({ success: true, returnGift: newReturnGift, message: 'Return gift added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding return gift', error: error.message });
  }
});

// Get all makeover artists
app.get('/api/makeover-artists', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const makeoverArtists = await getMakeoverArtistsCollection().find({}).toArray();
    res.json({ success: true, makeoverArtists });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching makeover artists', error: error.message });
  }
});

// Get a specific makeover artist by ID
app.get('/api/makeover-artists/:id', async (req, res) => {
  try {
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
    
    res.json({ success: true, makeoverArtist });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching makeover artist', error: error.message });
  }
});

// Add a new makeover artist
app.post('/api/makeover-artists', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const newMakeoverArtist = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await getMakeoverArtistsCollection().insertOne(newMakeoverArtist);
    newMakeoverArtist._id = result.insertedId;
    
    res.json({ success: true, makeoverArtist: newMakeoverArtist, message: 'Makeover artist added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding makeover artist', error: error.message });
  }
});

// Get all decorators
app.get('/api/decorators', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const decorators = await getDecoratorsCollection().find({}).toArray();
    res.json({ success: true, decorators });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching decorators', error: error.message });
  }
});

// Get a specific decorator by ID
app.get('/api/decorators/:id', async (req, res) => {
  try {
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
    
    res.json({ success: true, decorator });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching decorator', error: error.message });
  }
});

// Add a new decorator
app.post('/api/decorators', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }
    
    const newDecorator = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await getDecoratorsCollection().insertOne(newDecorator);
    newDecorator._id = result.insertedId;
    
    res.json({ success: true, decorator: newDecorator, message: 'Decorator added successfully' });
  } catch (error) {
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});