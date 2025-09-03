import { useDispatch } from "react-redux";
import { addFriend } from "../store/slice";

const AddFriendButton = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();

  
  const handleToggleFriend = () => {
   
      dispatch(addFriend(userId));
    
  };

  return (
    <button
      onClick={handleToggleFriend}
      className={`px-4 py-2 rounded-lg font-medium transition-colors  
           bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      Add Friend
    </button>
  );
};

export default AddFriendButton;
