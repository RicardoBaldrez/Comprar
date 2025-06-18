/* eslint-disable no-undef */
import { View, Image, Text, TouchableOpacity } from 'react-native';

import logo from '@/assets/logo.png';

import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';
import { Input } from '@/components/Input';
import { ListItem } from '@/components/ListItem ';

import { FilterStatus } from '@/types/FilterStatus';

import { styles } from './styles';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.form}>
        <Input placeholder="O que você comprar?" />
        <Button title="Entrar" />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter key={status} status={status} isActive />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <ListItem
          data={{ status: FilterStatus.DONE, description: 'Café' }}
          onStatus={() => console.log('Status changing ...')}
          onRemove={() => console.log('Removing ...')}
        />
      </View>
    </View>
  );
}
