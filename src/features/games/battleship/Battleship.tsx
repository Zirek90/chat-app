import { BattleScreen, LobbyScreen, PlacementScreen } from './screens';
import { useLobbyStore } from './store';

export function Battleship() {
  const { gamePhase } = useLobbyStore();

  if (gamePhase === 'lobby') return <LobbyScreen />;
  if (gamePhase === 'placement') return <PlacementScreen />;

  return <BattleScreen />;
}
