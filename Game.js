<script src="http://192.168.56.1:8097"></script>;
import React from "react";
import RandomNumber from "./RandomNumber.js";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

class Game extends React.Component {
  static propTypes = {
    onPlayAgain: PropTypes.func.isRequired,
  };

  items = [];
  constructor() {
    super();
    for (let i = 0; i < 6; i++) {
      this.items.push(1 + Math.floor(10 * Math.random()));
    }
  }

  state = {
    selectedNumbers: [],
    current_status: "",
    remaining_sec: 15,
  };

  target = 10 + Math.floor(40 * Math.random());
  nums = 1 + Math.floor(10 * Math.random());

  isNumberSelected = (ind) => {
    return this.state.selectedNumbers.indexOf(ind) >= 0;
  };

  componentDidMount = () => {
    this.intervalId = setInterval(() => {
      this.setState(
        (prevState) => {
          return { remaining_sec: prevState.remaining_sec - 1 };
        },
        () => {
          if (this.state.remaining_sec == 0) clearInterval(this.intervalId);
        }
      );
    }, 1200);
  };

  sum1 = 0;
  selectNumber = (numberIndex) => {
    this.sum1 += this.items[numberIndex];
    console.log(this.sum1);
    if (this.state.remaining_sec == 0) {
      this.setState({ current_status: "Time Ran Out! you Lost!" });
    } else if (this.state.selectedNumbers.length + 1 == 6) {
      this.setState({ current_status: "YOU LOST!!" });
      clearInterval(this.intervalId);
    } else if (this.sum1 < this.target) {
      this.setState({ current_status: "PLAYING!" });
    } else if (this.sum1 > this.target) {
      this.setState({ current_status: "YOU LOST!!" });
      clearInterval(this.intervalId);
    } else {
      this.setState({ current_status: "WON!!" });
      clearInterval(this.intervalId);
    }
    this.setState((prevState) => {
      return { selectedNumbers: [...prevState.selectedNumbers, numberIndex] };
    });
  };

  // gameStatus = () => {
  //   for (let i = 0; i < this.state.selectedNumbers.length; i++) {
  //     this.sum1 += this.items[this.state.selectedNumbers[i]];
  //   }
  //   console.log(this.sum1);
  // };

  render() {
    // this.gameStatus();x
    return (
      <View Style={styles.container}>
        <View Style={styles.header}>
          <Text style={styles.target}>{this.target}</Text>
        </View>
        <View style={styles.timer}>
          <Text style={styles.text_timer}>Time Left : </Text>
          <Text style={styles.sec}>{this.state.remaining_sec}</Text>
        </View>
        <View style={styles.randomContainer}>
          {this.items.map((value, index) => (
            <RandomNumber
              key={index}
              id={index}
              number={value}
              isDisabled={this.isNumberSelected(index)}
              onPress={this.selectNumber}
            />
          ))}
        </View>
        <View style={styles.status}>
          <Text style={styles.status_content}>{this.state.current_status}</Text>
        </View>
        <View style={styles.bottom_bar}>
          <TouchableOpacity onPress={this.props.onPlayAgain}>
            <Text style={styles.Button_content}>PLAY AGAIN!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    flex: 1,
  },

  target: {
    fontSize: 100,
    paddingTop: 22,
    paddingLeft: 140,
    marginTop: 0,
    backgroundColor: "darkslategray",
    color: "white",
  },
  timer: {
    flexDirection: "row",
    marginTop: 10,
  },
  text_timer: {
    fontSize: 20,
    flex: 5,
    paddingTop: 27,
    textAlign: "right",
  },
  sec: {
    fontSize: 50,
    flex: 2,
    textAlign: "center",
  },
  randomContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingTop: 130,
    marginTop: -90,
    alignItems: "flex-start",
  },
  random: {
    backgroundColor: "orange",
    borderRadius: 30,
    width: "50%",
    marginHorizontal: 15,
    fontSize: 35,
    marginVertical: 25,
    textAlign: "center",
  },
  status: {
    justifyContent: "center",
    marginBottom: 0,
    marginTop: 20,
  },
  status_content: {
    fontSize: 25,
    height: 70,
    paddingTop: 10,
    backgroundColor: "darkslategray",
    color: "white",
    textAlign: "center",
  },
  bottom_bar: {
    backgroundColor: "lightseagreen",
    color: "white",
    height: 200,
    marginBottom: 0,
  },
  Button_content: {
    textAlign: "center",
    fontSize: 35,
    paddingTop: 4,
    color: "white",
  },
});

export default Game;
