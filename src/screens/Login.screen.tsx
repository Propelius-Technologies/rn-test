import React from 'react';
import { View } from 'react-native';
import { Button, Input, makeStyles } from 'react-native-elements';
import { useFormik } from 'formik';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import { getStoreValue } from 'src/utils/asyncStorage';
import { notifyMessage } from 'src/utils/notifyMessage';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setUser } from 'src/redux/users/users.slice';

interface LoginScreenProps {}

interface LoginForm {
  password: string;
  email: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().min(4).required('Password is required'),
});

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const styles = useStyles();
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik<LoginForm>({
      validationSchema: LoginSchema,
      initialValues: {
        password: '',
        email: '',
      },
      onSubmit: async data => {
        const user = await getStoreValue(data.email);

        if (!user) {
          notifyMessage('User does not exists');
          return;
        }

        if (user.password !== data.password) {
          notifyMessage('Invalid credentials');
          return;
        }

        dispatch(setUser(user));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          }),
        );
      },
    });

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
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
      <Button title="Login" onPress={handleSubmit} />
      <Button
        title="Don't have an account? Register"
        type="clear"
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
    </KeyboardAwareScrollView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing.m,
    flex: 1,
  },
}));

export default LoginScreen;
