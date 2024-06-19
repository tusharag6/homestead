import { View, Image, StyleSheet } from "react-native";
import React from "react";

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/onboarding-2.jpeg")}
        style={styles.image}
      />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
  },
});
