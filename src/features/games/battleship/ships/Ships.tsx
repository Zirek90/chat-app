import { View, Text, StyleSheet } from "react-native";
import { useBattleshipStore } from "../store";
import { Ship } from "./ship";

export function Ships() {
  const ships = useBattleshipStore((state) => state.ships);
  const remainingShips = useBattleshipStore((state) => state.remainingShips);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.remainingShipsText}>{`Ships left to place: ${remainingShips}`}</Text>
      <View style={styles.shipsList}>
        {ships.map((ship) => (
          <Ship key={ship.id} {...ship} />
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(54, 54, 54, 0.6)",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 30,
  },
  remainingShipsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  shipsList: {
    flexDirection: "row",
  },
});
