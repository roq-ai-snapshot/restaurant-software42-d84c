import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { getOrderById } from 'apiSdk/orders';
import { Error } from 'components/error';
import { OrderInterface } from 'interfaces/order';
import useSWR from 'swr';
import { useRouter } from 'next/router';

function OrderViewPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading } = useSWR<OrderInterface>(
    () => `/orders/${id}`,
    () =>
      getOrderById(id, {
        relations: ['user_order_customer_idTouser', 'restaurant', 'user_order_waiter_idTouser', 'order_item'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Order Details
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              Order ID: {data?.id}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Order Time: {data?.order_time as unknown as string}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Total Price: {data?.total_price}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Discount: {data?.discount}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Payment Status: {data?.payment_status}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Customer:{' '}
              <Link href={`/users/view/${data?.user_order_customer_idTouser?.id}`}>
                {data?.user_order_customer_idTouser?.roq_user_id}
              </Link>
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Restaurant: <Link href={`/restaurants/view/${data?.restaurant?.id}`}>{data?.restaurant?.name}</Link>
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Waiter:{' '}
              <Link href={`/users/view/${data?.user_order_waiter_idTouser?.id}`}>
                {data?.user_order_waiter_idTouser?.roq_user_id}
              </Link>
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Order Item
            </Text>
            <Link href={`/order-items/create?order_id=${data?.id}`}>
              <Button colorScheme="blue" mr="4">
                Create
              </Button>
            </Link>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Quantity</Th>
                    <Th>Special Requests</Th>
                    <Th>Edit</Th>
                    <Th>View</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.order_item?.map((record) => (
                    <Tr key={record.id}>
                      <Td>{record.id}</Td>
                      <Td>{record.quantity}</Td>
                      <Td>{record.special_requests}</Td>
                      <Td>
                        <Link href={`/order-items/edit/${record.id}`}>Edit</Link>
                      </Td>
                      <Td>
                        <Link href={`/order-items/view/${record.id}`}>View</Link>
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

export default OrderViewPage;
