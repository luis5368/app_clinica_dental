import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type ProductListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

type Props = {
  navigation: ProductListScreenNavigationProp;
};

type Product = {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  image: string;
};

const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Simulación de llamada API
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.example.com/products'); // Cambia por tu API real
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar los productos');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleLogout = () => {
    navigation.replace('Login'); // Vuelve al login
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar medicamento..."
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.brand}>{item.brand}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Text numberOfLines={2}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f2f2f2' },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: { width: 80, height: 80, marginRight: 10, borderRadius: 8 },
  info: { flex: 1 },
  name: { fontWeight: '700', fontSize: 16 },
  brand: { color: '#555' },
  price: { color: '#007AFF', fontWeight: '700', marginVertical: 5 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoutButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  logoutText: {
    color: '#007AFF',
    fontWeight: '700',
  },
});
