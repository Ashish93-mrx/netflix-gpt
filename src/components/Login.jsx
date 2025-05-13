import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    //valida[e the form data
    // checkValidData()
    // console.log(email.current.value);
    // console.log(password.current.value);

    const msg = checkValidData(email.current.value, password.current.value);

    if (msg) {
      setErrorMessage(msg);
      return;
    }

    if (!isSignIn) {
      //sign up logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(() => {
            // Profile updated!
            const {uid, email, displayName} = auth.currentUser;
            dispatch(addUser({uid: uid, email:email, displayName:displayName}));
            // navigate("/browse");
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });
          // ...
        
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(error.code + "-" + error.message);
          // ..
        });
    } else {
      //sign in logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          // ...
        // navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(error.code + "-" + error.message);
        });
    }
  };

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
        className="h-screen object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cb17c41d-6a67-4472-8b91-cca977e65276/web/IN-en-20250505-TRIFECTA-perspective_03ae1a85-5dcf-4d20-a8a6-1e61f7ef73cb_medium.jpg"
          alt="bg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white opacity-85"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4">
          {isSignIn ? "New to Netflix?" : "Already registered?"}{" "}
          <span className="cursor-pointer" onClick={toggleForm}>
            {isSignIn ? "Sign Up Now" : "Sign In here "}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
