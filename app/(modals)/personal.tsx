import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import Input from "@/components/Input";

interface FormState {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  username: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  gender: string;
  bio: string;
  loading: boolean;
}

const Page = () => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    name: "",
    emailAddress: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    gender: "",
    bio: "",
    loading: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    emailAddress: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    gender: "",
    bio: "",
  });

  const validateForm = () => {
    const newErrors = { ...errors };
    let valid = true;

    if (formState.name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!/\S+@\S+\.\S+/.test(formState.emailAddress)) {
      newErrors.emailAddress = "Email is invalid";
      valid = false;
    }

    if (!/^\d{10}$/.test(formState.phoneNumber)) {
      newErrors.phoneNumber = "Phone number is invalid";
      valid = false;
    }

    if (formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onInputChange = (name: keyof FormState, value: string) => {
    setFormState({ ...formState, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const onSavePress = async () => {
    if (!validateForm()) return;

    setFormState({ ...formState, loading: true });

    setTimeout(() => {
      setFormState({ ...formState, loading: false });
      router.navigate("/profile");
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Personal Info</Text>
      <View style={styles.form}>
        <Input
          label="Name"
          placeholder="John Doe"
          value={formState.name}
          error={errors.name}
          onChangeText={(text) => onInputChange("name", text)}
        />
        <Input
          label="Email"
          placeholder="john@apple.com"
          value={formState.emailAddress}
          error={errors.emailAddress}
          onChangeText={(text) => onInputChange("emailAddress", text)}
        />
        <Input
          label="Phone Number"
          placeholder="9876543210"
          value={formState.phoneNumber}
          error={errors.phoneNumber}
          onChangeText={(text) => onInputChange("phoneNumber", text)}
        />
        <Input
          label="Username"
          placeholder="johndoe123"
          value={formState.username}
          error={errors.username}
          onChangeText={(text) => onInputChange("username", text)}
        />
        <Input
          label="Password"
          placeholder="********"
          secureTextEntry
          value={formState.password}
          error={errors.password}
          onChangeText={(text) => onInputChange("password", text)}
        />
        <Input
          label="Confirm Password"
          placeholder="********"
          secureTextEntry
          value={formState.confirmPassword}
          error={errors.confirmPassword}
          onChangeText={(text) => onInputChange("confirmPassword", text)}
        />
        <Input
          label="Date of Birth"
          placeholder="YYYY-MM-DD"
          value={formState.dateOfBirth}
          error={errors.dateOfBirth}
          onChangeText={(text) => onInputChange("dateOfBirth", text)}
        />
        <Input
          label="Address"
          placeholder="123 Street"
          value={formState.address}
          error={errors.address}
          onChangeText={(text) => onInputChange("address", text)}
        />
        <Input
          label="City"
          placeholder="Bhubaneswar"
          value={formState.city}
          error={errors.city}
          onChangeText={(text) => onInputChange("city", text)}
        />
        <Input
          label="State"
          placeholder="Odisha"
          value={formState.state}
          error={errors.state}
          onChangeText={(text) => onInputChange("state", text)}
        />
        <Input
          label="Country"
          placeholder="India"
          value={formState.country}
          error={errors.country}
          onChangeText={(text) => onInputChange("country", text)}
        />
        <Input
          label="Postal Code"
          placeholder="751024"
          value={formState.postalCode}
          error={errors.postalCode}
          onChangeText={(text) => onInputChange("postalCode", text)}
        />
        <Input
          label="Gender"
          placeholder="Male/Female/Other"
          value={formState.gender}
          error={errors.gender}
          onChangeText={(text) => onInputChange("gender", text)}
        />
        <Input
          label="Bio"
          placeholder="Tell us about yourself"
          value={formState.bio}
          error={errors.bio}
          onChangeText={(text) => onInputChange("bio", text)}
        />
      </View>
      <Button
        onPress={onSavePress}
        disabled={formState.loading}
        style={{ paddingBottom: 20 }}
      >
        {formState.loading ? "Saving..." : "Save"}
      </Button>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    fontFamily: "mon-sb",
  },
  form: {
    marginBottom: 20,
  },
});
