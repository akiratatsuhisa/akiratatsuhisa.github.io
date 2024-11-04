import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Translation, useTranslation } from 'react-i18next';

import { levels } from '@/constants';

interface ISkillProps {
  translation: string;
  level: number;
}

const Skills: FC<ISkillProps & { parentTranslation: string }> = ({
  translation,
  level,
  parentTranslation,
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: `pages.resume.sections.generalSkill.${parentTranslation}.items`,
  });

  return (
    <Box>
      <Text as="h3" fontSize="sm">
        {t(`${translation}.label`)}
      </Text>

      <Flex
        overflow="hidden"
        gap="1px"
        rounded="full"
        bgColor="gray.500"
        border="1px solid"
        borderColor="gray.500"
      >
        {levels.map(({ translation, value, color }) => (
          <Tooltip
            key={parentTranslation + translation}
            label={
              <Translation>
                {(t) => <>{t(`common.skillLevels.${translation}`)}</>}
              </Translation>
            }
          >
            <Box
              bgColor={value <= level ? color : 'gray.200'}
              flex="1 1 auto"
              height="10px"
            />
          </Tooltip>
        ))}
      </Flex>
    </Box>
  );
};

interface ICategoryProps {
  translation: string;
  skills: Array<ISkillProps>;
}

const categories: Array<ICategoryProps> = [
  {
    translation: 'technical',
    skills: [
      { translation: 'vue', level: 5 },
      { translation: 'react', level: 4 },
      { translation: 'backEnd', level: 4 },
      { translation: 'cloud', level: 2 },
      { translation: 'database', level: 1 },
      { translation: 'frontEnd', level: 4 },
    ],
  },
  {
    translation: 'soft',
    skills: [
      { translation: 'teamwork', level: 3 },
      { translation: 'timeManagement', level: 4 },
      { translation: 'communication', level: 3 },
      { translation: 'creativity', level: 2 },
    ],
  },
];

const Category: FC<ICategoryProps> = ({ translation, skills }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.resume.sections.generalSkill',
  });

  return (
    <Grid
      gap="4"
      templateColumns={{
        base: 'repeat(1, minmax(0, 1fr))',
        md: 'repeat(2, minmax(0, 1fr))',
      }}
    >
      <Flex gap="3" flexDirection="column">
        <Heading as="h2">{t(`${translation}.title`)}</Heading>
        <Text fontSize="lg">{t(`${translation}.description`)}</Text>
      </Flex>

      <Flex gap="2" flexDirection="column">
        {skills.map((skill) => (
          <Skills
            key={skill.translation}
            parentTranslation={translation}
            {...skill}
          />
        ))}
      </Flex>
    </Grid>
  );
};

export const GeneralSkill: FC = () => {
  return (
    <Container maxWidth="container.xl" paddingY={{ base: '6', lg: '12' }}>
      <Flex rowGap="8" columnGap="4" flexDirection="column">
        {categories.map((category) => (
          <Category key={category.translation} {...category} />
        ))}
      </Flex>
    </Container>
  );
};
