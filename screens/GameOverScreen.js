import { View, Text, Image, StyleSheet } from "react-native";
import { Title } from "../components/ui/Title";
import { Colors } from "../constants/colors";
import { PrimaryButton } from "../components/ui/PrimaryButton";

export function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over!!!</Title>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/success.png")} />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highLight}>{roundsNumber}</Text>{" "}
        round to guess the number{" "}
        <Text style={styles.highLight}>{userNumber}</Text>
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "openSans",
    textAlign: "center",
    fontSize: 24,
    marginBottom: 24,
  },
  highLight: {
    fontFamily: "openSansBold",
    color: Colors.primary500,
  },
});
