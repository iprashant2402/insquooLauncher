import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/routes';
import {SettingsProvider} from './src/context/auth/SettingsContext';
import {getSettings, getTheme, storeSettings, storeTheme} from './src/utils/storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  const [settings, setSettings] = React.useState({
    theme: 'dark',
    showTime: false,
    showDate: true,
    showAppIcons: true,
    showStatusBar: true,
  });
  const [loading, setLoading] = React.useState(true);
  const updateSettings = data => {
    setSettings(prev => {
      storeSettings(data);
      return data;
    });
  };
  const fetchSettings = async () => {
    const res = await getSettings();
    if (res) {
      setSettings(res);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    fetchSettings();
  }, []);
  return (
    <SettingsProvider
      value={{
        settings,
        updateSettings,
      }}>
      <SafeAreaProvider>
        <NavigationContainer>{!loading && <Routes />}</NavigationContainer>
      </SafeAreaProvider>
    </SettingsProvider>
  );
}
