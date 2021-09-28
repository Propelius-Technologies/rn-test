import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, FAB, Icon, makeStyles } from 'react-native-elements';
import { Child } from 'src/types/users.types';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
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
    <View style={styles.container}>
      <FAB
        title="Add Child"
        color="#20C997"
        icon={<Icon name="add" color="white" />}
        style={styles.fab}
        onPress={() => navigation.navigate('AddChild')}
      />
      <ScrollView>
        {children.map(child => {
          return (
            <View style={styles.card} key={child.id}>
              <View style={styles.row}>
                <Text style={styles.childName}>{child.name}</Text>
                <Text>{child.age}</Text>
              </View>
              <Button
                title="Show Cards"
                onPress={() => navigation.navigate('Cards')}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    padding: theme.spacing.m,
    position: 'relative',
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
  fab: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    zIndex: 99,
  },
}));

export default Home;
