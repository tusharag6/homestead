import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

interface ListingCardProps {
  item: {
    id: string;
    image_url: string;
    name: string;
    review_scores_rating: number;
    room_type: string;
    price: number;
  };
  isGridMode: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ item, isGridMode }) => {
  return (
    <Link
      href={`/listing/${item.id}`}
      asChild
      style={isGridMode ? styles.gridCard : styles.listCard}
    >
      <TouchableOpacity>
        <View style={styles.listing}>
          <Image
            source={{ uri: item.image_url }}
            style={isGridMode ? styles.gridImage : styles.listImage}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "500", fontSize: 16 }}>{item.name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 6,
              }}
            >
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={{ fontWeight: "500", marginLeft: 3 }}>
                {(item.review_scores_rating / 20).toFixed(1)}
              </Text>
            </View>
          </View>
          <Text>{item.room_type}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Text style={{ fontWeight: "500" }}>Rs {item.price}</Text>
            <Text>/ night</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  listing: {
    gap: 6,
    marginVertical: 6,
    padding: 10,
  },
  listCard: {
    flex: 1,
    marginVertical: 6,
  },
  gridCard: {
    flex: 1,
  },
  listImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  gridImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
});

export default ListingCard;
