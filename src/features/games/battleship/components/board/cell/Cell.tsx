import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CellInterface } from '../../../interface';
import { useBattleStore } from '../../../store/useBattleStore';
import { BoardSizeType } from '../../../types';
import { getSymbol } from '../../../utils';
import { COLORS } from '@/src/constants';

interface CellProps extends CellInterface {
  value: null | string;
  onPress?: () => void;
  size?: BoardSizeType;
  disabled: boolean;
}

export function Cell(props: CellProps) {
  const { row, col, value, onPress, size, disabled } = props;
  const { selectedAttack } = useBattleStore();

  const isSelected = selectedAttack?.row === row && selectedAttack?.col === col;

  return (
    <TouchableOpacity
      style={[styles.cell, size === 'mini' && styles.miniCell, isSelected && styles.selectedCell]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={size === 'mini' && styles.miniFont}>{getSymbol(value)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    backgroundColor: COLORS.cellBackground,
    borderColor: COLORS.black,
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
    margin: 1,
    width: 30,
  },
  miniFont: {
    fontSize: 7,
  },
  miniCell: {
    height: 15,
    width: 15,
  },
  selectedCell: {
    backgroundColor: COLORS.shipPlaced,
  },
});
