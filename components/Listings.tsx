import React, { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
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

interface Listing {
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
}

const Listings: React.FC = () => {
  const [listingData, setListingData] = useState<Listing[]>([]);
  const [nextPage, setNextPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // const fetchListings = useCallback(async () => {
  //   if (loading) return;
  //   console.log("Fetching page : ", nextPage);

  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       `http://192.168.1.10:5000/api/v1/listings/all?page=${nextPage}&limit=10`
  //     );
  //     if (res.ok) {
  //       const responseJson = await res.json();
  //       const listings: Listing[] = responseJson.data.listings;
  //       setListingData((existingListings) => [
  //         ...existingListings,
  //         ...listings,
  //       ]);
  //       setNextPage(responseJson.data.next.page);
  //     } else {
  //       console.error("Failed to fetch listings");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching listings:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [nextPage, loading]);
  const fetchListings = async () => {
    if (loading) return;
    console.log("Fetching page : ", nextPage);

    setLoading(true);
    try {
      const res = await fetch(
        `http://192.168.1.10:5000/api/v1/listings/all?page=${nextPage}&limit=10`
      );
      if (res.ok) {
        const responseJson = await res.json();
        const listings: Listing[] = responseJson.data.listings;
        setListingData((existingListings) => [
          ...existingListings,
          ...listings,
        ]);
        // console.log(listings.length);
        setNextPage(responseJson.data.next.page);
      } else {
        console.error("Failed to fetch listings");
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("use effect");
    fetchListings();
  }, []);

  const filterContext = useContext(FilterContext);

  if (!filterContext) {
    throw new Error("FilterContext must be used within a FilterProvider");
  }

  const { isGridMode } = filterContext;

  console.log("Re render");

  return (
    <View style={styles.container}>
      <FlatList
        data={listingData}
        renderItem={({ item }) => (
          <ListingCard item={item} isGridMode={isGridMode} />
        )}
        keyExtractor={(item) => item._id}
        numColumns={isGridMode ? 2 : 1}
        key={isGridMode ? "grid" : "list"}
        // onEndReached={() => {
        //   // fetchListings();
        //   console.log("On end reached");
        // }}
        // onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default Listings;
