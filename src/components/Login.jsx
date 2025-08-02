import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleErrorFn = (errorType) => {
    let message="";
              switch (errorType) {
            case "auth/network-request-failed":
              message = "Network error. Please check your internet connection.";
              break;
            case "auth/user-not-found":
              message = "User not found. Please sign up first.";
              break;
            case "auth/wrong-password":
              message = "Incorrect password. Try again.";
              break;
            case "auth/email-already-in-use":
              message = "This email is already registered.";
              break;
            case "auth/invalid-email":
              message = "Invalid email format.";
              break;
            default:
              message = "Login failed. Please try again.";
              break;
          }

          setErrorMessage(message);
        }
  

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
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              // navigate("/browse");
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          // ...
        })
        .catch((error) => {
          handleErrorFn(error.code);
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
          handleErrorFn(error.code);
        }
      );
    }
  };

  const autofillDummyCredentials = () => {
    if (email.current) email.current.value = "rock@gmail.com";
    if (password.current) password.current.value = "Rock@123";
    if (!isSignIn && name.current) name.current.value = "The Rock";
  };

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="md:h-full md:object-cover object-contain"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cb17c41d-6a67-4472-8b91-cca977e65276/web/IN-en-20250505-TRIFECTA-perspective_03ae1a85-5dcf-4d20-a8a6-1e61f7ef73cb_medium.jpg"
          alt="bg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
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
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg cursor-pointer"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4">
          {isSignIn ? "New to Netflix?" : "Already registered?"}{" "}
          <span
            className="cursor-pointer underline hover:text-red-500"
            onClick={toggleForm}
          >
            {isSignIn ? "Sign Up Now" : "Sign In here "}
          </span>
        </p>
        {isSignIn && (
          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-300 mb-2 font-semibold">
              Want to try with dummy credentials?
            </p>
            <button
              type="button"
              onClick={autofillDummyCredentials}
              className="text-white bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
            >
              Autofill Dummy Login
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
