import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRequests } from '../../hooks/useRequests';
import SurveyRequestsTable from './SurveyRequestsTable';
import RequestDetails from './RequestDetails';
import { FiLogOut, FiClipboard, FiSettings, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { requests, loading, updateRequest, deleteRequest } = useRequests();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState('requests');

  const stats = {
    new: requests.filter(r => r.status === 'New').length,
    contacted: requests.filter(r => r.status === 'Contacted').length,
    inProgress: requests.filter(r => r.status === 'In Progress').length,
    completed: requests.filter(r => r.status === 'Completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-secondary text-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">TOPP MAP Admin</h2>
          
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('requests')}
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
              onClick={() => setActiveTab('settings')}
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
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg text-gray-600 mb-2">New Requests</h3>
              <p className="text-3xl font-bold text-primary">{stats.new}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg text-gray-600 mb-2">Contacted</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.contacted}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg text-gray-600 mb-2">In Progress</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg text-gray-600 mb-2">Completed</h3>
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
            </div>
          </div>

          {/* Requests Table */}
          {activeTab === 'requests' && (
            <SurveyRequestsTable
              requests={requests}
              loading={loading}
              onSelect={setSelectedRequest}
              onUpdate={updateRequest}
              onDelete={deleteRequest}
            />
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Email Notifications</label>
                  <input
                    type="email"
                    placeholder="Admin Email"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">WhatsApp Number</label>
                  <input
                    type="text"
                    placeholder="+233 53 989 6049"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <button className="btn-primary">Save Settings</button>
              </form>
            </div>
          )}
        </motion.div>
      </div>

      {/* Request Details Modal */}
      {selectedRequest && (
        <RequestDetails
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onUpdate={updateRequest}
        />
      )}
    </div>
  );
};

export default AdminDashboard;