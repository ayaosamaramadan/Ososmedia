import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddFriendButton = ({ userId }: { userId: string }) => {
  const loggedInUser = useSelector((state: RootState) => state.social.user);

  const [isAlreadyFriend, setIsAlreadyFriend] = useState(
    loggedInUser?.friends?.includes(userId) || false
  );
  const [requestSent, setRequestSent] = useState(false);

  const isOwnProfile = loggedInUser?._id === userId;
  if (isOwnProfile || !loggedInUser) {
    return null;
  }

  const handleToggleFriend = async () => {
    if (isAlreadyFriend) {
      try {
        const response = await axios.post(
          `http://localhost:5000/removefriend`,
          {
            userId: loggedInUser._id,
            friendId: userId,
          }
        );

        if (response.data.success) {
          console.log("Friend removed successfully!");
          setIsAlreadyFriend(false);
        } else {
          console.log("Failed to remove friend.");
        }
      } catch (error) {
        console.error("Error removing friend:", error);
      }
    } else if (!requestSent) {
      try {
        const response = await axios.post(
          `http://localhost:5000/sendfriendrequest`,
          {
            fromUserId: loggedInUser._id,
            toUserId: userId,
          }
        );

        if (response.data.success) {
          toast.success("Friend request sent successfully!");
          setRequestSent(true);
        } else {
          toast.error("Failed to send friend request.");
        }
      } catch (error) {
        console.error("Error sending friend request:", error);
      }
    }
  };

  return (
    <button
      onClick={handleToggleFriend}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isAlreadyFriend
          ? "bg-red-500 hover:bg-red-600 text-white"
          : requestSent
          ? "bg-yellow-500 hover:bg-yellow-600 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      {isAlreadyFriend
        ? "Remove Friend"
        : requestSent
        ? "Request Sent"
        : "Send Request"}
    </button>
  );
};

export default AddFriendButton;
