import { useState, useEffect } from 'react';
import { AuthProvider } from './AuthContext';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoaded(true);
    });

    return () => {
      setIsLoaded(false)
    }
  }, []);

  return (
    <BrowserRouter basename="/odin-final-project">
      <AuthProvider value={{ currentUser, isLoaded }}>
        <Routes>
          <Route index element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;