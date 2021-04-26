import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/routes';
import {ThemeProvider} from './src/context/auth/ThemeContext';
import {getTheme, storeTheme} from './src/utils/storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [theme, setTheme] = React.useState('dark');
  const [loading, setLoading] = React.useState(true);
  const updateTheme = data => {
    setTheme(prev => {
      storeTheme(data);
      return data;
    });
  };
  const fetchTheme = async () => {
    const res = await getTheme();
    if (res) {
      setTheme(res);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    fetchTheme();
  }, []);
  return (
    <ThemeProvider
      value={{
        theme,
        updateTheme,
      }}>
      <SafeAreaProvider>
        <NavigationContainer>{!loading && <Routes />}</NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
