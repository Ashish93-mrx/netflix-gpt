import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { USER_AVATAR, LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const selectName = useSelector((store) => store.user);
  const gptView = useSelector((store) => store.gpt.showGptSearch);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const handleChangeLang = (val) => {
    console.log(val);
    dispatch(changeLanguage(val));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
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
  }, []);
  return (
    <div className="absolute w-screen py-2 px-4 bg-gradient-to-b from-black z-10 flex flex-row items-center justify-between gap-4 md:gap-0">
      {/* Logo */}
      <img className="w-36 md:w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />

      {selectName && (
        <div className="flex flex-row items-center gap-3 md:gap-5">
          {gptView && (
            <select
              onChange={(e) => handleChangeLang(e.target.value)}
              className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option value={lang.indentifier} key={lang.indentifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGptSearch}
            className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-bold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-red-500 hover:via-pink-500 hover:to-purple-500 hover:scale-105 cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full transform scale-110 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-30 blur-md"></span>
            <span className="relative z-10">
              {gptView ? "Home" : "✨ GPT Search"}
            </span>
          </button>

          {/* User Avatar */}
          <img
            alt="user"
            className="hidden md:block w-10 h-10"
            src={USER_AVATAR}
          />

          {/* Sign Out */}
          <button
            className="text-red-400 hover:text-red-500 font-semibold cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>

          {/* Username */}
          <h5 className="hidden md:block text-yellow-300 font-medium">
            {selectName?.displayName}
          </h5>
        </div>
      )}
    </div>
  );
};

export default Header;
