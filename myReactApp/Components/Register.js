import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Button,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";

const WSURL = "http://ruppinmobile.tempdomain.co.il/site10/WebService.asmx";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Firstname: "",
      Lastname: "",
      Email: "",
      Pass: "",
      Confirmpass: "",
      error: null
    };
  }

  handleFirstname = e => {
    this.setState({
      Firstname: e
    });
  };

  handleLastname = e => {
    this.setState({
      Lastname: e
    });
  };

  handleEmail = e => {
    this.setState({
      Email: e
    });
  };

  handlePass = e => {
    this.setState({
      Pass: e
    });
  };

  handleConfirmpass = e => {
    this.setState({
      Confirmpass: e
    });
  };

  isValid() {
    const { Firstname, Lastname, Email, Confirmpass, Pass } = this.state;
    let valid = false;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let reg2 = /^[a-zA-z][a-z\s]*$/;
    let passreg = /^(?=.*\d)[A-Za-z\d]{3,}$/;

    if (!reg2.test(Firstname) || Firstname.length === 0) {
      this.setState({ error: "Invalid First Name" });
    } else if (!reg2.test(Lastname) || Lastname.length === 0) {
      this.setState({ error: "Invalid Last Name" });
    } else if (!reg.test(Email) || Email.length === 0) {
      this.setState({ error: "Invalid Email" });
    } else if (!passreg.test(Pass) || Pass.length === 0) {
      this.setState({ error: "Invalid Password" });
    } else if (!passreg.test(Confirmpass) || Confirmpass.length === 0) {
      this.setState({ error: "Invalid Password" });
    } else if (Confirmpass != Pass) {
      this.setState({ error: "Passwords dont Match!" });
    } else {
      valid = true;
    }

    return valid;
  }

  onSignIn = () => {
    if (this.isValid()) {
      const data = {
        FirstName: this.state.Firstname,
        LastName: this.state.Lastname,
        Email: this.state.Email,
        Password: this.state.Pass
      };
      fetch(WSURL + "/Regsiter", {
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
            console.log(result.d);
            if (u == null) {
              alert("User Already Exists");
            } else {
              alert("Registered Successfully");
              this.props.navigation.navigate("MapPage");
            }
          },
          error => {
            console.log("err post=", error);
          }
        );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/login2-pic.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.container}>
            <Text style={styles.header}> פתח את החשבון השכונתי שלך.. </Text>
          </View>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={100}
            enabled
          >
            <ScrollView>
              <View style={styles.mainContainer}>
                <View style={styles.inputContainer}>
                  <Image
                    style={styles.inputIcon}
                    source={{
                      uri:
                        "https://png.icons8.com/male-user/ultraviolet/50/3498db"
                    }}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      { borderTopLeftRadius: 8, borderTopRightRadius: 8 }
                    ]}
                    onChangeText={this.handleFirstname}
                    placeholder=" שם פרטי"
                    value={this.state.Firstname}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Image
                    style={styles.inputIcon}
                    source={{
                      uri:
                        "https://png.icons8.com/male-user/ultraviolet/50/3498db"
                    }}
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={this.handleLastname}
                    placeholder=" שם משפחה"
                    value={this.state.Lastname}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Image
                    style={styles.inputIcon}
                    source={{
                      uri:
                        "https://png.icons8.com/message/ultraviolet/50/3498db"
                    }}
                  />

                  <TextInput
                    style={styles.input}
                    onChangeText={this.handleEmail}
                    placeholder="Example@wall.com"
                    value={this.state.Email}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Image
                    style={styles.inputIcon}
                    source={{
                      uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db"
                    }}
                  />

                  <TextInput
                    style={styles.input}
                    onChangeText={this.handlePass}
                    placeholder="סיסמא"
                    value={this.state.Pass}
                    secureTextEntry={true}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Image
                    style={styles.inputIcon}
                    source={{
                      uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db"
                    }}
                  />

                  <TextInput
                    style={[
                      styles.input,
                      { borderBottomRightRadius: 9, borderBottomLeftRadius: 9 }
                    ]}
                    onChangeText={this.handleConfirmpass}
                    placeholder="אימות סיסמא"
                    value={this.state.Confirmpass}
                    secureTextEntry={true}
                  />
                </View>

                <Text style={{ color: "red" }}>{this.state.error}</Text>

                <Button
                  title="המשך בדרכך לשכונה"
                  onPress={this.onSignIn}
                  style={styles.buttonContainer}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    marginBottom: 40
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  },
  header: {
    fontSize: 30,
    textAlign: "center",

    fontStyle: "italic",
    color: "blue",
    textDecorationStyle: "dashed"
  },
  mainContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50
  },
  input: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 16
  }
});

export default Register;
