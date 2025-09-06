/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { addFriend } from "../../store/slice";
import axios from "axios";
import toast from "react-hot-toast";

interface FriendRequest {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

const FriendsRequestsList = () => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  const user = useSelector((state: RootState) => state.social.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.social.isAuthenticated
  );
  const dispatch = useDispatch();

  const defaultProfilePic = "/src/assets/Profile-PNG-Photo.png";

  // Fetch friend requests
  const fetchFriendRequests = async () => {
    if (!user?._id) {
      
      return;
    }

    try {
   

      const response = await axios.get(
        `http://localhost:5000/friendsrequests/${user._id}`
      );

      if (response.data.success) {
        const validRequests = (response.data.friendsRequests || [])
          .filter((request: any) => request && (request._id || request.id))
          .map((request: any, index: number) => ({
            _id: request._id || request.id || `temp-id-${index}`,
            name: request.name || "Unknown User",
            email: request.email || "",
            profilePicture: request.profilePicture || "",
          }));

        setFriendRequests(validRequests);
      } 
    } catch (err) {
      console.error("Error fetching friend requests:", err);
    } 
  };

  // Accept friend request
  const acceptFriendRequest = async (requesterId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/acceptfriendrequest`,
        {
          userId: user?._id,
          requesterId: requesterId,
        }
      );

      if (response.data.success) {
        setFriendRequests((prev) =>
          prev.filter((request) => request._id !== requesterId)
        );

        dispatch(addFriend(requesterId));

        toast.success("Friend request accepted!");
      } else {
        toast.error("Failed to accept friend request");
      }
    } catch (err) {
      console.error("Error accepting friend request:", err);
      toast.error("Error accepting friend request");
    }
  };

  // Reject friend request
  const rejectFriendRequest = async (requesterId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/rejectfriendrequest`,
        {
          userId: user?._id,
          requesterId: requesterId,
        }
      );

      if (response.data.success) {
        // Remove the request from the list
        setFriendRequests((prev) =>
          prev.filter((request) => request._id !== requesterId)
        );
        alert("Friend request rejected");
      } else {
        alert("Failed to reject friend request");
      }
    } catch (err) {
      console.error("Error rejecting friend request:", err);
      alert("Error rejecting friend request");
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchFriendRequests();
    }
  }, [isAuthenticated, user]);

  // Helper function for image URL

  const getImageUrl = (profilePicture?: string) => {
    if (!profilePicture) return defaultProfilePic;

    if (profilePicture.startsWith("http")) return profilePicture;

    if (profilePicture.startsWith("/uploads")) {
      return `http://localhost:5000${profilePicture}`;
    }

    return profilePicture;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Friend Requests</h1>

      {friendRequests.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">No friend requests found</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {friendRequests.map((request, index) => (
            <div
              key={request._id || `request-${index}`}
              className="bg-white shadow-md rounded-lg p-6 border"
            >
              <div className="flex items-center mb-4">
                <img
                  src={getImageUrl(request.profilePicture)}
                  alt={`${request.name || "User"}'s profile`}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-300"
                  onError={(e) => {
                    e.currentTarget.src = defaultProfilePic;
                  }}
                />
                <div>
                  <h3 className="font-bold text-lg text-black">
                    {request.name || "Unknown User"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {request.email || "No email"}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => acceptFriendRequest(request._id)}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => rejectFriendRequest(request._id)}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={fetchFriendRequests}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default FriendsRequestsList;
