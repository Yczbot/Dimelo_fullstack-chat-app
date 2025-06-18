import React from 'react'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';
import { Loader } from 'lucide-react'
import { Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App=()=> {
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore()
  const {theme}=useThemeStore();
   console.log({onlineUsers});

  useEffect(() => {
    console.log("Theme set to",theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
 
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  console.log({ authUser })
  if (isCheckingAuth)
    return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-900 text-white">
      <Loader className="w-12 h-12 animate-spin text-white mb-3" />
      <p className="text-white text-lg">Fetching your data...</p>
    </div>

  )

  return (
    <div>
       <Toaster position="center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ?<HomePage />:<Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage />:<Navigate to="/"/>} />
        <Route path="/login" element={!authUser ? <LoginPage />:<Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ?<ProfilePage />:<Navigate to="/login" />} />

      </Routes>
    </div>
  )
}

export default App
