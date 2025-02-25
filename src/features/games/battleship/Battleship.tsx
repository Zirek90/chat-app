import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Board } from './board';
import { Ships } from './ships';

interface BattleshipProps {
  user1Id: string;
  user2Id: string;
}

export function Battleship(props: BattleshipProps) {
  const { user1Id, user2Id } = props;

  return (
    <GestureHandlerRootView style={styles.container}>
      <Ships />
      <Board />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
