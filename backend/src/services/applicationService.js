const prisma = require('../config/database');

class ApplicationService {
  // Create a new application
  async createApplication(userId, applicationData) {
    const application = await prisma.application.create({
      data: {
        ...applicationData,
        userId,
      },
      include: {
        contacts: true,
        documents: true,
        interviews: true,
      },
    });

    return application;
  }

  // Get all applications for a user
  async getApplications(userId, filters = {}) {
    const { status, company, position } = filters;

    const where = {
      userId,
      ...(status && { status }),
      ...(company && { company: { contains: company, mode: 'insensitive' } }),
      ...(position && { position: { contains: position, mode: 'insensitive' } }),
    };

    const applications = await prisma.application.findMany({
      where,
      include: {
        contacts: true,
        documents: true,
        interviews: true,
      },
      orderBy: {
        applicationDate: 'desc',
      },
    });

    return applications;
  }

  // Get a single application
  async getApplicationById(userId, applicationId) {
    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        userId,
      },
      include: {
        contacts: true,
        documents: true,
        interviews: true,
      },
    });

    if (!application) {
      throw new Error('Application not found');
    }

    return application;
  }

  // Update an application
  async updateApplication(userId, applicationId, updateData) {
    // Verify ownership
    const existing = await prisma.application.findFirst({
      where: {
        id: applicationId,
        userId,
      },
    });

    if (!existing) {
      throw new Error('Application not found');
    }

    const application = await prisma.application.update({
      where: { id: applicationId },
      data: updateData,
      include: {
        contacts: true,
        documents: true,
        interviews: true,
      },
    });

    return application;
  }

  // Delete an application
  async deleteApplication(userId, applicationId) {
    // Verify ownership
    const existing = await prisma.application.findFirst({
      where: {
        id: applicationId,
        userId,
      },
    });

    if (!existing) {
      throw new Error('Application not found');
    }

    await prisma.application.delete({
      where: { id: applicationId },
    });

    return { message: 'Application deleted successfully' };
  }

  // Get application statistics
  async getStats(userId) {
    const total = await prisma.application.count({
      where: { userId },
    });

    const byStatus = await prisma.application.groupBy({
      by: ['status'],
      where: { userId },
      _count: true,
    });

    const stats = {
      total,
      byStatus: byStatus.reduce((acc, item) => {
        acc[item.status] = item._count;
        return acc;
      }, {}),
    };

    return stats;
  }
}

module.exports = new ApplicationService();
