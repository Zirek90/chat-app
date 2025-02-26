import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { View, StyleSheet } from 'react-native';
import { AttachmentItem } from './attachment-item';
import { COLORS } from '@/src/constants';

export function AttachmentContainer({
  files,
  images,
  onRemove,
}: {
  files: DocumentPicker.DocumentPickerAsset[];
  images: ImagePicker.ImagePickerAsset[];
  onRemove: (index: number, type: 'file' | 'image') => void;
}) {
  if (!files.length && !images.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <AttachmentItem
          key={image.uri}
          item={image}
          onRemove={() => onRemove(index, 'image')}
          type="image"
        />
      ))}
      {files.map((file, index) => (
        <AttachmentItem
          key={file.uri}
          item={file}
          onRemove={() => onRemove(index, 'file')}
          type="file"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 10,
  },
});
