import React from 'react';
import { View } from 'react-native';
import { Button, Input, makeStyles } from 'react-native-elements';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import { setStoreValue } from 'src/utils/asyncStorage';
import { setUser } from 'src/redux/users/users.slice';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { selectChildren, selectUser } from 'src/redux/users/users.selectors';

interface UpdateCardForm {
  monthlyLimit: string;
}

const UpdateCardSchema = Yup.object().shape({
  monthlyLimit: Yup.string().required('Monthly Limit is required'),
});

const UpdateCardScreen = ({ route }) => {
  const { childId, cardId } = route.params;

  const styles = useStyles();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const children = useSelector(selectChildren);
  const cards = children[childId].cards;
  const currentCard = cards[cardId];

  const currentUser = useSelector(selectUser);

  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik<UpdateCardForm>({
      validationSchema: UpdateCardSchema,
      initialValues: {
        monthlyLimit: currentCard.monthlyLimit,
      },
      onSubmit: async data => {
        try {
          const updatedCard = {
            ...currentCard,
            monthlyLimit: data.monthlyLimit,
          };

          const updatedChildren = {
            ...children,
            [childId]: {
              ...children[childId],
              cards: { ...cards, [cardId]: updatedCard },
            },
          };
          const updatedUser = {
            ...currentUser,
            children: updatedChildren,
          };

          dispatch(setUser(updatedUser));
          await setStoreValue(currentUser.email, updatedUser);
          navigation.goBack();
        } catch (e) {
          console.log(e);
        }
      },
    });

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <Input
          label="Monthly Limit"
          value={values.monthlyLimit}
          onChangeText={handleChange('monthlyLimit')}
          onBlur={handleBlur('monthlyLimit')}
          errorMessage={
            errors.monthlyLimit && touched.monthlyLimit
              ? errors.monthlyLimit
              : null
          }
        />
      </View>
      <Button title="Update Card" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing.m,
    flex: 1,
  },
}));

export default UpdateCardScreen;
