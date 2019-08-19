/*eslint-disable*/
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Button,
  icon
} from "react-native";

export class MainPage extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/login-pic.png")}
          style={styles.backgroundImage}
        >
          <View
            style={{
              paddingTop: 30,
              paddingEnd: 20,
              paddingLeft: 250,
              width: "100%"
            }}
          >
            {/* <TouchableOpacity
              style={{
                marginRight: 40,
                marginTop: 20
              }}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text>LogOut</Text>
            </TouchableOpacity> */}
            <Button
              onPress={() => this.props.navigation.navigate("Login")}
              title="Logout"
            />
          </View>
          <View>
            <Text style={styles.header}>השכונה שלי</Text>
          </View>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                position: "relative",
                justifyContent: "space-evenly"
              }}
            >
              <View>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() => this.props.navigation.navigate("MaBaizor")}
                >
                  <Text style={styles.Text}> מה באזור?</Text>
                  <Image
                    source={require("../assets/mabaizor.png")}
                    style={styles.Image}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() => this.props.navigation.navigate("Luz")}
                >
                  <Text style={styles.Text}>מה הלו"ז ?</Text>
                  <Image
                    source={require("../assets/mahloz.png")}
                    style={styles.Image}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                position: "relative",
                justifyContent: "space-evenly"
              }}
            >
              <View>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() => alert("העמוד בשיפוצים")}
                >
                  <Text style={styles.Text}>דירוגים וביקורות </Text>
                  <Image
                    source={require("../assets/star.png")}
                    style={styles.Image}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() => alert("העמוד בשיפוצים")}
                >
                  <Text style={styles.Text}>עדכונים</Text>
                  <Image
                    source={require("../assets/news.png")}
                    style={styles.Image}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.Text}>עוברים דירה?</Text>
            <TouchableOpacity>
              <Text style={styles.Text1}>לחצו כאן</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    paddingTop: 70
  },
  header: {
    fontSize: 50,
    paddingTop: 30,
    textAlign: "center",
    fontStyle: "italic",
    color: "blue",
    fontWeight: "bold"
  },
  Image: {
    backgroundColor: "transparent",
    width: 100,
    height: 100,
    borderRadius: 10
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  Text: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold"
  },
  Text1: {
    fontSize: 18,
    color: "red",
    marginLeft: 10,
    marginBottom: 30,
    textDecorationLine: "underline"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  }
});
export default MainPage;
