import * as SecureStore from 'expo-secure-store';

// get value from secure store
const getSecureValue = async (key: string) => {
  let result;
  try {
    result = await SecureStore.getItemAsync(key);
  } catch (e) {
    // crashlytics().recordError(e);
  }
  return result ?? null;
};

// save value in secure store
const setSecureValue = async (key: string, value: string) => {
  try {
    return await SecureStore.setItemAsync(key, value);
  } catch (e) {
    // crashlytics().recordError(e);
  }
};

// delete secure store value
const deleteSecureValue = async (key: string) => {
  try {
    return await SecureStore.deleteItemAsync(key);
  } catch (e) {
    // crashlytics().recordError(e);
  }
};

export { getSecureValue, setSecureValue, deleteSecureValue };
