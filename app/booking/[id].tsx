import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { mockData as listingsData } from "@/components/Listings";
import colors from "@/constants/Colors";
import Button from "@/components/Button";

const Booking = () => {
  const { id } = useLocalSearchParams();
  const listing = listingsData.find((item) => item.id === id);

  if (!listing) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Listing not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.listingDetailsContainer}>
          <Image source={{ uri: listing.image_url }} style={styles.image} />
          <View style={styles.listingTextContainer}>
            <Text style={styles.name}>{listing.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="black" />
              <Text style={styles.ratingText}>4.95</Text>
              <Text style={styles.reviewCountText}>(22)</Text>
            </View>
          </View>
        </View>

        <View style={styles.tripDetailsContainer}>
          <Text style={styles.sectionTitle}>Your Trip</Text>
          <View style={styles.detailItem}>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailLabel}>Dates</Text>
              <Text style={styles.detailValue}>Aug 1 - 2</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailItem}>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailLabel}>Guests</Text>
              <Text style={styles.detailValue}>1 Guest</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.priceDetailsContainer}>
          <Text style={styles.sectionTitle}>Your Total</Text>
          <View style={{ marginBottom: 5 }}>
            <View style={styles.priceDetailItem}>
              <Text style={styles.priceDetailLabel}>1 night</Text>
              <Text style={styles.priceDetailValue}>Rs 780.67</Text>
            </View>
            <View style={styles.priceDetailItem}>
              <Text style={styles.priceDetailLabel}>Taxes</Text>
              <Text style={styles.priceDetailValue}>Rs 54.25</Text>
            </View>
          </View>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceLabel}>Total</Text>
            <Text style={styles.totalPriceValue}>Rs 834.92</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button>Continue</Button>
      </View>
    </SafeAreaView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 80,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: colors.light.destructive,
    textAlign: "center",
    marginVertical: 16,
  },
  listingDetailsContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  image: {
    width: "50%",
    height: 90,
    borderRadius: 8,
  },
  listingTextContainer: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "mon-sb",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
    fontFamily: "mon",
  },
  reviewCountText: {
    marginLeft: 4,
    fontSize: 16,
    color: colors.light.secondaryForeground,
    fontFamily: "mon",
  },
  tripDetailsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 16,
    fontFamily: "mon-sb",
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.light.secondaryForeground,
    fontFamily: "mon",
  },
  detailValueContainer: {
    flexDirection: "column",
  },
  detailValue: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
  editText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.light.primary,
    textDecorationLine: "underline",
  },
  priceDetailsContainer: {
    padding: 16,
  },
  priceDetailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  priceDetailLabel: {
    fontSize: 14,
    color: colors.light.secondaryForeground,
    fontFamily: "mon",
  },
  priceDetailValue: {
    fontSize: 14,
    fontFamily: "mon",
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.light.border,
  },
  totalPriceLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPriceValue: {
    fontSize: 16,
    fontFamily: "mon-b",
  },
  footer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: colors.light.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
