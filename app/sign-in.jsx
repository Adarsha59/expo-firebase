import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "expo-router";

const SignIn = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const Login = async () => {
    await login(email, password);
    // router.navigate("sign-in");
    console.log("object is login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setemail(text)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={Login}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: hp("5%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
    color: "#333",
  },
  inputWrapper: {
    width: wp("80%"),
    marginBottom: hp("3%"),
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("4%"),
    fontSize: hp("2%"),
    marginBottom: hp("2%"),
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
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
  forgotPassword: {
    marginTop: hp("2%"),
    fontSize: hp("2%"),
    color: "#4a90e2",
    textDecorationLine: "underline",
  },
});

export default SignIn;
