const router = require("express").Router();
const Blog = require("../models/Blog");

// Your routing code goes here
router.get("/", async (req, res) => {
  const getVar = req.body.topic;
  try {
    const dbFind = await Blog.find({ topic: getVar });
    if (dbFind.length > 0) return res.send(dbFind);
    return res.send("No topic found");
  } catch (error) {
    return res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  let ObjectID;
  const topic = req.body.topic;
  const description = req.body.description;
  const posted_at = req.body.date;
  const posted_by = req.body.name;
  //   res.send(topic + description + posted_at + posted_by);
  try {
    const exestingData = await Blog.findOne({ topic: topic });
    if (exestingData) return res.send("Topic is already in Database");
    const Id = await Blog.find().count();
    if (Id === 0) ObjectID = 1;
    else {
      let id = await Blog.findOne().sort({ ObjectID: -1 });
      ObjectID = Number(id.ObjectID + 1);
      console.log(ObjectID);
    }
    const data = await Blog.insertMany({
      ObjectID,
      topic,
      description,
      posted_at,
      posted_by,
    });
    if (data) return res.send(data);
    return res.send("Data is nt correct");
  } catch (error) {
    return res.send(error.message);
  }
});
router.put("/", async (req, res) => {
  const findUpdate = req.body.topic;
  const descript = req.body.description;
  try {
    const exestingData = await Blog.findOne({ topic: findUpdate });
    if (!exestingData) return res.send("Topic is not found in Database");
    const updData = await Blog.updateOne(
      { topic: findUpdate },
      { $set: { description: descript } }
    );
    if (updData) return res.send("Data Updated");
    return res.send("Error");
  } catch (error) {
    return res.send(error.message);
  }
});

router.delete("/", async (req, res) => {
  const topic = req.body.topic;
  try {
    const exestingData = await Blog.findOne({ topic: topic });
    if (!exestingData) return res.send("Topic is not found in Database");
    const deletee = await Blog.deleteOne({
      topic: topic,
    });
    if (deletee) return res.send("Deleted");
    return res.send("Error");
  } catch (error) {
    return res.send(error.message);
  }
});

router.get("/blog", (req, res) => {
  res.json({ ok: "blog" });
});

module.exports = router;
