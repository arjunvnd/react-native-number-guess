import { View, Text, StyleSheet, Alert } from "react-native";
import { Title } from "../components/ui/Title";
import { useEffect, useState } from "react";
import { NumberContainer } from "../components/game/NumberContainer";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { InsutructionText } from "../components/ui/InsutructionText";
import { Card } from "../components/ui/Card";

let minBoundary = 1;
let maxBoundary = 100;

const BUTTON_ACTIONS = {
  HIGHER: "HIGHER",
  LOWER: "LOWER",
};

function generateRandomBeteen(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (exclude === rndNum) {
    return generateRandomBeteen(min, max, exclude);
  } else {
    return rndNum;
  }
}

export function GameScreen({ userNumber, onGameOver }) {
  const intialGuess = generateRandomBeteen(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(intialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === BUTTON_ACTIONS.LOWER && currentGuess < userNumber) ||
      (direction === BUTTON_ACTIONS.HIGHER && currentGuess > userNumber)
    ) {
      Alert.alert("Don't Lie", "The input you given is wrong", [
        { text: "OOPS", style: "cancel" },
      ]);
      return;
    }
    if (direction === BUTTON_ACTIONS.LOWER) {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBeteen(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {/* Guess goes here */}
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InsutructionText>Higher or lower</InsutructionText>
        <View>
          <PrimaryButton
            onPress={() => nextGuessHandler(BUTTON_ACTIONS.HIGHER)}
          >
            +
          </PrimaryButton>
          <PrimaryButton onPress={() => nextGuessHandler(BUTTON_ACTIONS.LOWER)}>
            -
          </PrimaryButton>
        </View>
        {/* Button to tell higher or lower */}
      </Card>
      <View>
        <Text>Logs</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});
