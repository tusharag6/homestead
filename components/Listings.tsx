import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ListingCard from "@/components/ListingCard";

export const mockData = [
  {
    id: "1",
    medium_url:
      "https://a0.muscache.com/im/pictures/81dca5d6-5a86-49bc-8eca-4a8610a07d27.jpg",
    name: "Cozy Apartment",
    review_scores_rating: 90,
    room_type: "Entire home/apt",
    price: 120,
  },
  {
    id: "2",
    medium_url:
      "https://a0.muscache.com/im/pictures/miso/Hosting-43553913/original/3a48029d-8cba-4af0-8a88-3e770b3fa370.jpeg?im_w=720",
    name: "Modern House",
    review_scores_rating: 96,
    room_type: "Private room",
    price: 200,
  },
  {
    id: "3",
    medium_url:
      "https://a0.muscache.com/im/pictures/81dca5d6-5a86-49bc-8eca-4a8610a07d27.jpg",
    name: "Cozy Apartment",
    review_scores_rating: 90,
    room_type: "Entire home/apt",
    price: 120,
  },
  {
    id: "4",
    medium_url:
      "https://a0.muscache.com/im/pictures/miso/Hosting-43553913/original/3a48029d-8cba-4af0-8a88-3e770b3fa370.jpeg?im_w=720",
    name: "Modern House",
    review_scores_rating: 96,
    room_type: "Private room",
    price: 200,
  },
];

const Listings: React.FC = () => {
  return (
    <FlatList
      data={mockData}
      renderItem={({ item }) => <ListingCard item={item} />}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

export default Listings;
