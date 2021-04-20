import {Dimensions, StyleSheet} from 'react-native';

export const ScreenHeight = Dimensions.get('window').height;
export const ScreenWidth = Dimensions.get('window').width;

const globalStyles = StyleSheet.create({
  button: {
    height: ScreenHeight / 20,
    width: '100%',
  },
  roundBtn: {
    borderRadius: 0,
  },
});

export default globalStyles;
