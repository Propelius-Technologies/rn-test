import React from 'react';
import { View } from 'react-native';
import { Button, Input, makeStyles } from 'react-native-elements';
import { useFormik } from 'formik';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import { setStoreValue } from 'src/utils/asyncStorage';
import uuid from 'react-native-uuid';
import { setUser } from 'src/redux/users/users.slice';
import { User } from 'src/types/users.types';
import { useAppDispatch } from 'src/hooks/useAppDispatch';

interface RegisterScreenProps {}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().min(4).required('Password is required'),
});

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik<RegisterForm>({
      validationSchema: RegisterSchema,
      initialValues: {
        name: '',
        email: '',
        password: '',
      },
      onSubmit: async data => {
        try {
          const user: User = { ...data, id: uuid.v4() as string, children: [] };
          await setStoreValue(data.email, user);
          dispatch(setUser(user));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    });

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <Input
          label="Name"
          value={values.name}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          errorMessage={errors.name && touched.name ? errors.name : null}
        />
        <Input
          label="Email"
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          errorMessage={errors.email && touched.email ? errors.email : null}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <Input
          label="Password"
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          errorMessage={
            errors.password && touched.password ? errors.password : null
          }
          secureTextEntry
        />
      </View>
      <Button title="Register" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing.m,
    flex: 1,
  },
}));

export default RegisterScreen;
