import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadUserFromAsyncStorage = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  const user = await AsyncStorage.getItem("user");
  return {
    refreshToken,
    accessToken,
    user: user ? JSON.parse(user) : null,
  };
};
