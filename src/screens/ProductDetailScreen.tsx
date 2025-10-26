import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

type Props = {
  route: ProductDetailScreenRouteProp;
};

const ProductDetailScreen: React.FC<Props> = ({ route }) => {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f2f2f2' },
  image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 15 },
  name: { fontSize: 22, fontWeight: '700', marginBottom: 5 },
  brand: { fontSize: 16, color: '#555', marginBottom: 5 },
  price: { fontSize: 18, color: '#007AFF', fontWeight: '700', marginBottom: 15 },
  description: { fontSize: 16, color: '#333' },
});
