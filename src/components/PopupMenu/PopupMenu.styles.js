import {StyleSheet} from 'react-native';
import { fonts } from '../../colors/colors';
import { ScreenHeight, ScreenWidth } from '../../utils/Dimensions';

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        paddingVertical: 12,
        elevation: 2,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      btnWrapper: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      closeBtn: {
        justifyContent: 'center',
      },
      option: {
          paddingVertical: 12,
          paddingHorizontal: 16,
      },
      outerContainer: {
        flex: 1,
        height: ScreenHeight,
        paddingHorizontal: ScreenWidth/5,
        justifyContent: 'center',
      },
      topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      optionText: {
          fontFamily: fonts.primary,
      },
});

export default styles;
