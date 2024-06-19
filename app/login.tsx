import { View, StyleSheet, TextInput, Text, Image } from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { useState } from "react";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

const Page = () => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    emailAddress: "",
    password: "",
    loading: false,
    error: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onSignInPress = async () => {
    const { emailAddress, password } = formState;

    // Validation checks
    if (emailAddress === "") {
      setFormState({ ...formState, error: "Please enter your email address." });
      return;
    }
    if (!validateEmail(emailAddress)) {
      setFormState({
        ...formState,
        error: "Please enter a valid email address.",
      });
      return;
    }
    if (password === "") {
      setFormState({ ...formState, error: "Please enter your password." });
      return;
    }

    setFormState({ ...formState, loading: true, error: "" });

    try {
      // API calls
      console.log(emailAddress, password);
      router.replace("/(auth)/");
    } catch (error) {
      setFormState({
        ...formState,
        error: "Something went wrong. Please try again.",
      });
    } finally {
      setFormState({ ...formState, loading: false });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo-dark.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome back</Text>
      <View style={{ marginBottom: 20 }}>
        {formState.error ? (
          <Text style={styles.errorText}>{formState.error}</Text>
        ) : null}
        <TextInput
          autoCapitalize="none"
          placeholder="john@apple.com"
          value={formState.emailAddress}
          onChangeText={(text) =>
            setFormState({ ...formState, emailAddress: text })
          }
          style={[defaultStyles.inputField, { marginBottom: 10 }]}
        />
        <TextInput
          placeholder="password"
          value={formState.password}
          onChangeText={(text) =>
            setFormState({ ...formState, password: text })
          }
          secureTextEntry
          style={defaultStyles.inputField}
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
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
