import { StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

export const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: Colors.accent500,
    textAlign: "center",
    borderWidth: 2,
    padding: 12,
    borderColor: Colors.accent500,
    fontFamily: "openSansBold",
    maxWidth: "80%",
  },
});
