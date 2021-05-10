import * as React from 'react';
import { Text, View } from 'react-native';
import Hello from '../components/Hello';
import { makeStyles } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const Home: React.FC = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Icon name="home" size={24} />
      <Hello />
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.colors?.white,
    flex: 1,
  },
  text: {
    color: theme.colors?.primary,
  },
}));

export default Home;
