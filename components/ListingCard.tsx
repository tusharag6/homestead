import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useWishlist } from "@/hooks/useWishlist";

interface ListingCardProps {
  item: {
    _id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    house_rules: string;
    listing_image_url: string;
    amenities: [string];
    price: number;
    review_scores_rating: number;
    number_of_reviews: number;
    room_type: string;
    property_type: string;
    accommodates: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  };
  isGridMode: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ item, isGridMode }) => {
  useEffect(() => {
    console.log("use effect card");
    // console.log("====================================");
    // console.log(item);
    // console.log("====================================");
  });

  const { state, dispatch } = useWishlist();
  const isInWishlist = state.items.some(
    (wishlistItem) => wishlistItem._id === item._id
  );

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: "REMOVE_ITEM", payload: { id: item._id } });
    } else {
      dispatch({ type: "ADD_ITEM", payload: item });
    }
  };

  return (
    <View style={isGridMode ? styles.gridCard : styles.listCard}>
      <TouchableOpacity onPress={toggleWishlist} style={styles.heartIcon}>
        <Ionicons
          name={isInWishlist ? "heart" : "heart-outline"}
          size={24}
          color={isInWishlist ? "red" : "black"}
        />
      </TouchableOpacity>
      <Link href={`/listing/${item._id}`} asChild>
        <TouchableOpacity>
          <View style={styles.listing}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.listing_image_url }}
                style={isGridMode ? styles.gridImage : styles.listImage}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 6,
                }}
              >
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={{ fontWeight: "500", marginLeft: 3 }}>
                  {item.review_scores_rating}
                </Text>
              </View>
            </View>
            <Text>{item.room_type}</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text style={{ fontWeight: "500" }}>Rs {item.price * 50} </Text>
              <Text>/ night</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
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
  imageContainer: {
    position: "relative",
  },
  heartIcon: {
    position: "absolute",
    top: 20,
    right: 15,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 8,
    zIndex: 1,
  },
});

export default ListingCard;
