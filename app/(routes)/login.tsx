import { View, StyleSheet, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAppSelector } from "@/redux/hooks";
import { showToast } from "@/components/Toast";
import { useLoginMutation } from "@/redux/authApi";

const Page = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onSignInPress = async () => {
    const { email, password } = formState;
    let valid = true;

    // Validation checks
    if (email === "") {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter your email address.",
      }));
      valid = false;
    } else if (!validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
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

    setFormState({ ...formState });
    setErrors({ email: "", password: "" });

    try {
      await login(formState).unwrap();
      showToast("Login Successful");
    } catch (error: any) {
      showToast(error.data.message || "Login Failed");
    } finally {
      setFormState({ ...formState });
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [auth]);

  const handleEmailChange = (text: string) => {
    setFormState((prev) => ({ ...prev, email: text }));
    if (validateEmail(text)) {
      setErrors((prev) => ({ ...prev, email: "" }));
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
          value={formState.email}
          error={errors.email}
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
      <Button onPress={onSignInPress} disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
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
