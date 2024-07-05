import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/Colors";
import Button from "@/components/Button";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { format, differenceInDays } from "date-fns";
import {
  clearBookingDetails,
  setBookingDetails,
  setBookingTotal,
} from "@/redux/bookingSlice";
import Input from "@/components/Input";
import { useConfirmReservationMutation } from "@/redux/bookingApi";
import { showToast } from "@/components/Toast";
import { useRouter } from "expo-router";
import Payments from "@/components/Payments";

const Booking = () => {
  const listing = useAppSelector((state) => state.booking.listing);
  const startDate = useAppSelector((state) => state.booking.startDate);
  const endDate = useAppSelector((state) => state.booking.endDate);
  const numberOfGuests = useAppSelector(
    (state) => state.booking.numberOfGuests
  );
  const dispatch = useAppDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isGuestEditing, setIsGuestEditing] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(0);

  const [input, setInput] = useState(numberOfGuests.toString());
  const router = useRouter();
  const [reserve, { isLoading }] = useConfirmReservationMutation();

  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    if (startDate && endDate) {
      const days = differenceInDays(new Date(endDate), new Date(startDate));
      setNumberOfDays(days);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    calculateTotalPrice();
  }, [listing, startDate, endDate, numberOfGuests, numberOfDays]);

  const calculateTotalPrice = () => {
    if (listing && startDate && endDate) {
      const pricePerNight = listing.price;
      const totalGuests = numberOfGuests;
      const nights = numberOfDays;

      const totalPriceWithoutTax = pricePerNight * nights * totalGuests;
      const taxes = 50;
      const totalPrice = totalPriceWithoutTax + taxes;
      setTotalPrice(totalPrice);
      dispatch(setBookingTotal(totalPrice));
    }
  };

  const handleGuestSubmit = () => {
    const parsedGuests = parseInt(input, 10);

    if (!isNaN(parsedGuests)) {
      const payload = {
        listing: listing,
        numberOfGuests: parsedGuests,
        numberOfDays: numberOfDays,
        startDate: startDate,
        endDate: endDate,
        price: totalPrice,
      };
      dispatch(setBookingDetails(payload));
    }
    setIsGuestEditing(false);
  };

  const handleBooking = async () => {
    const payload = {
      listing: listing,
      numberOfGuests: numberOfGuests,
      numberOfDays: numberOfDays,
      startDate: startDate,
      endDate: endDate,
      price: totalPrice,
    };
    try {
      await reserve(payload).unwrap();
      showToast("Booked your accommodation");
      dispatch(clearBookingDetails());
      router.replace("/(tabs)/booking");
    } catch (error: any) {
      showToast(error.data.message || "Booking Failed");
    }
  };

  if (!listing) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Listing not found</Text>
      </View>
    );
  }

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "MMM d") : "";
  };

  const selectedDates =
    startDate && endDate
      ? `${formatDate(new Date(startDate))} - ${formatDate(new Date(endDate))}`
      : "Select dates";

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.listingDetailsContainer}>
          <Image
            source={{ uri: listing.listing_image_url }}
            style={styles.image}
          />
          <View style={styles.listingTextContainer}>
            <Text style={styles.name}>{listing.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="black" />
              <Text style={styles.ratingText}>
                {listing.review_scores_rating}
              </Text>
              <Text style={styles.reviewCountText}>
                ({listing.number_of_reviews})
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tripDetailsContainer}>
          <Text style={styles.sectionTitle}>Your Trip</Text>
          <View style={styles.detailItem}>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailLabel}>Dates</Text>
              <Text style={styles.detailValue}>{selectedDates}</Text>
            </View>
            <Button variant="ghost" size="sm" textStyle={styles.editText}>
              Edit
            </Button>
          </View>
          <View style={styles.detailItem}>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailLabel}>Guests</Text>
              {isGuestEditing ? (
                <Input
                  style={styles.detailValue}
                  value={input}
                  onChangeText={(text: string) => {
                    setInput(text);
                  }}
                  keyboardType="numeric"
                  returnKeyType="done"
                  autoFocus
                />
              ) : (
                <Text style={styles.detailValue}>{numberOfGuests} Guest</Text>
              )}
            </View>
            {isGuestEditing ? (
              <Button
                variant="ghost"
                size="sm"
                textStyle={styles.editText}
                onPress={handleGuestSubmit}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                textStyle={styles.editText}
                onPress={() => {
                  setIsGuestEditing((prev) => !prev);
                }}
              >
                Edit
              </Button>
            )}
          </View>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <Payments
            selectedPayment={paymentMethod}
            onPaymentSelect={setPaymentMethod}
          />
        </View>
        {totalPrice != 0 && (
          <View style={styles.priceDetailsContainer}>
            <Text style={styles.sectionTitle}>Your Total</Text>
            <View style={{ marginBottom: 5 }}>
              <View style={styles.priceDetailItem}>
                <Text style={styles.priceDetailLabel}>
                  {numberOfDays} day(s)
                </Text>
                <Text style={styles.priceDetailValue}>
                  Rs {listing.price * numberOfDays}
                </Text>
              </View>
              <View style={styles.priceDetailItem}>
                <Text style={styles.priceDetailLabel}>Taxes</Text>
                <Text style={styles.priceDetailValue}>Rs 50</Text>
              </View>
            </View>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPriceLabel}>Total</Text>
              <Text style={styles.totalPriceValue}>Rs {totalPrice}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Button
          onPress={handleBooking}
          disabled={totalPrice === 0}
          style={totalPrice === 0 ? { opacity: 0.5 } : { opacity: 1 }}
        >
          Confirm Your Booking
        </Button>
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
  paymentContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  footer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: colors.light.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
