const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://plp_bookstore:1234@cluster0.zqogsg3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0cls";
const dbName = "libraryDB";
const collectionName = "books";

async function runTask5() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const collection = client.db(dbName).collection(collectionName);

    // Create index on title
    await collection.createIndex({ title: 1 });
    console.log("Index created on title");

    // Create compound index on author and published_year
    await collection.createIndex({ author: 1, published_year: 1 });
    console.log("Compound index created on author and published_year");

    // Explain query with index
    const explainOutput = await collection.find({ title: "The Hobbit" }).explain("executionStats");
    console.log("\nExplain output for title search:");
    console.log(JSON.stringify(explainOutput.executionStats, null, 2));

  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

runTask5().catch(console.dir);
