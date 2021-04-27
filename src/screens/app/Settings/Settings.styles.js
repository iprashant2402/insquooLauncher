import {StyleSheet} from 'react-native';
import {fonts} from '../../../colors/colors';
import {ScreenHeight, ScreenWidth} from '../../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  wrapper: {
    paddingHorizontal: ScreenWidth / 22,
    paddingVertical: 24,
  },
  topBar: {
    flexDirection: 'row',
  },
  btnWrapper: {
    justifyContent: 'center',
  },
  heading: {
    fontFamily: fonts.primary_semibold,
    fontSize: ScreenHeight / 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 22,
  },
  text: {
    fontFamily: fonts.primary,
    fontSize: ScreenHeight / 56,
  },
});

export default styles;
