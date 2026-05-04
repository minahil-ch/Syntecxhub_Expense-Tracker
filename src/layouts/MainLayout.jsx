import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, History, PieChart, WalletCards, Settings, LogOut, Search, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MainLayout = ({ children, searchQuery, setSearchQuery }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 glass-card m-4 mr-0 hidden md:flex flex-col items-center lg:items-start p-6 sticky top-4 h-[calc(100vh-2rem)]">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">S</div>
          <span className="text-xl font-bold gradient-text hidden lg:block">Syntecxhub</span>
        </div>

        <nav className="flex-1 w-full space-y-4">
          <SidebarItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <SidebarItem to="/transactions" icon={<History size={20} />} label="Transactions" />
          <SidebarItem to="/reports" icon={<PieChart size={20} />} label="Reports" />
          <SidebarItem to="/budgets" icon={<WalletCards size={20} />} label="Budgets" />
          <SidebarItem to="/settings" icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="mt-auto w-full pt-6 border-t border-border">
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
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
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
            <button className="glass-card p-2 text-text-muted hover:text-primary">
              <Bell size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Felix'}`} alt="avatar" className="rounded-full" />
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
