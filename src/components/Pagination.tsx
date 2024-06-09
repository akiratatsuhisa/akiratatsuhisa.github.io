import { Button, HStack, Icon, IconButton } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

export const Pagination: FC<{
  isLoading: boolean;
  page: number;
  limit: number;
  total: number;
  size?: number;
  onPageChange: (value: number) => void;
}> = ({ isLoading, page, limit, total, size = 2, onPageChange }) => {
  const maxPage = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const pages = useMemo(() => {
    const pages: Array<{ value: number; isCurrent: boolean }> = [];

    for (
      let currentPage = page - size;
      currentPage <= page + size;
      currentPage++
    ) {
      if (currentPage < 1 || currentPage > maxPage) {
        continue;
      }
      pages.push({ value: currentPage, isCurrent: currentPage === page });
    }

    return (
      <>
        {pages.map((page) => (
          <Button
            key={page.value}
            width="3.5"
            isActive={page.isCurrent}
            isDisabled={isLoading}
            cursor={page.isCurrent ? 'not-allowed' : 'auto'}
            onClick={() => !page.isCurrent && onPageChange(page.value)}
          >
            {page.value}
          </Button>
        ))}
      </>
    );
  }, [isLoading, page, maxPage, size]);

  const isFirstClickable = page > 1;
  const isPrevClickable = page > 1;
  const isNextClickable = page < maxPage;
  const isLastClickable = page < maxPage;

  return (
    <HStack gap="1" justifyContent="center" wrap="wrap">
      <HStack gap="1">
        <IconButton
          icon={<Icon as={MdKeyboardDoubleArrowLeft} />}
          aria-label=""
          isDisabled={isLoading || !isFirstClickable}
          onClick={() => onPageChange(1)}
        />

        <IconButton
          icon={<Icon as={MdKeyboardArrowLeft} />}
          aria-label=""
          isDisabled={isLoading || !isPrevClickable}
          onClick={() => onPageChange(page - 1)}
        />
      </HStack>

      {maxPage && (
        <HStack gap="1" wrap="wrap">
          {pages}
        </HStack>
      )}

      <HStack gap="1">
        <IconButton
          icon={<Icon as={MdKeyboardArrowRight} />}
          aria-label=""
          isDisabled={isLoading || !isNextClickable}
          onClick={() => onPageChange(page + 1)}
        />

        <IconButton
          icon={<Icon as={MdKeyboardDoubleArrowRight} />}
          aria-label=""
          isDisabled={isLoading || !isLastClickable}
          onClick={() => onPageChange(maxPage)}
        />
      </HStack>
    </HStack>
  );
};
