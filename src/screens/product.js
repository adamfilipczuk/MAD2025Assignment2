import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ProductButton from '../components/productButton';
import HeaderBar from '../components/headerBar';
import BackButton from '../components/backButton';

const ProductScreen = ({ route, navigation }) => {
  const { category } = route.params; // Get the category passed from the previous screen
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://192.168.20.13:3000/products')
      .then(response => response.json())
      .then(data => {
        const filteredProducts = data.filter(product => product.category === category);
        setProducts(filteredProducts);
      })
      .catch(error => {
        console.error('Error fetching category products:', error);
      });
  }, [category]); // Refetch data whenever the category changes

  return (
    <View style={styles.screen}>

      <View style={styles.headerBar}>
        <HeaderBar title={category}></HeaderBar>
      </View>

      <View style={styles.outline}>
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductButton
              key={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              width={200}
              height={120}
              marginTop={20}
              onPress={() => navigation.navigate("Description", { productId: item.id })}
              id={item.id}
            />
          )}
        />
      </View>
      <View style= {styles.buttonContainer}>
        <BackButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  headerBar: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "white",
    maxHeight: '77%',  
    overflow: 'hidden',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
});

export default ProductScreen;
