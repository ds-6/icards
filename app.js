const express = require("express");
const mongoose = require("mongoose");
const Card = require("./models/card");

const app = express();
const uriDB = `mongodb+srv://deepak:12345@cluster0.gsm1a.mongodb.net/icardDB?retryWrites=true&w=majority`;

app.listen("3000", () => {
  console.log("I am Listening...");
});

mongoose
  .connect(uriDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("DB is connected...");
  });

app.set("view engine", "ejs");
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/add-card", async (req, res) => {
  try {
    const d = new Date().toJSON();
    req.body.date = d.substr(0, 10);
    const findResult = await Card.findOne({ card: req.body.card });
    if (findResult) {
      const addCard = {
        $set: { issuedTo: req.body.issuedTo, date: req.body.date }
      };
      const result = await Card.findOneAndUpdate(
        { card: req.body.card },
        addCard
      );
      if (result) {
        res.json({ msg: "Record Updated !" });
      }
    } else {
      const result = await new Card(req.body).save();
      if (result) {
        res.json({ msg: "Record Added !" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/find-card/", async (req, res) => {
  try {
    const result = await Card.findOne({ card: req.query.card });
    if (result) {
      res.json({ result });
    } else {
      res.json({ msg: "No Data" });
    }
  } catch (err) {
    console.log(err);
  }
});
