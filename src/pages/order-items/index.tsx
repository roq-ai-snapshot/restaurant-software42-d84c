import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getOrderItems } from 'apiSdk/order-items';
import { OrderItemInterface } from 'interfaces/order-item';
import { Error } from 'components/error';

function OrderItemListPage() {
  const { data, error, isLoading } = useSWR<OrderItemInterface[]>(
    () => '/order-items',
    () =>
      getOrderItems({
        relations: ['order', 'menu_item'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Order Item
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Link href={`/order-items/create`}>
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
                  <Th>ID</Th>
                  <Th>Quantity</Th>
                  <Th>Special Requests</Th>
                  <Th>Order</Th>
                  <Th>Menu Item</Th>

                  <Th>Edit</Th>
                  <Th>View</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.quantity}</Td>
                    <Td>{record.special_requests}</Td>
                    <Td>{record.order?.id}</Td>
                    <Td>{record.menu_item?.name}</Td>

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
        )}
      </Box>
    </AppLayout>
  );
}
export default OrderItemListPage;
