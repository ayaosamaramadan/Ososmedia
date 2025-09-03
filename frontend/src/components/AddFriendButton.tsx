import { useDispatch, useSelector } from "react-redux";
import { addFriend } from "../store/slice";
import type { RootState } from "../store/store";
import { useState } from "react";

const AddFriendButton = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.social.user);

  const [isAlreadyFriend, setIsAlreadyFriend] = useState(
    user?.friends?.includes(userId) || false
  );
 
  const isOwnProfile = user?._id === userId;
  if (isOwnProfile || !user) {
    return null;
  }

  const handleToggleFriend = () => {
    if (isAlreadyFriend) {
      console.log("Already a friend");
    } else {
    
      fetch(`http://localhost:5000/addfriend`, {
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
    console.log("Friend added successfully!");
            setIsAlreadyFriend(true);
             dispatch(addFriend(userId));
          } else {
            console.log("Failed to add friend.");
            }
        })
        .catch((error) => {
          console.error("Error adding friend:", error);
        })
        .finally(() => {
        //   setIsLoading(false);
        });
    }
  };

  return (
    <button
      onClick={handleToggleFriend}
    //   disabled={isLoading}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        // isLoading
        //   ? "bg-gray-400 cursor-not-allowed text-white"
           isAlreadyFriend
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      {
    
         isAlreadyFriend
        ? "Remove Friend"
        : "Add Friend"}
    </button>
  );
};

export default AddFriendButton;
