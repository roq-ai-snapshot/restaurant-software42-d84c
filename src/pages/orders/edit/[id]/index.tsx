import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getOrderById, updateOrderById } from 'apiSdk/orders';
import { Error } from 'components/error';
import { orderValidationSchema } from 'validationSchema/orders';
import { OrderInterface } from 'interfaces/order';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';

function OrderEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<OrderInterface>(
    () => `/orders/${id}`,
    () => getOrderById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: OrderInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateOrderById(id, values);
      mutate(updated);
      resetForm();
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<OrderInterface>({
    initialValues: data,
    validationSchema: orderValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Order
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="order_time" mb="4">
              <FormLabel>Order Time</FormLabel>
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.order_time}
                onChange={(value: Date) => formik.setFieldValue('order_time', value)}
              />
            </FormControl>
            <FormControl id="total_price" mb="4" isInvalid={!!formik.errors?.total_price}>
              <FormLabel>Total Price</FormLabel>
              <NumberInput
                name="total_price"
                value={formik.values?.total_price}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('total_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.total_price && <FormErrorMessage>{formik.errors?.total_price}</FormErrorMessage>}
            </FormControl>
            <FormControl id="discount" mb="4" isInvalid={!!formik.errors?.discount}>
              <FormLabel>Discount</FormLabel>
              <NumberInput
                name="discount"
                value={formik.values?.discount}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('discount', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.discount && <FormErrorMessage>{formik.errors?.discount}</FormErrorMessage>}
            </FormControl>
            <FormControl
              id="payment_status"
              display="flex"
              alignItems="center"
              mb="4"
              isInvalid={!!formik.errors?.payment_status}
            >
              <FormLabel htmlFor="switch-payment_status">Payment Status</FormLabel>
              <Switch
                id="switch-payment_status"
                name="payment_status"
                onChange={formik.handleChange}
                value={formik.values?.payment_status ? 1 : 0}
              />
              {formik.errors?.payment_status && <FormErrorMessage>{formik.errors?.payment_status}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'customer_id'}
              label={'Customer'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <AsyncSelect<RestaurantInterface>
              formik={formik}
              name={'restaurant_id'}
              label={'Restaurant'}
              placeholder={'Select Restaurant'}
              fetcher={getRestaurants}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'waiter_id'}
              label={'Waiter'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default OrderEditPage;
