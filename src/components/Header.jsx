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
    console.log(val)
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
    <div className="absolute w-screen ute py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between md:px-8">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {selectName && (
        <div className="flex p-2 justify-between">
          {gptView && (<select onChange={(e)=>handleChangeLang(e.target.value)} className="p-2 bg-gray-900 text-white m-2">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option value={lang.indentifier} key={lang.indentifier}>{lang.name}</option>
            ))}
          </select>)}
          <button
            className="bg-purple-400 text-white rounded mx-4 py-1 md:py-2 px-4"
            onClick={handleGptSearch}
          >
           {gptView ? 'Home' : 'GPT search'}
          </button>
          <img alt="user" className="hidden md:block w-12 h-12" src={USER_AVATAR} />
          <button
            className="font-bold text-white"
            onClick={() => handleSignOut()}
          >
            (Sign Out)
          </button>
          <h5 className="hidden md:block text-yellow-300">{selectName?.displayName}</h5>
        </div>
      )}
    </div>
  );
};

export default Header;
