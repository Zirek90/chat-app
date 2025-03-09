import { useState, useEffect, useMemo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Player } from '../../interface';
import { GamePhaseType } from '../../types';

interface StartGameButtonProps {
  players: Player[];
  moveToNextPhase: (page: GamePhaseType) => void;
}

export function StartGameButton(props: StartGameButtonProps) {
  const { players, moveToNextPhase } = props;
  const readyPlayers = useMemo(() => players.filter((player) => player.ready), [players]);
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

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev ? prev - 1 : 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      moveToNextPhase('placement');
    }
  }, [countdown, moveToNextPhase]);

  return (
    readyPlayers.length === 2 && (
      <Text style={styles.countdownText}>Game starting in {countdown} seconds...</Text>
    )
  );
}

const styles = StyleSheet.create({
  countdownText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
