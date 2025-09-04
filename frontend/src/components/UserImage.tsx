import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { type User } from "../store/slice";
import type { RootState } from "../store/store";
import { setUser } from "../store/slice";

const UserImage = ({ user }: { user: User }) => {
  const defaultProfilePic = "/src/assets/Profile-PNG-Photo.png";
  const [previewImage, setPreviewImage] = useState<string>("");

  const userInDB = useSelector((state: RootState) => state.social.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.social.isAuthenticated
  );
  const dispatch = useDispatch();

  const handleEditProfilePicture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setPreviewImage(imageUrl);
    };
    reader.readAsDataURL(file);

    // Upload image
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", user._id);

      const response = await fetch("http://localhost:5000/uploadimage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        // Update profile picture in database
        const updateResponse = await fetch("http://localhost:5000/updatepic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            profilePicture: result.imageUrl,
          }),
        });

        if (updateResponse.ok) {
          const updateResult = await updateResponse.json();
          dispatch(setUser(updateResult.user));
          alert("Profile picture updated successfully!");
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  return (
    <>
      <img
        src={previewImage || user.profilePicture || defaultProfilePic}
        alt={`${user.name}'s profile`}
        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-300"
        onError={(e) => {
          e.currentTarget.src = defaultProfilePic;
        }}
      />

      {isAuthenticated && userInDB && userInDB._id === user._id && (
        <label className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500 transition cursor-pointer mb-4 inline-block">
          <input
            type="file"
            accept="image/*"
            onChange={handleEditProfilePicture}
            className="hidden"
          />
          Edit
        </label>
      )}
    </>
  );
};

export default UserImage;
