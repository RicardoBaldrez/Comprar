import { View, Image } from 'react-native';

import { styles } from './styles';
import logo from '@/assets/logo.png';
import { Button } from '@/components/Button';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Button title="Adicionar" />
    </View>
  );
}
