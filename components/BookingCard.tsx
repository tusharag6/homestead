import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Booking } from "@/types";
import colors from "@/constants/Colors";

export interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  return (
    <View style={styles.booking}>
      <Link href={`(routes)/listing/${booking.listing._id}`} asChild>
        <Pressable style={styles.pressable}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: booking.listing.listing_image_url }}
                style={styles.listImage}
              />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.roomType}>{booking.listing.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  Rs {booking.price ?? booking.listing.price}
                </Text>
                <Text style={styles.perNight}>/ night</Text>
              </View>
              <Text style={styles.dates}>
                {new Date(booking.startDate).toLocaleDateString()} -{" "}
                {new Date(booking.endDate).toLocaleDateString()}
              </Text>
              <Text style={styles.guests}>
                Guests: {booking.numberOfGuests}
              </Text>
              <Text style={styles.days}>Days: {booking.numberOfDays}</Text>
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  booking: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.light.border,
  },
  pressable: {
    borderRadius: 8,
    overflow: "hidden",
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  imageContainer: {
    marginRight: 10,
  },
  listImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  roomType: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  perNight: {
    fontSize: 14,
    color: "#666",
  },
  dates: {
    fontSize: 14,
    color: "#666",
  },
  guests: {
    fontSize: 14,
    color: "#666",
  },
  days: {
    fontSize: 14,
    color: "#666",
  },
});

export default BookingCard;
