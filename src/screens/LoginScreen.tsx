// src/screens/ProductListScreen.tsx
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
  RefreshControl,
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
  ID_PRODUCTO: number;
  NOMBRE: string;
  DESCRIPCION: string;
  TIPO: string;
  PRECIO_COSTO: number;
  PRECIO_VENTA: number;
  STOCK: number;
  ID_SUCURSAL: number;
};

const API_URL = 'http://192.168.1.155:4000/api/productos/';

const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error HTTP ' + response.status);
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error: any) {
      console.error('⚠️ Error en la petición:', error.message || error);
      Alert.alert(
        'Error',
        'No se pudo conectar con la API. Revisa tu red y que el servidor esté corriendo.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Llamada inicial + polling cada 10 segundos
  useEffect(() => {
    let isMounted = true;
    fetchProducts();

    const interval = setInterval(() => {
      if (isMounted) fetchProducts();
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = products.filter((p) =>
      p.NOMBRE.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
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
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar producto..."
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.ID_PRODUCTO.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image
              source={{
                uri: 'https://via.placeholder.com/80', // Cambia si tu DB tiene URL real de imagen
              }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.NOMBRE}</Text>
              <Text style={styles.brand}>{item.TIPO}</Text>
              <Text style={styles.price}>${item.PRECIO_VENTA}</Text>
              <Text>Cantidad: {item.STOCK}</Text>
              <Text numberOfLines={2}>{item.DESCRIPCION}</Text>
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
});
