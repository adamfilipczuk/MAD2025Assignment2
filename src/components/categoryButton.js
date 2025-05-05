import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import colors from "../style/colors.js";

const CategoryButton = ({ width, height, marginBottom, marginTop, title }) => {
  const navigation = useNavigation(); // Get the navigation object using the hook

  const capitalizedTitle = title
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Product", { category: title })} // Navigate to the product screen
      style={[styles.touchField, { width, height, marginBottom, marginTop }]}
    >
      <Text style={styles.buttonText}>{capitalizedTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchField: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
});

export default CategoryButton;
