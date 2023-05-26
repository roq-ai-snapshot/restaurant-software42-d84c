import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getMenuCategories } from 'apiSdk/menu-categories';
import { MenuCategoryInterface } from 'interfaces/menu-category';
import { Error } from 'components/error';

function MenuCategoryListPage() {
  const { data, error, isLoading } = useSWR<MenuCategoryInterface[]>(
    () => '/menu-categories',
    () =>
      getMenuCategories({
        relations: ['restaurant'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Menu Category
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Link href={`/menu-categories/create`}>
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
                  <Th>Name</Th>
                  <Th>Restaurant</Th>

                  <Th>Edit</Th>
                  <Th>View</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.name}</Td>
                    <Td>{record.restaurant?.name}</Td>

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
        )}
      </Box>
    </AppLayout>
  );
}
export default MenuCategoryListPage;
