import { View, Image } from 'react-native';

import { styles } from './styles';
import logo from '@/assets/logo.png';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.form}>
        <Input placeholder="O que você comprar?" />
        <Button title="Entrar" />
      </View>
      <View style={styles.content}></View>
    </View>
  );
}
