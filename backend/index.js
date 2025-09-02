import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const userSchema = new mongoose.Schema({
  name: String,
   email:String,
 password: String,
},{
  timestamps: true,
});

const userModel = mongoose.model("Auser", userSchema);


app.post("/create", async(req, res) => {
const data = new userModel(req.body);
  await data.save();
  res.send({success:true, data:"Data created",data : data} );
});