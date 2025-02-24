import { Text } from "@/src/components";
import { StyleSheet, View } from "react-native";
import { ShipInterface } from "../../interface";

interface ShipProps extends ShipInterface {}

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
  shipCard: {
    margin: 5,
    borderRadius: 10,
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  shipName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1e1e1e",
  },
  shipSize: {
    fontSize: 12,
    color: "#575757",
  },
  shipAmount: {
    fontSize: 12,
    color: "#575757",
  },
  shipPlaced: {
    backgroundColor: "rgb(139, 195, 74)",
  },
  shipPending: {
    backgroundColor: "rgb(255, 235, 59)",
  },
});
