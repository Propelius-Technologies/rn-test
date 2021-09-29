import React from 'react';
import { ScrollView, View } from 'react-native';
import { FAB, Icon, makeStyles, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectChildren } from 'src/redux/users/users.selectors';

const CardsScreen = ({ route }) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { id } = route.params;
  const children = useSelector(selectChildren);
  const cards = children[id].cards;

  return (
    <View style={styles.container}>
      <FAB
        title="Add Card"
        color="#20C997"
        icon={<Icon name="add" color="white" />}
        style={styles.fab}
        onPress={() => navigation.navigate('AddCard', { id })}
      />
      <ScrollView>
        {Object.values(cards).map(card => (
          <View style={styles.card} key={card.id}>
            <View>
              <Text style={styles.cardNumber}>{card.number}</Text>
              <Text style={styles.cardExpiry}>{card.expirationDate}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing.s,
    position: 'relative',
    flex: 1,
  },
  fab: { position: 'absolute', bottom: 50, right: 20, zIndex: 99 },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadii.m,
    padding: theme.spacing.m,
    marginVertical: theme.spacing.s,
  },
  cardExpiry: {},
  cardNumber: {},
}));

export default CardsScreen;
