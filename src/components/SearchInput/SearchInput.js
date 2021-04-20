import React from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import styles from './SearchInput.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import colors, {dark, light} from '../../colors/colors';
import {darkTheme, lightTheme} from '../../colors/theme';

const SearchInput = ({onclick, theme, onChange}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onclick}
        style={[
          styles.btn,
          theme === 'dark' ? darkTheme.hoverBackground : lightTheme.border,
        ]}>
        <Icon
          name="md-search-outline"
          size={22}
          color={theme === 'dark' ? dark.secondaryText : light.secondaryText}
        />
      </TouchableOpacity>
      <TextInput
        onChangeText={onChange}
        placeholder="Search Apps"
        placeholderTextColor={
          theme === 'dark' ? dark.secondaryText : light.secondaryText
        }
        style={[
          styles.box,
          theme === 'dark' ? darkTheme.hoverBackground : lightTheme.border,
          theme === 'dark' ? darkTheme.secondaryText : lightTheme.secondaryText,
        ]}
      />
    </View>
  );
};

export default SearchInput;
