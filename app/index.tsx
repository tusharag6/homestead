import Onboarding from "@/components/Onboarding";
import BottomLoginSheet from "@/components/BottomLoginSheet";
import { View, StyleSheet } from "react-native";
const Page = () => {
  return (
    <View style={styles.container}>
      <Onboarding />
      <BottomLoginSheet />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Page;
