import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

class RandomNumber extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  handlePress = () => {
    console.log(this.props.number);
    if (this.props.isDisabled) {
      return;
    }
    this.props.onPress(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress} style={styles.randomnum}>
        <Text style={[styles.random, this.props.isDisabled && styles.selected]}>
          {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  random: {
    backgroundColor: "orange",
    borderRadius: 30,
    width: "60%",
    padding: 1,
    fontSize: 35,
    marginVertical: 25,
    textAlign: "center",
  },
  selected: {
    opacity: 0.3,
  },
  randomnum: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    width: "40%",
    justifyContent: "center",
  },
});

export default RandomNumber;
