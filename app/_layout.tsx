import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { FilterProvider } from "@/context/FilterContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { RootSiblingParent } from "react-native-root-siblings";
import { useAppSelector } from "@/redux/hooks";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <WishlistProvider>
      <FilterProvider>
        <Provider store={store}>
          <RootSiblingParent>
            <RootLayoutNav />
          </RootSiblingParent>
        </Provider>
      </FilterProvider>
    </WishlistProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.replace("/(routes)/onboarding");
    } else {
      router.replace("/(tabs)");
    }
  }, [auth]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(routes)/login" />
      <Stack.Screen name="(routes)/register" />
      <Stack.Screen
        name="(routes)/booking/[id]"
        options={{
          title: "Confirm your booking",
          headerTitleStyle: {
            fontFamily: "mon-sb",
          },
        }}
      />
      <Stack.Screen
        name="(modals)/filter"
        options={{
          presentation: "modal",
          title: "Filters",
          headerTitleStyle: {
            fontFamily: "mon-sb",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 6 }}
            >
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/personal"
        options={{
          presentation: "modal",
          title: "Personal Information",
          headerTitleStyle: {
            fontFamily: "mon-sb",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 6 }}
            >
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
