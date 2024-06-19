import { View, StyleSheet, TextInput, Text, Image } from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { useState } from "react";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

const Page = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    emailAddress: "",
    password: "",
    loading: false,
    error: "",
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

    // validation checks
    if (name === "") {
      setFormState({ ...formState, error: "Please enter your name." });
      return;
    }
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
    if (!validatePassword(password)) {
      setFormState({
        ...formState,
        error:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
      return;
    }

    setFormState({ ...formState, loading: true, error: "" });

    try {
      // API calls
      console.log(name, emailAddress, password);
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

      <Text style={styles.title}>Create an account</Text>
      <View style={{ marginBottom: 20 }}>
        {formState.error ? (
          <Text style={styles.errorText}>{formState.error}</Text>
        ) : null}
        <TextInput
          autoCapitalize="none"
          placeholder="John Doe"
          value={formState.name}
          onChangeText={(text) => setFormState({ ...formState, name: text })}
          style={[defaultStyles.inputField, { marginBottom: 10 }]}
        />
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
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
