import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '@/src/constants';

export function useMessageSwipe() {
  const translateX = useSharedValue(0); // -> 50
  const backgroundColor = useSharedValue(COLORS.transparent);
  const iconDisplay = useSharedValue<ViewStyle>({ display: 'none' });

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
        iconDisplay.value = { display: 'flex' };
      } else {
        backgroundColor.value = withSpring('transparent');
        iconDisplay.value = { display: 'none' };
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
      display: iconDisplay.value.display,
    } as ViewStyle;
  });

  return { animatedMessageStyle, animatedContainerStyle, animatedIconStyle, onSwipe, emptySwipe };
}
