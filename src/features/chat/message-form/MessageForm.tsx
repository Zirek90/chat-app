import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MessageFormInterface } from '../interfaces';
import { TextInput } from '@/src/components';
import { COLORS } from '@/src/constants';

export function MessageForm(props: MessageFormInterface) {
  const { onSend, editingMessage, onEditCancel } = props;
  const [input, setInput] = useState('');

  useEffect(() => {
    setInput(editingMessage?.content || '');
  }, [editingMessage]);

  function handleSend() {
    if (!input.trim()) return;

    if (editingMessage) {
      onSend(input, editingMessage.id);
    } else {
      onSend(input);
    }
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
      {editingMessage && (
        <TouchableOpacity onPress={onEditCancel} style={styles.cancelButton}>
          <Ionicons name="close" size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Ionicons name="send" size={24} color={COLORS.white} />
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
  cancelButton: {
    backgroundColor: COLORS.red,
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  sendButton: {
    backgroundColor: COLORS.chatButton,
    borderRadius: 5,
    padding: 5,
  },
});
