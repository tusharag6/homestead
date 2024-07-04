import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import colors from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { registerTranslation, en } from "react-native-paper-dates";
import { format } from "date-fns";
import { useFetchListingByIdQuery } from "@/redux/listingApi";
import ListingLoader from "@/components/ListingLoader";
import { useFetchBookingByIdQuery } from "@/redux/bookingApi";

registerTranslation("en", en);

interface DateRange {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const DetailsPage = () => {
  const { id } = useLocalSearchParams();

  const { data: bookings, isFetching: isFetchingBookings } =
    useFetchBookingByIdQuery(id as string);
  const listingId = bookings?.data.listing;
  const {
    data: listing,
    isFetching,
    error,
  } = useFetchListingByIdQuery(listingId as string);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (bookings?.data) {
      navigation.setOptions({
        headerTitle: "",
        headerTransparent: true,
        headerBackground: () => <View style={[styles.header]}></View>,
        headerLeft: () => (
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close-outline" size={24} color={"#000"} />
          </TouchableOpacity>
        ),
      });
    }
  }, [bookings?.data]);

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "MMM d") : "";
  };

  return (
    <View style={styles.mainContainer}>
      {isFetching ? (
        <View style={styles.loadingContainer}>
          <ListingLoader />
        </View>
      ) : !error ? (
        <View style={styles.mainContainer}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
          >
            <Image
              source={{ uri: listing?.data?.listing_image_url }}
              style={styles.image}
            />
            <View style={styles.container}>
              <Text style={styles.name}>{listing?.data?.name}</Text>
              <Text style={styles.locationText}>{listing?.data.address}</Text>
            </View>

            {/* Check-in and Check-out */}
            <View style={styles.datesContainer}>
              <View style={styles.dateItem}>
                <Text style={styles.dateTitle}>Check-in</Text>
                <Text style={styles.dateValue}>
                  {formatDate(new Date(bookings?.data?.startDate ?? ""))}
                </Text>
              </View>
              <View style={styles.verticalBorder} />
              <View style={styles.dateItem}>
                <Text style={styles.dateTitle}>Check-out</Text>
                <Text style={styles.dateValue}>
                  {formatDate(new Date(bookings?.data?.endDate ?? ""))}
                </Text>
              </View>
            </View>

            {/* Show listing */}
            <Link href={`(routes)/listing/${listingId}`} asChild>
              <Button
                startIcon={<FontAwesome name="list" size={24} color="black" />}
                endIcon={
                  <Ionicons name="chevron-forward" size={24} color="black" />
                }
                variant="ghost"
                textStyle={styles.buttonText}
                style={styles.button}
                iconPlacement="separate"
              >
                Show listing
              </Button>
            </Link>
            {/* Reservation Details */}
            <View style={styles.container}>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsTitle}>Who's coming</Text>
                <Text style={styles.detailsValue}>
                  {bookings?.data.numberOfGuests} Guest
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsTitle}>Confirmation Code</Text>
                <Text style={styles.detailsValue}>ABCDE</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsTitle}>Payment</Text>
                <Text style={styles.detailsValue}>
                  Rs {bookings?.data.price}
                </Text>
              </View>
            </View>

            {/* Rules */}
            <View style={styles.container}>
              <Text style={styles.sectionTitle}>House rules</Text>
              <View style={styles.rulesContainer}>
                {listing?.data?.house_rules.split(".").map((rule, index) => {
                  if (rule.trim() === "") return null;
                  return (
                    <View key={index} style={styles.ruleWrapper}>
                      <Text style={styles.ruleText}>{rule.trim()}.</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={styles.container}>
              <Text style={styles.sectionTitle}>Cancellation rules</Text>
              <Text style={styles.ruleText}>
                Free cancellation for 48 hours
              </Text>
              <Text style={styles.ruleText}>
                This booking is non-refundable
              </Text>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.errorText}>Error</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    // paddingBottom: 80,
  },
  container: {
    paddingVertical: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 24,
    marginVertical: 8,
    fontFamily: "mon-sb",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 18,
    fontFamily: "mon",
  },
  reviewCountText: {
    marginLeft: 4,
    fontSize: 18,
    fontFamily: "mon",
  },
  locationText: {
    fontSize: 16,
    color: colors.light.secondaryForeground,
    marginVertical: 4,
    fontFamily: "mon",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "mon-sb",
    marginVertical: 8,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "mon",
    color: colors.light.secondaryForeground,
  },
  amenitiesContainer: {
    marginVertical: 8,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  amenityText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "mon",
  },
  reviewContainer: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.light.border,
    borderRadius: 8,
    padding: 12,
  },
  reviewText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.light.secondaryForeground,
    fontFamily: "mon",
  },
  reviewerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  reviewerDetails: {
    marginLeft: 8,
  },
  reviewerName: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: "mon",
    color: colors.light.secondaryForeground,
  },
  rulesContainer: {
    marginTop: 8,
  },
  ruleWrapper: {
    marginBottom: 8,
  },
  ruleText: {
    fontSize: 14,
    fontFamily: "mon",
    marginVertical: 2,
  },
  errorText: {
    fontSize: 18,
    color: colors.light.destructive,
    textAlign: "center",
    marginVertical: 16,
  },
  header: {
    backgroundColor: "transparent",
    height: 100,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: colors.light.primary,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  footer: {
    position: "static",
    height: 60,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: colors.light.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",
    gap: 2,
  },
  footerDate: {
    fontSize: 12,
    fontFamily: "mon",
    textDecorationLine: "underline",
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  datesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  dateItem: {
    flex: 1,
    alignItems: "center",
  },
  verticalBorder: {
    width: 1,
    height: "100%",
    backgroundColor: colors.light.border,
    marginHorizontal: 8,
  },
  dateTitle: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  dateValue: {
    fontSize: 16,
    fontFamily: "mon",
    color: colors.light.secondaryForeground,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  detailsTitle: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  detailsValue: {
    fontSize: 16,
    fontFamily: "mon",
    color: colors.light.secondaryForeground,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  button: {
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
    borderTopWidth: 1,
    borderTopColor: colors.light.border,
  },
});

export default DetailsPage;
