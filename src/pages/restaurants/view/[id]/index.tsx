import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { getRestaurantById } from 'apiSdk/restaurants';
import { Error } from 'components/error';
import { RestaurantInterface } from 'interfaces/restaurant';
import useSWR from 'swr';
import { useRouter } from 'next/router';

function RestaurantViewPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading } = useSWR<RestaurantInterface>(
    () => `/restaurants/${id}`,
    () =>
      getRestaurantById(id, {
        relations: ['user', 'menu_category', 'order', 'reservation', 'staff'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Restaurant Details
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              Name: {data?.name}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Owner: <Link href={`/users/view/${data?.user?.id}`}>{data?.user?.roq_user_id}</Link>
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Menu Category
            </Text>
            <Link href={`/menu-categories/create?restaurant_id=${data?.id}`}>
              <Button colorScheme="blue" mr="4">
                Create
              </Button>
            </Link>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Edit</Th>
                    <Th>View</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.menu_category?.map((record) => (
                    <Tr key={record.id}>
                      <Td>{record.id}</Td>
                      <Td>{record.name}</Td>
                      <Td>
                        <Link href={`/menu-categories/edit/${record.id}`}>Edit</Link>
                      </Td>
                      <Td>
                        <Link href={`/menu-categories/view/${record.id}`}>View</Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <Text fontSize="md" fontWeight="bold">
              Order
            </Text>
            <Link href={`/orders/create?restaurant_id=${data?.id}`}>
              <Button colorScheme="blue" mr="4">
                Create
              </Button>
            </Link>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Order ID</Th>
                    <Th>Order Time</Th>
                    <Th>Total Price</Th>
                    <Th>Discount</Th>
                    <Th>Payment Status</Th>
                    <Th>Edit</Th>
                    <Th>View</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.order?.map((record) => (
                    <Tr key={record.id}>
                      <Td>{record.id}</Td>
                      <Td>{record.order_time as unknown as string}</Td>
                      <Td>{record.total_price}</Td>
                      <Td>{record.discount}</Td>
                      <Td>{record.payment_status}</Td>
                      <Td>
                        <Link href={`/orders/edit/${record.id}`}>Edit</Link>
                      </Td>
                      <Td>
                        <Link href={`/orders/view/${record.id}`}>View</Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <Text fontSize="md" fontWeight="bold">
              Reservation
            </Text>
            <Link href={`/reservations/create?restaurant_id=${data?.id}`}>
              <Button colorScheme="blue" mr="4">
                Create
              </Button>
            </Link>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Reservation ID</Th>
                    <Th>Reservation Time</Th>
                    <Th>Table Preferences</Th>
                    <Th>Edit</Th>
                    <Th>View</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.reservation?.map((record) => (
                    <Tr key={record.id}>
                      <Td>{record.id}</Td>
                      <Td>{record.reservation_time as unknown as string}</Td>
                      <Td>{record.table_preferences}</Td>
                      <Td>
                        <Link href={`/reservations/edit/${record.id}`}>Edit</Link>
                      </Td>
                      <Td>
                        <Link href={`/reservations/view/${record.id}`}>View</Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <Text fontSize="md" fontWeight="bold">
              Staff
            </Text>
            <Link href={`/staff/create?restaurant_id=${data?.id}`}>
              <Button colorScheme="blue" mr="4">
                Create
              </Button>
            </Link>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Role</Th>
                    <Th>Edit</Th>
                    <Th>View</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.staff?.map((record) => (
                    <Tr key={record.id}>
                      <Td>{record.id}</Td>
                      <Td>{record.role}</Td>
                      <Td>
                        <Link href={`/staff/edit/${record.id}`}>Edit</Link>
                      </Td>
                      <Td>
                        <Link href={`/staff/view/${record.id}`}>View</Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default RestaurantViewPage;
