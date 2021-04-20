import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeStarredApps = async apps => {
  try {
    const temp = JSON.stringify(apps);
    const res = await AsyncStorage.setItem('@starredApps', temp);
    return true;
  } catch (e) {
    return false;
  }
};

export const getStarredApps = async () => {
  try {
    const res = await AsyncStorage.getItem('@starredApps');
    if (res !== null) {
      return JSON.parse(res);
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export const storeTheme = async value => {
  try {
    const res = await AsyncStorage.setItem('@theme', value);
    return true;
  } catch (e) {
    return false;
  }
};

export const getTheme = async () => {
  try {
    const res = await AsyncStorage.getItem('@theme');
    if (res !== null) {
      return res;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
