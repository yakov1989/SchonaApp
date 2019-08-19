import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  Button,
  TouchableHighlight,
  FlatList,
  KeyboardAvoidingView
} from "react-native";

import { Header, Input } from "react-native-elements";
import {
  createStackNavigator,
  createAppContainer,
  navigation
} from "react-navigation";

import StyleLuz from "./StyleLuz";
import ChatItem from "./ChatItem";

export default class Luz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newData: [],
      dataSource: [
        {
          id: "1",
          text: "פגישה שכונתית",
          user: {
            id: 1,
            userName: "נוי",
            picture:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVScX44baeJmxuLCUK3ZqRzWWHxsLwJnboI8kCqHp7UbSIAWrR"
          }
        },
        {
          id: "2",
          text: "כנס הורים בשכונה",
          user: {
            id: 2,
            userName: "דני",
            picture:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVScX44baeJmxuLCUK3ZqRzWWHxsLwJnboI8kCqHp7UbSIAWrR"
          }
        }
      ],
      text: "",
      disabledColor: true,
      counter: 3
    };

    this.WSUrl = "http://ruppinmobile.tempdomain.co.il/site10/WebService.asmx/";
  }

  handleText = e => {
    if (e.length >= 2) {
      this.setState({
        text: e,
        disabledColor: false
      });
    } else {
      this.setState({
        disabledColor: true
      });
    }
  };

  renderChat = item => {
    return <Text>{item.text}</Text>;
  };

  //Passing array from DB to react

  clearTextInput = () => {
    this.setState({
      counter: this.state.counter + 1
    });
    const newMessage = {
      id: this.state.counter.toString(),
      text: this.state.text,
      user: {
        id: this.state.counter,
        userName: "נוי",
        picture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVScX44baeJmxuLCUK3ZqRzWWHxsLwJnboI8kCqHp7UbSIAWrR"
      }
    };

    this.state.dataSource.unshift(newMessage);
    this.TextInput.clear();
  };

  renderChat = ({ item }) => {
    return <ChatItem message={item} />;
  };

  keyExtractor = item => item.id;

  render() {
    var { dataSource } = this.state;
    const {
      container,
      InputBar,
      textBox,
      sendBtn,
      disabledColor,
      enabledColor,
      bottomView,
      backgroundImage,
      SectionStyle,
      head,
      ImageStyle,
      containerHeader,
      header
    } = StyleLuz;

    const BtnStyle2 = this.state.disabledColor ? disabledColor : enabledColor;

    return (
      <View style={container}>
        <ImageBackground
          source={require("../assets/blue.jpg")}
          style={backgroundImage}
        >
          <Text style={header}>מה הלו"ז</Text>
          <View style={containerHeader}>
            <Image
              source={require("../assets/search.jpg")}
              style={ImageStyle}
            />
            <TextInput style={head}>חפש לפי תאריך/אירוע</TextInput>
          </View>
          <FlatList
            inverted
            data={this.state.dataSource}
            renderItem={this.renderChat}
            keyExtractor={this.keyExtractor}
          />
          <KeyboardAvoidingView
            behavior="padding"
            style={{ paddingTop: 10 }}
            enabled
          >
            <View style={[InputBar, SectionStyle]}>
              <TextInput
                style={textBox}
                onChangeText={this.handleText}
                ref={input => {
                  this.TextInput = input;
                }}
              />
              <TouchableHighlight
                style={[sendBtn, BtnStyle2]}
                onPress={this.clearTextInput}
              >
                <Text style={{ color: "white" }}>Send</Text>
              </TouchableHighlight>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}
//}
