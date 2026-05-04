import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, History, PieChart, WalletCards, Settings, LogOut, Search, Bell, X, Check, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = ({ children, searchQuery, setSearchQuery, notifications, setNotifications }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfileMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 glass-card m-4 mr-0 hidden md:flex flex-col items-center lg:items-start p-6 sticky top-4 h-[calc(100vh-2rem)] z-40">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">S</div>
          <span className="text-xl font-bold gradient-text hidden lg:block">Syntecxhub</span>
        </div>

        <nav className="flex-1 w-full space-y-4">
          <SidebarItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <SidebarItem to="/transactions" icon={<History size={20} />} label="Transactions" />
          <SidebarItem to="/reports" icon={<PieChart size={20} />} label="Reports" />
          <SidebarItem to="/budgets" icon={<WalletCards size={20} />} label="Budgets" />
          <SidebarItem to="/settings" icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="mt-auto w-full pt-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 text-text-muted hover:bg-danger/10 hover:text-danger w-full text-left"
          >
            <LogOut size={20} />
            <span className="font-medium hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 sticky top-0 bg-bg-dark/80 backdrop-blur-md z-30 py-2">
          <div>
            <h1 className="text-3xl font-bold">Expense Tracker</h1>
            <p className="text-text-muted">Welcome back, {user?.name}! Here's your financial overview.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative glass-card px-4 py-2 flex items-center gap-2">
              <Search size={18} className="text-text-muted" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none text-sm w-32 lg:w-48 text-white outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`glass-card p-2 text-text-muted hover:text-primary relative transition-all ${showNotifications ? 'text-primary bg-primary/10' : ''}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-bg-dark">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-80 glass-card p-4 z-50 shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                      <h4 className="font-bold">Notifications</h4>
                      <button onClick={markAllRead} className="text-[10px] text-primary hover:underline font-bold">Mark all read</button>
                    </div>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                      {notifications.length > 0 ? notifications.map(notif => (
                        <div key={notif.id} className={`p-3 rounded-xl transition-all ${notif.read ? 'opacity-50' : 'bg-white/5 border-l-4 border-primary'}`}>
                          <p className="text-sm">{notif.text}</p>
                          <span className="text-[10px] text-text-muted">{notif.time}</span>
                        </div>
                      )) : (
                        <p className="text-center text-text-muted py-4 text-sm">No new notifications</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Menu */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden hover:scale-105 transition-all"
              >
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Felix'}`} alt="avatar" />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-56 glass-card p-2 z-50 shadow-2xl"
                  >
                    <div className="p-3 mb-2 border-b border-white/5 text-center">
                      <p className="font-bold">{user?.name}</p>
                      <p className="text-xs text-text-muted">{user?.email}</p>
                    </div>
                    <button onClick={() => { navigate('/settings'); setShowProfileMenu(false); }} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 transition-all text-sm">
                      <User size={16} /> My Profile
                    </button>
                    <button onClick={() => { navigate('/settings'); setShowProfileMenu(false); }} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 transition-all text-sm">
                      <Settings size={16} /> Settings
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-danger/10 text-danger transition-all text-sm mt-2 pt-2 border-t border-white/5">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

function SidebarItem({ to, icon, label }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
    >
      {icon}
      <span className="font-medium hidden lg:block">{label}</span>
    </NavLink>
  );
}

export default MainLayout;
