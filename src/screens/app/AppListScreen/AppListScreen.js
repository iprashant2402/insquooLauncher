import React from 'react';
import {useFocusEffect, useIsFocused} from '@react-navigation/core';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {darkTheme, lightTheme} from '../../../colors/theme';
import SearchInput from '../../../components/SearchInput/SearchInput';
import {ThemeContext} from '../../../context/auth/ThemeContext';
import {InstalledApps} from '../../../utils/InstalledApps';
import styles from './AppListScreen.styles';
import colors from '../../../colors/colors';
import {ScreenWidth} from '../../../utils/Dimensions';

const AppListScreen = ({navigation}) => {
  const themeContext = React.useContext(ThemeContext);
  const {theme} = themeContext;
  const [apps, setApps] = React.useState([]);
  const [search, setSearch] = React.useState(null);
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const isFocused = useIsFocused();

  const initializeApps = () => {
    InstalledApps.getApps((error, appListJson) => {
      if (appListJson) {
        const temp = JSON.parse(appListJson);
        temp.sort(function (a, b) {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        });
        setApps(temp);
      }
      setLoading(false);
    });
  };

  React.useEffect(() => {
    if (search && search.length > 0) {
      const condition = new RegExp(search);
      const res = apps.filter(el => {
        return condition.test(el.label);
      });
      setSearchResults(res);
    } else {
      setSearchResults([]);
    }
  }, [search]);

  React.useEffect(() => {
    if (isFocused) {
      console.log('isFocusedRun');
      initializeApps();
    }
  }, [isFocused]);

  const _handleOnPress = app => {
    InstalledApps.launchApplication(app.name);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        theme === 'dark' ? darkTheme.background : lightTheme.background,
      ]}>
      <SearchInput theme={theme} onChange={text => setSearch(text)} />
      <ScrollView contentContainerStyle={styles.paddingBottom}>
        {loading && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: ScreenWidth / 3,
            }}>
            <ActivityIndicator
              color={
                theme === 'dark' ? colors.white : colors.primary_background
              }
              animating={loading}
              size={24}
            />
          </View>
        )}
        {!search || search.length <= 0
          ? apps.map((app, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => _handleOnPress(app)}
                style={styles.appListItem}>
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
              </TouchableOpacity>
            ))
          : searchResults.map((app, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => _handleOnPress(app)}
                style={styles.appListItem}>
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
              </TouchableOpacity>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppListScreen;
