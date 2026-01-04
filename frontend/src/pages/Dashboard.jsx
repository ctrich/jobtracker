import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { applicationsAPI } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
    fetchStats();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await applicationsAPI.getAll();
      setApplications(response.data.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await applicationsAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      SAVED: '#6c757d',
      APPLIED: '#007bff',
      SCREENING: '#ffc107',
      INTERVIEW: '#fd7e14',
      OFFER: '#28a745',
      ACCEPTED: '#20c997',
      REJECTED: '#dc3545',
      WITHDRAWN: '#6c757d',
    };
    return colors[status] || '#6c757d';
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Job Tracker Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.firstName || user?.email}</span>
          <button onClick={logout} className="btn-secondary">
            Logout
          </button>
        </div>
      </header>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p className="stat-number">{stats?.total || 0}</p>
        </div>
        {stats?.byStatus && Object.entries(stats.byStatus).map(([status, count]) => (
          <div key={status} className="stat-card">
            <h3>{status.replace('_', ' ')}</h3>
            <p className="stat-number" style={{ color: getStatusColor(status) }}>
              {count}
            </p>
          </div>
        ))}
      </div>

      <div className="applications-section">
        <div className="section-header">
          <h2>Your Applications</h2>
          <button className="btn-primary">+ Add Application</button>
        </div>

        {applications.length === 0 ? (
          <div className="empty-state">
            <p>No applications yet. Start tracking your job search!</p>
          </div>
        ) : (
          <div className="applications-table">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Applied Date</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.company}</td>
                    <td>{app.position}</td>
                    <td>
                      <span 
                        className="status-badge" 
                        style={{ backgroundColor: getStatusColor(app.status) }}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td>{formatDate(app.applicationDate)}</td>
                    <td>{app.location || 'N/A'}</td>
                    <td>
                      <button className="btn-small">View</button>
                      <button className="btn-small">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
