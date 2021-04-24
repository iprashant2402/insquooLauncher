import React from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import colors, {dark, fonts, light} from '../../../../colors/colors';
import {darkTheme, lightTheme} from '../../../../colors/theme';
import {ScreenHeight, ScreenWidth} from '../../../../utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../../../components/Button/Button';
import {Picker} from '@react-native-picker/picker';

const AddNewTask = ({
  modalVisible,
  close,
  theme = 'dark',
  title,
  desc,
  priority,
  onChangeDesc,
  onChangeTitle,
  onChangePriority,
  onSubmit,
}) => {
  return (
    <Modal visible={modalVisible} transparent={true} animationType="slide">
      <View style={styles.outerContainer}>
        <View
          style={[
            styles.container,
            theme === 'dark' ? darkTheme.background : lightTheme.border,
            theme === 'light' && lightTheme.background,
          ]}>
          <View style={[styles.topBar]}>
            <View style={[styles.headingWrapper]}>
              <Text
                style={[
                  styles.heading,
                  theme === 'dark'
                    ? darkTheme.primaryText
                    : lightTheme.primaryText,
                ]}>
                New Task
              </Text>
            </View>
            <TouchableOpacity onPress={close} style={styles.closeBtn}>
              <Ionicons
                name="ios-close-circle"
                size={ScreenHeight / 32}
                color={theme === 'dark' ? dark.primaryText : light.primaryText}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <View>
              <TextInput
                onChangeText={onChangeTitle}
                style={[
                  styles.input,
                  theme === 'dark' ? darkTheme.border : lightTheme.border,
                  theme === 'dark'
                    ? darkTheme.primaryText
                    : lightTheme.primaryText,
                ]}
                placeholderTextColor={
                  theme === 'dark' ? dark.secondaryText : light.secondaryText
                }
                value={title}
                placeholder="What do you want to do?"
              />
            </View>
            <View>
              <TextInput
                onChangeText={onChangeDesc}
                placeholder="Task description"
                placeholderTextColor={
                  theme === 'dark' ? dark.secondaryText : light.secondaryText
                }
                style={[
                  styles.textbox,
                  theme === 'dark' ? darkTheme.border : lightTheme.border,
                  theme === 'dark'
                    ? darkTheme.primaryText
                    : lightTheme.primaryText,
                ]}
                value={desc}
                multiline={true}
                numberOfLines={3}
              />
            </View>
            <View>
              <Text
                style={[
                  styles.label,
                  theme === 'dark'
                    ? darkTheme.primaryText
                    : lightTheme.primaryText,
                ]}>
                Choose priority
              </Text>
              <View style={[styles.row]}>
                <TouchableOpacity
                  onPress={() => onChangePriority('high')}
                  style={[
                    styles.option,
                    priority === 'high' && styles.activeOption,
                  ]}>
                  <Text
                    style={[
                      styles.optionText,
                      priority === 'high' && darkTheme.primaryText,
                    ]}>
                    High
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onChangePriority('medium')}
                  style={[
                    styles.option,
                    priority === 'medium' && styles.activeOption,
                  ]}>
                  <Text
                    style={[
                      styles.optionText,
                      priority === 'medium' && darkTheme.primaryText,
                    ]}>
                    Medium
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onChangePriority('low')}
                  style={[
                    styles.option,
                    priority === 'low' && styles.activeOption,
                  ]}>
                  <Text
                    style={[
                      styles.optionText,
                      priority === 'low' && darkTheme.primaryText,
                    ]}>
                    Low
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <Button
              onclick={onSubmit}
              title="Create"
              textColor={colors.primary}
              clear
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddNewTask;

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  outerContainer: {
    flex: 1,
    height: ScreenHeight,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontFamily: fonts.primary_semibold,
    fontSize: ScreenHeight / 44,
    marginLeft: 8,
  },
  input: {
    height: 40,
    marginVertical: 12,
    padding: 12,
    borderRadius: 2,
  },
  textbox: {
    padding: 12,
    borderRadius: 2,
  },
  label: {
    fontFamily: fonts.primary,
    marginVertical: 8,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 12,
  },
  activeOption: {
    backgroundColor: colors.primary_background,
  },
  optionText: {
    fontFamily: fonts.primary,
    color: colors.primary,
    fontSize: ScreenWidth / 32,
  },
});
