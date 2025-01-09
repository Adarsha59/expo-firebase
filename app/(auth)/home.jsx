import { Link, Stack, useNavigation } from "expo-router";
import { Button, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function Home() {
  const navigation = useNavigation();
  const { username, logout } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is Authenticat page of{username} </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("10%"),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: hp("2.2%"),
    fontWeight: "bold",
    textAlign: "center",
  },
});
