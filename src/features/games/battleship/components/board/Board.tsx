import { View, StyleSheet } from 'react-native';
import { Cell } from './cell';
import { BoardSizeType } from '../../types';

interface BoardProps {
  size?: BoardSizeType;
  gridData: (null | string)[][];
  onCellPress?: (row: number, col: number) => void;
  isInteractive?: boolean; // Controls clickability as miniature will be disabled
}

export function Board(props: BoardProps) {
  const { size = 'full', gridData, onCellPress, isInteractive = false } = props;

  return (
    <View style={[styles.board, size === 'mini' && styles.miniBoard]}>
      {gridData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              value={cell}
              onPress={isInteractive ? () => onCellPress?.(rowIndex, colIndex) : undefined}
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
  },
  miniBoard: {
    transform: [{ scale: 0.6 }],
  },
  row: {
    flexDirection: 'row',
  },
});
