import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClipboardList, FaCalendar } from 'react-icons/fa';
import { format } from 'date-fns';

const RequestDetails = ({ request, onClose, onUpdate }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-primary text-white p-6 rounded-t-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Survey Request Details</h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition"
              >
                <FaTimes size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaUser className="text-primary mt-1" />
                <div>
                  <p className="text-sm text-accent">Full Name</p>
                  <p className="font-semibold">{request.fullName}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaPhone className="text-primary mt-1" />
                <div>
                  <p className="text-sm text-accent">Phone Number</p>
                  <p className="font-semibold">{request.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-primary mt-1" />
                <div>
                  <p className="text-sm text-accent">Email</p>
                  <p className="font-semibold">{request.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <div>
                  <p className="text-sm text-accent">Project Location</p>
                  <p className="font-semibold">{request.projectLocation}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaClipboardList className="text-primary mt-1" />
                <div>
                  <p className="text-sm text-accent">Survey Type</p>
                  <p className="font-semibold">{request.surveyType}</p>
                </div>
              </div>

              {request.projectDescription && (
                <div className="flex items-start space-x-3">
                  <FaClipboardList className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-accent">Project Description</p>
                    <p className="text-gray-700">{request.projectDescription}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <FaCalendar className="text-primary mt-1" />
                <div>
                  <p className="text-sm text-accent">Submitted On</p>
                  <p className="font-semibold">
                    {format(new Date(request.createdAt), 'dd MMMM yyyy, hh:mm a')}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <label className="block text-sm text-accent mb-2">Update Status</label>
                <select
                  value={request.status}
                  onChange={(e) => {
                    onUpdate(request._id, e.target.value);
                    onClose();
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RequestDetails;