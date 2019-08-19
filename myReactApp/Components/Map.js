import React, { Component } from "react";
import { Text, View, Dimensions, StyleSheet, Image } from "react-native";
import { Header, Button } from "react-native-elements";
import { Location, Permissions } from "expo";
import styles from "./MapStyle";
import { MapView } from "expo";
const { Marker } = MapView;

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 32.427657,
      longitude: 34.9442847,
      delta: 0.1,
      name: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    // update original states
    this.setState({
      latitude: nextProps.mylatitude,
      longitude: nextProps.mylongitude,
      delta: nextProps.mydelta
    });
  }
  componentWillMount() {
    this.handleLonLatToString();
  }

  handleLonLatToString = () => {
    let geocode = Location.reverseGeocodeAsync({
      latitude: this.state.latitude,
      longitude: this.state.longitude
    });
  };

  render() {
    return (
      <View>
        <MapView
          style={{
            flex: 1,
            width: Dimensions.get("window").width - 40
          }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.delta,
            longitudeDelta: this.state.delta
          }}
        >
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            title="Your Position"
            description="Where you are now"
          />
        </MapView>
      </View>
    );
  }
}

export default Map;
