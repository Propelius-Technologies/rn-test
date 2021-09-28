import React from 'react';
import { View } from 'react-native';
import { Button, Input, makeStyles } from 'react-native-elements';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface AddChildScreenProps {}

interface AddChildForm {
  name: string;
  age: string;
}

const AddChildScreen: React.FC<AddChildScreenProps> = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { values, errors, handleChange, handleBlur, touched } =
    useFormik<AddChildForm>({
      initialValues: {
        name: '',
        age: '',
      },
      onSubmit: () => {},
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
          label="Age"
          value={values.age}
          onChangeText={handleChange('age')}
          onBlur={handleBlur('age')}
          errorMessage={errors.age && touched.age ? errors.age : null}
        />
      </View>
      <Button title="Add Child" onPress={() => navigation.goBack()} />
    </KeyboardAwareScrollView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing.m,
    flex: 1,
  },
}));

export default AddChildScreen;
