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
  Alert,
} from 'react-native';
import {darkTheme, lightTheme} from '../../../colors/theme';
import SearchInput from '../../../components/SearchInput/SearchInput';
import {ThemeContext} from '../../../context/auth/ThemeContext';
import {InstalledApps} from '../../../utils/InstalledApps';
import styles from './AppListScreen.styles';
import colors from '../../../colors/colors';
import {ScreenWidth} from '../../../utils/Dimensions';
import PopupMenu from '../../../components/PopupMenu/PopupMenu';

const AppListScreen = ({navigation}) => {
  const themeContext = React.useContext(ThemeContext);
  const {theme} = themeContext;
  const isFocused = useIsFocused();

  const [apps, setApps] = React.useState([]);

  const [search, setSearch] = React.useState(null);
  const [searchResults, setSearchResults] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  const [selectedApp, setSelectedApp] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

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

  const uninstallApp = app => {
    InstalledApps.uninstallApp(`package:${app?.name}`);
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
        (showDialog || showConfirmation) && {opacity: 0.1},
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
                onLongPress={() => {
                  setSelectedApp(app);
                  setShowDialog(true);
                }}
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
      <PopupMenu
        options={[
          {
            text: `Hide ${selectedApp?.label}`,
            onclick: () => {
              return true;
            },
          },
          {
            text: `Uninstall ${selectedApp?.label}`,
            onclick: () => {
              setShowDialog(false);
              uninstallApp(selectedApp);
            },
          },
        ]}
        theme={theme}
        close={() => setShowDialog(false)}
        modalVisible={showDialog}
      />
    </SafeAreaView>
  );
};

export default AppListScreen;
