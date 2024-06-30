import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import colors from "@/constants/Colors";
import Button from "@/components/Button";
import { Link } from "expo-router";

import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearCredentials } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "@/redux/authApi";

const Profile = () => {
  const [image, setImage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLogout = async () => {
    try {
      const token = (await AsyncStorage.getItem("token")) || "";
      await logout(token).unwrap();
    } catch (error: any) {
      // console.log("Error from logout", error);
      // if some error manually logout the user
      if (error.status === 401) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        dispatch(clearCredentials());
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View>
          <Text style={styles.screenHeader}>Profile</Text>
        </View>
        <View style={styles.profileHeader}>
          <View>
            <Image
              source={{ uri: image || "https://via.placeholder.com/150" }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatar} onPress={pickImage}>
              <Ionicons name="pencil-outline" size={16} color={"black"} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>Tushar</Text>
            <TouchableOpacity>
              <Link href={"(modals)/personal"} asChild>
                <Text style={styles.showProfileText}>Show profile</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>

        {/* List your place */}
        <TouchableOpacity style={styles.listPlaceCard}>
          <View style={styles.listPlaceTextContainer}>
            <Text style={styles.listPlaceTitle}>List your place</Text>
            <Text style={styles.listPlaceSubtitle}>
              It's simple to get set up and start earning
            </Text>
          </View>
          <Image
            source={{
              uri: "https://freight.cargo.site/t/original/i/f27b0d50e7e58e32967a5a856995a5b23420e7eac7d22783af9231ade4e8e451/SL060_empty_nest_cyc_comp_v03.1062-1.png",
            }}
            style={styles.listPlaceImage}
          />
        </TouchableOpacity>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <Link href={"(modals)/personal"} asChild>
            <Button
              startIcon={
                <Ionicons
                  name="person-circle-outline"
                  size={24}
                  color="black"
                />
              }
              endIcon={
                <Ionicons name="chevron-forward" size={24} color="black" />
              }
              variant="ghost"
              iconPlacement="separate"
              textStyle={styles.settingsItemText}
              style={styles.settingsItem}
            >
              Personal Information
            </Button>
          </Link>
          <Button
            startIcon={<MaterialIcons name="payment" size={24} color="black" />}
            endIcon={
              <Ionicons name="chevron-forward" size={24} color="black" />
            }
            variant="ghost"
            textStyle={styles.settingsItemText}
            style={styles.settingsItem}
            iconPlacement="separate"
          >
            Payments
          </Button>
          <Button
            startIcon={<FontAwesome5 name="language" size={24} color="black" />}
            endIcon={
              <Ionicons name="chevron-forward" size={24} color="black" />
            }
            variant="ghost"
            textStyle={styles.settingsItemText}
            style={styles.settingsItem}
            iconPlacement="separate"
          >
            Translations
          </Button>
          <Button
            startIcon={
              <Ionicons name="notifications-outline" size={24} color="black" />
            }
            endIcon={
              <Ionicons name="chevron-forward" size={24} color="black" />
            }
            variant="ghost"
            textStyle={styles.settingsItemText}
            style={styles.settingsItem}
            iconPlacement="separate"
          >
            Notifications
          </Button>
          <Button
            startIcon={
              <Ionicons
                name="shield-checkmark-outline"
                size={24}
                color="black"
              />
            }
            endIcon={
              <Ionicons name="chevron-forward" size={24} color="black" />
            }
            variant="ghost"
            textStyle={styles.settingsItemText}
            style={styles.settingsItem}
            iconPlacement="separate"
          >
            Privacy and Sharing
          </Button>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <Button
            startIcon={
              <Ionicons name="help-circle-outline" size={24} color="black" />
            }
            endIcon={
              <Ionicons name="chevron-forward" size={24} color="black" />
            }
            variant="ghost"
            textStyle={styles.settingsItemText}
            style={styles.settingsItem}
            iconPlacement="separate"
          >
            Visit the help center
          </Button>
          <Button
            startIcon={
              <Ionicons name="alert-circle-outline" size={24} color="black" />
            }
            endIcon={
              <Ionicons name="chevron-forward" size={24} color="black" />
            }
            variant="ghost"
            textStyle={styles.settingsItemText}
            style={styles.settingsItem}
            iconPlacement="separate"
          >
            Get help with a safety issue
          </Button>
          <Button
            startIcon={
              <Ionicons name="megaphone-outline" size={24} color="black" />
            }
            endIcon={
              <Ionicons name="chevron-forward" size={24} color="black" />
            }
            variant="ghost"
            textStyle={styles.settingsItemText}
            style={styles.settingsItem}
            iconPlacement="separate"
          >
            Report a listing
          </Button>
          <Button
            startIcon={
              <FontAwesome name="commenting-o" size={24} color="black" />
            }
            endIcon={
              <Ionicons name="chevron-forward" size={24} color="black" />
            }
            variant="ghost"
            textStyle={styles.settingsItemText}
            style={styles.settingsItem}
            iconPlacement="separate"
          >
            Give us feedback
          </Button>
        </View>

        {/* Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <Button
            startIcon={
              <Ionicons name="document-text-outline" size={24} color="black" />
            }
            endIcon={
              <Ionicons name="chevron-forward" size={24} color="black" />
            }
            variant="ghost"
            textStyle={styles.settingsItemText}
            style={styles.settingsItem}
            iconPlacement="separate"
          >
            Terms of service
          </Button>
          <Button
            startIcon={
              <Ionicons name="lock-closed-outline" size={24} color="black" />
            }
            endIcon={
              <Ionicons name="chevron-forward" size={24} color="black" />
            }
            variant="ghost"
            textStyle={styles.settingsItemText}
            style={styles.settingsItem}
            iconPlacement="separate"
          >
            Privacy Policy
          </Button>
        </View>

        {/* Logout */}
        <View style={styles.logoutButton}>
          <Button variant="destructive" onPress={handleLogout}>
            Logout
          </Button>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  screenHeader: {
    paddingTop: 50,
    paddingBottom: 30,
    fontSize: 26,
    fontFamily: "mon-sb",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileDetails: {
    marginLeft: 10,
  },
  profileName: {
    fontSize: 18,
    fontFamily: "mon",
  },
  showProfileText: {
    fontSize: 12,
    fontFamily: "mon",
    textDecorationLine: "underline",
  },
  listPlaceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  listPlaceTextContainer: {
    flex: 1,
    paddingRight: 2,
  },
  listPlaceTitle: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  listPlaceSubtitle: {
    fontSize: 12,
    paddingTop: 4,
    fontFamily: "mon",
  },
  listPlaceImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  section: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    paddingVertical: 10,
    fontFamily: "mon-sb",
  },
  settingsItem: {
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  settingsItemText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  logoutButton: {
    paddingVertical: 20,
  },
});

export default Profile;
