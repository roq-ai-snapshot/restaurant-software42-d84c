import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getStaff } from 'apiSdk/staff';
import { StaffInterface } from 'interfaces/staff';
import { Error } from 'components/error';

function StaffListPage() {
  const { data, error, isLoading } = useSWR<StaffInterface[]>(
    () => '/staff',
    () =>
      getStaff({
        relations: ['user', 'restaurant'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Staff
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Link href={`/staff/create`}>
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
                  <Th>Role</Th>
                  <Th>User</Th>
                  <Th>Restaurant</Th>

                  <Th>Edit</Th>
                  <Th>View</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.role}</Td>
                    <Td>{record.user?.roq_user_id}</Td>
                    <Td>{record.restaurant?.name}</Td>

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
        )}
      </Box>
    </AppLayout>
  );
}
export default StaffListPage;
