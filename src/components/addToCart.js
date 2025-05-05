import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddToCartButton = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Add to Cart</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 129,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddToCartButton;