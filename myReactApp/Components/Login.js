import React, { Component } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { Button, Image } from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
const WSURL = "http://ruppinmobile.tempdomain.co.il/site10/WebService.asmx";

// Class Login
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      Password: ""
    };
  }

  handleUserName = e => {
    this.setState({
      userName: e
    });
  };

  handlePass = e => {
    this.setState({
      Password: e
    });
  };

  isValid() {
    const { userName, Password } = this.state;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //checks email
    let passreg = /^[A-Za-z\d]{3,}$/; //checks password
    let valid = true;

    if (!reg.test(userName) || userName.length === 0) {
      valid = false;
    } else if (!passreg.test(Password) || Password.length === 0) {
      valid = false;
    }
    return valid;
  }

  onSignIn = () => {
    if (this.isValid()) {
      const data = {
        Email: this.state.userName,
        Password: this.state.Password
      };
      fetch(WSURL + "/Login", {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json;"
        }),
        body: JSON.stringify(data)
      })
        .then(res => {
          return res.json();
        })
        .then(
          result => {
            let u = JSON.parse(result.d);
            if (u != null) {
              alert("Logged in !");
              this.props.navigation.navigate("MainPage");
            } else {
              alert("Invalid User Name or Password");
              this.setState({
                username: "",
                password: ""
              });
            }
          },
          error => {
            console.log("err post=", error);
          }
        );
    } else {
      alert("Illegal characters");
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/login-pic.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.container}>
            <Text style={styles.header}> ברוכים הבאים </Text>
            <Text
              style={{
                fontStyle: "italic",
                fontSize: 45,
                textAlign: "center",
                color: "blue",
                fontWeight: "bold"
              }}
            >
              לשכונה..
            </Text>

            <KeyboardAvoidingView
              behavior="padding"
              style={{ paddingTop: 10 }}
              enabled
            >
              <View style={styles.inputcontainer}>
                <View style={styles.SectionStyle}>
                  <Image //Icon
                    source={require("../assets/username.png")}
                    style={styles.ImageStyle}
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={this.handleUserName}
                    placeholderTextColor="grey"
                    placeholder="Example@gmail.com"
                    value={this.state.userName}
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <Image
                    source={require("../assets/password.png")}
                    style={styles.ImageStyle}
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={this.handlePass}
                    placeholderTextColor="grey"
                    placeholder="Password"
                    value={this.state.Password}
                    secureTextEntry={true}
                  />
                </View>

                <View>
                  <Button title="התחבר" onPress={this.onSignIn} />
                </View>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Register")}
                >
                  <Text style={styles.Text}>משתמש חדש?</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 70,
    fontStyle: "italic",
    color: "blue"
  },
  inputcontainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 100,
    paddingTop: 200
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  },
  input: {
    height: 45,
    borderBottomColor: "#FFFFFF",
    flex: 1,
    color: "black"
  },
  button: {
    backgroundColor: "#3B5998",
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 30
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 16
  },
  Text: {
    fontSize: 18,
    color: "lightblue",
    fontStyle: "italic",
    textDecorationLine: "underline"
  },
  ImageStyle: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  SectionStyle: {
    borderColor: "#F5FCFF",
    borderRadius: 10,
    borderWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
  }
});
// AppRegistry.registerComponent("Login", () => Login);

export default Login;
