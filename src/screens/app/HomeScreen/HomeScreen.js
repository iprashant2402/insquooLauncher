import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Button from '../../../components/Button/Button';
import styles from './HomeScreen.styles';
import {ThemeContext} from '../../../context/auth/ThemeContext';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors, {dark, fonts, light} from '../../../colors/colors';
import {
  darkBackground,
  darkTheme,
  lightBackground,
  lightTheme,
} from '../../../colors/theme';
import {ScreenHeight} from '../../../utils/Dimensions';
import {InstalledApps} from '../../../utils/InstalledApps';
import AddAppsSheet from './Components/AddAppsSheet';
import {getStarredApps, storeStarredApps} from '../../../utils/storage';
import {getDateTime} from '../../../utils/dateTime';

const HomeScreen = ({navigation}) => {
  const themeContext = React.useContext(ThemeContext);
  const {theme, updateTheme} = themeContext;
  const [editMode, setEditMode] = React.useState(false);
  const [addAppSheet, setAddAppSheet] = React.useState(false);
  const [time, setTime] = React.useState(null);
  const [date, setDate] = React.useState(null);
  const [apps, setApps] = React.useState([]);
  const [fullAppList, setFullAppList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const _handleOpenApp = app => {
    if (!editMode) {
      InstalledApps.launchApplication(app);
    }
  };
  const hanldeTaskNavigate = () => {
    setEditMode(false);
    navigation.navigate('Code');
  };

  const handleLongPress = () => {
    setEditMode(true);
  };

  const fetchApps = async () => {
    const temp = await getStarredApps();
    if (temp) {
      setApps(temp);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchApps();
    getApps();
  }, []);

  React.useEffect(() => {
    const res = getDateTime();
    if (res && res.time && res.date) {
      setTime(res?.time);
      setDate(res?.date);
    }
    const tick = setInterval(() => {
      const res = getDateTime();
      if (res && res.time && res.date) {
        setTime(res?.time);
        setDate(res?.date);
      }
    }, 60000);

    return () => clearInterval(tick);
  }, []);

  const getApps = () => {
    InstalledApps.getApps((error, appsList) => {
      if (appsList) {
        const temp = JSON.parse(appsList);
        temp.sort(function (a, b) {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        });
        setFullAppList(temp);
      }
    });
  };

  const addApp = app => {
    setApps(prev => {
      storeStarredApps([...prev, app]);
      return [...prev, app];
    });
  };

  const removeApp = app => {
    setApps(prev => {
      storeStarredApps(prev.filter(el => el.name !== app.name));
      return prev.filter(el => el.name !== app.name);
    });
  };

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          theme === 'dark' ? darkTheme.background : lightTheme.background,
        ]}>
        <StatusBar
          hidden={false}
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={theme === 'dark' ? '#000' : light.background}
        />
        <View style={[styles.clockContainer]}>
          <View>
            {/* <Text
              style={[
                styles.time,
                theme === 'dark'
                  ? darkTheme.primaryText
                  : lightTheme.primaryText,
              ]}>
              {time}
            </Text> */}
            <Text
              style={[
                styles.date,
                theme === 'dark'
                  ? darkTheme.primaryText
                  : lightTheme.primaryText,
              ]}>
              {date}
            </Text>
          </View>
          <View>
            <Button
              clear
              theme={theme}
              icon={
                <Icon
                  name={theme === 'dark' ? 'light-down' : 'light-up'}
                  size={30}
                  color={
                    theme === 'dark' ? colors.white : colors.primary_background
                  }
                />
              }
              onclick={() => updateTheme(theme === 'light' ? 'dark' : 'light')}
            />
          </View>
        </View>
        <View style={[styles.appList]}>
          {apps.map((app, i) => (
            <TouchableOpacity
              onLongPress={handleLongPress}
              onPress={() => _handleOpenApp(app.name)}
              key={i}
              style={styles.appListItem}>
              {editMode && (
                <TouchableOpacity onPress={() => removeApp(app)}>
                  <Ionicons
                    name="md-remove-circle"
                    size={ScreenHeight / 18}
                    color={
                      theme === 'dark' ? dark.primaryText : light.primaryText
                    }
                  />
                </TouchableOpacity>
              )}
              <Text
                style={[
                  styles.text,
                  editMode && {marginLeft: 8},
                  theme === 'dark'
                    ? darkTheme.primaryText
                    : lightTheme.primaryText,
                ]}>
                {app.label}
              </Text>
            </TouchableOpacity>
          ))}
          {((apps?.length === 0 && !loading) ||
            (editMode && apps?.length < 7)) && (
            <TouchableOpacity
              onPress={() => setAddAppSheet(true)}
              style={styles.appListItem}>
              <Ionicons
                name="add"
                size={ScreenHeight / 18}
                color={theme === 'dark' ? dark.primaryText : light.primaryText}
              />
              <Text
                style={[
                  styles.text,
                  {fontFamily: fonts.primary},
                  theme === 'dark'
                    ? darkTheme.primaryText
                    : lightTheme.primaryText,
                ]}>
                Add Apps
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.bottomBarWrapper]}>
          <View style={[styles.bottomBar]}>
            <View style={{justifyContent: 'flex-end'}}>
              <TouchableOpacity
                style={styles.appListItem}
                onPress={hanldeTaskNavigate}>
                <Ionicons
                  name="arrow-back"
                  size={ScreenHeight / 32}
                  color={
                    theme === 'dark' ? dark.primaryText : light.primaryText
                  }
                />
                <Text
                  style={[
                    styles.bottomText,
                    theme === 'dark'
                      ? darkTheme.primaryText
                      : lightTheme.primaryText,
                  ]}>
                  Manage Tasks
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => _handleOpenApp('com.android.dialer')}
                style={styles.appListButton}>
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                  <Ionicons
                    name="call-sharp"
                    size={ScreenHeight / 32}
                    color={
                      theme === 'dark' ? dark.primaryText : dark.primaryText
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <AddAppsSheet
        close={() => {
          setAddAppSheet(false);
          setEditMode(false);
        }}
        addApp={addApp}
        removeApp={removeApp}
        apps={fullAppList}
        starredApps={apps}
        theme={theme}
        modalVisible={addAppSheet}
      />
    </>
  );
};

export default HomeScreen;
