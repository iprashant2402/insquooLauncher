import {StyleSheet} from 'react-native';
import colors, {fonts} from '../../../colors/colors';
import {ScreenWidth} from '../../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 0,
  },
  icon: {
    marginRight: 16,
    width: 42,
    height: 42,
  },
  text: {
    fontFamily: fonts.primary,
    fontSize: ScreenWidth / 32,
  },
  appListItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paddingBottom: {paddingBottom: 48},
});

export default styles;
