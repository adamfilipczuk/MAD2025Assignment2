import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ user, onLogout }) => {
  const [newName, setNewName] = useState(user.name);
  const [namePassword, setNamePassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleNameUpdate = async () => {
    if (!newName || !namePassword) {
      Alert.alert('Error', 'Name and password cannot be empty.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch('http://192.168.20.13:3000/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName, password: namePassword }),
      });

      const result = await response.json();

      if (result.status === 'OK') {
        Alert.alert('Success', 'Name updated.');
        setNamePassword('');
      } else {
        Alert.alert('Error', result.message || 'Update failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unexpected error occurred.');
    }
  };

  const handlePasswordUpdate = async () => {
  if (!newPassword) {
    Alert.alert('Error', 'Password cannot be empty.');
    return;
  }

  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await fetch('http://192.168.20.13:3000/users/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newName, password: newPassword }), // always include name
    });

    const result = await response.json();

    if (result.status === 'OK') {
      Alert.alert('Success', 'Password updated.');
      setNewPassword('');
      setShowPasswordInput(false);
    } else {
      Alert.alert('Error', result.message || 'Update failed.');
    }
  } catch (error) {
    Alert.alert('Error', 'Unexpected error occurred.');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={newName}
        onChangeText={setNewName}
      />
      <Text style={styles.label}>Current Password (required to update name):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter current password"
        secureTextEntry
        value={namePassword}
        onChangeText={setNamePassword}
      />
      <Button title="Update Name" onPress={handleNameUpdate} />

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <View style={styles.section}>
        <Button
          title={showPasswordInput ? "Cancel Password Change" : "Update Password"}
          onPress={() => setShowPasswordInput(!showPasswordInput)}
        />
        {showPasswordInput && (
          <>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Button title="Submit Password Change" onPress={handlePasswordUpdate} />
          </>
        )}
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={onLogout} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  section: {
    marginTop: 16,
  },
});

export default ProfileScreen;
