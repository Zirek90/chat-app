import Clipboard from 'expo-clipboard';
import { TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Player } from '../../interface';
import { API } from '@/src/api/api';
import { useUserQuery } from '@/src/api/queries';
import { Text } from '@/src/components';
import { COLORS } from '@/src/constants';

interface RoomControlsProps {
  roomId: string | null;
  inputRoomId: string;
  setInputRoomId: (v: string) => void;
  setRoomId: (v: string) => void;
  updatePlayers: (players: Player) => void;
}

export function RoomControls(props: RoomControlsProps) {
  const { roomId, inputRoomId, setInputRoomId, setRoomId, updatePlayers } = props;
  const { data: user } = useUserQuery();

  const handleJoinGame = () => {
    if (!user || inputRoomId.trim() === '') return;
    API.game.joinGameRoom(inputRoomId, user.id, user.username);
    updatePlayers({ id: user.id, name: user.username, ready: false });
    setRoomId(inputRoomId);
  };

  if (roomId) {
    return (
      <>
        <Text style={styles.title}>Room ID: {roomId}</Text>
        <TouchableOpacity
          onPress={() => Clipboard.setStringAsync(roomId)}
          style={styles.copyButton}
        >
          <Text style={styles.copyButtonText}>Copy Room ID</Text>
        </TouchableOpacity>
      </>
    );
  }
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Enter Room ID"
        value={inputRoomId}
        autoCapitalize="none"
        onChangeText={setInputRoomId}
      />
      <TouchableOpacity style={styles.button} onPress={handleJoinGame}>
        <Text style={styles.buttonText}>Join Game Session</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.colorfullOverlay,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    fontSize: 18,
    borderColor: COLORS.border,
    borderRadius: 5,
    width: '80%',
    color: COLORS.white,
  },
  copyButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  copyButtonText: {
    color: COLORS.white,
    fontSize: 14,
  },
});
