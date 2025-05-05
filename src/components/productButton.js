import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import colors from "../style/colors";

const ProductButton = ({ width, height, marginBottom, marginTop, title, id, price, image }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate("Description", { productId: id })}
      style={[styles.touchField, { height, marginBottom, marginTop }]}
    >
      <View style={styles.buttonContent}>
        <Image 
          source={{ uri: image }} 
          style={styles.productImage} 
          resizeMode="contain" 
        />
        <View style={styles.textContent}>
          <Text style={styles.buttonText}>{title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>Price:</Text>
            <Text style={styles.pricePrice}>${price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchField: {
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 8,
    paddingHerizontal: 10,
    marginBottom: 5,
  },
  buttonContent: {
    flexDirection: "row", 
    alignItems: "center", 
    width: "100%",
  },
  productImage: {
    width: "25%",
    height: 60,
    marginRight: 15,
    marginLeft: 5,
  },
  textContent: {
    flex: 1,
    justifyContent: "center", 
  },
  buttonText: {
    fontSize: 13,
    color: colors.textPrimary,
    paddingBottom: 20,
    marginRight: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginTop: 5,
  },
  pricePrice: {
    fontSize: 13,
    color: colors.textPrimary,
    marginTop: 5,
  },
});

export default ProductButton;
