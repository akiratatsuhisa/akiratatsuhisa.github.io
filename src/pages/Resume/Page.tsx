import '@/pages/Resume/style.css';

import { Box, SpaceProps, useColorModeValue } from '@chakra-ui/react';
import { FC, useEffect } from 'react';

import { resumePageHashs } from '@/pages/Resume/constants';

import { Sections } from './components';

const sectionProps: {
  className: string;
  marginTop: SpaceProps['marginTop'];
  marginBottom: SpaceProps['marginBottom'];
} = {
  className: 'section',
  marginTop: { base: '6', lg: '12' },
  marginBottom: { base: '6', lg: '12' },
};

export const Page: FC = () => {
  useEffect(() => {
    document.querySelector('html')!.classList.add('scroller');
    document.querySelector('footer')!.classList.add('section');

    return () => {
      document.querySelector('html')!.classList.remove('scroller');
      document.querySelector('footer')!.classList.remove('section');
    };
  }, []);

  const grayBgColor = useColorModeValue('gray.50', 'gray.700');
  const brandBgColor = useColorModeValue('brand.200', 'brand.600');

  return (
    <Box as="article">
      <Box
        id={resumePageHashs.home}
        as="section"
        {...sectionProps}
        marginTop="0"
      >
        <Sections.Home />
      </Box>

      <Box
        id={resumePageHashs.services}
        as="section"
        bgColor={grayBgColor}
        {...sectionProps}
      >
        <Sections.Services />
      </Box>

      <Box id={resumePageHashs.about} as="section" {...sectionProps}>
        <Sections.About />
      </Box>

      <Box id={resumePageHashs.experience} as="section" {...sectionProps}>
        <Sections.Experience />
      </Box>

      <Box
        id={resumePageHashs.skills}
        as="section"
        bgColor={grayBgColor}
        {...sectionProps}
      >
        <Sections.GeneralSkill />
      </Box>

      <Box id={resumePageHashs.projects} as="section" {...sectionProps}>
        <Sections.Projects />
      </Box>

      <Box
        id={resumePageHashs.testimonial}
        as="section"
        bgColor={brandBgColor}
        {...sectionProps}
        marginBottom="0"
      >
        <Sections.Testimonial />
      </Box>

      <Box
        id={resumePageHashs.contact}
        as="section"
        bgColor={grayBgColor}
        {...sectionProps}
        marginTop="0"
      >
        <Sections.Contact />
      </Box>
    </Box>
  );
};
