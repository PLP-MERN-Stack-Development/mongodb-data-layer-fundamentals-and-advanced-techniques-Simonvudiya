// queries.js
// MongoDB Queries for Books Database
// Tasks 3, 4, and 5 (Advanced Queries, Aggregation Pipelines, Indexing)

const { MongoClient } = require("mongodb");

// Replace with your MongoDB connection string
const uri = "mongodb+srv://plp_bookstore:1234@cluster0.zqogsg3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0cls"; 
const dbName = "libraryDB";
const collectionName = "books";

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const collection = client.db(dbName).collection(collectionName);

    // -----------------------------
    // Task 3: Advanced Queries
    // -----------------------------

    // 1. Books in stock and published after 2010 (Projection: title, author, price)
    const inStockAfter2010 = await collection.find(
      { in_stock: true, published_year: { $gt: 2010 } },
      { projection: { title: 1, author: 1, price: 1, _id: 0 } }
    ).toArray();
    console.log("\n📘 Books in stock and published after 2010:");
    console.log(inStockAfter2010);

    // 2. Sort books by price (ascending)
    const sortedAsc = await collection.find({}, { projection: { title: 1, price: 1, _id: 0 } })
      .sort({ price: 1 })
      .toArray();
    console.log("\n📘 Books sorted by price (ascending):");
    console.log(sortedAsc);

    // 3. Sort books by price (descending)
    const sortedDesc = await collection.find({}, { projection: { title: 1, price: 1, _id: 0 } })
      .sort({ price: -1 })
      .toArray();
    console.log("\n📘 Books sorted by price (descending):");
    console.log(sortedDesc);

    // 4. Pagination (5 books per page)
    const pageSize = 5;
    const page1 = await collection.find({}, { projection: { title: 1, author: 1, _id: 0 } })
      .skip(0)
      .limit(pageSize)
      .toArray();
    console.log("\n📘 Page 1:");
    console.log(page1);

    const page2 = await collection.find({}, { projection: { title: 1, author: 1, _id: 0 } })
      .skip(pageSize)
      .limit(pageSize)
      .toArray();
    console.log("\n📘 Page 2:");
    console.log(page2);

    // -----------------------------
    // Task 4: Aggregation Pipelines
    // -----------------------------

    // 1. Average price of books by genre
    const avgPriceByGenre = await collection.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("\n📊 Average price by genre:");
    console.log(avgPriceByGenre);

    // 2. Author with the most books
    const topAuthor = await collection.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("\n📊 Author with the most books:");
    console.log(topAuthor);

    // 3. Books grouped by publication decade
    const booksByDecade = await collection.aggregate([
      { $project: { decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } } },
      { $group: { _id: "$decade", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log("\n📊 Books grouped by publication decade:");
    console.log(booksByDecade);

    // -----------------------------
    // Task 5: Indexing
    // -----------------------------

    // 1. Create index on title
    await collection.createIndex({ title: 1 });
    console.log("\n⚡ Index created on title");

    // 2. Create compound index on author and published_year
    await collection.createIndex({ author: 1, published_year: 1 });
    console.log("⚡ Compound index created on author and published_year");

    // 3. Demonstrate performance improvement with explain()
    const explainOutput = await collection.find({ title: "The Hobbit" }).explain("executionStats");
    console.log("\n⚡ Explain output for title search:");
    console.log(JSON.stringify(explainOutput.executionStats, null, 2));

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("\n🔒 Connection closed");
  }
}

runQueries();
