import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrderStatus, deleteOrder, setOrders } from '../components/orderSlice.js';

const MyOrdersScreen = () => {
  const orders = useSelector(state => state.orders);
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchTokenAndOrders = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          setToken(storedToken);
          await fetchOrders(storedToken);
        } else {
          Alert.alert('Error', 'No auth token found. Please log in again.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load auth token');
      }
    };
    fetchTokenAndOrders();
  }, []);

  const fetchOrders = async (authToken) => {
    try {
      const response = await fetch('http://192.168.20.13:3000/orders/all', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      if (response.ok && data.orders) {
        dispatch(setOrders(data.orders));
      } else {
        Alert.alert('Error', data.message || 'Could not fetch orders');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch orders: ' + error.message);
    }
  };

  const updateOrder = async (orderID, isPaid = 0, isDelivered = 0) => {
    if (!token) {
      Alert.alert('Error', 'No auth token found, please login again.');
      return;
    }
    try {
      const response = await fetch('http://192.168.20.13:3000/orders/updateorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ orderID, isPaid, isDelivered }),
      });
      const data = await response.json();
      if (data.status === 'OK') {
        if (isDelivered === 1) {
          dispatch(deleteOrder(orderID)); // remove order if delivered
        } else {
          dispatch(updateOrderStatus({ orderID, isPaid, isDelivered }));
        }
        Alert.alert('Success', 'Order updated successfully');
      } else {
        Alert.alert('Error', data.message || 'Update failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong: ' + error.message);
    }
  };

   const renderOrder = ({ item }) => {
    // Parse order_items JSON string safely
    let parsedItems = [];
    try {
      parsedItems = JSON.parse(item.order_items);
    } catch (e) {
      console.warn('Failed to parse order_items for order', item.id);
    }

    // Calculate total count and total price from parsed items if needed
    const totalCount = parsedItems.reduce((sum, i) => sum + (i.count || 0), 0);
    const totalPrice = parsedItems.reduce((sum, i) => sum + (i.price || 0) * (i.count || 0), 0);

    return (
      <View style={styles.orderBox}>
        <Text style={styles.orderText}>Order #{item.id}</Text>
        <Text style={styles.orderText}>Items: {item.item_numbers || totalCount}</Text>
        <Text style={styles.orderText}>
          Total: ${item.total_price > 0 ? item.total_price.toFixed(2) : totalPrice.toFixed(2)}
        </Text>

        {!item.isPaid && (
          <Button title="Pay" onPress={() => updateOrder(item.id, 1, 0)} />
        )}

        {item.isPaid && !item.isDelivered && (
          <Button title="Received" onPress={() => updateOrder(item.id, 1, 1)} />
        )}
      </View>
    );
  };  // <-- CLOSE renderOrder here


  // MAIN return of MyOrdersScreen component:
  if (orders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No orders found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(order, index) => (order?.id ? order.id.toString() : index.toString())}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    paddingTop: 50,
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  orderBox: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
  },
  orderText: { fontSize: 18, marginBottom: 10 },
});

export default MyOrdersScreen;
