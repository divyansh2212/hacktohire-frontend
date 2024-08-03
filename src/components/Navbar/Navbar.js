import React, { useEffect, useState } from "react";
import { auth } from "../../firebase.js";
import { Link, useNavigate, NavLink } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import { useAuth } from "../../AuthContext.js";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [errormsg, setErrormsg] = useState("");
  const { setToken } = useAuth();

  // login through google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = auth.currentUser;
        console.log(user)
        const token = await user?.getIdToken();
        console.log("token: ", token)
        const email = user.email;
        const name = auth.currentUser.displayName;
        console.log("name: ", name)
        const uid = auth.currentUser.uid;
        setToken(token)
        const request = await axios.post("http://localhost:8081/signup", {
            "id": uid,
            "name": name,
            "email": email
        }, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          }
      });
        setToken(token)
        localStorage.setItem('token',token);
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          setErrormsg("Google sign-in popup was closed by the user.");
        } else {
          console.log(error);
        }
      });
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    auth
      .signOut()
      .then(() => {
        navigate("/");
        setUser(null);
      })
      .catch((error) => {
        console.log("Sign out error:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container-fluid bg-dark w-100">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark p-0">
          <Link to="/" className="navbar-brand">
            <h1 className="text-white">
              Flight<span className="text-primary">Sync</span>
            </h1>
          </Link>
          <button
            type="button"
            className="navbar-toggler ms-auto me-0"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse bg-dark" id="navbarCollapse">
            <div className="navbar-nav ms-auto align-items-center">
              <NavLink to="/" className="nav-item nav-link">
                Home
              </NavLink>
              {user && <NavLink to="/admin" className="nav-item nav-link">
                Admin Dashboard
              </NavLink>}
             {user && <NavLink to="/my-flights" className="nav-item nav-link">
                My Flights
              </NavLink>}
              <div style={{ borderColor: "#1363C6" }}>
                {user ? (
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <button
                      className="btn btn-dark btn-oval"
                      onClick={handleSignOut}
                    >
                      Log Out <i className="fa fa-sign-out-alt"></i>
                    </button>
                  </div>
                ) : (
                  <Link className="btn btn-dark btn-oval" onClick={signInWithGoogle}>
                    <i className="fa fa-sign-in-alt"></i> Sign In With Google
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;