import { ImageBackground, StyleSheet, View } from 'react-native';
import { Battleship as BattleshipGame } from '@/src/features/games';
import { useThemeStore } from '@/src/store';
import { getBackgroundImage } from '@/src/utils';

export default function BattleShipGame() {
  const { theme } = useThemeStore();

  return (
    <ImageBackground
      source={getBackgroundImage(theme, 'chat_dashboard')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <BattleshipGame user1Id="" user2Id="" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
