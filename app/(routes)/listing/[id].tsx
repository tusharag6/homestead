import {
  Link,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";
import colors from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import {
  DatePickerModal,
  registerTranslation,
  en,
} from "react-native-paper-dates";
import { format } from "date-fns";
import { useFetchListingByIdQuery } from "@/redux/listingApi";
import ListingLoader from "@/components/ListingLoader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBookingDetails } from "@/redux/bookingSlice";
import DatePicker from "@/components/DatePicker";
import { showToast } from "@/components/Toast";
import { useWishlist } from "@/hooks/useWishlist";
import { Listing } from "@/types";

registerTranslation("en", en);

interface DateRange {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const {
    data: listing,
    isFetching,
    error,
  } = useFetchListingByIdQuery(id as string);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const handleDateChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
  };

  const shareListing = async () => {
    const message = `
      Check out this amazing accommodation!
      
      🏠 ${listing?.data.name}
      📍 ${listing?.data.address}
      💵 Price: Rs ${listing?.data.price} per night
      ⭐ Rating: ${listing?.data.review_scores_rating} (${listing?.data.number_of_reviews} reviews)
      
      For more details and to book your stay, visit: ${listing?.data.listing_image_url}
    `;

    try {
      await Share.share({
        title: `Check out this accommodation: ${listing?.data.name}`,
        message: message,
        url: listing?.data.listing_image_url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const { state, dispatch: dispatchWishlist } = useWishlist();
  const isInWishlist = state.items.some(
    (wishlistItem) => wishlistItem._id === listing?.data._id
  );

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatchWishlist({
        type: "REMOVE_ITEM",
        payload: { id: listing?.data._id as string },
      });
    } else {
      dispatchWishlist({ type: "ADD_ITEM", payload: listing?.data as Listing });
    }
  };

  useLayoutEffect(() => {
    if (listing?.data) {
      navigation.setOptions({
        headerTitle: "",
        headerTransparent: true,
        headerBackground: () => <View style={[styles.header]}></View>,
        headerRight: () => (
          <View style={styles.bar}>
            <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
              <Ionicons name="share-outline" size={22} color={"#000"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={toggleWishlist}
            >
              <Ionicons
                name={isInWishlist ? "heart" : "heart-outline"}
                size={22}
                color={isInWishlist ? "red" : "black"}
              />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={"#000"} />
          </TouchableOpacity>
        ),
      });
    }
  }, [listing?.data, isInWishlist]);

  const handleReserve = () => {
    if (!startDate && !endDate) {
      showToast("Please select check-in and check-out dates");
      return;
    }

    const payload = {
      listing: listing?.data,
      numberOfGuests: 1,
      numberOfDays: 1,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    };
    router.push(`(routes)/booking/${id}`);
    dispatch(setBookingDetails(payload));
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
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="black" />
                <Text style={styles.ratingText}>
                  {listing?.data?.review_scores_rating}
                </Text>
                <Text style={styles.reviewCountText}>
                  · {listing?.data.number_of_reviews} reviews
                </Text>
              </View>
              <Text style={styles.locationText}>{listing?.data.address}</Text>
            </View>

            {/* Description */}
            <View style={styles.container}>
              <Text style={styles.sectionTitle}>About this place</Text>
              <View style={styles.rulesContainer}>
                {(listing?.data.description ?? "")
                  .split(".")
                  .map((desc, index) => {
                    if (desc.trim() === "") return null;
                    return (
                      <View key={index} style={styles.ruleWrapper}>
                        <Text style={styles.ruleText}>{desc.trim()}.</Text>
                      </View>
                    );
                  })}
              </View>
            </View>

            {/* Amenities */}
            <View style={styles.container}>
              <Text style={styles.sectionTitle}>What this place offers</Text>
              <View style={styles.amenitiesContainer}>
                <View style={styles.amenityItem}>
                  <Ionicons name="camera-outline" size={24} color="black" />
                  <Text style={styles.amenityText}>
                    Security cameras on property
                  </Text>
                </View>
                <View style={styles.amenityItem}>
                  <Ionicons name="wifi-outline" size={24} color="black" />
                  <Text style={styles.amenityText}>Wifi</Text>
                </View>
              </View>
              <Button variant="outline">Show all amenities</Button>
            </View>

            {/* Reviews */}
            <View style={styles.container}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={18} color="black" />
                <Text style={styles.ratingText}>
                  {listing?.data?.review_scores_rating}
                </Text>
                <Text style={styles.reviewCountText}>· 22 reviews</Text>
              </View>
              <View style={styles.reviewContainer}>
                <Text style={styles.reviewText}>
                  While travelling for work, I stopped for one night at Golwen &
                  Dorothee place. It feels great in this unit, enough to
                  recharge the ...
                </Text>
                <View style={styles.reviewerContainer}>
                  <FontAwesome name="user-circle" size={24} color="black" />
                  <View style={styles.reviewerDetails}>
                    <Text style={styles.reviewerName}>Margot</Text>
                    <Text style={styles.reviewDate}>4 months ago</Text>
                  </View>
                </View>
              </View>
              <Button variant="outline">Show all reviews</Button>
            </View>

            {/* Rules */}
            <View style={styles.container}>
              <Text style={styles.sectionTitle}>House rules</Text>
              <View style={styles.rulesContainer}>
                {(listing?.data?.house_rules ?? "")
                  .split(".")
                  .map((rule, index) => {
                    if (rule.trim() === "") return null; // Skip empty strings
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
          <View style={styles.footer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={styles.footerText}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={styles.footerPrice}>
                    Rs {listing?.data?.price}
                  </Text>
                  <Text> / night</Text>
                </View>
                <DatePicker onDateChange={handleDateChange} />
              </View>

              <Button
                onPress={handleReserve}
                disabled={!startDate && !endDate}
                style={
                  !startDate && !endDate ? { opacity: 0.5 } : { opacity: 1 }
                }
              >
                Reserve
              </Button>
            </View>
          </View>
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
    paddingBottom: 80,
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
});

export default DetailsPage;
