import {StyleSheet} from 'react-native';
import colors, {fonts} from '../../../colors/colors';
import {ScreenHeight} from '../../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  lightBackground: {
    backgroundColor: colors.white,
  },
  darkBackground: {
    backgroundColor: colors.primary_background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  clockContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  time: {
    fontFamily: fonts.primary,
    fontSize: ScreenHeight / 22,
    lineHeight: ScreenHeight / 16,
  },
  appListItem: {
    flexDirection: 'row',
  },
  appListButton: {
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: ScreenHeight / 28,
    width: ScreenHeight / 14,
    height: ScreenHeight / 14,
  },
  date: {
    fontFamily: fonts.primary,
    fontSize: ScreenHeight / 56,
  },
  text: {
    fontFamily: fonts.primary_semibold,
    fontSize: ScreenHeight / 24,
  },
  bottomText: {
    fontFamily: fonts.primary_semibold,
    fontSize: ScreenHeight / 48,
    marginLeft: 8,
  },
  appList: {
    flex: 4,
    justifyContent: 'center',
  },
  bottomBar: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 12,
  },
  bottomBarWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default styles;
