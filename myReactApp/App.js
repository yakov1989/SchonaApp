import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Badge, Button, Icon } from "react-native-elements";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./Components/Login.js";
import Register from "./Components/Register.js";
import MapPage from "./Components/MapPage.js";
import MainPage from "./Components/MainPage.js";
import MaBaizor from "./Components/MaBaizor.js";
import Luz from "./Components/Luz.js";

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    );
  }
}
const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    MapPage: MapPage,
    MainPage: MainPage,
    MapPage: MapPage,
    MaBaizor: MaBaizor,
    Luz: Luz
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {
      headerVisable: false
    }
  },
  {
    initialRouteName: "MainPage"
  }
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default createAppContainer(AppNavigator);
