import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getOrders } from 'apiSdk/orders';
import { OrderInterface } from 'interfaces/order';
import { Error } from 'components/error';

function OrderListPage() {
  const { data, error, isLoading } = useSWR<OrderInterface[]>(
    () => '/orders',
    () =>
      getOrders({
        relations: ['user_order_customer_idTouser', 'restaurant', 'user_order_waiter_idTouser'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Order
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Link href={`/orders/create`}>
          <Button colorScheme="blue" mr="4">
            Create
          </Button>
        </Link>
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Order ID</Th>
                  <Th>Order Time</Th>
                  <Th>Total Price</Th>
                  <Th>Discount</Th>
                  <Th>Payment Status</Th>
                  <Th>Customer</Th>
                  <Th>Restaurant</Th>
                  <Th>Waiter</Th>

                  <Th>Edit</Th>
                  <Th>View</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.order_time as unknown as string}</Td>
                    <Td>{record.total_price}</Td>
                    <Td>{record.discount}</Td>
                    <Td>{record.payment_status}</Td>
                    <Td>{record.user_order_customer_idTouser?.roq_user_id}</Td>
                    <Td>{record.restaurant?.name}</Td>
                    <Td>{record.user_order_waiter_idTouser?.roq_user_id}</Td>

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
        )}
      </Box>
    </AppLayout>
  );
}
export default OrderListPage;
