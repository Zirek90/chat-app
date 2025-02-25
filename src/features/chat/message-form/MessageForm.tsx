import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MessageFormInterface } from '../interfaces';
import { TextInput } from '@/src/components';
import { COLORS } from '@/src/constants';

export function MessageForm(props: MessageFormInterface) {
  const { onSend } = props;
  const [input, setInput] = useState('');

  function handleSend() {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
        multiline
        autoCorrect={false}
      />
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Ionicons name="send" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.containerBackground,
    borderRadius: 10,
    flexDirection: 'row',
    margin: 5,
    padding: 5,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    flex: 1,
    fontSize: 16,
    maxHeight: 120,
    minHeight: 40,
    padding: 10,
  },
  sendButton: {
    backgroundColor: COLORS.chatButton,
    borderRadius: 5,
    padding: 5,
  },
});
