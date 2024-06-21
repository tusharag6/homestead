import { View, StyleSheet, Text, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import Input from "@/components/Input";

const Page = () => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    emailAddress: "",
    password: "",
    loading: false,
  });

  const [errors, setErrors] = useState({
    emailAddress: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onSignInPress = async () => {
    const { emailAddress, password } = formState;
    let valid = true;

    // Validation checks
    if (emailAddress === "") {
      setErrors((prev) => ({
        ...prev,
        emailAddress: "Please enter your email address.",
      }));
      valid = false;
    } else if (!validateEmail(emailAddress)) {
      setErrors((prev) => ({
        ...prev,
        emailAddress: "Please enter a valid email address.",
      }));
      valid = false;
    }

    if (password === "") {
      setErrors((prev) => ({
        ...prev,
        password: "Please enter your password.",
      }));
      valid = false;
    }

    if (!valid) return;

    setFormState({ ...formState, loading: true });
    setErrors({ emailAddress: "", password: "" });

    try {
      // API calls
      console.log(emailAddress, password);
      router.replace("/(tabs)/");
    } catch (error) {
      setErrors({
        emailAddress: "",
        password: "Something went wrong. Please try again.",
      });
    } finally {
      setFormState({ ...formState, loading: false });
    }
  };

  const handleEmailChange = (text: string) => {
    setFormState((prev) => ({ ...prev, emailAddress: text }));
    if (validateEmail(text)) {
      setErrors((prev) => ({ ...prev, emailAddress: "" }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setFormState((prev) => ({ ...prev, password: text }));
    if (text.length > 0) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo-dark.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome back</Text>
      <View style={{ marginBottom: 20 }}>
        <Input
          placeholder="john@apple.com"
          value={formState.emailAddress}
          error={errors.emailAddress}
          onChangeText={handleEmailChange}
        />
        <Input
          secureTextEntry
          placeholder="password"
          value={formState.password}
          error={errors.password}
          onChangeText={handlePasswordChange}
        />
      </View>
      <Button onPress={onSignInPress} disabled={formState.loading}>
        {formState.loading ? "Signing In..." : "Sign In"}
      </Button>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 250,
    height: 50,
    alignSelf: "center",
    marginVertical: 60,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily: "mon-sb",
  },
});
