import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import { AuthContext } from '../../Providers/AuthProvider';
import toast from 'react-hot-toast';
import useAnnouncement from '../../hooks/useAnnouncement';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    const [announcements, refetch] = useAnnouncement()

    
    // use theme from local storage if available or set light theme
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );
    
    // sign out functionalities
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('you logged Out successfully');
            })
            .catch(err => {
                toast.error(err.message)
            })
    }

    // console.log('User:', user);

    const navLinks = <>
        <li><NavLink to='/' className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "underline text-[#EC272E]" : ""
        } >Home</NavLink></li>

        <li><NavLink to='/membership' className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "underline text-[#EC272E]" : ""
        }>MemberShip</NavLink></li>


        <li><NavLink to='' className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "underline text-black" : ""
        }>
            <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="badge badge-md badge-primary indicator-item">
                    {
                        announcements ? <>{announcements.length}</> : <>0</>
                    }
                </span>
            </div>
        </NavLink></li>

    </>

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl"><img src={logo} alt="" /> Smart Forum</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">

                {/* <Link to='/login' className="px-10 py-2 rounded bg-gradient-to-r from-[#4A00E0] to-blue-500 text-white lg:text-lg font-semibold">Join Us</Link> */}

                {
                    user ? <>

                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="profile" src={user.photoURL} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        {user.displayName}
                                        <span className="badge">New</span>
                                    </a>
                                    
                                </li>
                                <li><Link to='dashboard/myProfile'>Dashboard</Link></li>
                                <li><a onClick={handleLogOut} >Logout</a></li>
                            </ul>
                        </div>

                        {/* <span className='hidden md:mr-5 md:block'>{user.displayName}</span> */}

                        {/* <Link to='/' className="px-10 py-2 rounded bg-gradient-to-r from-[#4A00E0] to-blue-500 text-white lg:text-lg font-semibold">LogOut</Link> */}

                    </>
                        :
                        <Link to='/login' className="px-10 py-2 rounded bg-gradient-to-r from-[#4A00E0] to-blue-500 text-white lg:text-lg font-semibold">Join Us</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;