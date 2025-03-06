import { useState, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants';

interface TimerProps {
  startBattle: () => void;
}

export function Timer(props: TimerProps) {
  const { startBattle } = props;
  const [timeLeft, setTimeLeft] = useState(60);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (timeLeft <= 0) {
      startBattle();
      return;
    }

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, startBattle]);

  useEffect(() => {
    if (timeLeft === 10) {
      opacity.value = withRepeat(withTiming(0.3, { duration: 500 }), -1, true);
    }
  }, [timeLeft]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: timeLeft <= 10 ? opacity.value : 1,
  }));
  return (
    <Animated.Text
      style={[
        styles.timer,
        animatedStyle,
        timeLeft <= 10 ? styles.timerWarning : styles.timerNormal,
      ]}
    >
      Time Left: {timeLeft}s
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.red,
    marginBottom: 10,
  },
  timerNormal: {
    color: COLORS.white,
  },
  timerWarning: {
    color: COLORS.red,
  },
});
