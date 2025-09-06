import { Link } from "react-router-dom";
import Navi from "./Navi";
import UserInfo from "./UserInfo";

const Home = () => {
  return (
    <>
      <Navi />

      <UserInfo />

      <Link to="/all-users">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          View All Users
        </button>
      </Link>
      
    </>
  );
};

export default Home;
