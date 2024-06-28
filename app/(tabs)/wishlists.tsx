import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useWishlist } from "@/hooks/useWishlist";
import ListingCard from "@/components/ListingCard";

const Wishlists = () => {
  const { state } = useWishlist();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.screenHeader}>Wishlist</Text>
      </View>
      {!state || state.items.length === 0 ? (
        <View style={styles.body}>
          <Text style={styles.title}>Create your wishlist</Text>
          <Text style={styles.description}>
            As you search, tap the heart icon to save your favorite places and
            experiences.
          </Text>
        </View>
      ) : (
        <FlatList
          data={state.items}
          renderItem={({ item }) => (
            <ListingCard item={item} isGridMode={false} />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default Wishlists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  screenHeader: {
    paddingVertical: 30,
    fontSize: 26,
    fontFamily: "mon-sb",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "mon-sb",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "mon",
    textAlign: "center",
    marginTop: 10,
  },
  list: {
    // paddingTop: 20,
  },
});
