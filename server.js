const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

const DB_HOST = process.env.DB_HOST;

const PORT = 4000;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("data base connect"))
  .catch((error) => console.log(error.message).process.exit(1));

app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 4000");
});

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://ihorrykun:6gxw0glFT0oElEjg@phone-book.ss0l0ud.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
