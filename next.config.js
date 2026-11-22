/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //     domains: ['images.pexels.com'],
  // },
};

// module.exports = nextConfig

module.exports = {
  async redirects() {
    return [
      {
        source: "/blog/frontend_developer",
        destination: "/blog/frontend-developer",
        permanent: true,
      },
      {
        source: "/blog/role_of_javascript_frameworks",
        destination: "/blog/role-of-javascript-frameworks",
        permanent: true,
      },
      {
        source: "/blog/from_usestate_to_redux",
        destination: "/blog/from-usestate-to-redux",
        permanent: true,
      },
      {
        source: "/blog/working_with_apis",
        destination: "/blog/working-with-apis",
        permanent: true,
      },
      {
        source: "/blog/debugging_javascript_best_practices",
        destination: "/blog/debugging-javascript-best-practices",
        permanent: true,
      },
      {
        source: "/blog/how_to_prepare_for_a_job_interview",
        destination: "/blog/how-to-prepare-for-a-job-interview",
        permanent: true,
      },
      {
        source: "/blog/between_frontend_and_backend",
        destination: "/blog/between-frontend-and-backend",
        permanent: true,
      },
      {
        source: "/blog/how_to_become_a_frontend_developer",
        destination: "/blog/how-to-become-a-frontend-developer",
        permanent: true,
      },
      {
        source: "/blog/dark_mode",
        destination: "/blog/dark-mode",
        permanent: true,
      },
      {
        source: "/blog/ux_design",
        destination: "/blog/ux-design",
        permanent: true,
      },
      {
        source: "/blog/css_grid_layouts",
        destination: "/blog/css-grid-layouts",
        permanent: true,
      },
      {
        source: "/blog/responsive_design",
        destination: "/blog/responsive-design",
        permanent: true,
      },
      {
        source: "/blog/optimizing_website",
        destination: "/blog/optimizing-website",
        permanent: true,
      },
    ];
  },
};
