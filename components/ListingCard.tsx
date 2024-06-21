import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

interface ListingCardProps {
  item: {
    id: string;
    medium_url: string;
    name: string;
    review_scores_rating: number;
    room_type: string;
    price: number;
  };
}

const ListingCard: React.FC<ListingCardProps> = ({ item }) => {
  return (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.listing}>
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "500", fontSize: 16 }}>{item.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={{ fontWeight: "500", marginLeft: 4 }}>
                {(item.review_scores_rating / 20).toFixed(1)}
              </Text>
            </View>
          </View>
          <Text>{item.room_type}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Text style={{ fontWeight: "500" }}>€ {item.price}</Text>
            <Text>/ night</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 6,
    marginVertical: 6,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});

export default ListingCard;
