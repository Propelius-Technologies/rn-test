import React from 'react';
import { View } from 'react-native';
import { Button, Input, makeStyles } from 'react-native-elements';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Card } from 'src/types/users.types';
import uuid from 'react-native-uuid';
import { setUser } from 'src/redux/users/users.slice';
import { setStoreValue } from 'src/utils/asyncStorage';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/redux/users/users.selectors';
import { useAppDispatch } from 'src/hooks/useAppDispatch';

interface AddCardForm {
  type: string;
  number: string;
  securityCode: string;
  expirationDate: string;
  monthlyLimit: string;
}

const AddCardSchema = Yup.object().shape({
  type: Yup.string().required('Type is required'),
  number: Yup.string().required('Card number is required'),
  securityCode: Yup.string().required('Security code is required'),
  expirationDate: Yup.string().required('Expiration date is required'),
  monthlyLimit: Yup.string().required('Monthly Limit is required'),
});

const AddCardScreen = ({ route }) => {
  const styles = useStyles();
  const { id } = route.params;
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);
  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik<AddCardForm>({
      validationSchema: AddCardSchema,
      initialValues: {
        type: '',
        monthlyLimit: '',
        expirationDate: '',
        number: '',
        securityCode: '',
      },
      onSubmit: async data => {
        const cardId = uuid.v4() as string;
        const children = currentUser.children[id];
        const card: Card = { ...data, id: cardId };
        const updatedChildren = {
          ...currentUser.children,
          [id]: { ...children, cards: { ...children.cards, [cardId]: card } },
        };
        const updatedUser = {
          ...currentUser,
          children: updatedChildren,
        };

        dispatch(setUser(updatedUser));
        await setStoreValue(currentUser.email, updatedUser);
        navigation.goBack();
      },
    });

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <Input
          label="Type"
          errorMessage={errors.type && touched.type ? errors.type : null}
          onChangeText={handleChange('type')}
          onBlur={handleBlur('type')}
          value={values.type}
        />
        <Input
          label="Number"
          errorMessage={errors.number && touched.number ? errors.number : null}
          onChangeText={handleChange('number')}
          onBlur={handleBlur('number')}
          value={values.number?.toString()}
          keyboardType="number-pad"
        />
        <Input
          label="Security Code"
          errorMessage={
            errors.securityCode && touched.securityCode
              ? errors.securityCode
              : null
          }
          onChangeText={handleChange('securityCode')}
          onBlur={handleBlur('securityCode')}
          value={values.securityCode?.toString()}
          keyboardType="number-pad"
          secureTextEntry
        />
        <Input
          label="Expiration Date"
          errorMessage={
            errors.expirationDate && touched.expirationDate
              ? errors.expirationDate
              : null
          }
          onChangeText={handleChange('expirationDate')}
          onBlur={handleBlur('expirationDate')}
          value={values.expirationDate}
        />
        <Input
          label="Monthly Limit"
          errorMessage={
            errors.monthlyLimit && touched.monthlyLimit
              ? errors.monthlyLimit
              : null
          }
          onChangeText={handleChange('monthlyLimit')}
          onBlur={handleBlur('monthlyLimit')}
          value={values.monthlyLimit?.toString()}
          keyboardType="number-pad"
        />
      </View>
      <Button title="Add Card" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing.m,
  },
}));

export default AddCardScreen;
