import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants';
import { FileType, ImageType } from '@/src/types';

interface AttachmentsProps {
  handleFileSelect: (file: FileType) => void;
  handleImageSelect: (image: ImageType) => void;
}

export function AttachmentControllers(props: AttachmentsProps) {
  const { handleFileSelect, handleImageSelect } = props;
  async function handlePickFile() {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });

      if (result.canceled) return;
      handleFileSelect(result.assets[0]);
    } catch (error) {
      console.error('Error picking file:', error);
    }
  }

  async function pickImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: false,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        handleImageSelect(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  }
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handlePickFile} style={styles.attachmentsButton}>
        <Ionicons name="attach" size={20} color={COLORS.black} />
      </TouchableOpacity>

      <TouchableOpacity onPress={pickImage} style={styles.attachmentsButton}>
        <Ionicons name="image" size={20} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachmentsButton: {
    padding: 5,
  },
});
