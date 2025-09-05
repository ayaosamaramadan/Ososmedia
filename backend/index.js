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
app.use("/uploads", express.static("uploads"));

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

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    friends: [String],
    friendsRequests: [String],
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

app.post("/sendfriendrequest", async (req, res) => {
   const { fromUserId, toUserId } = req.body;

    const fromUser = await userModel.findById(fromUserId);
    const toUser = await userModel.findById(toUserId);

    if (toUser.friends.includes(fromUserId)) {
      return res.status(400).json({
        success: false,
        message: "Already friends",
      });
    }

    if (toUser.friendsRequests.includes(fromUserId)) {
      return res.status(400).json({
        success: false,
        message: "Friend request already sent",
      });
    }

    toUser.friendsRequests.push(fromUserId);
    await toUser.save();

    res.json({
      success: true,
      message: "Friend request sent successfully",
    });

});

app.get("/friendsrequests/:id", async (req, res) => {
  
    const userId = req.params.id;

    const user = await userModel.findById(userId);

    const friendsRequestsDetails = await userModel.find(
      { _id: { $in: user.friendsRequests } },
      "name email profilePicture"
    );

    res.json({
      success: true,
      friendsRequests: friendsRequestsDetails,
    });
 
});

app.post("/acceptfriendrequest", async (req, res) => {
  const { userId, requesterId } = req.body;

  const user = await userModel.findByIdAndUpdate(
      userId,
      {
        $pull: { friendsRequests: requesterId },
        $push: { friends: requesterId },
      },
      { new: true }
    );

    await userModel.findByIdAndUpdate(requesterId, {
      $push: { friends: userId },
    });

    res.json({
      success: true,
      message: "Friend request accepted successfully",
    });
 
});

app.post("/rejectfriendrequest", async (req, res) => {
   const { userId, requesterId } = req.body;

   const user = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { friendsRequests: requesterId } },
      { new: true }
    );

    res.json({
      success: true,
      message: "Friend request rejected successfully",
    });
  
});

app.post("/removefriend", async (req, res) => {
  
    const { userId, friendId } = req.body;

    await userModel.findByIdAndUpdate(userId, { $pull: { friends: friendId } });

    await userModel.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

    res.json({
      success: true,
      message: "Friend removed successfully",
    });

});
