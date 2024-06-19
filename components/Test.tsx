import React, { useState } from "react";
import { View, StyleSheet, Button as RNButton } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Button from "./Button";
import colors from "@/constants/Colors";

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "light" ? "#fff" : "#333" },
      ]}
    >
      <RNButton
        title="Toggle Theme"
        onPress={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      />

      <Button
        variant="default"
        size="default"
        startIcon={<Ionicons name="add" size={20} color="white" />}
        onPress={() => alert("Default Button Pressed")}
        theme={theme}
      >
        Default
      </Button>

      <Button
        variant="destructive"
        size="lg"
        // startIcon={<Icon name="delete" size={20} color="#fff" />}
        onPress={() => alert("Destructive Button Pressed")}
        theme={theme}
      >
        Destructive
      </Button>

      <Button
        variant="outline"
        size="sm"
        endIcon={<AntDesign name="arrowright" size={20} color="#000" />}
        onPress={() => alert("Outline Button Pressed")}
        theme={theme}
      >
        Outline
      </Button>

      <Button
        variant="link"
        // startIcon={<Icon name="link" size={20} color="#6200ea" />}
        onPress={() => alert("Link Button Pressed")}
        theme={theme}
      >
        Link
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});

export default App;
