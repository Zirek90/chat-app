import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants';

export function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#555" />
      <Text style={styles.text}>Typing...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.containerBackground,
    borderRadius: 10,
    flexDirection: 'row',
    marginLeft: 10,
    padding: 10,
  },
  text: {
    color: COLORS.chatLoader,
    fontSize: 14,
    marginLeft: 5,
  },
});
