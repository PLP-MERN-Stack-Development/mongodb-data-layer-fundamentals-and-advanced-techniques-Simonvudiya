mongodb-data-layer-fundamentals-and-advanced-techniques-Simonvudiya/
│
├── insert_books.js     # Script to insert sample book data
├── queries.js          # Advanced queries, aggregations, and indexing tasks
├── package.json        # Node.js dependencies
├── README.md           # Project documentation
└── .env                # MongoDB Atlas connection string (not shared)


npm install

MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net
DB_NAME=library
COLLECTION_NAME=books

The insert_books.js file contains 12 classic books with fields:

title

author

genre

published_year

price

in_stock

pages

publisher

node insert_books.js

node queries.js

📌 Tasks
Task 3: Advanced Queries

Find books in stock and published after 2010

Use projection to return only title, author, and price

Sort books by price (ascending/descending)

Implement pagination with limit and skip (5 books per page)

Task 4: Aggregation Pipelines

Calculate average price of books by genre

Find the author with the most books

Group books by publication decade and count them

Task 5: Indexing

Create an index on title for faster searches

Create a compound index on author and published_year

Use explain() to show performance improvements

✅ Expected Outcome

A functioning MongoDB database with structured book data

CRUD and advanced queries successfully executed

Aggregation pipelines that transform and analyze data

Indexes implemented with measurable performance improvements

📖 Tools & Technologies

Node.js

MongoDB Atlas

MongoDB Node.js Driver

MongoDB Compass / mongosh

👤 Author

Simon Vudiya
PLP MERN Stack Development — MongoDB Assignment