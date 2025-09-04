import logoImage from '../../assets/logo.png';

import {  useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

import LoginForm from '../LoginForm';

import RegForm from '../RegForm';

const Auth = () => {
     const selector = useSelector((state: RootState) => state.social)
 

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
        { selector.areYouLoggedIn?  <LoginForm /> :
        <RegForm />
           }
        </div>
    </div>

    </>
    
 );
}

export default Auth;