const path = require('path')

const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true
})

const nextConfiguration = {
  target: 'serverless', 
};

const withImages = require('next-images');

module.exports = withImages()

const withTM = require('next-transpile-modules')(['react-st-modal']);

// module.exports = withTM({})

module.exports = {
  env: {
    LOCAL_API_URL: 'https://theclassroom.ci-auction.ng/api/v1',
    API_URL: 'https://theclassroom.ci-auction.ng/api/v1',
  },  
}

const withPlugins = require('next-compose-plugins')
module.exports = withPlugins([withTM], {})
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  videos:{
    domains:[
      'youtube.com',
      'vimeo.com',
      'coverr.com',
      'storage.coverr.com',
    ]
  },
  images: {
    // loader: "imgix",
    // path: "next/static",
    disableStaticImages: false,
    domains: [
      'via.placeholder.com',
      'i.pravatar.cc'
    ]
  },
  
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/signup': { page: '/signup' },
      '/signup/students': { page: '/signup/students' },
      '/signup/tutors': { page: '/signup/tutors' },
      '/dashboard': { page: '/dashboard' }, 
      '/signup/guardian': { page: '/signup/guardian' },
      '/dashboard/student': { page: '/dashboard/student' },
      '/dashboard/student/messages': { page: '/dashboard/student/messages' },
      '/dashboard/student/reminders': { page: '/dashboard/student/reminders' },
      '/dashboard/student/class-session': { page: '/dashboard/student/class-session' },
      '/dashboard/tutor': { page: '/dashboard/tutor' },
      '/dashboard/tutor/messages': { page: '/dashboard/tutor/messages' },
      '/dashboard/tutor/reminders': { page: '/dashboard/tutor/reminders' },
      '/dashboard/tutor/class-session': { page: '/dashboard/tutor/class-session' },      
      '/dashboard/tutor/class-session/add-class': { page: '/dashboard/tutor/class-session/add-class' },      
      '/dashboard/tutor/profile': { page: '/dashboard/tutor/profile' },      
      '/dashboard/tutor/requests': { page: '/dashboard/tutor/requests' },      
      '/dashboard/tutor/students': { page: '/dashboard/tutor/students' },      
      '/dashboard/tutor/assignments': { page: '/dashboard/tutor/assignments' },   
      '/dashboard/guardian': { page: '/dashboard/guardian' },
      '/dashboard/guardian/courses': { page: '/dashboard/guardian/courses' },
      '/dashboard/guardian/list-children': { page: '/dashboard/guardian/list-children' },

    }
  },
}
