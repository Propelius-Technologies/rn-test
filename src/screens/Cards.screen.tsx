import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, FAB, Icon, makeStyles, Text } from 'react-native-elements';
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
            <View style={styles.cardRow}>
              <Text style={styles.cardNumber}>{card.number}</Text>
              <Text style={styles.cardExpiry}>
                {card.expirationDate.toDateString()}
              </Text>
            </View>
            <View style={[styles.cardRow]}>
              <Text>Card Type: {card.type}</Text>
              <Text>Monthly Limit: ${card.monthlyLimit}</Text>
            </View>
            <View style={[styles.cardRow, { marginTop: 10 }]}>
              <Button
                title="Make a Purchase"
                containerStyle={{
                  flex: 1,
                  marginRight: 4,
                }}
                buttonStyle={{ backgroundColor: 'skyblue' }}
                onPress={async () => {
                  navigation.navigate('MakeAPurchase', {
                    childId: id,
                    cardId: card.id,
                  });
                }}
              />
              <Button
                title="Update Limit"
                onPress={() =>
                  navigation.navigate('UpdateCard', {
                    childId: id,
                    cardId: card.id,
                  })
                }
                containerStyle={{ flex: 1, marginLeft: 4 }}
              />
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
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardExpiry: {},
  cardNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },
}));

export default CardsScreen;
