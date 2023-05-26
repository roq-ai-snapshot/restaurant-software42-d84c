import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getMenuItems } from 'apiSdk/menu-items';
import { MenuItemInterface } from 'interfaces/menu-item';
import { Error } from 'components/error';

function MenuItemListPage() {
  const { data, error, isLoading } = useSWR<MenuItemInterface[]>(
    () => '/menu-items',
    () =>
      getMenuItems({
        relations: ['menu_category'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Menu Item
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Link href={`/menu-items/create`}>
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
                  <Th>Name</Th>
                  <Th>Description</Th>
                  <Th>Price</Th>
                  <Th>Category</Th>

                  <Th>Edit</Th>
                  <Th>View</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.name}</Td>
                    <Td>{record.description}</Td>
                    <Td>{record.price}</Td>
                    <Td>{record.menu_category?.name}</Td>

                    <Td>
                      <Link href={`/menu-items/edit/${record.id}`}>Edit</Link>
                    </Td>
                    <Td>
                      <Link href={`/menu-items/view/${record.id}`}>View</Link>
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
export default MenuItemListPage;
