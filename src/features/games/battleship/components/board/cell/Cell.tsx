import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CellInterface } from '../../../interface';
import { BoardSizeType } from '../../../types';
import { getSymbol } from '../../../utils';
import { COLORS } from '@/src/constants';

interface CellProps extends CellInterface {
  value: null | string;
  onPress?: () => void;
  size?: BoardSizeType;
}

export function Cell(props: CellProps) {
  const { row, col, value, onPress, size } = props;

  return (
    <TouchableOpacity style={[styles.cell, size === 'mini' && styles.miniCell]} onPress={onPress}>
      <Text>{getSymbol(value)}</Text>
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
  miniCell: {
    height: 15,
    width: 15,
  },
});
