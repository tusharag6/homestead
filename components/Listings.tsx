import React, { useContext } from "react";
import { FlatList, StyleSheet, View, ViewStyle } from "react-native";
import ListingCard from "@/components/ListingCard";
import FilterContext from "@/context/FilterContext";

export const mockData = [
  {
    id: "1",
    image_url:
      "https://a0.muscache.com/im/pictures/81dca5d6-5a86-49bc-8eca-4a8610a07d27.jpg",
    name: "Cozy Apartment",
    review_scores_rating: 90,
    room_type: "Entire home/apt",
    price: 1200,
  },
  {
    id: "2",
    image_url:
      "https://a0.muscache.com/im/pictures/miso/Hosting-43553913/original/3a48029d-8cba-4af0-8a88-3e770b3fa370.jpeg?im_w=720",
    name: "Modern House",
    review_scores_rating: 96,
    room_type: "Private room",
    price: 2000,
  },
  {
    id: "3",
    image_url:
      "https://a0.muscache.com/im/pictures/81dca5d6-5a86-49bc-8eca-4a8610a07d27.jpg",
    name: "Cozy Apartment",
    review_scores_rating: 90,
    room_type: "Entire home/apt",
    price: 1200,
  },
  {
    id: "4",
    image_url:
      "https://a0.muscache.com/im/pictures/miso/Hosting-43553913/original/3a48029d-8cba-4af0-8a88-3e770b3fa370.jpeg?im_w=720",
    name: "Modern House",
    review_scores_rating: 96,
    room_type: "Private room",
    price: 2000,
  },
];

const Listings: React.FC = () => {
  const filterContext = useContext(FilterContext);

  if (!filterContext) {
    throw new Error("FilterContext must be used within a FilterProvider");
  }

  const { isGridMode } = filterContext;

  return (
    <View style={styles.container}>
      <FlatList
        data={mockData}
        renderItem={({ item }) => (
          <ListingCard item={item} isGridMode={isGridMode} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={isGridMode ? 2 : 1}
        key={isGridMode ? "grid" : "list"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

export default Listings;
