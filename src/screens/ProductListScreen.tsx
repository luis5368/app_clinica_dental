import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type ProductListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

type Props = {
  navigation: ProductListScreenNavigationProp;
};

const products = [
  { id: '1', name: 'Producto A', description: 'Descripción del producto A' },
  { id: '2', name: 'Producto B', description: 'Descripción del producto B' },
  { id: '3', name: 'Producto C', description: 'Descripción del producto C' },
];

const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  name: { fontSize: 18, fontWeight: 'bold' },
  desc: { fontSize: 14, color: '#666' },
});
