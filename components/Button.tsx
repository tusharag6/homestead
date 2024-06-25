import React, { forwardRef } from "react";
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
  textStyle?: TextStyle;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  theme?: "light" | "dark";
  iconPlacement?: "inline" | "separate";
}

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      children,
      style,
      textStyle,
      startIcon,
      endIcon,
      theme = "light",
      iconPlacement = "inline",
      ...props
    },
    ref
  ) => {
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

    const inlineContent = (
      <View style={styles.content}>
        {startIcon && <View style={{ marginRight: 4 }}>{startIcon}</View>}
        <Text style={[styles.text, getTextStyle(), textStyle]}>{children}</Text>
        {endIcon && <View style={{ marginLeft: 4 }}>{endIcon}</View>}
      </View>
    );

    const separateContent = (
      <View style={styles.separateContent}>
        <View style={styles.inlineContent}>
          {startIcon && <View style={{ marginRight: 4 }}>{startIcon}</View>}
          <Text style={[styles.text, getTextStyle(), textStyle]}>
            {children}
          </Text>
        </View>
        {endIcon && <View style={{ marginLeft: 4 }}>{endIcon}</View>}
      </View>
    );

    return (
      <TouchableOpacity
        ref={ref}
        style={[styles.button, getVariantStyle(), getSizeStyle(), style]}
        {...props}
      >
        {iconPlacement === "inline" ? inlineContent : separateContent}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  } as ViewStyle,
  text: {
    fontSize: 16,
    fontFamily: "mon",
  } as TextStyle,
  content: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  separateContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  } as ViewStyle,
  inlineContent: {
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
