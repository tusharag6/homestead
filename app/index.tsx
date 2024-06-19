import Onboarding from "@/components/Onboarding";
import BottomLoginSheet from "@/components/BottomLoginSheet";
import { View, StyleSheet } from "react-native";
import App from "@/components/Test";
const Page = () => {
  return (
    <View style={styles.container}>
      <Onboarding />
      <BottomLoginSheet />
      {/* <App /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Page;
