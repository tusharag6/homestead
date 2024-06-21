import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import FilterContext from "@/context/FilterContext";

interface ListingCardProps {
  item: {
    id: string;
    image_url: string;
    name: string;
    review_scores_rating: number;
    room_type: string;
    price: number;
  };
}

const ListingCard: React.FC<ListingCardProps> = ({ item }) => {
  const filterContext = useContext(FilterContext);

  if (!filterContext) {
    throw new Error("FilterContext must be used within a FilterProvider");
  }

  const { isGridMode } = filterContext;

  const listingStyle = {
    ...styles.listing,
    padding: isGridMode ? 8 : 16,
  };

  const imageStyle = {
    ...styles.image,
    height: isGridMode ? 150 : 300,
  };

  return (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={listingStyle}>
          <Image source={{ uri: item.image_url }} style={imageStyle} />
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
              <Ionicons
                name="star"
                size={isGridMode ? 14 : 16}
                color="#FFD700"
              />
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
  },
  image: {
    width: "100%",
    borderRadius: 10,
  },
});

export default ListingCard;
