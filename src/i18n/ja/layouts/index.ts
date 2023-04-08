import { LocaleLayouts } from '@/i18n/type/layouts';

const prefixPageLegal = 'pages.legal';

export const layouts: LocaleLayouts = {
  default: {
    header: {
      title: '明龍久',
      menu: {
        resume: '履歴書',
        blogs: 'ブログ',
        shop: 'ショップ',
      },
      profile: {
        title: 'プロフィール',
        dashboard: 'ダッシュボード',
        login: 'ログイン',
        logout: 'ログアウト',
      },
    },
    footer: {
      socials: 'ソーシャル',
      language: '言語',
      menus: {
        personal: {
          title: '個人',
          items: {
            aboutUs: '当社について',
            blogs: 'ブログ',
            tools: 'ツール',
          },
        },
        helpAndSupport: {
          title: 'ヘルプ＆サポート',
          items: {
            contactUs: 'お問い合わせ',
            support: 'サポート',
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
          title: 'リソース',
          items: {
            githubPages: 'ギットハブページ',
            cloudflareWorkers: 'クラウドフレアワーカー',
            mongoDBAtlas: 'MongoDBアトラス',
          },
        },
      },
    },
  },
  dashboard: {
    header: {
      menu: {
        overview: '概要',
        projects: 'プロジェクト',
      },
    },
  },
};
