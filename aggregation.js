const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://plp_bookstore:1234@cluster0.zqogsg3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0cls";
const dbName = "libraryDB";
const collectionName = "books";

async function runTask4() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const collection = client.db(dbName).collection(collectionName);

    // 1. Average price by genre
    const avgPriceByGenre = await collection.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("\nAverage price by genre:");
    console.log(avgPriceByGenre);

    // 2. Author with the most books
    const topAuthor = await collection.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("\nAuthor with the most books:");
    console.log(topAuthor);

    // 3. Books grouped by publication decade
    const booksByDecade = await collection.aggregate([
      { $project: { decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } } },
      { $group: { _id: "$decade", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log("\nBooks grouped by decade:");
    console.log(booksByDecade);

  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

runTask4().catch(console.dir);
