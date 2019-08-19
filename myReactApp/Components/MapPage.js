import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Header, Button } from "react-native-elements";
import { Location, Permissions } from "expo";
import styles from "./MapStyle";
import { Map } from "./Map.js";
import Geocoder from "react-native-geocoder";

const WSURL = "http://ruppinmobile.tempdomain.co.il/site10/WebService.asmx";
export class MapPage extends Component {
  static navigationOptions = {
    title: "LOCATION"
  };
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      address: "",
      error: "",
      latitude: 32.427657,
      longitude: 34.9442847,
      delta: 0.1,
      email: ""
    };
    isAddress = false;
  }

  handleCity = e => {
    this.setState({
      city: e
    });
  };

  handleAddress = e => {
    this.setState({
      address: e
    });
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude, // +  Math.random()/1000,
          longitude: position.coords.longitude
        });
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  // insertCity = () => {
  //   const data = {
  //     cityName: this.state.city,
  //     Username: getEmail
  //   };
  //   fetch(WSURL + "/MapPage", {
  //     method: "post",
  //     headers: new Headers({
  //       "Content-Type": "application/json;"
  //     }),
  //     body: JSON.stringify(data)
  //   })
  //     .then(res => {
  //       alert(res);
  //       return res.json();
  //     })
  //     .then(
  //       result => {
  //         let u = JSON.parse(result.d);
  //         console.log(result.d);
  //         if (u != -1) {
  //           this.props.navigation.navigate("MapPage");
  //         } else {
  //           alert("Invalid City!!");
  //         }
  //       },
  //       error => {
  //         console.log("err post=", error);
  //       }
  //     );
  // };

  handleMyLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
    alert("הכתובת נשמרה");
    this.setState({
      isPressed: true
    });
    isAddress = true;
  };

  handleLoc = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    if (this.isValid()) {
      const { city } = this.state;
      var detials = city.split(",", 2);
      if (detials[1] !== "") {
        this.setState({
          delta: 0.01
        });
      } else {
        this.setState({
          delta: 0.2
        });
      }

      let geocode = await Location.geocodeAsync(city);
      this.setState({
        latitude: geocode[0].latitude,
        longitude: geocode[0].longitude
      });
      isAddress = true;
      this.setState({ city: city });
    } else {
      alert("Invalid city");
    }
  };

  isValid() {
    let valid = false;
    const { city } = this.state;
    if (city.length !== 0) {
      valid = true;
    }
    return valid;
  }
  // handleSubmit = async => {
  //   let City = Location.reverseGeocodeAsync({
  //     latitude: this.state.latitude,
  //     longitude: this.state.longitude
  //   });
  //   this.setState(
  //     {
  //       city: City
  //     }
  //     // this.insertCity()
  //   );
  // };

  toMainPage = async () => {
    this.props.navigation.navigate("MainPage");
  };

  render() {
    // const getEmail = this.props.navigation.getParam("email", "NULL");
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/login2-pic.png")}
          style={style.backgroundImage}
        >
          <View style={style.container}>
            <View>
              <Text style={style.header}>עוד קצת וסיימנו.. </Text>
            </View>
            <TextInput
              style={style.input}
              onChangeText={this.handlecity}
              placeholder="תל אביב,רוטשילד 34"
              value={this.state.city}
            />
            <View style={style.buttons}>
              <Button title="חפש מיקום" onPress={this.handleLoc} />
              <Button
                title="השתמש במיקום שלי"
                onPress={this.handleMyLocation}
              />
            </View>
            <View style={styles.Content}>
              <Map
                mylatitude={this.state.latitude}
                mylongitude={this.state.longitude}
                mydelta={this.state.delta}
              />
            </View>
          </View>
          <Button title="סיים הרשמה" onPress={this.toMainPage} />
        </ImageBackground>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    paddingTop: 50,
    fontStyle: "italic",
    color: "blue",
    textDecorationStyle: "dashed"
  },
  input: {
    fontSize: 16,
    height: 36,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#888888",
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 10
  },
  Content: {
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("window").width - 10,
    flexDirection: "row-reverse"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    borderRadius: 10
  },
  Image: {
    backgroundColor: "transparent",
    width: 50,
    height: 50,
    borderRadius: 10
  },
  Text: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold"
  }
});

export default MapPage;
