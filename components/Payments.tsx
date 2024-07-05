import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

interface PaymentsProps {
  selectedPayment: string;
  onPaymentSelect: (paymentMethod: string) => void;
}

const Payments: React.FC<PaymentsProps> = ({
  selectedPayment,
  onPaymentSelect,
}) => {
  return (
    <View>
      <View style={styles.paymentOption}>
        <RadioButton
          value="card"
          status={selectedPayment === "card" ? "checked" : "unchecked"}
          onPress={() => onPaymentSelect("card")}
        />
        <Text style={styles.paymentOptionText}>Card</Text>
      </View>
      <View style={styles.paymentOption}>
        <RadioButton
          value="upi"
          status={selectedPayment === "upi" ? "checked" : "unchecked"}
          onPress={() => onPaymentSelect("upi")}
        />
        <Text style={styles.paymentOptionText}>UPI</Text>
      </View>
      <View style={styles.paymentOption}>
        <RadioButton
          value="paylater"
          status={selectedPayment === "paylater" ? "checked" : "unchecked"}
          onPress={() => onPaymentSelect("paylater")}
        />
        <Text style={styles.paymentOptionText}>Pay Later</Text>
      </View>
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
  },
  paymentOptionText: {
    fontSize: 16,
    fontFamily: "mon",
  },
});
