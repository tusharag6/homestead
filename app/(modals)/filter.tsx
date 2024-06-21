import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import colors from "@/constants/Colors";
import { Switch } from "react-native-paper";
import FilterContext, { FilterProvider } from "@/context/FilterContext";

const Filters = () => {
  const filterContext = useContext(FilterContext);

  if (!filterContext) {
    throw new Error("FilterContext must be used within a FilterProvider");
  }

  const { isGridMode, toggleGridMode } = filterContext;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Grid Layout</Text>
          <Switch value={isGridMode} onValueChange={toggleGridMode} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Filters;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  container: {
    paddingVertical: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
});
