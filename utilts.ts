import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadUserFromAsyncStorage = async () => {
  const token = await AsyncStorage.getItem("token");
  const user = await AsyncStorage.getItem("user");
  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
};
