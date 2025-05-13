import React, { useEffect } from 'react'
import { signOut } from "firebase/auth";
import {auth} from '../utils/firebase'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import {USER_AVATAR, LOGO} from '../utils/constants'

const Header = () => {
  const navigate = useNavigate();
  const selectName = useSelector((store)=>store.user);
    const dispatch = useDispatch();
  
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  
  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email, displayName} = user;
        dispatch(addUser({uid: uid, email:email, displayName:displayName}));
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubcribes when component unmounts
    return () => unsubscribe();
  },[]);
  return (
    <div className="absolute w-screen ute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src={LOGO}
        alt="logo"
       />
       {selectName && (<div className="flex p-2">
        <img alt="user"
        className="w-12 h-12"
        src={USER_AVATAR}/>
        <button className="font-bold text-white" onClick={()=>handleSignOut()}>Sign Out</button>
        <h5>{selectName?.displayName}</h5>
       </div>)}
    </div>
  )
}

export default Header
