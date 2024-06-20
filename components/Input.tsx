import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import React from "react";

interface InputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      value,
      onChangeText,
      label,
      placeholder,
      secureTextEntry = false,
      autoCapitalize = "none",
      keyboardType = "default",
      error = "",
      containerStyle,
      inputStyle,
      errorStyle,
      ...props
    },
    ref
  ) => {
    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          style={[
            styles.inputField,
            inputStyle,
            error ? styles.inputError : null,
          ]}
          accessible={true}
          accessibilityLabel={placeholder}
          {...props}
        />
        {error ? (
          <Text style={[styles.errorText, errorStyle]}>{error}</Text>
        ) : null}
      </View>
    );
  }
);

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: "#333",
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});
