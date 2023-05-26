import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getUsers } from 'apiSdk/users';
import { UserInterface } from 'interfaces/user';
import { Error } from 'components/error';

function UserListPage() {
  const { data, error, isLoading } = useSWR<UserInterface[]>(
    () => '/users',
    () =>
      getUsers({
        relations: [,],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        User
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Link href={`/users/create`}>
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
                  <Th>Roq User ID</Th>
                  <Th>Tenant ID</Th>

                  <Th>Edit</Th>
                  <Th>View</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.roq_user_id}</Td>
                    <Td>{record.tenant_id}</Td>

                    <Td>
                      <Link href={`/users/edit/${record.id}`}>Edit</Link>
                    </Td>
                    <Td>
                      <Link href={`/users/view/${record.id}`}>View</Link>
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
export default UserListPage;
