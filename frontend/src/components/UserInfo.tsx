import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import UserImage from "./UserImage";

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.social.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.social.isAuthenticated
  );

    return (
    <>
      <div className="container mx-auto px-4 py-8">
        {isAuthenticated && user ? (
          <>
          <UserImage
            user={user}
          />

            <h1 className="text-3xl font-bold mb-4">
              Welcome back, {user.name}! 🎉
            </h1>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>User ID:</strong> {user._id}
              </p>
              {user.createdAt && (
                <p>
                  <strong>Joined:</strong>
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-gray-600">
              Please log in to view this page
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default UserInfo;
