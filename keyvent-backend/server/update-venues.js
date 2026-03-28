const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI || "mongodb+srv://Atif:eNBGlSs7TqtNYErM@cluster0.ngecrax.mongodb.net/";
const dbName = process.env.MONGODB_DATABASE || "keyvent";

async function updateVenues() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db(dbName);
    const venuesCollection = db.collection("venues");
    
    // Find all venues
    const venues = await venuesCollection.find({}).toArray();
    console.log(`Found ${venues.length} venues to update`);
    
    for (const venue of venues) {
      let updated = false;
      const updateData = {};
      
      // Process images
      if (venue.images && Array.isArray(venue.images)) {
        updateData.images = venue.images.map(image => {
          if (typeof image === "string" && image.startsWith("blob:")) {
            updated = true;
            return "/uploads/default-venue-image.svg";
          }
          return image;
        });
      }
      
      // Process Gallery
      if (venue.Gallery && Array.isArray(venue.Gallery)) {
        updateData.Gallery = venue.Gallery.map(image => {
          if (typeof image === "string" && image.startsWith("blob:")) {
            updated = true;
            return "/uploads/default-venue-gallery-image.svg";
          }
          return image;
        });
      }
      
      // Update the venue if needed
      if (updated) {
        await venuesCollection.updateOne(
          { _id: new ObjectId(venue._id) },
          { $set: updateData }
        );
        console.log(`Updated venue ${venue._id}`);
      }
    }
    
    console.log("All venues updated successfully");
  } catch (error) {
    console.error("Error updating venues:", error);
  } finally {
    await client.close();
  }
}

updateVenues();