import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    friends: [String],
    profilePicture: {
      type: String,
      default: "/src/assets/Profile-PNG-Photo.png",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("Auser", userSchema);

app.post("/create", async (req, res) => {
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, data: "Data created", data: data });
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email, password });
    if (user) {
      res.json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          friends: user.friends,
          createdAt: user.createdAt,
        },
        token: "dummy-token-123",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

app.get("/allusers", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err.message,
    });
  }
});

app.post("/addfriend", async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    if (!userId || !friendId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Friend ID are required",
      });
    }

    const user = await userModel.findById(userId);
    const friend = await userModel.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({
        success: false,
        message: "User or Friend not found",
      });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({
        success: false,
        message: "Already friends",
      });
    }

    user.friends.push(friendId);
    await user.save();

    res.json({
      success: true,
      message: "Friend added successfully",
    });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Upload image endpoint
app.post("/uploadimage", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    res.json({
      success: true,
      imageUrl: imageUrl,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Update profile picture endpoint
app.post("/updatepic", async (req, res) => {
  try {
    const { userId, profilePicture } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      { profilePicture: profilePicture },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Profile picture updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
        friends: user.friends,
      },
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// app.get("/pic", async (req, res) => {
//   try {
//     const users = await userModel.find({}, 'name profilePicture');
//     res.json({ success: true, users });
//   }
//   catch (err) {
//     res.status(500).json({ success: false, message: "Error fetching profile pictures", error: err.message });
//   }
// });
