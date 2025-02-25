import { StyleSheet, View } from 'react-native';
import { ShipInterface } from '../../interface';
import { Text } from '@/src/components';
import { COLORS } from '@/src/constants';

type ShipProps = ShipInterface;

export function Ship(props: ShipProps) {
  const { name, size, amount, placed } = props;

  return (
    <View style={[styles.shipCard, placed ? styles.shipPlaced : styles.shipPending]}>
      <Text style={styles.shipName}>{name}</Text>
      <Text style={styles.shipSize}>{`Size: ${size} cells`}</Text>
      <Text style={styles.shipAmount}>{`Amount: ${amount}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  shipAmount: {
    color: COLORS.shipText,
    fontSize: 12,
  },
  shipCard: {
    alignItems: 'center',
    borderColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 2,
    elevation: 4,
    justifyContent: 'center',
    margin: 5,
    padding: 7,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  shipName: {
    color: COLORS.shipName,
    fontSize: 15,
    fontWeight: 'bold',
  },
  shipPending: {
    backgroundColor: COLORS.shipPending,
  },
  shipPlaced: {
    backgroundColor: COLORS.shipPlaced,
  },
  shipSize: {
    color: COLORS.shipText,
    fontSize: 12,
  },
});
