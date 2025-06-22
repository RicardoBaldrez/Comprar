/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

import logo from '@/assets/logo.png';

import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';
import { Input } from '@/components/Input';
import { ListItem } from '@/components/ListItem ';

import { FilterStatus } from '@/types/FilterStatus';

import { itemsStorage, ItemStorageType } from '@/storage/itemsStorage';

import { styles } from './styles';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];

export default function App() {
  const [description, setDescription] = useState('');
  const [filterValue, setFilterValue] = useState(FilterStatus.DONE);
  const [items, setItems] = useState<ItemStorageType[]>([]);

  async function handleAddItem() {
    if (!description.trim()) {
      console.log('Não tem nada!!!');
      return Alert.alert('Adicionar', 'Informe a descrição para adicionar.');
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    };

    await itemsStorage.add(newItem);
    await getItems();
  }

  async function getItems() {
    try {
      const response = await itemsStorage.get();
      setItems(response);
    } catch (error) {
      console.log('🚀 ~ getItems ~ error:', error);
      Alert.alert('Erro', 'Não foi possível filtrar os itens.');
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.form}>
        <Input
          onChangeText={setDescription}
          placeholder="O que você comprar?"
        />
        <Button title="Adicionar" onPress={handleAddItem} />
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
          data={items}
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
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
        />
      </View>
    </View>
  );
}
