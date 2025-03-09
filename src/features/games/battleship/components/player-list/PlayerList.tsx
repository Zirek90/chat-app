import React from 'react';
import { View } from 'react-native';
import { Player } from '../../interface';
import { LobbyPlayer } from '../lobby-player';

interface PlayerListProps {
  players: Player[];
  togglePlayerReady: (player: Player) => void;
}

export function PlayerList(props: PlayerListProps) {
  const { players, togglePlayerReady } = props;

  return (
    <View>
      {players.map((player) => (
        <LobbyPlayer key={player.id} togglePlayerReady={togglePlayerReady} player={player} />
      ))}
    </View>
  );
}
