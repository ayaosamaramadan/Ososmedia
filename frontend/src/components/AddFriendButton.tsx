
import { useDispatch, useSelector } from "react-redux";
import { addFriend } from "../store/slice";
import type { RootState } from "../store/store";

const AddFriendButton = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.social.user);

  const isAlreadyFriend = user?.friends?.includes(userId) || false;
  const isOwnProfile = user?._id === userId;

  if (isOwnProfile || !user) {
    return null; 
  }

  const handleToggleFriend = () => {
    if (isAlreadyFriend) {
      console.log("Already a friend");
    } else {
      dispatch(addFriend(userId));
    }
  };

  return (
    <button
      onClick={handleToggleFriend}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isAlreadyFriend
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      {isAlreadyFriend ? "Remove Friend" : "Add Friend"}
    </button>
  );
};

export default AddFriendButton;
