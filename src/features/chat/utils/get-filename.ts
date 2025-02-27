import * as DocumentPicker from 'expo-document-picker';

export function getFileName(file: DocumentPicker.DocumentPickerAsset) {
  return file.name || 'Unknown File';
}
