import { View, StyleSheet, Text, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAppDispatch } from "@/redux/hooks";
import { register } from "@/redux/authSlice";
import { showToast } from "@/components/Toast";

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
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
    const { username, email, password } = formState;
    let valid = true;

    // Validation checks
    if (username === "") {
      setErrors((prev) => ({
        ...prev,
        username: "Please enter your username.",
      }));
      valid = false;
    }

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
    } else if (!validatePassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }));
      valid = false;
    }

    if (!valid) return;

    setFormState({ ...formState });
    setErrors({ username: "", email: "", password: "" });

    try {
      dispatch(register(formState))
        .unwrap()
        .then((response) => {
          showToast("Register Successful");
        })
        .catch((error) => {
          console.log("From register component", error.message);
          showToast(error.message || "Login Failed");
        });

      router.replace("/(routes)/login");
    } catch (error) {
      setErrors({
        username: "",
        email: "",
        password: "Something went wrong. Please try again.",
      });
    } finally {
      setFormState({ ...formState });
    }
  };

  const handleusernameChange = (text: string) => {
    setFormState((prev) => ({ ...prev, username: text }));
    if (text.length > 0) {
      setErrors((prev) => ({ ...prev, username: "" }));
    }
  };

  const handleEmailChange = (text: string) => {
    setFormState((prev) => ({ ...prev, email: text }));
    if (validateEmail(text)) {
      setErrors((prev) => ({ ...prev, email: "" }));
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
          value={formState.username}
          error={errors.username}
          onChangeText={handleusernameChange}
        />
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
      <Button onPress={onSignUpPress} disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
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
