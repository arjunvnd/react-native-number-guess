import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Title } from "../components/ui/Title";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NumberContainer } from "../components/game/NumberContainer";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { InsutructionText } from "../components/ui/InsutructionText";
import { Card } from "../components/ui/Card";
import { GuessLogItem } from "../components/game/GuessLogItem";

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
  const [guessRounds, setGuessRounds] = useState([]);
  const { width } = useWindowDimensions();

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
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
    setGuessRounds((preRounds) => [newRndNumber, ...preRounds]);
  };

  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InsutructionText>Higher or lower</InsutructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => nextGuessHandler(BUTTON_ACTIONS.HIGHER)}
            >
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => nextGuessHandler(BUTTON_ACTIONS.LOWER)}
            >
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
        {/* Button to tell higher or lower */}
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => nextGuessHandler(BUTTON_ACTIONS.LOWER)}
            >
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => nextGuessHandler(BUTTON_ACTIONS.HIGHER)}
            >
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {/* Guess goes here */}
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => {
            return (
              <GuessLogItem
                roundNumber={guessRoundsListLength - itemData.index}
                guess={itemData.item}
              />
            );
          }}
          keyExtractor={(item) => {
            return item;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop: 24,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  buttonContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
});
