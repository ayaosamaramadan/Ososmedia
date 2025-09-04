import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setUser, type User } from "../../store/slice";
import toast from "react-hot-toast";

const EditProfilePicture = ({ user , setPreviewImage }: { user: User, setPreviewImage: (imageUrl: string) => void }) => {
  const dispatch = useDispatch();


  const userInDB = useSelector((state: RootState) => state.social.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.social.isAuthenticated
  );

  const handleEditProfilePicture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setPreviewImage(imageUrl);
    };
    reader.readAsDataURL(file);

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
          setPreviewImage(""); 
              toast.success("Profile picture updated successfully!");
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  return (
    <>
      
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

export default EditProfilePicture;
