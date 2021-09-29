import AsyncStorage from '@react-native-async-storage/async-storage';

// get value from store
const getStoreValue = async (key: string) => {
  let result;
  try {
    result = await AsyncStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
  } catch (e) {}
  return null;
};

// save value in store
const setStoreValue = async (key: string, value: Object) => {
  try {
    const jsonValue = JSON.stringify(value);
    return await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

// delete store value
const deleteStoreValue = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {}
};

export { getStoreValue, setStoreValue, deleteStoreValue };
