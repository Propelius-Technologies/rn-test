import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, makeStyles } from 'react-native-elements';
import { Child } from 'src/types/users.types';

const Home: React.FC = () => {
  const styles = useStyles();
  const children: Child[] = [
    {
      id: 1,
      name: 'Arman',
      age: 20,
      cards: [],
    },
    {
      id: 2,
      name: 'Arman',
      age: 20,
      cards: [],
    },
    {
      id: 3,
      name: 'Arman',
      age: 20,
      cards: [],
    },
    {
      id: 4,
      name: 'Arman',
      age: 20,
      cards: [],
    },
  ];
  return (
    <ScrollView style={styles.container}>
      {children.map(child => {
        return (
          <View style={styles.card} key={child.id}>
            <View style={styles.row}>
              <Text style={styles.childName}>{child.name}</Text>
              <Text>{child.age}</Text>
            </View>
            <Button title="Show Cards" />
          </View>
        );
      })}
    </ScrollView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    padding: theme.spacing.m,
  },
  text: {
    color: theme.colors?.primary,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadii.m,
    padding: theme.spacing.s,
    marginVertical: theme.spacing.s,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  childName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}));

export default Home;
