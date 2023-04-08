import { LocaleLayouts } from '@/i18n/type/layouts';

const prefixPageLegal = 'pages.legal';

export const layouts: LocaleLayouts = {
  default: {
    header: {
      title: 'Akira Tatsuhisa',
      menu: {
        resume: 'Resume',
        blogs: 'Blogs',
        shop: 'Shop',
      },
      profile: {
        title: 'Profile',
        dashboard: 'Dashboard',
        login: 'Login',
        logout: 'Logout',
      },
    },
    footer: {
      socials: 'Socials',
      language: 'Language',
      menus: {
        personal: {
          title: 'Personal',
          items: {
            aboutUs: 'About Us',
            blogs: 'Blogs',
            tools: 'Tools',
          },
        },
        helpAndSupport: {
          title: 'Help & Support',
          items: {
            contactUs: 'Contact Us',
            support: 'Support',
          },
        },
        legal: {
          title: `$t(${prefixPageLegal}.title)`,
          items: {
            termsAndConditions: `$t(${prefixPageLegal}.tabs.termsAndConditions)`,
            privacyPolicy: `$t(${prefixPageLegal}.tabs.privacyPolicy)`,
            liecenses: `$t(${prefixPageLegal}.tabs.liecenses)`,
          },
        },
        resources: {
          title: 'Resources',
          items: {
            githubPages: 'Github Pages',
            cloudflareWorkers: 'Cloudflare Workers',
            mongoDBAtlas: 'MongoDB Atlas',
          },
        },
      },
    },
  },
  dashboard: {
    header: {
      menu: {
        overview: 'Overview',
        projects: 'Projects',
      },
    },
  },
};
