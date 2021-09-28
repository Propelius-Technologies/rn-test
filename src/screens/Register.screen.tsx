import React from 'react';
import { View } from 'react-native';
import { Button, Input, makeStyles } from 'react-native-elements';
import { useFormik } from 'formik';

interface RegisterScreenProps {}

interface RegisterForm {
  name: string;
  email: string;
}

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const styles = useStyles();

  const { values, errors, handleChange, handleBlur, touched } =
    useFormik<RegisterForm>({
      initialValues: {
        name: '',
        email: '',
      },
      onSubmit: () => {},
    });

  return (
    <View style={styles.container}>
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
        />
      </View>
      <Button title="Register" onPress={() => true} />
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing.m,
    flex: 1,
  },
}));

export default RegisterScreen;
