import { Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageFile } from '../../interfaces';
import { Text } from '@/src/components';
import { COLORS } from '@/src/constants';

interface AttachmentsProps {
  files: MessageFile[];
}

export function Attachments(props: AttachmentsProps) {
  const { files } = props;

  const handleDownload = async (file: MessageFile) => {
    if (!file.url) return;

    try {
      Linking.openURL(file.url).catch((err) => console.error('Failed to open URL:', err));
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  if (!files.length) {
    return null;
  }

  return files.map((file, index) =>
    file.type === 'image' ? (
      <Image key={index} source={{ uri: file.url }} style={styles.imagePreview} />
    ) : (
      <TouchableOpacity key={index} onPress={() => handleDownload(file)}>
        <Text style={styles.linkText}>{file.path}</Text>
      </TouchableOpacity>
    ),
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
  linkText: {
    color: COLORS.linkText,
  },
});
