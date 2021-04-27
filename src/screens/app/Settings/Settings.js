import React from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {darkTheme, lightTheme} from '../../../colors/theme';
import {SettingsContext} from '../../../context/auth/SettingsContext';
import styles from './Settings.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {dark, light} from '../../../colors/colors';
import {ScreenHeight} from '../../../utils/Dimensions';
import Button from '../../../components/Button/Button';
import Toggle from '../../../components/Toggle/Toggle';

const Settings = ({navigation}) => {
  const settingsContext = React.useContext(SettingsContext);
  const {settings, updateSettings} = settingsContext;
  const {theme} = settings;

  const settingsMeta = [
    {text: 'Dark Theme', keyName: 'theme'},
    {text: 'Show Clock', keyName: 'showTime'},
    {text: 'Show Date', keyName: 'showDate'},
    {text: 'Show App Icons', keyName: 'showAppIcons'},
    {text: 'Make Status Bar Visible', keyName: 'showStatusBar'},
  ];

  const handleUpdateSettings = keyName => {
    const temp = {...settings};
    if (keyName === 'theme') {
      const oldValue = settings?.theme;
      if (oldValue === 'dark') {
        temp.theme = 'light';
      } else {
        temp.theme = 'dark';
      }
    } else {
      temp[`${keyName}`] = !settings[`${keyName}`];
    }
    updateSettings(temp);
  };

  const getToggleValue = keyName => {
    if (keyName === 'theme') {
      return settings.theme === 'dark';
    } else {
      return settings[`${keyName}`];
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        theme === 'dark' ? darkTheme.background : lightTheme.background,
      ]}>
      <View style={styles.topBar}>
        <View style={styles.btnWrapper}>
          <Button
            clear
            icon={
              <Ionicons
                name="arrow-back"
                size={ScreenHeight / 24}
                color={theme === 'dark' ? dark.primaryText : light.primaryText}
              />
            }
            onclick={handleBack}
          />
        </View>
        <Text
          style={[
            styles.heading,
            theme === 'dark' ? darkTheme.primaryText : lightTheme.primaryText,
          ]}>
          Settings
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
        {settingsMeta.map((item, i) => (
          <View style={styles.row} key={i}>
            <Text
              style={[
                styles.text,
                theme === 'dark'
                  ? darkTheme.primaryText
                  : lightTheme.primaryText,
              ]}>
              {item?.text}
            </Text>
            <Toggle
              value={getToggleValue(item?.keyName)}
              size={28}
              onToggle={() => handleUpdateSettings(item?.keyName)}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
