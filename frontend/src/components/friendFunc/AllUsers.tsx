/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UserImage from "../ProfPic/UserProfPic";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import axios from "axios";
const AllUsers = () => {
    const [Allusers, setAllUsers] = useState<any[]>([]);

  const userInDB = useSelector((state: RootState) => state.social.user);

  useEffect(() => {
    console.log("Fetching all users...");
    axios
      .get("http://localhost:5000/allusers")
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Fetched data:", response.data);

        if (response.data.success && response.data.users) {
          setAllUsers(response.data.users);
        } else if (Array.isArray(response.data)) {
          setAllUsers(response.data);
        } else {
          setAllUsers([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setAllUsers([]);
      });
  }, []);

return ( <>
     <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
      </div>
      {Allusers && Allusers.length > 0 ? (
        <ul className="space-y-2">
          {Allusers.filter((user) => userInDB && userInDB._id !== user._id).map(
            (user) => (
              <Link
                to={`/user/${user._id}`}
                key={user._id}
                className="block bg-white shadow rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <UserImage user={user} />
                <li key={user._id} className="bg-white shadow rounded-lg p-4">
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                </li>
              </Link>
            )
          )}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
      </> );
}
 
export default AllUsers;