import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { Title } from "../components/ui/Title";
import { Colors } from "../constants/colors";
import { PrimaryButton } from "../components/ui/PrimaryButton";

export function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  const { height, width } = useWindowDimensions();

  let imageWidth = 380;

  if (width < 380) {
    imageWidth = 150;
  }

  if (height < 400) {
    imageWidth = 100;
  }

  const imageStyles = {
    width: imageWidth,
    height: imageWidth,
    borderRadius: imageWidth / 2,
  };

  return (
    <View style={styles.rootContainer}>
      <Title>Game Over!!!</Title>
      <View style={[styles.imageContainer, imageStyles]}>
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

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
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
