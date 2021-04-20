import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {darkTheme, lightTheme} from '../../../colors/theme';
import {ThemeContext} from '../../../context/auth/ThemeContext';
import styles from './CodeScreen.styles';

const CodeScreen = () => {
  const themeContext = React.useContext(ThemeContext);
  const {theme, updateTheme} = themeContext;
  const [activeTab, setActiveTab] = React.useState('tasks');
  const toggleTab = tab => {
    setActiveTab(tab);
  };
  return (
    <View
      style={[
        styles.container,
        theme === 'dark' ? darkTheme.background : lightTheme.background,
      ]}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.tabWrapper}
          onPress={() => toggleTab('tasks')}>
          <View>
            <Text
              style={[
                activeTab === 'tasks' ? styles.activeTab : styles.tab,
                theme === 'dark'
                  ? darkTheme.primaryText
                  : lightTheme.primaryText,
              ]}>
              Todo list
            </Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.tabWrapper}
          onPress={() => toggleTab('notifications')}>
          <View>
            <Text
              style={[
                activeTab === 'notifications' ? styles.activeTab : styles.tab,
                theme === 'dark'
                  ? darkTheme.primaryText
                  : lightTheme.secondaryText,
              ]}>
              Notifications
            </Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default CodeScreen;
