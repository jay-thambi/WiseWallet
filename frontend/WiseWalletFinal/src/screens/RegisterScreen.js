import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
    major: '',
    graduationYear: '',
  });
  const { register, error } = useAuth();

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await register(formData);
    } catch (err) {
      console.error(err);
    }
  };

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Create Account</Title>
      <TextInput
        label="Full Name"
        value={formData.name}
        onChangeText={(value) => updateFormData('name', value)}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={(value) => updateFormData('email', value)}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={formData.password}
        onChangeText={(value) => updateFormData('password', value)}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        label="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(value) => updateFormData('confirmPassword', value)}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        label="University"
        value={formData.university}
        onChangeText={(value) => updateFormData('university', value)}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Major"
        value={formData.major}
        onChangeText={(value) => updateFormData('major', value)}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Graduation Year"
        value={formData.graduationYear}
        onChangeText={(value) => updateFormData('graduationYear', value)}
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      >
        Already have an account? Login
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default RegisterScreen; 