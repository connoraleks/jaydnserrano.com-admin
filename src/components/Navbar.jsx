import {useState, useEffect, useRef} from 'react';
const Navbar = ({setPage}) => {
    const NavButtons = useRef(null);
    const [extendedNav, setExtendedNav] = useState(false);
    useEffect(() => {
        console.log(extendedNav);
        if(extendedNav){
            NavButtons.current.classList.remove('hidden');
            NavButtons.current.classList.remove('-translate-y-full')
        }
        else{
            NavButtons.current.classList.add('hidden');
            NavButtons.current.classList.add('-translate-y-full')
        }
    }, [extendedNav]);
    return (
        <nav className="absolute top-0 left-0 w-full flex items-center justify-between flex-wrap bg-indigo-600 p-6">
            {/* Nav Title */}
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">
                    Jaydn Serrano
                </span>
            </div>
            {/* Small Screen Nav Button */}
            <div className="block lg:hidden">
                <button onClick={() => setExtendedNav(!extendedNav)} className="flex items-center px-3 py-2 border rounded text-indigo-200 border-indigo-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            {/* Small Screen Nav Button */}
            <div ref={NavButtons} className="w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:translate-y-0">
                <div className="text-sm lg:flex-grow">
                    <button
                        onClick={() => setPage('dashboard')}
                        className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setPage('sections')}
                        className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4"
                    >
                        Sections
                    </button>
                    <button
                        onClick={() => setPage('photos')}
                        className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4"
                    >
                        Photos
                    </button>
                </div>
                <div>
                    <button
                        className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;