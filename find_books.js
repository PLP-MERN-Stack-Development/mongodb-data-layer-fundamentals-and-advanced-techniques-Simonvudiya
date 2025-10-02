const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://plp_bookstore:@cluster0.zqogsg3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0cls"; 
const dbName = "libraryDB";
const collectionName = "books";

async function runTask3() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const collection = client.db(dbName).collection(collectionName);

    // 1. Books in stock and published after 2010
    const inStockAfter2010 = await collection.find(
      { in_stock: true, published_year: { $gt: 2010 } },
      { projection: { title: 1, author: 1, price: 1, _id: 0 } }
    ).toArray();
    console.log("\nBooks in stock and published after 2010:");
    console.log(inStockAfter2010);

    // 2. Sort by price ascending
    const sortedAsc = await collection.find({}, { projection: { title: 1, price: 1, _id: 0 } })
      .sort({ price: 1 })
      .toArray();
    console.log("\nBooks sorted by price (ascending):");
    console.log(sortedAsc);

    // 3. Sort by price descending
    const sortedDesc = await collection.find({}, { projection: { title: 1, price: 1, _id: 0 } })
      .sort({ price: -1 })
      .toArray();
    console.log("\nBooks sorted by price (descending):");
    console.log(sortedDesc);

    // 4. Pagination (5 books per page, page 1 and page 2)
    const pageSize = 5;
    const page1 = await collection.find({}, { projection: { title: 1, author: 1, _id: 0 } })
      .skip(0)
      .limit(pageSize)
      .toArray();
    console.log("\nPage 1:");
    console.log(page1);

    const page2 = await collection.find({}, { projection: { title: 1, author: 1, _id: 0 } })
      .skip(pageSize)
      .limit(pageSize)
      .toArray();
    console.log("\nPage 2:");
    console.log(page2);

  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

runTask3().catch(console.dir);
