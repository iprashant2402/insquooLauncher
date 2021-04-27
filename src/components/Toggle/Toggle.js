import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors, {dark, light} from '../../colors/colors';

const Toggle = ({value, onToggle, theme = 'dark', size = 24}) => {
  return (
    <TouchableOpacity onPress={onToggle}>
      {value ? (
        <Icon name="toggle-on" color={colors.success} size={size} />
      ) : (
        <Icon
          name="toggle-off"
          color={theme === 'dark' ? dark.primaryText : light.primaryText}
          size={size}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
});

export default Toggle;
