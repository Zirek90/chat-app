import { useMemo, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Player } from '../../interface';
import { GamePhaseType } from '../../types';
import { Text } from '@/src/components';

interface CountdownTimerProps {
  readyPlayers: Player[];
  moveToNextPhase: (phase: GamePhaseType) => void;
  nextPhase: GamePhaseType;
}

export function CountdownTimer({ readyPlayers, moveToNextPhase, nextPhase }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (readyPlayers.length === 2) {
      setCountdown(10);
    } else {
      setCountdown(null);
    }
  }, [readyPlayers]);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    const timer = setTimeout(() => setCountdown((prev) => (prev ? prev - 1 : 0)), 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      moveToNextPhase(nextPhase);
    }
  }, [countdown, moveToNextPhase, nextPhase]);

  if (readyPlayers.length !== 2 || countdown === null) return null;

  return <Text style={styles.countdownText}>Game starting in {countdown} seconds...</Text>;
}

const styles = StyleSheet.create({
  countdownText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
