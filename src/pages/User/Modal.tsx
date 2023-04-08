import { CloseIcon } from '@chakra-ui/icons';
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

  if (isLoading) {
    return <ModalLoading />;
  }

  if (error || !data) {
    return <div>Error...</div>;
  }

  return (
    <>
      <ModalContent>
        <ModalHeader>
          <Flex flex="1" gap="4" alignItems="center">
            <Avatar name={data.nickname} src={data.picture} />

            <Box width="full">
              <Heading size="sm">{data.name}</Heading>
              <Text>{data.nickname}</Text>
            </Box>

            <IconButton
              icon={<BsThreeDotsVertical />}
              rounded="full"
              variant="ghost"
              aria-label={''}
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

        <ModalFooter>
          <Flex gap="2">
            <Button variant="ghost" onClick={() => onCloseModal()}>
              Close
            </Button>
            <Button
              onClick={() =>
                navigate(`/users/${params.nickname}`, { replace: true })
              }
            >
              Explore
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </>
  );
};
