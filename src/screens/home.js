import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import CategoryButton from '../components/categoryButton';
import HeaderBar from '../components/headerBar';
import { StatusBar } from 'react-native';


const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://192.168.20.13:3000/products')
      .then(response => response.json())
      .then(products => {
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        uniqueCategories.sort();
        setCategories(uniqueCategories);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleCategoryPress = (category) => {
    navigation.navigate('Product', { category });
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View style={styles.headerBar}>
        <HeaderBar title="Categories" />
      </View>

      <View style={styles.outline}>
        <View style={styles.container}>
          {categories.map(category => (
            <CategoryButton  
              key={category}
              title={category}
              width={300}
              height={50}
              marginTop={20}
              onPress={() => handleCategoryPress(category)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  headerBar: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  outline: {
    marginHorizontal: 20,
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 275,
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
});

export default Home;
