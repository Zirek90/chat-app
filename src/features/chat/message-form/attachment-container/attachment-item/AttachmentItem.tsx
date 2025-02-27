import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from '@/src/components';
import { COLORS } from '@/src/constants';
import { FileType, ImageType } from '@/src/types';

interface AttachmentItemProps {
  item: FileType | ImageType;
  onRemove: () => void;
  type: 'file' | 'image';
}

export function AttachmentItem(props: AttachmentItemProps) {
  const { item, onRemove, type } = props;
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  function handleRemove() {
    translateX.value = withTiming(200, { duration: 300 }, () => {
      opacity.value = withTiming(0, { duration: 100 }, () => {
        runOnJS(onRemove)();
      });
    });
  }

  return (
    <Animated.View style={[styles.attachment, animatedStyle]}>
      {type === 'file' ? (
        <Text style={styles.fileName}>{(item as FileType).name}</Text>
      ) : (
        <Image source={{ uri: item.uri }} style={styles.attachmentPreview} />
      )}
      <TouchableOpacity onPress={handleRemove}>
        <Ionicons name="close-circle" size={20} color="red" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  attachmentPreview: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 5,
  },
  attachment: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.colorfullOverlay,
    padding: 5,
    borderRadius: 8,
    marginBottom: 5,
  },
  fileName: {
    marginRight: 5,
    fontSize: 14,
  },
});
