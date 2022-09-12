import {useRef} from 'react';
import { IoRefreshCircleOutline } from 'react-icons/io5';
const Navbar = ({setTriggerRefresh}) => {
    const NavButtons = useRef(null);
    return (
        <nav id='Navbar' className="fixed h-20 top-0 left-0 w-full flex z-50 items-center p-4 justify-between bg-gray-800">
            {/* Nav Title */}
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">
                    Jaydn Serrano
                </span>
            </div>
            {/* Nav Buttons */}
            <div ref={NavButtons} className={'top-full'}>
                <button className="w-7 h-7" onClick={() => setTriggerRefresh(true)}><IoRefreshCircleOutline className='w-full h-full text-white font-semibold hover:font-bold hover:text-gray-300 transition-colors duration-300'/></button>
            </div>
        </nav>
    );
}
export default Navbar;