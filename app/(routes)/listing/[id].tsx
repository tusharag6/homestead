import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { mockData as listingsData } from "@/components/Listings";
import colors from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import {
  DatePickerModal,
  registerTranslation,
  en,
} from "react-native-paper-dates";
import { format } from "date-fns";

registerTranslation("en", en);

interface DateRange {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const listing = listingsData.find((item) => item.id === id);

  const navigation = useNavigation();

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

  if (!listing) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Listing not found</Text>
      </View>
    );
  }

  useLayoutEffect(() => {
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
  }, []);

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "MMM d") : "";
  };

  const selectedDates =
    range.startDate && range.endDate
      ? `${formatDate(range.startDate)} - ${formatDate(range.endDate)}`
      : "Select dates";

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Image source={{ uri: listing.image_url }} style={styles.image} />
        <View style={styles.container}>
          <Text style={styles.name}>{listing.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="black" />
            <Text style={styles.ratingText}>
              {(listing.review_scores_rating / 20).toFixed(1)}
            </Text>
            <Text style={styles.reviewCountText}>· 22 reviews</Text>
          </View>
          <Text style={styles.locationText}>
            Nantes, Pays da le Loire, France
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.sectionTitle}>About this place</Text>
          <Text style={styles.descriptionText}>
            Enjoy an elegant private room of 20m2 in a renovated apartment of
            160 m2 in the heart of the city center of Nantes in the Graslin
            district. The charm of the old renovated: ceiling height of 3.60m,
            period parquet, black marble fireplace, comfortable bathroom.
          </Text>
        </View>

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

        <View style={styles.container}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color="black" />
            <Text style={styles.ratingText}>
              {(listing.review_scores_rating / 20).toFixed(1)}
            </Text>
            <Text style={styles.reviewCountText}>· 22 reviews</Text>
          </View>
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewText}>
              While travelling for work, I stopped for one night at Golwen &
              Dorothee place. It feels great in this unit, enough to recharge
              the ...
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

        <View style={styles.container}>
          <Text style={styles.sectionTitle}>House rules</Text>
          <Text style={styles.ruleText}>Check-in: 6:00 PM - 11:00 PM</Text>
          <Text style={styles.ruleText}>Checkout before 9:00 AM</Text>
          <Text style={styles.ruleText}>2 guests maximum</Text>
          <Text style={styles.ruleText}>
            <Button
              variant="link"
              style={{ padding: 0 }}
              textStyle={{ fontSize: 14 }}
            >
              Show more
            </Button>
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Cancellation rules</Text>
          <Text style={styles.ruleText}>Free cancellation for 48 hours</Text>
          <Text style={styles.ruleText}>This booking is non-refundable</Text>
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
              <Text style={styles.footerPrice}>Rs {listing.price}</Text>
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
            <Button>Reserve</Button>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontWeight: "500",
    marginVertical: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 18,
  },
  reviewCountText: {
    marginLeft: 4,
    fontSize: 18,
  },
  locationText: {
    fontSize: 16,
    color: colors.light.secondaryForeground,
    marginVertical: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 8,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
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
    fontWeight: "500",
  },
  reviewDate: {
    fontSize: 12,
    color: colors.light.secondaryForeground,
  },
  ruleText: {
    fontSize: 14,
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
