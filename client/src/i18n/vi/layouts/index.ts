import { LocaleLayouts } from '@/i18n/type/layouts';

const prefixPageLegal = 'pages.legal';

export const layouts: LocaleLayouts = {
  default: {
    header: {
      title: 'Akira Tatsuhisa',
      menu: {
        resume: 'Sơ yếu lý lịch',
        blogs: 'Bài viết',
      },
      profile: {
        title: 'Hồ sơ',
        dashboard: 'Bảng điều khiển',
        login: 'Đăng nhập',
        logout: 'Đăng xuất',
      },
    },
    footer: {
      socials: 'Mạng xã hội',
      language: 'Ngôn ngữ',
      menus: {
        personal: {
          title: 'Cá nhân',
          items: {
            aboutUs: 'Về chúng tôi',
            blogs: 'Bài viết',
            tools: 'Công cụ',
          },
        },
        helpAndSupport: {
          title: 'Trợ giúp & Hỗ trợ',
          items: {
            contactUs: 'Liên hệ',
            support: 'Hỗ trợ',
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
          title: 'Tài nguyên',
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
        overview: 'Tổng quan',
        projects: 'Dự án',
      },
    },
  },
};
