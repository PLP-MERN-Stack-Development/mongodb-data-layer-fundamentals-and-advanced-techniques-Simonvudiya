const { MongoClient } = require("mongodb");

// Replace with your Atlas URI (keep quotes around it)
const uri = "mongodb+srv://plp_bookstore:@cluster0.zqogsg3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0cls";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    // Pick a database name (Atlas will create it if it doesn’t exist)
    const db = client.db("bookstore");
    const collection = db.collection("books");

    const books = [
      { title: "Book 1", author: "Author A", genre: "Fiction", published_year: 2010, price: 15.99, in_stock: true, pages: 250, publisher: "Publisher X" },
      { title: "Book 2", author: "Author B", genre: "Fantasy", published_year: 2015, price: 18.99, in_stock: true, pages: 300, publisher: "Publisher Y" },
      { title: "Book 3", author: "Author C", genre: "Non-fiction", published_year: 2020, price: 22.5, in_stock: false, pages: 220, publisher: "Publisher Z" },
      { title: "Book 4", author: "Author D", genre: "Science", published_year: 2008, price: 12.99, in_stock: true, pages: 180, publisher: "Publisher X" },
      { title: "Book 5", author: "Author E", genre: "Fiction", published_year: 2012, price: 14.99, in_stock: true, pages: 270, publisher: "Publisher Y" },
      { title: "Book 6", author: "Author F", genre: "Mystery", published_year: 2018, price: 16.5, in_stock: false, pages: 310, publisher: "Publisher Z" },
      { title: "Book 7", author: "Author G", genre: "Romance", published_year: 2017, price: 13.75, in_stock: true, pages: 290, publisher: "Publisher X" },
      { title: "Book 8", author: "Author H", genre: "History", published_year: 2011, price: 19.99, in_stock: true, pages: 350, publisher: "Publisher Y" },
      { title: "Book 9", author: "Author I", genre: "Fantasy", published_year: 2021, price: 21.0, in_stock: true, pages: 280, publisher: "Publisher Z" },
      { title: "Book 10", author: "Author J", genre: "Science", published_year: 2005, price: 11.99, in_stock: false, pages: 200, publisher: "Publisher X" }
    ];

    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books inserted into Atlas`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
