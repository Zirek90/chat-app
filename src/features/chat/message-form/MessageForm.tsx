import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import EmojiPicker from 'rn-emoji-keyboard';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MessageFormInterface } from '../interfaces';
import { AttachmentContainer } from './attachment-container';
import { AttachmentControllers } from './attachments';
import { TextInput } from '@/src/components';
import { COLORS } from '@/src/constants';
import { FileType, ImageType } from '@/src/types';

export function MessageForm(props: MessageFormInterface) {
  const { onSend, editingMessage, onEditCancel } = props;
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImageType[]>([]);

  function handleFileSelect(file: FileType) {
    setSelectedFiles((prev) => [...prev, file]);
  }

  function handleImageSelect(image: ImageType) {
    setSelectedImages((prev) => [...prev, image]);
  }

  useEffect(() => {
    setInput(editingMessage?.content || '');
  }, [editingMessage]);

  function handleSend() {
    if (!input.trim()) return;

    if (editingMessage) {
      onSend(input, selectedFiles, selectedImages, editingMessage.id);
    } else {
      onSend(input, selectedFiles, selectedImages);
    }
    setSelectedFiles([]);
    setSelectedImages([]);
    setInput('');
  }

  function handleEmojiSelect(emoji: string) {
    const beforeCursor = input.slice(0, cursorPosition);
    const afterCursor = input.slice(cursorPosition);
    const newText = beforeCursor + emoji + afterCursor;

    setInput(newText);
    setCursorPosition(cursorPosition + emoji.length);
  }

  function removeAttachment(index: number, type: 'file' | 'image') {
    if (type === 'file') {
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    } else {
      setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    }
  }

  return (
    <View style={styles.container}>
      <AttachmentContainer
        files={selectedFiles}
        images={selectedImages}
        onRemove={removeAttachment}
      />

      <AttachmentControllers
        handleFileSelect={handleFileSelect}
        handleImageSelect={handleImageSelect}
      />

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
        multiline
        autoCorrect={false}
      />

      <TouchableOpacity
        onPress={() => setShowEmojiPicker(!showEmojiPicker)}
        style={styles.iconButton}
      >
        <Ionicons name="happy-outline" size={20} color={COLORS.black} />
      </TouchableOpacity>

      {editingMessage && (
        <TouchableOpacity onPress={onEditCancel} style={styles.cancelButton}>
          <Ionicons name="close" size={20} color={COLORS.white} />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Ionicons name="send" size={20} color={COLORS.white} />
      </TouchableOpacity>
      <EmojiPicker
        onEmojiSelected={(emojiObject) => handleEmojiSelect(emojiObject.emoji)}
        open={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
      />
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
  iconButton: {
    padding: 5,
    marginRight: 5,
  },
});
