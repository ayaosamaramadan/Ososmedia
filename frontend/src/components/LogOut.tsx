import { useDispatch } from "react-redux";
import { logout } from "../store/slice";
// import type { RootState } from "../store/store";

const LogOut = () => {
   
  const dispatch = useDispatch();
    return ( <button
    onClick={()=>{
        console.log("logged out");
        dispatch(logout());
    }}
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Log Out</button> );
}
 
export default LogOut;