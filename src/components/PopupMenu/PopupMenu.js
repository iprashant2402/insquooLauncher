import React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';
import {darkTheme, lightTheme} from '../../colors/theme';
import styles from './PopupMenu.styles';

const PopupMenu = ({options = [], close, modalVisible, theme = 'dark'}) => {
  return (
    <Modal visible={modalVisible} animationType="none" transparent={true}>
      <TouchableOpacity
        onPress={close}
        activeOpacity={1}
        style={styles.outerContainer}>
        <View
          style={[
            styles.container,
            theme === 'dark' ? darkTheme.cardBackground : lightTheme.background,
          ]}>
          {options.map((option, i) => (
            <TouchableOpacity
              key={i}
              style={styles.option}
              onPress={option.onclick}>
              <Text
                style={[
                  styles.optionText,
                  theme === 'dark'
                    ? darkTheme.primaryText
                    : lightTheme.primaryText,
                ]}>
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PopupMenu;
