import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';

import { ModalLoading } from '@/components/Loading';
import { useBackgroundNavigate } from '@/hooks';
import { useDetail } from '@/pages/User/useDetail';

export const Modal: FC = () => {
  const { onCloseModal } = useBackgroundNavigate();
  const navigate = useNavigate();
  const params = useParams();

  const { isLoading, data, error } = useDetail();

  if (isLoading || !data || error) {
    return <ModalLoading />;
  }

  return (
    <>
      <ModalContent>
        <ModalHeader>
          <Flex alignItems="center" flex="1" gap="4">
            <Avatar name={data.nickname} src={data.picture} />

            <Box width="full">
              <Heading size="sm">{data.name}</Heading>
              <Text>{data.nickname}</Text>
            </Box>

            <IconButton
              aria-label={''}
              icon={<BsThreeDotsVertical />}
              rounded="full"
              variant="ghost"
            />
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Text>
            {data.givenName}
            {data.familyName}
            {data.email}
          </Text>
        </ModalBody>

        <ModalFooter gap="2">
          <Button onClick={() => onCloseModal()} variant="ghost">
            Close
          </Button>
          <Button
            onClick={() =>
              navigate(`/users/${params.nickname}`, { replace: true })
            }
          >
            Explore
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};
