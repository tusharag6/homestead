import React from "react";
import { StyleSheet, View } from "react-native";
import Listings from "@/components/Listings";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";

const Page: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View>
        <Stack.Screen
          options={{
            header: () => <ExploreHeader />,
          }}
        />
      </View>
      <View>
        <Listings />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Page;
