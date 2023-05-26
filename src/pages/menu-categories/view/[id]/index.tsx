import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { getMenuCategoryById } from 'apiSdk/menu-categories';
import { Error } from 'components/error';
import { MenuCategoryInterface } from 'interfaces/menu-category';
import useSWR from 'swr';
import { useRouter } from 'next/router';

function MenuCategoryViewPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading } = useSWR<MenuCategoryInterface>(
    () => `/menu-categories/${id}`,
    () =>
      getMenuCategoryById(id, {
        relations: ['restaurant'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Menu Category Details
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              Category ID: {data?.id}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Category Name: {data?.name}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Restaurant: <Link href={`/restaurants/view/${data?.restaurant?.id}`}>{data?.restaurant?.name}</Link>
            </Text>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default MenuCategoryViewPage;
