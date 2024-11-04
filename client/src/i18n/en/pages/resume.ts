import { LocalePagesResume } from '@/i18n/type/pages/resume';

export const resume: LocalePagesResume = {
  header: {
    menu: {
      title: 'Menu',
      home: 'Home',
      services: 'Services',
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      projects: 'Projects',
      testimonial: 'Testimonial',
      contact: 'Contact',
    },
  },
  sections: {
    home: {
      title: "Hi, I'm Dat, a full stack web developer.",
      description: 'I have a deep passion for creating engaging websites.',
      action: 'Explore More',
    },
    services: {
      title: 'What I do the best',
      description:
        'I focus on developing products and projects with meticulous care, ensuring each product is built with the highest quality and performance.',
      items: {
        websiteDesign: {
          title: 'Website Design',
          description:
            'Creating beautiful and refined website interfaces based on material design to provide the best user experience.',
        },
        webDevelopment: {
          title: 'Web Development',
          description:
            'Developing high-quality web API applications with strong security and performance.',
        },
        management: {
          title: 'Management',
          description:
            'Project management with precision and organization to ensure projects are completed on schedule and with quality.',
        },
        devOps: {
          title: 'Dev Ops',
          description:
            'Deploying and maintaining system infrastructure to ensure stability, building effective CI/CD systems.',
        },
      },
    },
    about: {
      title: 'A little about myself',
      description:
        'I am Dang Minh Dat, someone who constantly seeks new challenges in my career path and continuously learns new technology techniques. I enjoy accompanying and learning from experienced colleagues to develop my skills.',
      action: 'Download My CV',
      mainItems: {
        age: {
          label: 'Age',
          content: '{{value}}',
        },
        location: {
          label: 'Location',
          content: 'Go Vap District, Ho Chi Minh City, Vietnam',
        },
        phone: {
          label: 'Phone',
          content: '+84 (079)-805-9927',
        },
        email: {
          label: 'Email',
          content: '{{value}}',
        },
      },
      subItems: {
        line1: {
          content:
            'Learn more about native app development, building reliable and efficient mobile applications.',
        },
        line2: {
          content: 'Develop management skills to achieve objectives.',
        },
        line3: {
          content:
            'Explore and apply new technologies to enhance my professional expertise.',
        },
      },
    },
    experience: {
      title: 'Education & Experience',
      timeline: {
        a: [
          {
            title: 'Studying at HUTECH University',
            description: 'GPA 3.04/4, completed all major subjects.',
            period: 'from 2016 to 2020',
          },
          {
            title: 'Paused education',
            description: 'Due to personal issues.',
            period: 'around mid-2020',
          },
          {
            title: 'Self-study and practice at home',
            description:
              'Mainly focused on Node.js, with an emphasis on frameworks like Express.js, Vue.js, and React.js.',
            period: 'until early 2022',
          },
        ],
        b: [
          {
            title: 'Intern at Co., Ltd. Briswell Vietnam',
            description:
              'Interned for 2 months, with training in the first month and a project assessment in the final month.',
            period: 'March 2022',
          },
          {
            title: 'Officially employed at Co., Ltd. Briswell Vietnam',
            description:
              'Promoted in November 2022 (middle developer role) and November 2023 (senior developer role).',
            period: 'May 2022',
          },
          {
            title: 'Seeking new job opportunities',
            description:
              'Resigned to seek a new work environment to further my career development.',
            period: 'From mid-July to the present',
          },
        ],
      },
    },
    generalSkill: {
      technical: {
        title: 'Technical Knowledge',
        description:
          'I have solid knowledge of popular technologies and frameworks in web development, as well as techniques related to cloud services and dev ops.',
        items: {
          vue: {
            label: 'Vue',
          },
          react: {
            label: 'React',
          },
          backEnd: {
            label: 'Nest.js / Express.js',
          },
          cloud: {
            label: 'Amazon Services',
          },
          database: {
            label: 'Database (SQL, NoSql)',
          },
          frontEnd: {
            label: 'HTML / CSS / JS',
          },
        },
      },
      soft: {
        title: 'Soft SKills',
        description:
          'I also enhance important soft skills in the workplace to create a positive and effective work environment. At the same time, I ensure that tasks are completed according to plan.',
        items: {
          teamwork: {
            label: 'Teamwork',
          },
          timeManagement: {
            label: 'Time Management',
          },
          communication: {
            label: 'Communication',
          },
          creativity: {
            label: 'Creativity',
          },
        },
      },
    },
    projects: {
      title: 'Projects',
      description:
        'As a web developer, I have experience with all stages of the development cycle for dynamic web projects.',
    },
    testimonial: {
      title: 'Testimonials',
      description: 'What people say about me',
      people: [
        {
          name: 'Khoa Nguyen Dang',
          title: 'Quality Control',
          comment: '',
        },
        {
          name: 'San Nguyen Huynh',
          title: 'Quality Control',
          comment: '',
        },
        {
          name: 'Tien Le Duy',
          title: 'Full Stack Developer',
          comment: '',
        },
      ],
    },
    contact: {
      title: 'Get In Touch',
      description: 'Please contact me using the form bellow.',
      action: '$t(common.labels.send)',
      sendMore: 'Send More',
    },
  },
};
