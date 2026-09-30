import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/requests`);
      setRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (requestData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/requests`,
        requestData
      );
      setRequests([response.data.data, ...requests]);
      toast.success('Survey request submitted successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to submit request');
      throw error;
    }
  };

  const updateRequest = async (id, status) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/requests/${id}`,
        { status }
      );
      setRequests(requests.map(req => 
        req._id === id ? response.data.data : req
      ));
      toast.success('Request updated successfully');
    } catch (error) {
      toast.error('Failed to update request');
      throw error;
    }
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/requests/${id}`);
      setRequests(requests.filter(req => req._id !== id));
      toast.success('Request deleted successfully');
    } catch (error) {
      toast.error('Failed to delete request');
      throw error;
    }
  };

  return (
    <RequestContext.Provider value={{
      requests,
      loading,
      createRequest,
      updateRequest,
      deleteRequest,
      refreshRequests: fetchRequests,
    }}>
      {children}
    </RequestContext.Provider>
  );
};