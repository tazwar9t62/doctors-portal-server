const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();

const uri = "mongodb+srv://9t6:livelovedie@cluster0.dupvj.mongodb.net/doctorsPortal?retryWrites=true&w=majority";
app.use(cors());
app.use(bodyParser.json());
const port = 5000;


const client = new MongoClient(
    uri,
    { useUnifiedTopology: true },
    { useNewUrlParser: true },
    { connectTimeoutMS: 30000 },
    { keepAlive: 1 }
  );
  client.connect(err => {
    const appointmentCollection = client.db("doctorsPortal").collection("appointments");

app.post("/addAppointment" , (req, res) => {
    const appointment = req.body;
    console.log(appointment);
    appointmentCollection.insertOne(appointment)
    .then((result)=>{
        res.send(result.insertedCount > 0)
    })
    .catch(error => { throw error})
})

app.post("/appointmentsByDate" , (req, res) => {
    const date = req.body;
    console.log(date.date);
    appointmentCollection.find({date: date.date})
    .toArray((err,documents)=>{
        res.send(documents)
    })
    
})
});
  app.get("/", (req, res) => {
    res.send("Hello Tazwar , your server working!");
  });
  
  app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });