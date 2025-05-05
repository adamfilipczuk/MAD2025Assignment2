import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import colors from "../style/colors.js";
import BackButton from '../components/backButton.js';
import AddToCartButton from '../components/addToCart.js';
import HeaderBar from '../components/headerBar.js'; 

const Description = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.20.13:3000/products/${productId}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);

  useEffect(() => {
    if (product?.image) {
      Image.prefetch(product.image);
    }
  }, [product]);

  if (!product) {
    return <Text>Loading...</Text>;
  }

  const data = [
    {
      id: 'image',
      renderItem: (
        <View style={styles.imageField}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
          />
        </View>
      ),
    },
    {
      id: 'title',
      renderItem: (
        <Text style={styles.header}>{product.title}</Text>
      ),
    },
    {
      id: 'info',
      renderItem: (
        <View style={styles.infoField}>
          <Text style={styles.info}>Rating: {product.rating.rate}</Text>
          <Text style={styles.info}>Count: {product.rating.count}</Text>
          <Text style={styles.info}>Price: ${product.price}</Text>
        </View>
      ),
    },
    {
      id: 'buttons',
      renderItem: (
        <View style={styles.buttonContainer}>
          <BackButton />
          <AddToCartButton />
        </View>
      ),
    },
    {
      id: 'descriptionHeading',
      renderItem: (
        <Text style={styles.subHeading}>Description:</Text>
      ),
    },
    {
      id: 'description',
      renderItem: (
        <View style={styles.descriptionField}>
          <Text>{product.description}</Text>
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <HeaderBar title={"Description"} />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => item.renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 5,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  info: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  infoField: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "lightblue",
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 8,
  },
  imageField: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  descriptionField: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    backgroundColor: "lightgrey",
    paddingHorizontal: 10,
  },
  headerBar: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
});

export default Description;
