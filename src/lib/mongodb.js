import { MongoClient } from "mongodb";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://gowthambannu123:YFTMuSdgW3uiIezO@cluster0.zociu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Your MongoDB connection string
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Use a global variable to ensure the client is reused during hot-reloading in development
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
