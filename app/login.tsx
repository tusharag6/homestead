import Colors from "@/constants/Colors";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { useState } from "react";

const Page = () => {
  const [formState, setFormState] = useState({
    emailAddress: "",
    password: "",
    loading: false,
  });

  const onSignInPress = async () => {
    setFormState({ ...formState, loading: true });
    console.log(formState.emailAddress, formState.password);
    setFormState({ ...formState, loading: false });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo-dark.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Welcome back</Text>
      <View style={{ marginBottom: 20 }}>
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

      <TouchableOpacity
        style={defaultStyles.btn}
        onPress={onSignInPress}
        disabled={formState.loading}
      >
        <Text style={defaultStyles.btnText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
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
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});
