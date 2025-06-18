import React from 'react'
import {useState} from "react";
import { useAuthStore} from '../store/useAuthStore';
import { MessageSquare, User, Mail } from 'lucide-react';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import { toast } from 'react-hot-toast';







const SignUpPage = () => {
     const [showPassword,setShowPassword]= useState(false);
     const [formData,setFormData]=useState({
      fullName:"",
      email:"",
      password:"",
});
  
const handleSubmit =(e)=>{
      e.preventDefault();
      const success=validateForm();
      if(success===true) signup(formData);
     };


const { signup, isSigningUp } = useAuthStore();

     const validateForm=()=>{
     if(!formData.fullName.trim()) return toast.error("full name is required");
      if(!formData.email.trim()) return toast.error("email is required");
      if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Please enter a valid email address");
      if(!formData.password.trim()) return toast.error("password is required");
      if(formData.password.length < 6) return toast.error("Password must be at least 6 characters long");

      return true;
};
    





  return (
  <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] relative overflow-hidden grid lg:grid-cols-2 items-center justify-center">
    {/* Blur Background Shapes */}
    <div className="absolute top-16 left-10 w-80 h-80 bg-[#475569] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#6b7280] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

    {/* LEFT SIDE: Glass Card with Form */}
    <div className="flex justify-center z-10">
      <div className="backdrop-blur-lg bg-white/5 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md mx-6">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center shadow-md">
              <MessageSquare className="size-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold mt-2 text-white">Create Account</h1>
            <p className="text-white/60">Start your journey on Dimelo</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-medium">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 text-white/50" />
              </div>
              <input
                type="text"
                className="input input-bordered w-full pl-10 bg-white/10 text-white placeholder-white/40 border-white/20 focus:ring-2 focus:ring-white/30"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-white/50" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10 bg-white/10 text-white placeholder-white/40 border-white/20 focus:ring-2 focus:ring-white/30"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-white/50" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 pr-10 bg-white/10 text-white placeholder-white/40 border-white/20 focus:ring-2 focus:ring-white/30"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-white/50" />
                ) : (
                  <Eye className="size-5 text-white/50" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-white/10 hover:bg-white/20 text-white font-semibold tracking-wide"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin mr-2" />
                Creating...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/60">
            Already have an account?{" "}
            <Link to="/login" className="underline font-medium text-white">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE: Welcome Message */}
    <AuthImagePattern 
    title = "Your New Happy Place"
subtitle = "Chat, connect, and create memories with your favorite people."

    
    />
   
  </div>
);

  }



export default SignUpPage;
