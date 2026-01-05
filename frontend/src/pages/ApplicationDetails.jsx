import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applicationsAPI } from '../services/api';
import ApplicationModal from '../components/ApplicationModal';
import '../styles/ApplicationDetails.css';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const response = await applicationsAPI.getOne(id);
      setApplication(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load application details');
      console.error('Error fetching application:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (formData) => {
    await applicationsAPI.update(id, formData);
    await fetchApplication();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await applicationsAPI.delete(id);
        navigate('/dashboard');
      } catch (err) {
        alert('Failed to delete application');
        console.error('Error deleting application:', err);
      }
    }
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="loading">Loading application details...</div>;
  }

  if (error || !application) {
    return (
      <div className="error-container">
        <h2>{error || 'Application not found'}</h2>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="application-details">
      <div className="details-header">
        <button onClick={() => navigate('/dashboard')} className="btn-back">
          ← Back to Dashboard
        </button>
        <div className="header-actions">
          <button onClick={() => setIsEditModalOpen(true)} className="btn-primary">
            Edit
          </button>
          <button onClick={handleDelete} className="btn-danger">
            Delete
          </button>
        </div>
      </div>

      <div className="details-container">
        <div className="details-main">
          <div className="company-header">
            <div>
              <h1>{application.company}</h1>
              <h2>{application.position}</h2>
            </div>
            <span
              className="status-badge-large"
              style={{ backgroundColor: getStatusColor(application.status) }}
            >
              {application.status}
            </span>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <label>Location</label>
              <p>{application.location || 'Not specified'}</p>
            </div>

            <div className="detail-item">
              <label>Application Date</label>
              <p>{formatDate(application.applicationDate)}</p>
            </div>

            <div className="detail-item">
              <label>Salary Range</label>
              <p>{application.salary || 'Not specified'}</p>
            </div>

            <div className="detail-item">
              <label>Source</label>
              <p>{application.source || 'Not specified'}</p>
            </div>

            {application.jobUrl && (
              <div className="detail-item full-width">
                <label>Job Posting</label>
                <a
                  href={application.jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="job-link"
                >
                  View Job Posting →
                </a>
              </div>
            )}
          </div>

          {application.jobDescription && (
            <div className="detail-section">
              <h3>Job Description</h3>
              <div className="description-box">
                <p>{application.jobDescription}</p>
              </div>
            </div>
          )}

          {application.notes && (
            <div className="detail-section">
              <h3>Notes</h3>
              <div className="notes-box">
                <p>{application.notes}</p>
              </div>
            </div>
          )}
        </div>

        <div className="details-sidebar">
          <div className="sidebar-section">
            <h3>Contacts</h3>
            {application.contacts && application.contacts.length > 0 ? (
              <div className="contacts-list">
                {application.contacts.map((contact) => (
                  <div key={contact.id} className="contact-card">
                    <p className="contact-name">{contact.name}</p>
                    <p className="contact-role">{contact.role}</p>
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} className="contact-link">
                        {contact.email}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">No contacts yet</p>
            )}
          </div>

          <div className="sidebar-section">
            <h3>Interviews</h3>
            {application.interviews && application.interviews.length > 0 ? (
              <div className="interviews-list">
                {application.interviews.map((interview) => (
                  <div key={interview.id} className="interview-card">
                    <p className="interview-type">{interview.type}</p>
                    <p className="interview-date">
                      {formatDate(interview.scheduledAt)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">No interviews scheduled</p>
            )}
          </div>

          <div className="sidebar-section">
            <h3>Documents</h3>
            {application.documents && application.documents.length > 0 ? (
              <div className="documents-list">
                {application.documents.map((doc) => (
                  <div key={doc.id} className="document-card">
                    <p className="document-name">{doc.name}</p>
                    <p className="document-type">{doc.type}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">No documents attached</p>
            )}
          </div>
        </div>
      </div>

      <ApplicationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEdit}
        application={application}
      />
    </div>
  );
};

export default ApplicationDetails;
