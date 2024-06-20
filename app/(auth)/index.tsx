import React from "react";
import { StyleSheet } from "react-native";
import Listings from "@/components/Listings";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const Page: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader />,
        }}
      />
      <Listings />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Page;
