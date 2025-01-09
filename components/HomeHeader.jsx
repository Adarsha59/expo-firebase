import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthProvider";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const HomeHeader = () => {
  const { username, logout } = useAuth();
  const Logout = () => {
    logout();
    navigation.navigate("index");
  };
  return (
    <View style={styles.headercontainer}>
      <Text style={styles.headertext}>{username}</Text>
      <TouchableOpacity style={styles.button} onPress={Logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp("5%"),
    backgroundColor: "#4a90e2",
  },
  headertext: {
    color: "#fff",
    fontSize: hp("2.5%"),
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("5%"),
    borderRadius: 10,
  },
  buttonText: {
    color: "#4a90e2",
    fontSize: hp("2%"),
  },
});
