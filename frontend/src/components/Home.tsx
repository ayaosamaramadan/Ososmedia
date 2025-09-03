/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import Navi from "./Navi";
import UserInfo from "./UserInfo";
import { useEffect, useState } from "react";

const Home = () => {
  const [Allusers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    console.log("Fetching all users...");
    fetch("http://localhost:5000/allusers")
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
      
        
                if (data.success && data.users) {
          setAllUsers(data.users);
        } else if (Array.isArray(data)) {
          setAllUsers(data);
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
      <Navi />

      <UserInfo />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
      </div>
      {Allusers && Allusers.length > 0 ? (
        <ul className="space-y-2">
          {Allusers.map((user) => (
           <Link to={`/user/${user._id}`} key={user._id} className="block bg-white shadow rounded-lg p-4 hover:bg-gray-50 transition">
             <li key={user._id} className="bg-white shadow rounded-lg p-4">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </>
  );
};

export default Home;
