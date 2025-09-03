/* eslint-disable @typescript-eslint/no-unused-vars */
import { FcGoogle } from "react-icons/fc";
import { changeLoginState } from "../store/slice";
import { FaFacebook } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
           const response =await axios.post(
        "http://localhost:5000/api/login",
        formData
      );

      if (response.data.success) {
        toast.success("Login successful!");
     setFormData({ email: "", password: "" });
         } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {


      console.error("Login error:",error);
        toast.error("Login failed. Please try again.");
    }
  };

  return (
    <>
      <form
      method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:gap-6 bg-[#ffffff41] bg-opacity-0 rounded-xl shadow-lg p-6 md:p-10 max-w-full md:max-w-md mx-auto mt-8 md:mt-20 w-full"
      >
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center mb-4 md:mb-6">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-[#ffffff41] border border-gray-300 rounded-lg shadow hover:shadow-lg hover:bg-white hover:border-gray-400 hover:text-gray-700 transition focus:outline-none justify-center"
            title="Login with Google"
            aria-label="Login with Google"
          >
            <FcGoogle size={24} />
            <span className="text-gray-800 font-medium">Google</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-[#ffffff41] border border-gray-300 rounded-lg shadow hover:shadow-lg hover:bg-white hover:border-gray-400 hover:text-gray-700 transition focus:outline-none justify-center"
            title="Login with Facebook"
            aria-label="Login with Facebook"
          >
            <FaFacebook size={24} className="text-blue-700" />
            <span className="text-gray-800 font-medium">Facebook</span>
          </button>
        </div>
        <>
          {" "}
          <input
            type="text"
            placeholder="email"
            name="email"
            className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:gray-2 focus:gray-blue-500 transition text-gray-900 placeholder-gray-500 hover:border-gray-400"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="px-4 py-3 rounded-lg border bg-gray-100 border-gray-300 focus:outline-none focus:gray-2 focus:gray-blue-500 transition text-gray-900 placeholder-gray-500 hover:border-gray-400"
          />
          <button
            type="submit"
            className="bg-[#192537] hover:bg-gray-700 cursor-pointer text-white font-semibold py-3 rounded-lg transition"
          >
            Log In
          </button>
          <div className="flex flex-col md:flex-row justify-center items-center text-sm text-gray-100 mt-2 gap-2 md:gap-0">
            <span>
              Don&apos;t have an account?
              <a
                className="text-gray-900 underline hover:text-gray-700 transition-colors font-semibold"
                tabIndex={0}
                onClick={() => {
                  dispatch(changeLoginState());
                }}
              >
                Create an account
              </a>
            </span>
          </div>
        </>
      </form>
    </>
  );
};

export default LoginForm;
