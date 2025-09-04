import {  useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useState } from "react";

const AddFriendButton = ({ userId }: { userId: string }) => {
  const user = useSelector((state: RootState) => state.social.user);

  const [isAlreadyFriend, setIsAlreadyFriend] = useState(
    user?.friends?.includes(userId) || false
  );
  const [requestSent, setRequestSent] = useState(false);

  const isOwnProfile = user?._id === userId;
  if (isOwnProfile || !user) {
    return null;
  }

  const handleToggleFriend = () => {
    if (isAlreadyFriend) {
     
      fetch(`http://localhost:5000/removefriend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          friendId: userId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Friend removed successfully!");
            setIsAlreadyFriend(false);
          } else {
            console.log("Failed to remove friend.");
          }
        })
        .catch((error) => {
          console.error("Error removing friend:", error);
        })
        .finally(() => {
        
        });
    } else if (!requestSent) {
      // Send friend request
    
      fetch(`http://localhost:5000/sendfriendrequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromUserId: user._id,
          toUserId: userId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Friend request sent successfully!");
            setRequestSent(true);
          } else {
            console.log("Failed to send friend request.");
          }
        })
        .catch((error) => {
          console.error("Error sending friend request:", error);
        })
        .finally(() => {
         
        });
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
      {
         isAlreadyFriend
        ? "Remove Friend"
        : requestSent
        ? "Request Sent"
        : "Send Request"
      }
    </button>
  );
};

export default AddFriendButton;
