import { View, Image } from "react-native";

import { styles } from "./styles";

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
    </View>
  );
}
