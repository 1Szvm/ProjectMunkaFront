import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const Header = () => {
  const {user,logoutUser}=useContext(UserContext)
  console.log(user);
  
  return (
    <>
    <div className="navbar bg-base-300 rounded-b-xl ">
      <div className="navbar-start">
        <div>
          <NavLink className="btn btn-ghost text-xl" to="/futamok" >Futamok</NavLink>
          <NavLink className="btn btn-ghost text-xl" to="/forum">Bajnokságok</NavLink>
          <NavLink className="btn btn-ghost text-xl" to="/forum">Forum</NavLink>
        </div>
      </div>
      <div className="navbar-center">
        <img src="logo.jpg" alt="" style={{height:"5vh", width:"5vh"}} />
        <NavLink className="btn btn-ghost text-xl">HSRT</NavLink>
      </div>
      <div className="navbar-end">
        {user ? 
        <>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost  btn-circle avatar">
              <div className="w-10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <div className='border-b border-gray-400 p-2 mb-2'>
                  <h1 className="font-bold">Felhasználónév:</h1>
                  <h1 className='text-end'>{user.displayName}</h1>
                </div>
              <li><NavLink className="btn btn-ghost bg-base-100 text-lg" to="/profile">Profil</NavLink></li>
              <li><a className='btn bg-red-800 mt-2 hover:bg-red-700 ' onClick={()=>logoutUser()}>Kijelentkezés</a></li>
            </ul>
          </div>
        </>
        :
        <>
          <NavLink className="btn btn-ghost mx-1 bg-indigo-800 hover:bg-indigo-700 text-xl text-yellow-400" to="/auth/in" >Bejelentkezés</NavLink>
          <NavLink className="btn btn-ghost mx-1 bg-violet-900 hover:bg-violet-900 text-xl text-yellow-400"  to="/auth/up">Regisztráció</NavLink>
        </>}
      </div>
      
    </div>
    <Outlet/>
    </>
  );
};
