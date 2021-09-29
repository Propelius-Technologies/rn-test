import React from 'react';
import { View, ViewStyle } from 'react-native';
import { makeStyles, Text, useTheme } from 'react-native-elements';
import DateField from 'react-native-datefield';
import { FormikErrors } from 'formik';

interface CustomDatePickerProps {
  value: Date;
  handleChange: (date: Date) => void;
  containerStyle?: ViewStyle;
  touched?: boolean;
  error?: boolean;
  errorMessage?: string | FormikErrors<Date>;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  handleChange,
  containerStyle,
  error,
  touched,
  errorMessage,
}) => {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>Expiry Date</Text>
      <DateField
        labelDate="DD"
        labelMonth="MM"
        labelYear="YYYY"
        styleInput={styles.dateField}
        defaultValue={value}
        onSubmit={(value: Date) => {
          handleChange(value);
        }}
        placeholderTextColor={theme.colors.textSecondary}
        handleErrors={() => {
          console.log('errors');
        }}
      />
      {touched && error && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing.m,
  },
  dateField: {
    borderWidth: 1,
    width: '30%',
    borderRadius: theme.borderRadii.s,
    marginTop: theme.spacing.m,
    borderColor: theme.colors.lightgrey,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s + 4,
    color: theme.colors.textPrimary,
    textAlign: 'left',
  },
  label: {
    color: theme.colors.grey2,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: theme.spacing.s,
  },
  dateText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  error: {
    marginLeft: 4,
    marginTop: 6,
    fontSize: 12,
    color: theme.colors.error,
  },
  errorField: { borderColor: theme.colors.error },
}));

export default CustomDatePicker;
