import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ListingCard from "@/components/ListingCard";
import Listings from "@/components/Listings";

const mockData = [
  {
    medium_url: "../../assets/images/home1.webp",
    name: "Cozy Apartment",
    review_scores_rating: 90,
    room_type: "Entire home/apt",
    price: 120,
  },
  {
    medium_url: "../../assets/images/home2.webp",
    name: "Modern House",
    review_scores_rating: 96,
    room_type: "Private room",
    price: 200,
  },
  {
    medium_url: "../../assets/images/home1.webp",
    name: "Cozy Apartment",
    review_scores_rating: 90,
    room_type: "Entire home/apt",
    price: 120,
  },
  {
    medium_url: "../../assets/images/home2.webp",
    name: "Modern House",
    review_scores_rating: 96,
    room_type: "Private room",
    price: 200,
  },
  {
    medium_url: "../../assets/images/home1.webp",
    name: "Cozy Apartment",
    review_scores_rating: 90,
    room_type: "Entire home/apt",
    price: 120,
  },
  {
    medium_url: "../../assets/images/home2.webp",
    name: "Modern House",
    review_scores_rating: 96,
    room_type: "Private room",
    price: 200,
  },
  {
    medium_url: "../../assets/images/home1.webp",
    name: "Cozy Apartment",
    review_scores_rating: 90,
    room_type: "Entire home/apt",
    price: 120,
  },
  {
    medium_url: "../../assets/images/home2.webp",
    name: "Modern House",
    review_scores_rating: 96,
    room_type: "Private room",
    price: 200,
  },
  {
    medium_url: "../../assets/images/home1.webp",
    name: "Cozy Apartment",
    review_scores_rating: 90,
    room_type: "Entire home/apt",
    price: 120,
  },
  {
    medium_url: "../../assets/images/home2.webp",
    name: "Modern House",
    review_scores_rating: 96,
    room_type: "Private room",
    price: 200,
  },
  {
    medium_url: "../../assets/images/home1.webp",
    name: "Cozy Apartment",
    review_scores_rating: 90,
    room_type: "Entire home/apt",
    price: 120,
  },
  {
    medium_url: "../../assets/images/home2.webp",
    name: "Modern House",
    review_scores_rating: 96,
    room_type: "Private room",
    price: 200,
  },
];

const Page: React.FC = () => {
  return <Listings />;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Page;
