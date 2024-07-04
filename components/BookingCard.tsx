import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Booking } from "@/types";
import colors from "@/constants/Colors";
import { format } from "date-fns";

export interface BookingCardProps {
  booking: Booking;
}

const formatDate = (date: Date | undefined) => {
  return date ? format(date, "MMM d") : "";
};

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const startDate = booking.startDate;
  const endDate = booking.endDate;
  const selectedDates =
    startDate && endDate
      ? `${formatDate(new Date(startDate))} - ${formatDate(new Date(endDate))}`
      : "Select dates";

  return (
    <View style={styles.booking}>
      <Link href={`(routes)/reservation/${booking._id}`} asChild>
        <Pressable style={styles.pressable}>
          <View>
            <Image
              source={{ uri: booking.listing.listing_image_url }}
              style={styles.listImage}
            />
          </View>
          <View style={styles.detailsContainer}>
            <View>
              <Text style={styles.roomName}>{booking.listing.name}</Text>
              <Text style={styles.roomType}>
                {booking.listing.property_type}
              </Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.dates}>{selectedDates}</Text>
              <Text style={styles.address}>{booking.listing.address}</Text>
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
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.light.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  pressable: {
    borderRadius: 8,
    overflow: "hidden",
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  listImage: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  detailsContainer: {
    padding: 20,
  },
  roomName: {
    fontSize: 20,
    fontFamily: "mon-sb",
    marginBottom: 4,
  },
  roomType: {
    fontSize: 14,
    fontFamily: "mon",
    marginBottom: 4,
  },
  dates: {
    fontSize: 18,
    marginBottom: 2,
    borderRightWidth: 1,
    borderRightColor: colors.light.border,
    paddingRight: 4,
    width: 75,
    fontFamily: "mon",
    paddingHorizontal: 10,
  },
  address: {
    fontSize: 18,
    fontFamily: "mon",
    flex: 1,
    marginLeft: 4,
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.light.border,
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});

export default BookingCard;
