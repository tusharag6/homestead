import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFetchBookingQuery } from "@/redux/bookingApi";
import ListingCard from "@/components/ListingCard";
import BookingCard from "@/components/BookingCard";
import { SafeAreaView } from "react-native-safe-area-context";

const Booking = () => {
  const { data: bookings, isFetching } = useFetchBookingQuery();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={styles.screenHeader}>Your Bookings</Text>
        </View>
        {!bookings || bookings.data.length === 0 ? (
          <View style={styles.body}>
            <Text style={styles.title}>No Bookings Found</Text>
            <Text style={styles.description}>
              You currently have no bookings. Start exploring and book your
              favorite places and experiences.
            </Text>
          </View>
        ) : (
          <FlatList
            data={bookings?.data}
            renderItem={({ item }) => <BookingCard booking={item} />}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Booking;

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
