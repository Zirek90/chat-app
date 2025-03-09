import { View, StyleSheet } from 'react-native';
import { Cell } from './cell';
import { BoardSizeType } from '../../types';
import { Text } from '@/src/components';
import { COLORS } from '@/src/constants';

interface BoardProps {
  size?: BoardSizeType;
  gridData: (null | string)[][];
  onCellPress?: (row: number, col: number) => void;
  isInteractive?: boolean; // Controls clickability as miniature will be disabled
  boardTitle: string;
}

export function Board(props: BoardProps) {
  const { size = 'full', gridData, onCellPress, boardTitle, isInteractive = false } = props;

  return (
    <View style={[styles.board, size === 'mini' && styles.miniBoard]}>
      <Text style={styles.boardLabel}>{boardTitle}</Text>
      {gridData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              value={cell}
              disabled={!isInteractive}
              onPress={() => onCellPress?.(rowIndex, colIndex)}
              size={size}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  boardLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    paddingBottom: 5,
  },
  miniBoard: {
    transform: [{ scale: 0.9 }],
  },
  row: {
    flexDirection: 'row',
  },
});
