import { StyleSheet, Text } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

export const InsutructionText = ({ children }) => {
  return <Text style={styles.instructionText}>{children}</Text>;
};

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
    marginBottom: 8,
  },
});
