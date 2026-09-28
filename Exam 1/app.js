const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");

const app = express();
const PORT = 3000;
const mongoURL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoURL);
let notesCollection;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

async function connectDB() {
  await client.connect();
  const database = client.db("notes_lab");
  notesCollection = database.collection("notes");
  console.log("Connected to MongoDB: notes_lab -> notes");
}

app.get("/", async (req, res) => {
  try {
    const notes = await notesCollection.find().sort({ createdAt: -1 }).toArray();
    res.render("index", { notes });
  } catch (error) {
    res.status(500).send("Unable to load notes.");
  }
});

app.get("/notes/new", (req, res) => {
  res.render("new");
});

app.post("/notes", async (req, res) => {
  try {
    const title = req.body.title?.trim();
    const content = req.body.content?.trim();
    const category = req.body.category?.trim() || "General";

    if (!title || !content) {
      return res.status(400).render("new", { error: "Title and content are required." });
    }

    await notesCollection.insertOne({
      title,
      content,
      category,
      createdAt: new Date()
    });

    res.redirect("/");
  } catch (error) {
    res.status(500).send("Unable to add note.");
  }
});

app.post("/notes/:id/delete", async (req, res) => {
  try {
    await notesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.redirect("/");
  } catch (error) {
    res.status(400).send("Invalid note ID.");
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
