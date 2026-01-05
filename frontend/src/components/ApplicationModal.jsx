import React, { useState, useEffect } from 'react';
import '../styles/Modal.css';

const ApplicationModal = ({ isOpen, onClose, onSubmit, application = null }) => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    jobDescription: '',
    status: 'APPLIED',
    applicationDate: new Date().toISOString().split('T')[0],
    salary: '',
    jobUrl: '',
    notes: '',
    source: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (application) {
      // Editing existing application
      setFormData({
        company: application.company || '',
        position: application.position || '',
        location: application.location || '',
        jobDescription: application.jobDescription || '',
        status: application.status || 'APPLIED',
        applicationDate: application.applicationDate 
          ? new Date(application.applicationDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        salary: application.salary || '',
        jobUrl: application.jobUrl || '',
        notes: application.notes || '',
        source: application.source || '',
      });
    } else {
      // Reset for new application
      setFormData({
        company: '',
        position: '',
        location: '',
        jobDescription: '',
        status: 'APPLIED',
        applicationDate: new Date().toISOString().split('T')[0],
        salary: '',
        jobUrl: '',
        notes: '',
        source: '',
      });
    }
    setError('');
  }, [application, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Convert date to ISO-8601 DateTime format
      const dataToSubmit = {
        ...formData,
        applicationDate: new Date(formData.applicationDate).toISOString(),
      };
      await onSubmit(dataToSubmit);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save application');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{application ? 'Edit Application' : 'Add New Application'}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="company">Company *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position *</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., San Francisco, CA or Remote"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="SAVED">Saved</option>
                <option value="APPLIED">Applied</option>
                <option value="SCREENING">Screening</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
                <option value="WITHDRAWN">Withdrawn</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="applicationDate">Application Date</label>
              <input
                type="date"
                id="applicationDate"
                name="applicationDate"
                value={formData.applicationDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary Range</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., $80k - $100k"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="source">Source</label>
              <input
                type="text"
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="e.g., LinkedIn, Indeed, Referral"
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobUrl">Job URL</label>
              <input
                type="url"
                id="jobUrl"
                name="jobUrl"
                value={formData.jobUrl}
                onChange={handleChange}
                placeholder="https://"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              rows="4"
              placeholder="Paste the job description here..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Any additional notes..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Saving...' : application ? 'Update' : 'Add Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;
