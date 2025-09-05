/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddFriendButton from "./AddFriendButton";
import UserImage from "./ProfPic/UserProfPic";
import axios from "axios";

const OthersProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [Allusers, setAllUsers] = useState<any[]>([]);

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

  return (
    <>
      {Allusers && Allusers.length > 0 ? (
        <ul className="space-y-2">
          {Allusers.filter((user) => user._id === id).map((user) => (
            <Link
              to={`/user/${user._id}`}
              key={user._id}
              className="block bg-white shadow rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <li key={user._id} className="bg-white shadow rounded-lg p-4">
                <UserImage user={user} />
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>

                <AddFriendButton userId={user._id} />
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No user found.</p>
      )}
    </>
  );
};

export default OthersProfile;
