import Home from "./pages/Home/Home.js";
import AdminPage from './pages/Admin/Admin.js';
import MyFlights from './pages/MyFlights/MyFlights.js';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { auth } from "./firebase.js";

const PrivateRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? element : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<PrivateRoute element={<AdminPage />} />} />
        <Route path="/my-flights" element={<PrivateRoute element={<MyFlights />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;