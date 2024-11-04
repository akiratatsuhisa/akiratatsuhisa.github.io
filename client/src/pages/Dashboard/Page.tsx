import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  SpaceProps,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TypographyProps,
  useDisclosure,
} from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';
import { Translation, useTranslation } from 'react-i18next';
import { MdLocationPin, MdRefresh } from 'react-icons/md';

import { CommonAlertDialog } from '@/components/AlertDialog';
import { Pagination } from '@/components/Pagination';
import { commonAlertProps } from '@/constants';
import { useAxios } from '@/hooks';
import { IContactResponse } from '@/interfaces';
import { services } from '@/services';
import { formatDateTime } from '@/utils';

const tdProps: {
  paddingY: SpaceProps['paddingY'];
  paddingX: SpaceProps['paddingX'];
  whiteSpace: TypographyProps['whiteSpace'];
  wordBreak: TypographyProps['wordBreak'];
} = {
  paddingY: '2',
  paddingX: '3',
  whiteSpace: 'preserve-breaks',
  wordBreak: 'break-all',
};

const Record: FC<IContactResponse & { onReload: () => void }> = ({
  id,
  name,
  email,
  phone,
  message,
  ipAddress,
  createdAt,
  isCancelled,
  onReload,
}) => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'common' });

  const {
    isOpen: isOpenAlertCancellationDialog,
    onOpen: onOpenAlertCancellationDialog,
    onClose: onCloseAlertCancellationDialog,
  } = useDisclosure();

  const { isLoading, request: requestCancelContact } = useAxios(
    services.resume,
    'cancelContact',
  );

  return (
    <Tr>
      <Td {...tdProps}>{name}</Td>

      <Td {...tdProps}>{email}</Td>

      <Td {...tdProps}>{phone}</Td>

      <Td {...tdProps}>{message}</Td>

      <Td {...tdProps}>
        {formatDateTime(createdAt, {
          locales: i18n.language,
          dateStyle: 'medium',
          timeStyle: 'medium',
        })}
      </Td>

      <Td paddingY="2" paddingX="3">
        <HStack gap="1">
          <IconButton
            as="a"
            icon={<Icon as={MdLocationPin} />}
            aria-label=""
            colorScheme="teal"
            href={`https://whatismyipaddress.com/ip/${ipAddress}`}
            target="_blank"
          />

          {!isCancelled && (
            <Button
              colorScheme="red"
              isLoading={isLoading}
              onClick={onOpenAlertCancellationDialog}
            >
              {t('labels.cancellation')}
            </Button>
          )}
        </HStack>
      </Td>

      <CommonAlertDialog
        {...commonAlertProps.cancellation}
        isOpen={isOpenAlertCancellationDialog}
        onClose={onCloseAlertCancellationDialog}
        onSubmit={() => requestCancelContact(id).then(() => onReload())}
      />
    </Tr>
  );
};

export const SearchContacts: FC = () => {
  const [page, setPage] = useState(1);
  const take = 10;

  const {
    isLoading,
    data,
    request: requestSearchContact,
    headers,
  } = useAxios(services.resume, 'searchContact', {
    paramsOrData: [{ take, skip: 0 }],
  });

  const total = useMemo(() => Number(headers['x-total'] ?? 0), [headers]);

  const onPageChange = async (page: number) => {
    const skip = (page - 1) * 10;
    await requestSearchContact({ take, skip });
    setPage(page);
  };

  return (
    <Card flex="1 1 auto">
      <CardHeader padding="3">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Translation keyPrefix="pages.dashboard">
            {(t) => <Heading size="md">{t('contacts')}</Heading>}
          </Translation>

          <Translation keyPrefix="common.labels">
            {(t) => (
              <Button
                isLoading={isLoading}
                rightIcon={<Icon as={MdRefresh} />}
                onClick={() => onPageChange(1)}
              >
                {t('refresh')}
              </Button>
            )}
          </Translation>
        </Stack>
      </CardHeader>

      <CardBody padding="0">
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Translation keyPrefix="common.fields">
                {(t) => (
                  <Tr>
                    <Th minWidth="10rem" width="10rem">
                      {t('name')}
                    </Th>

                    <Th minWidth="14rem" width="14rem">
                      {t('emailAdress')}
                    </Th>

                    <Th minWidth="12rem" width="12rem">
                      {t('phoneNumber')}
                    </Th>

                    <Th minWidth="14rem">{t('message')}</Th>

                    <Th minWidth="12.5rem" width="12.5rem">
                      {t('dateTime')}
                    </Th>

                    <Th width="0"></Th>
                  </Tr>
                )}
              </Translation>
            </Thead>

            <Tbody>
              {(data?.length ?? 0) > 0 ? (
                data?.map((record) => (
                  <Record
                    key={record.id}
                    {...record}
                    onReload={() => onPageChange(page)}
                  />
                ))
              ) : (
                <Translation keyPrefix="common.labels">
                  {(t) => (
                    <Tr>
                      <Td colSpan={7} textAlign="center">
                        {t('noRecord')}
                      </Td>
                    </Tr>
                  )}
                </Translation>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>

      <CardFooter padding="3">
        <Pagination
          isLoading={isLoading}
          page={page}
          limit={10}
          total={total}
          onPageChange={onPageChange}
        />
      </CardFooter>
    </Card>
  );
};

export const Page: FC = () => {
  return (
    <Container maxWidth="container.xl" paddingBottom="4" height="full">
      <Grid
        gap="4"
        templateColumns={{
          base: 'repeat(1, minmax(0, 1fr))',
          sm: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(4, minmax(0, 1fr))',
        }}
      >
        <GridItem
          colSpan={{
            base: 1,
            sm: 2,
            md: 4,
          }}
        >
          <SearchContacts />
        </GridItem>
      </Grid>
    </Container>
  );
};
