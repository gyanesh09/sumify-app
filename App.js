import { StatusBar } from "expo-status-bar";
import React from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View } from "react-native";
import Game from "./Game.js";

class App extends React.Component {
  state = {
    gameID: 1,
  };
  resetGame = () => {
    this.setState((prevState) => {
      return { gameID: prevState.gameID + 1 };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Game key={this.state.gameID} onPlayAgain={this.resetGame}></Game>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default App;
