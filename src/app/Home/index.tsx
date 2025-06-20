/* eslint-disable no-undef */
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import logo from '@/assets/logo.png';

import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';
import { Input } from '@/components/Input';
import { ListItem } from '@/components/ListItem ';

import { FilterStatus } from '@/types/FilterStatus';

import { styles } from './styles';
import { useState } from 'react';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];
const ITEMS = [
  {
    id: "1",
    description: "2 pacotes de café",
    status: FilterStatus.PENDING,
  },
  {
    id: "2",
    description: "1 pacote de arroz",
    status: FilterStatus.DONE,
  },
  {
    id: "3",
    description: "1 regrigerante",
    status: FilterStatus.PENDING,
  },
]

export default function App() {
  const [filterValue, setFilterValue] = useState(FilterStatus.DONE);
  let name = "";

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
            <Filter
              key={status}
              status={status}
              isActive={status === filterValue}
              onPress={() => setFilterValue(status)}
            />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={ITEMS}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <ListItem
              data={item}
              onStatus={() => console.log('Status changing ...')}
              onRemove={() => console.log('Removing ...')}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
        />
      </View>
    </View>
  );
}
