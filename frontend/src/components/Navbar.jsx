import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from "react-router-dom";
import { MessageSquare, User, Mail, Settings,LogOut} from 'lucide-react';



const Navbar=()=> {
  const { logout, authUser } = useAuthStore();
  return  <header 
    className="bg-base-100 border-b border-base-300 shadow-lg sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold text-primary hover:opacity-80 transition">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Dimelo</h1>
            </Link>
  
  
          </div>
          <div className="flex items-center gap-2">
            <Link to={"/settings"} className={`btn btn-sm gap-2 transition-colors`}
            >
              <Settings className="w-4 h-4"/>
              <span className="hidden md:inline">Settings</span>
            </Link>
  
            {authUser && (
              <>
              <Link to={"/profile"} className="btn btn-sm gap-2 transition-colors">
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Profile</span>
              </Link>
              <button className="flex gap-2 items-center" onClick={logout}>
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
              </>
            )}
  
          </div>
  
  
        </div>
  
      </div>
  
    </header>
  }
export default Navbar
