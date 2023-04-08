export const parseLanguageToLanguageCode = (language?: string): string => {
  switch (language) {
    case 'ENGLISH':
      return 'en';
    case 'VIETNAMESE':
      return 'vi';
    case 'JAPANESE':
      return 'ja';
    default:
      throw new Error('Invalid to parse language to languageCode');
  }
};
