import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { getReservationById } from 'apiSdk/reservations';
import { Error } from 'components/error';
import { ReservationInterface } from 'interfaces/reservation';
import useSWR from 'swr';
import { useRouter } from 'next/router';

function ReservationViewPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading } = useSWR<ReservationInterface>(
    () => `/reservations/${id}`,
    () =>
      getReservationById(id, {
        relations: ['user', 'restaurant'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Reservation Details
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              Reservation ID: {data?.id}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Reservation Time: {data?.reservation_time as unknown as string}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Table Preferences: {data?.table_preferences}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Customer: <Link href={`/users/view/${data?.user?.id}`}>{data?.user?.roq_user_id}</Link>
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

export default ReservationViewPage;
