import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('minahil@example.com');
  const [password, setPassword] = useState('password');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[100px] animate-pulse delay-700"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-lg shadow-primary/20">S</div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-text-muted">Login to manage your expenses with Syntecxhub</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted ml-1">Email Address</label>
            <div className="relative glass-card bg-white/5 border-white/10 px-4 py-3 flex items-center gap-3 focus-within:border-primary transition-all">
              <Mail size={18} className="text-text-muted" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="bg-transparent border-none text-white outline-none w-full"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted ml-1">Password</label>
            <div className="relative glass-card bg-white/5 border-white/10 px-4 py-3 flex items-center gap-3 focus-within:border-primary transition-all">
              <Lock size={18} className="text-text-muted" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent border-none text-white outline-none w-full"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary" />
              <span className="text-text-muted">Remember me</span>
            </label>
            <a href="#" className="text-primary hover:underline">Forgot password?</a>
          </div>

          <button 
            type="submit"
            className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg"
          >
            <LogIn size={20} />
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-text-muted text-sm">
          Don't have an account? <a href="#" className="text-primary hover:underline font-medium">Create one</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
