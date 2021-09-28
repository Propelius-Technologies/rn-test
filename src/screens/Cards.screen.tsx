import React from 'react';
import { ScrollView, View } from 'react-native';
import { FAB, Icon, makeStyles, Text } from 'react-native-elements';
import { Card } from 'src/types/users.types';
import { useNavigation } from '@react-navigation/native';

interface CardsScreenProps {}

const CardsScreen: React.FC<CardsScreenProps> = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const cards: Card[] = [
    {
      id: 1,
      number: 1111111111,
      expirationDate: new Date(),
      monthlyLimit: 10,
      securityCode: 1234,
      type: 'VISA',
    },
    {
      id: 2,
      number: 1111111111,
      expirationDate: new Date(),
      monthlyLimit: 10,
      securityCode: 1234,
      type: 'VISA',
    },
  ];
  return (
    <View style={styles.container}>
      <FAB
        title="Add Card"
        color="#20C997"
        icon={<Icon name="add" color="white" />}
        style={styles.fab}
        onPress={() => navigation.navigate('AddCard')}
      />
      <ScrollView>
        {cards.map(card => (
          <View style={styles.card} key={card.id}>
            <View>
              <Text style={styles.cardNumber}>{card.number}</Text>
              <Text style={styles.cardExpiry}>
                {card.expirationDate.toDateString()}
              </Text>
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
  fab: { position: 'absolute', bottom: 50, right: 20 },
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