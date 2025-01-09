import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/context/AuthProvider";
import { View, Text } from "react-native";
import { useEffect } from "react";

const MainApp = () => {
  const { isauthenticated } = useAuth();
  console.log("object is authenticated=", isauthenticated);
  const router = useRouter();
  const segments = useSegments();
  useEffect(() => {
    if (typeof isauthenticated == "undefined") return;
    const ME = segments[0] == "(auth)";
    console.log("object me=", ME);
    if (!ME && isauthenticated) {
      router.navigate("home");
    } else if (isauthenticated == false) {
      router.navigate("sign-in");
    }
  }, [isauthenticated, segments]);

  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
};

export default function Layout() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
