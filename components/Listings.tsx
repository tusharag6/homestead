import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListingCard from "@/components/ListingCard";
import FilterContext from "@/context/FilterContext";
import ListingLoader from "./ListingLoader";
import { useFetchListingsQuery } from "@/redux/listingApi";
import { Listing } from "@/types";

const Listings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [page, setPage] = useState(0);
  const filterContext = useContext(FilterContext);

  const { data, isFetching } = useFetchListingsQuery({
    page,
    limit: 10,
  });

  useEffect(() => {
    if (data) {
      setListings((prevListings) => [...prevListings, ...data.data.listings]);
    }
  }, [data]);

  if (!filterContext) {
    throw new Error("FilterContext must be used within a FilterProvider");
  }

  const { isGridMode } = filterContext;

  return (
    <View style={styles.container}>
      <FlatList
        data={listings}
        renderItem={({ item }) => (
          <ListingCard item={item} isGridMode={isGridMode} />
        )}
        keyExtractor={(item) => item._id}
        numColumns={isGridMode ? 2 : 1}
        key={isGridMode ? "grid" : "list"}
        onEndReachedThreshold={1}
        onEndReached={() => {
          setPage(page + 1);
        }}
        ListFooterComponent={
          isFetching ? (
            <View style={styles.loadingContainer}>
              <ListingLoader />
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default Listings;
