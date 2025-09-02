import { FcGoogle } from 'react-icons/fc';
import logoImage from '../assets/logo.png';
import { FaFacebook } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { changeLoginState } from '../store/slice';

const Login = () => {
     const selector = useSelector((state: RootState) => state.social)
  const dispatch = useDispatch()
    return ( <>

   <div className="flex h-screen flex-col md:flex-row">
        <div className="bg-gray-700 w-full md:w-1/3 flex items-center justify-center py-8 md:py-0">
            <img src={logoImage} className="rounded-xl w-40 md:w-auto" alt="Logo" />
        </div>
        <div className="bg-loginbg bg-cover bg-center w-full md:w-5/6 flex flex-col gap-6 md:gap-10 pr-0 md:pr-5">
            <nav className="text-white flex justify-center md:justify-end p-5 pt-7 text-lg md:text-xl space-x-6 md:space-x-10"> 
                <p className="hover:text-gray-400 transition-colors cursor-pointer">Login</p>
                <p className="hover:text-gray-400 transition-colors cursor-pointer">Register</p>
                <p className="hover:text-gray-400 transition-colors cursor-pointer">Help</p>
            </nav>
        { selector.areYouLoggedIn?  <form className="flex flex-col gap-4 md:gap-6 bg-[#ffffff41] bg-opacity-0 rounded-xl shadow-lg p-6 md:p-10 max-w-full md:max-w-md mx-auto mt-8 md:mt-20 w-full">
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
                    type="text"
                    placeholder="email"
                    className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:gray-2 focus:gray-blue-500 transition text-gray-900 placeholder-gray-500 hover:border-gray-400"
                    autoComplete="email"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="px-4 py-3 rounded-lg border bg-gray-100 border-gray-300 focus:outline-none focus:gray-2 focus:gray-blue-500 transition text-gray-900 placeholder-gray-500 hover:border-gray-400"
                    autoComplete="current-password"
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
                            href="#"
                            className="text-gray-900 underline hover:text-gray-700 transition-colors font-semibold"
                            tabIndex={0}
                            onClick={() => {
                                dispatch(changeLoginState())
                            }}
                        >
                            Register
                        </a>
                    </span>
                </div>
                </>
             
            </form>:
             <form className="flex flex-col gap-4 md:gap-6 bg-[#ffffff41] bg-opacity-0 rounded-xl shadow-lg p-6 md:p-10 max-w-full md:max-w-md mx-auto mt-20 md:mt-8 w-full">
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
                    type="text"
                    placeholder="Username"
                    className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:gray-2 focus:gray-blue-500 transition text-gray-900 placeholder-gray-500 hover:border-gray-400"
                    autoComplete="username"
                />
                <input
                    type="text"
                    placeholder="Email"
                    className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:gray-2 focus:gray-blue-500 transition text-gray-900 placeholder-gray-500 hover:border-gray-400"
                    autoComplete="email"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="px-4 py-3 rounded-lg border bg-gray-100 border-gray-300 focus:outline-none focus:gray-2 focus:gray-blue-500 transition text-gray-900 placeholder-gray-500 hover:border-gray-400"
                    autoComplete="current-password"
                />
                <button
                    type="submit"
                    className="bg-[#192537] hover:bg-gray-700 cursor-pointer text-white font-semibold py-3 rounded-lg transition"
                >
                    Sign Up
                </button>
                <div className="flex flex-col md:flex-row justify-center items-center text-sm text-gray-100 mt-2 gap-2 md:gap-0">
                    <span>
                        Don&apos;t have an account?
                        <a
                            href="#"
                            className="text-gray-900 underline hover:text-gray-700 transition-colors font-semibold"
                            tabIndex={0}
                            onClick={() => {
                                dispatch(changeLoginState())
                            }}
                        >
                            Create an account
                        </a>
                    </span>
                </div></>
            </form>}
        </div>
    </div>

    </>
    
 );
}

export default Login;