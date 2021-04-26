import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {darkTheme, lightTheme} from '../../../../colors/theme';
import Button from '../../../../components/Button/Button';
import {ScreenHeight, ScreenWidth} from '../../../../utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors, {dark, fonts, light} from '../../../../colors/colors';
import CheckBox from '@react-native-community/checkbox';

const searchItem = (item, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === item.name) {
      return true;
    }
  }
  return false;
};

const countApps = arr => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === true) {
      count++;
    }
  }
  return count;
};

const AddAppsSheet = ({
  theme = 'dark',
  addApp,
  removeApp,
  modalVisible,
  close,
  apps,
  starredApps,
}) => {
  const [appsValue, setAppsValue] = React.useState([]);
  React.useEffect(() => {
    const temp = [];
    apps.forEach(item => {
      if (searchItem(item, starredApps)) {
        temp.push(true);
      } else {
        temp.push(false);
      }
    });
    setAppsValue(temp);
  }, [apps]);
  const _handleOnPress = (newValue, i, app) => {
    if ((newValue && countApps(appsValue) < 7) || !newValue) {
      const temp = appsValue.slice();
      temp[i] = newValue;
      setAppsValue(temp);
      if (newValue === true) {
        addApp(app);
      } else {
        removeApp(app);
      }
    }
  };
  return (
    <Modal visible={modalVisible} animationType="slide">
      <View
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
                  color={
                    theme === 'dark' ? dark.primaryText : light.primaryText
                  }
                />
              }
              onclick={close}
            />
          </View>
          <Text
            style={[
              styles.heading,
              theme === 'dark' ? darkTheme.primaryText : lightTheme.primaryText,
            ]}>
            Add Apps
          </Text>
        </View>
        <View style={styles.topBar}>
          <Text
            style={[
              styles.subtitle,
              theme === 'dark' ? darkTheme.primaryText : lightTheme.primaryText,
            ]}>
            Select upto 7 apps to add to Home.
          </Text>
        </View>
        <ScrollView style={styles.appList}>
          {apps.map((app, i) => (
            <View
              key={i}
              //onPress={() => _handleOnPress(app)}
              style={styles.appListItem}>
              <View style={{marginRight: 8}}>
                <CheckBox
                  value={appsValue[i]}
                  onValueChange={newValue => _handleOnPress(newValue, i, app)}
                  tintColors={{
                    true: theme === 'dark' ? dark.primaryText : colors.primary,
                    false:
                      theme === 'dark' ? dark.primaryText : light.primaryText,
                  }}
                />
              </View>
              <Image
                style={styles.icon}
                resizeMode={'contain'}
                source={{uri: 'data:image/png;base64,' + app.icon}}
              />
              <Text
                style={[
                  styles.text,
                  theme === 'dark'
                    ? darkTheme.primaryText
                    : lightTheme.primaryText,
                ]}>
                {app.label}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AddAppsSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  topBar: {
    flexDirection: 'row',
  },
  btnWrapper: {
    justifyContent: 'center',
  },
  heading: {
    fontFamily: fonts.primary_semibold,
    fontSize: ScreenHeight / 24,
  },
  icon: {
    marginRight: 16,
    width: 42,
    height: 42,
  },
  text: {
    fontFamily: fonts.primary,
    fontSize: ScreenWidth / 32,
  },
  appListItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: fonts.primary,
    fontSize: ScreenHeight / 64,
  },
});
