import { View, StyleSheet, Text, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import Input from "@/components/Input";

const Page = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    emailAddress: "",
    password: "",
    loading: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    emailAddress: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const onSignUpPress = async () => {
    const { name, emailAddress, password } = formState;
    let valid = true;

    // Validation checks
    if (name === "") {
      setErrors((prev) => ({ ...prev, name: "Please enter your name." }));
      valid = false;
    }

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
    } else if (!validatePassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }));
      valid = false;
    }

    if (!valid) return;

    setFormState({ ...formState, loading: true });
    setErrors({ name: "", emailAddress: "", password: "" });

    try {
      // API calls
      console.log(name, emailAddress, password);
      router.replace("/(tabs)/");
    } catch (error) {
      setErrors({
        name: "",
        emailAddress: "",
        password: "Something went wrong. Please try again.",
      });
    } finally {
      setFormState({ ...formState, loading: false });
    }
  };

  const handleNameChange = (text: string) => {
    setFormState((prev) => ({ ...prev, name: text }));
    if (text.length > 0) {
      setErrors((prev) => ({ ...prev, name: "" }));
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
    if (validatePassword(text)) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo-dark.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Create an account</Text>
      <View style={{ marginBottom: 20 }}>
        <Input
          placeholder="John Doe"
          value={formState.name}
          error={errors.name}
          onChangeText={handleNameChange}
        />
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
      <Button onPress={onSignUpPress} disabled={formState.loading}>
        {formState.loading ? "Signing Up..." : "Sign Up"}
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
