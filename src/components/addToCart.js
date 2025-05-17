import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';

const AddToCartButton = ({ title, id, price }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({title, id, price, count: 1 }));
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
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
/* dont have token from login so this doesnt work
const AddToCartButton = ({id, price}) => {

    const handleAddToCart = async () => {
        try {
            const response = await fetch('http://192.168.20.13:3000/cart', {
                method: 'PUT',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    price: price,
                    count: 1, 
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Product added to cart:', data);
            }   else {
                console.error('Error adding product to cart:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
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

*/