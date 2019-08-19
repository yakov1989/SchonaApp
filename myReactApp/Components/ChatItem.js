import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

class ChatItem extends Component {
  render() {
    const isMyMessage = this.props.message.user.id != 1;
    return (
      <View>
        <Avatar
          source={{ uri: this.props.message.user.picture }}
          small
          rounded
        />
        <View style={[styles.ExtraUser, styles.container, styles.text]}>
          <Text style={styles.sender}>{this.props.message.user.userName}</Text>
          <Text> {this.props.message.text} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20
  },
  text: {
    flexDirection: "column",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10
  },
  sender: {
    fontWeight: "bold"
  },
  ExtraUser: {
    alignItems: "flex-start",
    backgroundColor: "cadetblue"
  }
});

export default ChatItem;
