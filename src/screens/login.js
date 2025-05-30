import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({ onLogin })  => {
  const navigation = useNavigation();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

 const handleAuth = async () => {
  if (!email || !password || (!isLogin && !name)) {
    alert('Please fill all required fields');
    return;
  }

  try {
    const endpoint = isLogin 
      ? 'http://192.168.20.13:3000/users/signin'
      : 'http://192.168.20.13:3000/users/signup';

    const bodyData = isLogin 
      ? { email, password }
      : { name, email, password };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    });

    const data = await response.json();

   if (response.ok && data.token) {
  // save to AsyncStorage etc
  const user = {
    name: data.name,
    email: data.email,
    id: data.id,
  };
  await AsyncStorage.setItem('userData', JSON.stringify(user));
  await AsyncStorage.setItem('hasLoggedIn', 'true');
  await AsyncStorage.setItem('authToken', data.token);

  // Call onLogin passed from props (LoginStackScreen -> App)
  onLogin(user);

  // No need to do navigation.reset here
} else {
  alert(data.message || 'Login failed');
}

  } catch (error) {
    console.error('Auth error:', error);
    alert('Something went wrong. Please try again later.');
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>

        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#90caf9"
            value={name}
            onChangeText={setName}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#90caf9"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#90caf9"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>
            {isLogin ? 'Login' : 'Sign Up'}
        </Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  formContainer: {
    marginHorizontal: 30,
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#f5faff',
    shadowColor: '#90caf9',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#90caf9',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    color: '#1976d2',
  },
  button: {
    backgroundColor: '#90caf9',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchText: {
    color: '#1976d2',
    textAlign: 'center',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
