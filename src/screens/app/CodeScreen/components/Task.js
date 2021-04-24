import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors, {dark, fonts, light} from '../../../../colors/colors';
import {darkTheme, lightTheme} from '../../../../colors/theme';
import {ScreenHeight} from '../../../../utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Task = ({
  index,
  title,
  theme,
  desc,
  onCompleted,
  onDelete,
  priority,
  isCompleted,
}) => {
  return (
    <View
      key={index}
      style={[
        styles.container,
        theme === 'dark' && !isCompleted && darkTheme.cardBackground, theme === 'light' && !isCompleted && lightTheme.border,
      ]}>
      <View style={styles.row}>
      <View style={styles.right}>
          <TouchableOpacity>
            <Fontisto name={isCompleted ? 'checkbox-active' : 'checkbox-passive'} size={12} color={theme === 'dark' ? dark.primaryText : light.primaryText} />
          </TouchableOpacity>
        </View>
        <View style={styles.left}>
          <Text
            style={[
              styles.title,
              theme === 'dark'
                ? darkTheme.secondaryText
                : lightTheme.primaryText,
                isCompleted && styles.completed
            ]}>
            {title}
          </Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity>
            <Ionicons name={'remove-circle'} size={16} color={colors.google_red} />
          </TouchableOpacity>
        </View>
      </View>
      {desc && (
        <Text
          style={[
            styles.desc,
            theme === 'dark'
              ? darkTheme.secondaryText
              : lightTheme.secondaryText,
          ]}>
          {desc}
        </Text>
      )}
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.primary_semibold,
    fontSize: ScreenHeight / 48,
  },
  desc: {
    fontFamily: fonts.primary,
    fontSize: 12,
  },
  container: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
  },
  left: {
    flex: 6,
  },
  right: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 4,
    marginRight: 4,
  },
  completed: {
      textDecorationLine: 'line-through'
  }
});
