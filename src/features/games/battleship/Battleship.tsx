import { GameScreen, LobbyScreen, PlacementScreen } from './screens';
import { useLobbyStore } from './store';

interface BattleshipProps {
  user1Id: string;
  user2Id: string;
}

export function Battleship(props: BattleshipProps) {
  const { gamePhase } = useLobbyStore();
  const { user1Id, user2Id } = props;

  if (gamePhase === 'lobby') return <LobbyScreen playerOneId={user1Id} playerTwoId={user2Id} />;
  if (gamePhase === 'placement') return <PlacementScreen playerId={user1Id} />;

  return <GameScreen />;
}
