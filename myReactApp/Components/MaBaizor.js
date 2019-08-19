import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Header, Button } from "react-native-elements";
import { Location, Permissions } from "expo";
import styles from "./MapStyle";
import { Map } from "./Map.js";

export class MapPage extends Component {
  static navigationOptions = {
    title: "LOCATION"
  };
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      adress: "",
      error: "",
      latitude: 32.427657,
      longitude: 34.9442847,
      delta: 0.02,
      location: null
    };
  }

  handlecity = e => {
    this.setState({
      city: e
    });
  };

  handleadress = e => {
    this.setState({
      adress: e
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
  handleSubmit = async () => {
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
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/login2-pic.png")}
          style={style.backgroundImage}
        >
          <View style={style.container}>
            <View>
              <Text style={style.header}>מה באיזור? </Text>
            </View>
            <TextInput
              style={style.input}
              onChangeText={this.handlecity}
              placeholder="e.g Tel-Aviv, Rothschild 84"
              value={this.state.city}
            />

            <Button title="Submit" onPress={this.handleSubmit} />

            <View style={styles.Content}>
              <Map
                mylatitude={this.state.latitude}
                mylongitude={this.state.longitude}
                mydelta={this.state.delta}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
  }
});

export default MapPage;
