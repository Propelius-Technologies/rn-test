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
import { notifyMessage } from 'src/utils/notifyMessage';

interface MakeAPurchaseScreenForm {
  amount: string;
}

const MakeAPurchaseScreenSchema = Yup.object().shape({
  amount: Yup.string().required('Amount is required'),
});

const MakeAPurchaseScreenScreen = ({ route }) => {
  const { childId, cardId } = route.params;

  const styles = useStyles();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const children = useSelector(selectChildren);
  const cards = children[childId].cards;
  const currentCard = cards[cardId];

  const currentUser = useSelector(selectUser);

  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik<MakeAPurchaseScreenForm>({
      validationSchema: MakeAPurchaseScreenSchema,
      initialValues: {
        amount: '',
      },
      onSubmit: async data => {
        try {
          if (parseFloat(data.amount) > parseFloat(currentCard.monthlyLimit)) {
            notifyMessage("Can't make a purchase. Inefficient balance");
            return;
          }

          const newMonthlyLimit =
            parseFloat(currentCard.monthlyLimit) - parseFloat(data.amount);

          const updatedCard = {
            ...currentCard,
            monthlyLimit: newMonthlyLimit,
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
          label="Amount"
          value={values.amount}
          onChangeText={handleChange('amount')}
          onBlur={handleBlur('amount')}
          errorMessage={errors.amount && touched.amount ? errors.amount : null}
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

export default MakeAPurchaseScreenScreen;
