
import { useState } from "react";
import { type User } from "../../store/slice";
import EditProfilePicture from "./EditIProfPic";

const UserProfPic = ({ user }: { user: User }) => {
  const defaultProfilePic = "/src/assets/Profile-PNG-Photo.png";
  const [previewImage, setPreviewImage] = useState<string>("");


 
  // Helper function to get the correct image URL
  const getImageUrl = (profilePicture: string) => {
    if (!profilePicture) return defaultProfilePic;

    // If it starts with http, it's already a full URL
    if (profilePicture.startsWith("http")) return profilePicture;

    // If it starts with /uploads, it's a backend served image
    if (profilePicture.startsWith("/uploads")) {
      return `http://localhost:5000${profilePicture}`;
    }

    // Otherwise, it's a frontend asset
    return profilePicture;
  };


  return (
    <>
      <img
        src={previewImage || getImageUrl(user.profilePicture)}
        alt={`${user.name}'s profile`}
        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-300"
        onError={(e) => {
          e.currentTarget.src = defaultProfilePic;
        }}
      />

<EditProfilePicture user={user} setPreviewImage={setPreviewImage} />
    
    </>
  );
};

export default UserProfPic;
