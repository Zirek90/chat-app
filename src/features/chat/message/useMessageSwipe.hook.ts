import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { COLORS } from '@/src/constants';

export function useMessageSwipe() {
  const translateX = useSharedValue(0); // -> 50
  const backgroundColor = useSharedValue(COLORS.transparent);
  const iconOpacity = useSharedValue(0);

  const emptySwipe = Gesture.Pan();

  const onSwipe = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX > 0) {
        translateX.value = withSpring(Math.min(event.translationX, 50));
      } else {
        translateX.value = withSpring(0);
      }
    })
    .onEnd((event) => {
      if (event.translationX >= 50) {
        backgroundColor.value = withSpring(COLORS.overlay);
        iconOpacity.value = 1;
      } else {
        backgroundColor.value = withSpring('transparent');
        iconOpacity.value = 0;
      }
    });

  const animatedMessageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      opacity: iconOpacity.value,
    };
  });

  return { animatedMessageStyle, animatedContainerStyle, animatedIconStyle, onSwipe, emptySwipe };
}
