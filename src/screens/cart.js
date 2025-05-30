import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from '../components/cartSlice.js';
import { addOrder } from '../components/orderSlice.js';


const Cart = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // Calculate total price of all items
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

  //uses the cartslice compoenent to adjust items in the appropriate object via order id
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Name: {item.title}</Text>
      <Text style={styles.itemText}>Price: ${item.price.toFixed(2)}</Text>
      <Text style={styles.itemText}>Count: {item.count}</Text>
      <Text style={styles.itemText}>Total: ${(item.price * item.count).toFixed(2)}</Text>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(increaseQuantity(item.id))}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(decreaseQuantity(item.id))}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => dispatch(removeFromCart(item.id))}
        >
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const handleCheckout = () => {
 
  // Calculate total count of all items
  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  // create a new object
  const newOrder = {
    id: Date.now(),        // unique order id
    items: cartItems,
    item_numbers: totalCount,     
    total_price: totalPrice,      
    isPaid: false,
    isDelivered: false,
    createdAt: new Date().toISOString(),
  };
  // passing the new order to the slicer and notifying user
  dispatch(addOrder(newOrder));
  dispatch(clearCart());

  Alert.alert('Order placed!', `Order #${newOrder.id} has been created.`);
};

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your shopping cart is empty</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: ${totalPrice.toFixed(2)}</Text>
        <Button title="Check Out" onPress={handleCheckout} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 20,
    paddingBottom: 80,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: 40,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    width: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
  },
});

export default Cart;
