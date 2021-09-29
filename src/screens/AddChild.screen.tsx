import React from 'react';
import { View } from 'react-native';
import { Button, Input, makeStyles } from 'react-native-elements';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { setStoreValue } from 'src/utils/asyncStorage';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/redux/users/users.selectors';
import uuid from 'react-native-uuid';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setUser } from 'src/redux/users/users.slice';
import { Child } from 'src/types/users.types';
import * as Yup from 'yup';

interface AddChildScreenProps {}

interface AddChildForm {
  name: string;
  age: string;
}

const AddChildSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.string().required('Age is required'),
});

const AddChildScreen: React.FC<AddChildScreenProps> = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);
  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik<AddChildForm>({
      validationSchema: AddChildSchema,
      initialValues: {
        name: '',
        age: '',
      },
      onSubmit: async data => {
        const id = uuid.v4() as string;
        const child: Child = { ...data, id, cards: {} };
        const updatedUser = {
          ...currentUser,
          children: { ...currentUser.children, [id]: child },
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
          keyboardType="number-pad"
        />
      </View>
      <Button title="Add Child" onPress={handleSubmit} />
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
