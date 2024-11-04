import { LocalePagesResume } from '@/i18n/type/pages/resume';

export const resume: LocalePagesResume = {
  header: {
    menu: {
      title: 'Menu',
      home: 'Home',
      services: 'Dịch vụ',
      about: 'Về tôi',
      experience: 'Kinh nghiệm',
      skills: 'Kỹ năng',
      projects: 'Dự án',
      testimonial: 'Phản hồi',
      contact: 'Liên hệ',
    },
  },
  sections: {
    home: {
      title: `Xin chào tôi là Đạt, web full stack developer.`,
      description: `Có niềm đam mê sâu sắc trong việc tạo ra các trang web hấp dẫn.`,
      action: 'Tìm hiểu thêm',
    },
    services: {
      title: 'Việc tôi làm tốt nhất',
      description:
        'Tôi chú trọng vào việc phát triển các sản phẩm và dự án với sự kỹ lưỡng, đảm bảo mỗi sản phẩm được xây dựng với chất lượng và hiệu suất tốt nhất.',
      items: {
        websiteDesign: {
          title: 'Website Design',
          description:
            'Tạo ra giao diện trang web đẹp và tinh tế dựa trên material design mang lại trải nghiệm tốt nhất cho người dùng.',
        },
        webDevelopment: {
          title: 'Web Development',
          description:
            'Phát triển ứng dụng web API bao gồm Restful API và GraphQL chất lượng với tính bảo mật và hiệu suất tốt.',
        },
        management: {
          title: 'Management',
          description:
            ' Quản lý dự án với sự tỉ mỉ và tổ chức để đảm bảo các dự án hoàn thành đúng tiến độ và chất lượng.',
        },
        devOps: {
          title: 'Dev Ops',
          description:
            'Triển khai và duy trì hạ tầng hệ thống đảm bảo sự ổn định, xây dựng hệ thống CI CD hiệu quả.',
        },
      },
    },
    about: {
      title: 'Đôi nét về bản thân tôi',
      description: `Tôi là Đặng Minh Đạt, một người luôn tìm kiếm thách thức mới trên con đường sự nghiệp và không ngừng học hỏi các kỹ thuật công nghệ mới. Tôi thích được đồng hành và học hỏi từ những đồng nghiệp có kinh nghiệm cao để phát triển kỹ năng của mình.`,
      action: 'Tải CV của tôi',
      mainItems: {
        age: {
          label: 'Tuổi',
          content: '{{value}}',
        },
        location: {
          label: 'Địa điểm',
          content: 'Quận Gò vấp, Thành phố Hồ Chí Minh, Việt Nam',
        },
        phone: {
          label: 'Số điện thoại',
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
            'Học thêm về native app xây dựng các ứng dụng mobile đáng tin cậy và hiệu quả.',
        },
        line2: {
          content: 'Phát triển kỹ năng quản lý để đạt được mục tiêu.',
        },
        line3: {
          content:
            'Khám phá và ứng dụng các công nghệ mới để nâng cao trình độ chuyên môn của mình.',
        },
      },
    },
    experience: {
      title: 'Học vấn và Kinh nghiệm',
      timeline: {
        a: [
          {
            title: 'Học tại trường đại học HUTECH',
            description:
              'GPA 3.04/4, hoàn thành hết tất cả các môn chuyên ngành.',
            period: 'từ năm 2016 đến năm 2020',
          },
          {
            title: 'Dừng việc học',
            description: 'Do vấn đề cá nhân.',
            period: 'khoảng giữa năm 2020',
          },
          {
            title: 'Tự học và ôn luyện tại nhà',
            description:
              'Học chủ yếu về Node.js tập trung vào các framework như Express.js, Vue.js, và React.js.',
            period: 'đến đầu năm 2022',
          },
        ],
        b: [
          {
            title: 'Thực tập tại công ty TNHH Briswell Vietnam',
            description:
              'Thực tập trong 2 tháng, được đào tạo trong tháng đầu và làm bài kiểm tra trong tháng cuối.',
            period: 'tháng 3 năm 2022',
          },
          {
            title:
              'Được nhận việc chính thức tại công ty TNHH Briswell Vietnam',
            description:
              'Được thăng chức vào tháng 11 năm 2022 (vai trò middle developer) và tháng 11 năm 2023 (vai trò senior developer).',
            period: 'tháng 5 năm 2022',
          },
          {
            title: 'Tìm kiếm cơ hội việc làm mới',
            description:
              'Xin nghỉ việc để tìm kiếm môi trường làm việc mới để phát triển sự nghiệp.',
            period: 'giữa tháng 7 năm 2024 đến hiện tại',
          },
        ],
      },
    },
    generalSkill: {
      technical: {
        title: 'Kiến thức kỹ thuật',
        description:
          'Tôi có kiến thức vững vàng về các công nghệ và framework phổ biến trong phát triển web, cũng như các kỹ thuật liên quan đến cloud services và dev ops.',
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
        title: 'Kỹ năng mềm',
        description:
          'Tôi cũng trau dồi những kỹ năng mềm quan trọng trong công việc để tạo ra một môi trường làm việc tích cực và hiệu quả. Đồng thời, tôi đảm bảo rằng công việc được hoàn thành đúng theo kế hoạch.',
        items: {
          teamwork: {
            label: 'Làm việc nhóm',
          },
          timeManagement: {
            label: 'Quản lý thời gian',
          },
          communication: {
            label: 'Giao tiếp',
          },
          creativity: {
            label: 'Sáng tạo',
          },
        },
      },
    },
    projects: {
      title: 'Dự án',
      description: `Với vai trò web developer. Nên tôi có kinh nghiệm với tất cả các giai đoạn của chu trình phát triển cho các dự án web động.`,
    },
    testimonial: {
      title: 'Đánh giá',
      description: 'Mọi người nói gì về tôi',
      people: [
        {
          name: 'Nguyễn Đăng Khoa',
          title: 'Quality control',
          comment: '',
        },
        {
          name: 'Nguyễn Huỳnh San',
          title: 'Quality control',
          comment: '',
        },
        {
          name: 'Lê Duy Tiến',
          title: 'Full stack Developer',
          comment: '',
        },
      ],
    },
    contact: {
      title: 'Hãy liên lạc',
      description: 'Vui lòng liên hệ với tôi bằng cách sử dụng mẫu dưới đây.',
      action: '$t(common.labels.send)',
      sendMore: 'Gửi thêm',
    },
  },
};
