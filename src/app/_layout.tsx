import "@/styles/global.css";

import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView className="flex-[1]">
      <Slot />
    </GestureHandlerRootView>
  );
}
