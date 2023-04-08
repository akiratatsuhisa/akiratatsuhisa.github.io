type LocaleTimeline = {
  title: string;
  description: string;
  period: string;
};

type LocalePersonTestimonial = {
  name: string;
  title: string;
  comment: string;
};

export type LocalePagesResume = {
  header: {
    menu: {
      title: string;
      home: string;
      services: string;
      about: string;
      experience: string;
      skills: string;
      projects: string;
      testimonial: string;
      contact: string;
    };
  };
  sections: {
    home: {
      title: string;
      description: string;
      action: string;
    };
    services: {
      title: string;
      description: string;
      items: {
        websiteDesign: {
          title: string;
          description: string;
        };
        webDevelopment: {
          title: string;
          description: string;
        };
        management: {
          title: string;
          description: string;
        };
        devOps: {
          title: string;
          description: string;
        };
      };
    };
    about: {
      title: string;
      description: string;
      action: string;
      mainItems: {
        age: {
          label: string;
          content: string;
        };
        location: {
          label: string;
          content: string;
        };
        phone: {
          label: string;
          content: string;
        };
        email: {
          label: string;
          content: string;
        };
      };
      subItems: {
        line1: {
          content: string;
        };
        line2: {
          content: string;
        };
        line3: {
          content: string;
        };
      };
    };
    experience: {
      title: string;
      timeline: {
        a: [LocaleTimeline, LocaleTimeline, LocaleTimeline];
        b: [LocaleTimeline, LocaleTimeline, LocaleTimeline];
      };
    };
    generalSkill: {
      technical: {
        title: string;
        description: string;
        items: {
          vue: {
            label: string;
          };
          react: {
            label: string;
          };
          backEnd: {
            label: string;
          };
          cloud: {
            label: string;
          };
          database: {
            label: string;
          };
          frontEnd: {
            label: string;
          };
        };
      };
      soft: {
        title: string;
        description: string;
        items: {
          teamwork: {
            label: string;
          };
          timeManagement: {
            label: string;
          };
          communication: {
            label: string;
          };
          creativity: {
            label: string;
          };
        };
      };
    };
    projects: {
      title: string;
      description: string;
    };
    testimonial: {
      title: string;
      description: string;
      people: [
        LocalePersonTestimonial,
        LocalePersonTestimonial,
        LocalePersonTestimonial,
      ];
    };
    contact: {
      title: string;
      description: string;
      action: string;
      sendMore: string;
    };
  };
};
