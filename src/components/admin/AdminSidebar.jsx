import React from 'react';
import { FiLogOut, FiClipboard, FiSettings, FiUsers } from 'react-icons/fi';

const AdminSidebar = ({ user, activeTab, onTabChange, stats, onLogout }) => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-secondary text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">TOPP MAP Admin</h2>
        
        <nav className="space-y-2">
          <button
            onClick={() => onTabChange('requests')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'requests' ? 'bg-primary' : 'hover:bg-gray-700'
            }`}
          >
            <FiClipboard />
            <span>Survey Requests</span>
            {stats.new > 0 && (
              <span className="ml-auto bg-primary text-xs px-2 py-1 rounded-full">
                {stats.new}
              </span>
            )}
          </button>
          
          <button
            onClick={() => onTabChange('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'settings' ? 'bg-primary' : 'hover:bg-gray-700'
            }`}
          >
            <FiSettings />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <FiUsers />
          </div>
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;