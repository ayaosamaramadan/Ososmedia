import { FaFacebook } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { loginform } from '../store/slice';
import axios from 'axios';
import { useState } from 'react';import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const RegForm = () => {
     const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
    
      await axios.post("http://localhost:5000/create", formData);
    if (!formData.name || !formData.email || !formData.password) {
        toast.error('Please fill in all fields!');
        return;
      }
      else{
      setFormData({ name: "", email: "", password: "" });   
       toast.success('successfully signed up!');
   
      console.log("Data submitted successfully!");
      }

    

    } catch (error) {
      console.error("Error submitting data:", error);
       toast.error('Error signing up!');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };
    return ( <>
      <form
             method='POST'
             onSubmit={handleSubmit}
              className="flex flex-col gap-4 md:gap-6 bg-[#ffffff41] bg-opacity-0 rounded-xl shadow-lg p-6 md:p-10 max-w-full md:max-w-md mx-auto mt-20 md:mt-8 w-full">
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
                            
                
                <>   <input
                  onChange={handleChange}
                    type="text"
                    value={formData.name}
                    placeholder="Name"
                    name="name"
                    className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:gray-2 focus:gray-blue-500 transition text-gray-900 placeholder-gray-500 hover:border-gray-400"
                  
                />
                <input
                  onChange={handleChange}
                  value={formData.email}
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:gray-2 focus:gray-blue-500 transition text-gray-900 placeholder-gray-500 hover:border-gray-400"
                  
                />
                <input
                  onChange={handleChange}
                  value={formData.password}
                    type="password"
                    placeholder="Password"
                    name='password'
                    className="px-4 py-3 rounded-lg border bg-gray-100 border-gray-300 focus:outline-none focus:gray-2 focus:gray-blue-500 transition text-gray-900 placeholder-gray-500 hover:border-gray-400"
                
                />
                <button
                    type="submit"
                    className="bg-[#192537] hover:bg-gray-700 cursor-pointer text-white font-semibold py-3 rounded-lg transition"
                >
                    Sign Up
                </button>
                <div className="flex flex-col md:flex-row justify-center items-center text-sm text-gray-100 mt-2 gap-2 md:gap-0">
                    <span>
                       Have an account?
                        <a
                          
                            className="text-gray-900 underline hover:text-gray-700 transition-colors font-semibold"
                            tabIndex={0}
                            onClick={() => {
                                dispatch(loginform())
                            }}
                        >
                            Sign In
                        </a>
                    </span>
                </div></>
            </form>
            </> );
}
 
export default RegForm ;