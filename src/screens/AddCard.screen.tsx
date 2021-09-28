import React from 'react';
import { View } from 'react-native';
import { Button, Input, makeStyles } from 'react-native-elements';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

interface AddCardScreenProps {}

interface AddCardForm {
  type: string;
  number: number;
  securityCode: number;
  expirationDate: string;
  monthlyLimit: number;
}

const AddCardScreen: React.FC<AddCardScreenProps> = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { values, errors, handleChange, handleBlur, touched } =
    useFormik<AddCardForm>({
      initialValues: {
        type: '',
        monthlyLimit: null,
        expirationDate: '',
        number: null,
        securityCode: null,
      },
      onSubmit: () => {},
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
        />
      </View>
      <Button title="Add Card" onPress={() => navigation.goBack()} />
    </KeyboardAwareScrollView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing.m,
  },
}));

export default AddCardScreen;
