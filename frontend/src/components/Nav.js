import Logo from '../assets/Nav/logo.png'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom';
function Nav() {
    return (
      <div className='flex flex-initial py-4 px-2 bg-slate-200 justify-between w-screen shadow-lg sticky h-20'>
        <div className='flex items-center space-x-2' >
          <Link to="/"><img src={Logo} alt="logo" className='h-8 w-8 md:h-10 md:w-10'/></Link>
          <h1 className='text-md md:text-xl font-bold font-roboto'>NOTESCAPE</h1>
        </div>
      </div>
    );
}

export default Nav;