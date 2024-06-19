import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const BottomLoginSheet = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      {/* <TouchableOpacity style={[defaultStyles.btn, styles.btnLight]}>
        <Ionicons name="logo-apple" size={14} style={styles.btnIcon} />
        <Text style={styles.btnLightText}>Continue with Apple</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={[defaultStyles.btn, styles.btnDark]}>
        <Ionicons
          name="logo-google"
          size={16}
          style={styles.btnIcon}
          color={"#fff"}
        />
        <Text style={styles.btnDarkText}>Continue with Google</Text>
      </TouchableOpacity>
      <Link
        href={"/register"}
        style={[defaultStyles.btn, styles.btnDark]}
        asChild
      >
        <TouchableOpacity>
          <Ionicons
            name="mail"
            size={20}
            style={styles.btnIcon}
            color={"#fff"}
          />
          <Text style={styles.btnDarkText}>Sign up with email</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href={"/login"}
        style={[defaultStyles.btn, { marginBottom: 10 }]}
        asChild
      >
        <TouchableOpacity>
          <Text style={styles.btnDarkText}>Log in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#000",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 26,
    gap: 14,
  },
  btnLight: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnLightText: {
    color: "#000",
    fontSize: 20,
    fontFamily: "mon-sb",
  },
  btnDark: {
    backgroundColor: Colors.grey,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnDarkText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "mon-sb",
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: Colors.grey,
  },
  btnIcon: {
    paddingRight: 6,
  },
});
export default BottomLoginSheet;
