import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from "react-native";
import colors from "@/constants/Colors";

interface ButtonProps extends TouchableOpacityProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: ViewStyle;
  onPress?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  theme?: "light" | "dark";
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  children,
  style,
  textStyle,
  onPress,
  startIcon,
  endIcon,
  theme = "light",
  ...props
}) => {
  const themeColors = colors[theme];

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case "destructive":
        return { backgroundColor: themeColors.destructive };
      case "outline":
        return {
          borderWidth: 1,
          borderColor: themeColors.border,
          backgroundColor: "transparent",
        };
      case "secondary":
        return { backgroundColor: themeColors.secondary };
      case "ghost":
        return { backgroundColor: "transparent" };
      case "link":
        return { backgroundColor: "transparent" };
      default:
        return { backgroundColor: themeColors.primary };
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case "sm":
        return styles.sm;
      case "lg":
        return styles.lg;
      default:
        return styles.defaultSize;
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case "outline":
        return { color: themeColors.foreground };
      case "ghost":
        return { color: themeColors.foreground };
      case "link":
        return {
          color: themeColors.foreground,
          textDecorationLine: "underline",
        };
      default:
        return { color: "#fff" };
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getVariantStyle(), getSizeStyle(), style]}
      onPress={onPress}
      {...props}
    >
      <View style={styles.content}>
        {startIcon && <View style={{ marginRight: 4 }}>{startIcon}</View>}
        <Text style={[styles.text, getTextStyle(), textStyle]}>{children}</Text>
        {endIcon && <View style={{ marginLeft: 4 }}>{endIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  } as ViewStyle,
  text: {
    fontSize: 16,
    fontWeight: "500",
  } as TextStyle,
  content: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  } as ViewStyle,
  lg: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  } as ViewStyle,
  defaultSize: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  } as ViewStyle,
});

export default Button;
