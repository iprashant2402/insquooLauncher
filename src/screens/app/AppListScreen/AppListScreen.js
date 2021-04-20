import React from 'react';
import {
  View,
  Text,
  NativeModules,
  BackHandler,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  darkBackground,
  darkText,
  darkTheme,
  lightText,
  lightTheme,
} from '../../../colors/theme';
import Button from '../../../components/Button/Button';
import SearchInput from '../../../components/SearchInput/SearchInput';
import {ThemeContext} from '../../../context/auth/ThemeContext';
import {logout} from '../../../utils/auth';
import {InstalledApps} from '../../../utils/InstalledApps';
import styles from './AppListScreen.styles';

const AppListScreen = ({navigation}) => {
  const themeContext = React.useContext(ThemeContext);
  const {theme} = themeContext;
  const [apps, setApps] = React.useState([]);
  const [search, setSearch] = React.useState(null);
  const [searchResults, setSearchResults] = React.useState([]);

  const initializeApps = () => {
    const temp = JSON.parse(InstalledApps.getApps);
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
    initializeApps();
  }, []);

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    return BackHandler.removeEventListener('hardwareBackPress');
  }, []);

  const _handleOnPress = app => {
    InstalledApps.launchApplication(app.name);
  };

  return (
    <View
      style={[
        styles.container,
        theme === 'dark' ? darkTheme.background : lightTheme.background,
      ]}>
      <SearchInput theme={theme} onChange={text => setSearch(text)} />
      <ScrollView contentContainerStyle={styles.paddingBottom}>
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
    </View>
  );
};

export default AppListScreen;
