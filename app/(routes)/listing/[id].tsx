import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState, useEffect } from "react";
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

  const [range, setRange] = useState<DateRange>({
    startDate: undefined,
    endDate: undefined,
  });
  const [open, setOpen] = useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onClear = React.useCallback(
    ({ startDate, endDate }: DateRange) => {
      setRange({ startDate: undefined, endDate: undefined });
    },
    [setRange]
  );
  const onChange = React.useCallback(
    ({ startDate, endDate }: DateRange) => {
      setRange({ startDate, endDate });
    },
    [setRange]
  );

  const handleReserve = () => {
    const payload = {
      listing: listing?.data,
      numberOfGuests: 1,
      numberOfDays: 1,
      startDate: range.startDate?.toISOString(),
      endDate: range.endDate?.toISOString(),
    };
    dispatch(setBookingDetails(payload));
  };

  useLayoutEffect(() => {
    if (listing?.data) {
      navigation.setOptions({
        headerTitle: "",
        headerTransparent: true,
        headerBackground: () => <View style={[styles.header]}></View>,
        headerRight: () => (
          <View style={styles.bar}>
            <TouchableOpacity style={styles.roundButton}>
              <Ionicons name="share-outline" size={22} color={"#000"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundButton}>
              <Ionicons name="heart-outline" size={22} color={"#000"} />
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
  }, [listing?.data]);

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "MMM d") : "";
  };

  const selectedDates =
    range.startDate && range.endDate
      ? `${formatDate(range.startDate)} - ${formatDate(range.endDate)}`
      : "Select dates";

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
                {listing?.data.description.split(".").map((desc, index) => {
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
                {listing?.data?.house_rules.split(".").map((rule, index) => {
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
                <View>
                  <Text style={styles.footerDate} onPress={() => setOpen(true)}>
                    {selectedDates}
                  </Text>
                  <DatePickerModal
                    locale="en"
                    mode="range"
                    visible={open}
                    onDismiss={onDismiss}
                    startDate={range.startDate}
                    endDate={range.endDate}
                    onConfirm={onClear}
                    onChange={onChange}
                    saveLabel="Clear Dates"
                  />
                </View>
              </View>

              <Link href={`(routes)/booking/${id}`} asChild>
                <Button onPress={handleReserve}>Reserve</Button>
              </Link>
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
});

export default DetailsPage;
