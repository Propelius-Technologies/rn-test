import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, FAB, Icon, makeStyles } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectChildren, selectUser } from 'src/redux/users/users.selectors';
import { setUser } from 'src/redux/users/users.slice';
import { setStoreValue } from 'src/utils/asyncStorage';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import omit from 'lodash/omit';

const Home: React.FC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);
  const children = useSelector(selectChildren);
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
        {Object.values(children).map(child => {
          return (
            <View style={styles.card} key={child.id}>
              <View style={styles.row}>
                <Text style={styles.childName}>{child.name}</Text>
                <Text>{child.age}</Text>
              </View>
              <View style={styles.buttons}>
                <Button
                  title="Delete"
                  containerStyle={{
                    flex: 1,
                    marginRight: 4,
                  }}
                  buttonStyle={{ backgroundColor: 'red' }}
                  onPress={async () => {
                    const updatedUser = {
                      ...currentUser,
                      children: omit(currentUser.children, [child.id]),
                    };

                    dispatch(setUser(updatedUser));
                    await setStoreValue(currentUser.email, updatedUser);
                  }}
                />
                <Button
                  title="Show Cards"
                  onPress={() => navigation.navigate('Cards', { id: child.id })}
                  containerStyle={{ flex: 1, marginLeft: 4 }}
                />
              </View>
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
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.s,
  },
}));

export default Home;
