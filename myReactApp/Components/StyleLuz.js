import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
    color: "blue"
  },
  head: {
    flexDirection: "row", //In row
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "white", //Gray
    fontSize: 18,
    textAlign: "center"
  },
  ImageStyle: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    height: 47,
    borderRadius: 5,
    margin: 10
  },
  InputBar: {
    flexDirection: "row", //In row
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "#E8E8E8" //Gray
  },
  textBox: {
    borderRadius: 5,
    borderWidth: 5,
    borderColor: "gray",
    fontSize: 18,
    paddingHorizontal: 5,
    paddingVertical: 10,
    flex: 1,
    height: 50
  },
  sendBtn: {
    paddingHorizontal: 13,
    marginRight: 3,
    marginLeft: 5,
    borderRadius: 5
  },
  disabledColor: {
    backgroundColor: "#87CEEB" //Before
  },
  enabledColor: {
    backgroundColor: "#0000FF" //After
  },
  bottomView: {
    position: "absolute",
    bottom: 0
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  },
  SectionStyle: {
    borderColor: "#F5FCFF",
    borderRadius: 10,
    borderWidth: 1,
    width: 350,
    height: 55,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
  }
});
