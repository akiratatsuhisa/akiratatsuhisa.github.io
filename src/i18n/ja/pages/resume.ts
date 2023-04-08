import { LocalePagesResume } from '@/i18n/type/pages/resume';

export const resume: LocalePagesResume = {
  header: {
    menu: {
      title: 'メニュー',
      home: 'トップ',
      services: 'サービス',
      about: '紹介',
      experience: '経験',
      skills: 'スキル',
      projects: 'プロジェクト',
      testimonial: 'テストィモニアル',
      contact: '連絡先',
    },
  },
  sections: {
    home: {
      title: '初めまして、明です。フルスタックのウェブ開発者です。',
      description: `魅力的なウェブサイトを作成することに深い情熱を持っています。`,
      action: 'もっと詳しく',
    },
    services: {
      title: '私の得意なこと',
      description:
        '製品とプロジェクトを注意深く開発し、各製品が最高の品質とパフォーマンスで構築されるようにしています。',
      items: {
        websiteDesign: {
          title: 'ウェブサイトデザイン',
          description:
            'マテリアルデザインに基づいた美しい洗練されたウェブサイトインターフェースを作成し、最高のユーザーエクスペリエンスを提供します。',
        },
        webDevelopment: {
          title: 'ウェブ開発',
          description:
            '強固なセキュリティとパフォーマンスを備えた高品質のウェブAPIアプリケーションを開発します。',
        },
        management: {
          title: 'マネジメント',
          description:
            'プロジェクト管理を精密かつ組織的に行い、プロジェクトがスケジュール通りに、かつ品質を保って完了するようにします。',
        },
        devOps: {
          title: 'Dev Ops',
          description:
            'システムインフラの展開とメンテナンスを行い、安定性を確保し、効果的なCI/CDシステムを構築します。',
        },
      },
    },
    about: {
      title: '私のことを少し',
      description:
        '私はĐặng Minh Đạtです。常にキャリアパスで新しい挑戦を求め、新しい技術技術を学び続けています。経験豊富な同僚と共に学び、スキルを開発することが好きです。',
      action: '履歴書をダウンロード',
      mainItems: {
        age: {
          label: '歳',
          content: '{{value}}',
        },
        location: {
          label: '場所',
          content: 'ベトナム、ホーチミン市ゴーバップ地区',
        },
        phone: {
          label: '電話',
          content: '+84 (079)-805-9927',
        },
        email: {
          label: 'Eメール',
          content: '{{value}}',
        },
      },
      subItems: {
        line1: {
          content:
            '信頼性の高い効率的なモバイルアプリケーションを構築するためにネイティブアプリ開発についてさらに学ぶ。',
        },
        line2: {
          content: '目標を達成するために管理スキルを開発する。',
        },
        line3: {
          content: '専門知識を高めるために新しいテクノロジを探求し適用する。',
        },
      },
    },
    experience: {
      title: '教育と経験',
      timeline: {
        a: [
          {
            title: 'HUTECH大学での学習',
            description: 'GPA 3.4/4、すべての主要科目を修了。',
            period: '2016年から2020年まで',
          },
          {
            title: '教育休止',
            description: '個人的な問題のため。',
            period: '2020年中頃',
          },
          {
            title: '自宅での自己学習とレビュー',
            description:
              '主にNode.jsに焦点を当て、Express.js、Vue.js、およびReact.jsなどのフレームワークに集中しています。',
            period: '2022年初頭まで',
          },
        ],
        b: [
          {
            title: '会社Bでのインターンシップ',
            description: 'フルスタックNode.js役割として2か月のインターンシップ',
            period: '2022年3月',
          },
          {
            title: '会社Bでの正式雇用',
            description:
              '2022年11月（ミドルデベロッパーとして）および2023年11月（シニアデベロッパーとして）に昇進',
            period: '2022年5月',
          },
          {
            title: '新しい機会を探しています',
            description: '新しい職場でのキャリアの発展と自己挑戦',
            period: '現在',
          },
        ],
      },
    },
    generalSkill: {
      technical: {
        title: '技術的スキル',
        description:
          'ウェブ開発の一般的な技術やフレームワーク、およびクラウドサービスやDev Opsに関連する技術について堅固な知識を持っています。',
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
        title: 'ソフトスキル',
        description:
          '効果的な作業環境を作り出すために職場で重要なソフトスキルを向上させます。同時に、タスクが計画どおりに完了することを確認します。',
        items: {
          teamwork: {
            label: 'チームワーク',
          },
          timeManagement: {
            label: '時間管理',
          },
          communication: {
            label: 'コミュニケーション',
          },
          creativity: {
            label: '創造性',
          },
        },
      },
    },
    projects: {
      title: 'プロジェクト',
      description:
        'ウェブ開発者として、動的なウェブプロジェクトの開発サイクルのすべての段階で経験があります。',
    },
    testimonial: {
      title: 'テストィモニアル',
      description: '皆の声。',
      people: [
        {
          name: 'グエン・ダン・コア',
          title: '品質管理',
          comment: '',
        },
        {
          name: 'グエン・フイン・サン',
          title: '品質管理',
          comment: '',
        },
        {
          name: 'レ・ズイ・ティエン',
          title: 'フルスタック開発者',
          comment: '',
        },
      ],
    },
    contact: {
      title: 'お問い合わせ',
      description: '以下のフォームを使用してお問い合わせください。',
      action: '$t(common.labels.send)',
      sendMore: 'さらに送信',
    },
  },
};
