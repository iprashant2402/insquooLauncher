import {StyleSheet} from 'react-native';
import colors from '../../../colors/colors';
import {ScreenHeight, ScreenWidth} from '../../../global.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary_background,
    paddingHorizontal: ScreenWidth / 12,
    paddingVertical: 24,
    justifyContent: 'space-between',
    paddingBottom: ScreenHeight / 10,
  },
});

export default styles;
