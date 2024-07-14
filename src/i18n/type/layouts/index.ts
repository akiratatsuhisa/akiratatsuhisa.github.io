export type LocaleLayouts = {
  default: {
    header: {
      title: string;
      menu: {
        resume: string;
        blogs: string;
      };
      profile: {
        title: string;
        dashboard: string;
        login: string;
        logout: string;
      };
    };
    footer: {
      socials: string;
      language: string;
      menus: {
        personal: {
          title: string;
          items: {
            aboutUs: string;
            blogs: string;
            tools: string;
          };
        };
        helpAndSupport: {
          title: string;
          items: {
            contactUs: string;
            support: string;
          };
        };
        legal: {
          title: string;
          items: {
            termsAndConditions: string;
            privacyPolicy: string;
            liecenses: string;
          };
        };
        resources: {
          title: string;
          items: {
            githubPages: string;
            cloudflareWorkers: string;
            mongoDBAtlas: string;
          };
        };
      };
    };
  };
  dashboard: {
    header: {
      menu: {
        overview: string;
        projects: string;
      };
    };
  };
};
