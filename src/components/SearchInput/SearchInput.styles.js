import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 12,
  },
  box: {
    borderLeftWidth: 0,
    borderRadius: 50,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    width: '86%',
    padding: 12,
  },
  btn: {
    width: '14%',
    paddingLeft: 16,
    borderRightWidth: 0,
    borderRadius: 50,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
  },
});

export default styles;
