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

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export default function App() {
  const [description, setDescription] = useState('');
  const [filterValue, setFilterValue] = useState(FilterStatus.PENDING);
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
    await itemsByStatus();

    Alert.alert('Adicionado', `${description} adicionado com sucesso`);

    setDescription('');
    setFilterValue(FilterStatus.PENDING);
  }

  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filterValue);
      setItems(response);
    } catch (error) {
      console.log('🚀 ~ itemsByStatus ~ error:', error);
      Alert.alert('Erro', 'Não foi possível filtrar os itens.');
    }
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id);
      await itemsByStatus();
    } catch (error) {
      console.log('🚀 ~ handleRemove ~ error:', error);
      Alert.alert('Remover', 'Não foi possível remover.');
    }
  }

  function handleClear() {
    Alert.alert('Limpar', 'Deseja remover todos os itens?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => onClear() },
    ]);
  }

  async function onClear() {
    try {
      await itemsStorage.clear();
      setItems([]);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível remover todos os items');
    }
  }

  async function handleToggleItemStatus(id: string): Promise<void> {
    try {
      await itemsStorage.toggleStatus(id);
      await itemsByStatus();
    } catch (error) {
      console.log("🚀 ~ handleToggleItemStatus ~ error:", error);
      Alert.alert("Erro", "Não foi possível alterar o status.");
    }
  }

  useEffect(() => {
    itemsByStatus();
  }, [filterValue]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.form}>
        <Input
          value={description}
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
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <ListItem
              data={item}
              onStatus={() => handleToggleItemStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
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
