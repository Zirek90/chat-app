import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AttachmentItem } from './attachment-item';
import { FileType, ImageType } from '@/src/types';

export function AttachmentContainer({
  files,
  images,
  onRemove,
}: {
  files: FileType[];
  images: ImageType[];
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
