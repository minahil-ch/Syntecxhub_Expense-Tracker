import React from 'react';
import { User, Bell, Shield, Palette, Smartphone, ChevronRight } from 'lucide-react';

const Settings = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Account Settings</h2>

      <div className="space-y-6">
        <section className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <User size={20} className="text-primary" />
            Profile Information
          </h3>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-all">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Minahil" alt="avatar" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-white shadow-lg border border-bg-dark">
                <Smartphone size={14} />
              </button>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="space-y-2">
                <label className="text-sm text-text-muted">Full Name</label>
                <input type="text" defaultValue="Minahil" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-text-muted">Email Address</label>
                <input type="email" defaultValue="minahil@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-primary" />
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsCard 
            icon={<Bell size={20} />} 
            title="Notifications" 
            desc="Configure alerts and reminders" 
          />
          <SettingsCard 
            icon={<Shield size={20} />} 
            title="Security" 
            desc="Password and 2FA settings" 
          />
          <SettingsCard 
            icon={<Palette size={20} />} 
            title="Appearance" 
            desc="Theme and color preferences" 
          />
          <SettingsCard 
            icon={<User size={20} />} 
            title="Account Data" 
            desc="Export or delete your data" 
          />
        </section>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/5">
          <button className="px-6 py-2 rounded-xl text-text-muted hover:text-white transition-colors">Cancel</button>
          <button className="btn-primary px-8 py-2">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

function SettingsCard({ icon, title, desc }) {
  return (
    <div className="glass-card p-6 flex items-center justify-between cursor-pointer group hover:border-primary/30 transition-all">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-white/5 text-primary group-hover:bg-primary/10 transition-colors">
          {icon}
        </div>
        <div>
          <h4 className="font-bold">{title}</h4>
          <p className="text-sm text-text-muted">{desc}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-text-muted group-hover:text-primary transition-all group-hover:translate-x-1" />
    </div>
  );
}

export default Settings;
