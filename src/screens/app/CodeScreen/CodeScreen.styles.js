import {StyleSheet} from 'react-native';
import {fonts} from '../../../colors/colors';
import {ScreenHeight} from '../../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  tab: {
    fontFamily: fonts.primary,
    fontSize: ScreenHeight / 48,
    lineHeight: ScreenHeight / 28,
  },
  activeTab: {
    fontFamily: fonts.primary_semibold,
    fontSize: ScreenHeight / 24,
  },
  topBar: {
    flexDirection: 'row',
  },
  tabWrapper: {
    justifyContent: 'flex-end',
    padding: 12,
  },
});

export default styles;
