import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "./Button";

const BottomLoginSheet = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <Button
        textStyle={{ color: "white" }}
        variant={"outline"}
        startIcon={
          <Ionicons
            name="logo-google"
            size={16}
            style={styles.btnIcon}
            color={"#fff"}
          />
        }
      >
        Continue with Google
      </Button>
      <Link href={"(routes)/register"} asChild>
        <Button
          textStyle={{ color: "black" }}
          variant="secondary"
          startIcon={
            <Ionicons
              name="mail"
              size={20}
              style={styles.btnIcon}
              color={"black"}
            />
          }
        >
          Sign up with email
        </Button>
      </Link>
      <Link href={"(routes)/login"} style={{ marginBottom: 10 }} asChild>
        <Button>Log In</Button>
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
  btnIcon: {
    paddingRight: 6,
  },
});

export default BottomLoginSheet;
