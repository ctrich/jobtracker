const applicationService = require('../services/applicationService');

class ApplicationController {
  // Create a new application
  async create(req, res) {
    try {
      const application = await applicationService.createApplication(
        req.user.id,
        req.body
      );

      res.status(201).json({
        success: true,
        data: application,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get all applications
  async getAll(req, res) {
    try {
      const filters = {
        status: req.query.status,
        company: req.query.company,
        position: req.query.position,
      };

      const applications = await applicationService.getApplications(
        req.user.id,
        filters
      );

      res.json({
        success: true,
        data: applications,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get single application
  async getOne(req, res) {
    try {
      const application = await applicationService.getApplicationById(
        req.user.id,
        req.params.id
      );

      res.json({
        success: true,
        data: application,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update application
  async update(req, res) {
    try {
      const application = await applicationService.updateApplication(
        req.user.id,
        req.params.id,
        req.body
      );

      res.json({
        success: true,
        data: application,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Delete application
  async delete(req, res) {
    try {
      const result = await applicationService.deleteApplication(
        req.user.id,
        req.params.id
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get application statistics
  async getStats(req, res) {
    try {
      const stats = await applicationService.getStats(req.user.id);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ApplicationController();
