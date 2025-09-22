const dashboardController = {
  // Get dashboard overview data
  getDashboardOverview: async (req, res) => {
    try {
      const userId = req.user.id; // From auth middleware
      
      // Mock dashboard data - replace with actual database queries
      const dashboardData = {
        user: {
          id: userId,
          name: req.user.name || "Company User",
          email: req.user.email,
          company_name: req.user.company_name || "Your Company"
        },
        stats: {
          total_jobs: 12,
          active_jobs: 8,
          total_applications: 156,
          new_applications: 23,
          saved_candidates: 45,
          profile_completion: 85
        },
        recent_activity: [
          {
            id: 1,
            type: "application",
            message: "New application received for Software Engineer position",
            timestamp: new Date().toISOString(),
            job_title: "Software Engineer"
          },
          {
            id: 2,
            type: "job_posted",
            message: "Job posting 'Frontend Developer' published successfully",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            job_title: "Frontend Developer"
          },
          {
            id: 3,
            type: "profile_update",
            message: "Company profile updated",
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            job_title: null
          }
        ],
        upcoming_tasks: [
          {
            id: 1,
            title: "Review applications for Senior Developer",
            due_date: new Date(Date.now() + 86400000).toISOString(),
            priority: "high"
          },
          {
            id: 2,
            title: "Update company profile",
            due_date: new Date(Date.now() + 172800000).toISOString(),
            priority: "medium"
          }
        ],
        quick_actions: [
          {
            id: 1,
            title: "Post a Job",
            description: "Create and publish new job listings",
            icon: "📝",
            link: "/post-job"
          },
          {
            id: 2,
            title: "View Applications",
            description: "Review and manage job applications",
            icon: "📋",
            link: "/applications"
          },
          {
            id: 3,
            title: "Company Profile",
            description: "Update your company information",
            icon: "🏢",
            link: "/settings"
          }
        ]
      };

      res.status(200).json({
        success: true,
        data: dashboardData,
        message: "Dashboard data retrieved successfully"
      });

    } catch (error) {
      console.error("Dashboard overview error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve dashboard data",
        error: error.message
      });
    }
  },

  // Get dashboard statistics
  getDashboardStats: async (req, res) => {
    try {
      const userId = req.user.id;
      
      // Mock statistics data - replace with actual database queries
      const stats = {
        jobs: {
          total: 12,
          active: 8,
          draft: 3,
          closed: 1
        },
        applications: {
          total: 156,
          pending: 23,
          reviewed: 89,
          shortlisted: 32,
          rejected: 12
        },
        candidates: {
          saved: 45,
          contacted: 23,
          interviewed: 12
        },
        profile: {
          completion_percentage: 85,
          missing_fields: ["company_logo", "social_links"]
        }
      };

      res.status(200).json({
        success: true,
        data: stats,
        message: "Dashboard statistics retrieved successfully"
      });

    } catch (error) {
      console.error("Dashboard stats error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve dashboard statistics",
        error: error.message
      });
    }
  },

  // Get recent activity
  getRecentActivity: async (req, res) => {
    try {
      const userId = req.user.id;
      const limit = req.query.limit || 10;
      
      // Mock recent activity data
      const activities = [
        {
          id: 1,
          type: "application",
          title: "New application received",
          description: "John Doe applied for Software Engineer position",
          timestamp: new Date().toISOString(),
          metadata: {
            job_title: "Software Engineer",
            candidate_name: "John Doe",
            application_id: "APP001"
          }
        },
        {
          id: 2,
          type: "job_posted",
          title: "Job posted successfully",
          description: "Frontend Developer position published",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          metadata: {
            job_title: "Frontend Developer",
            job_id: "JOB002"
          }
        },
        {
          id: 3,
          type: "profile_update",
          title: "Profile updated",
          description: "Company information updated",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          metadata: {
            updated_fields: ["company_description", "contact_info"]
          }
        }
      ];

      res.status(200).json({
        success: true,
        data: activities.slice(0, limit),
        message: "Recent activity retrieved successfully"
      });

    } catch (error) {
      console.error("Recent activity error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve recent activity",
        error: error.message
      });
    }
  }
};

module.exports = dashboardController;
