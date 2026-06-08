import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    if (!fullName.trim() || !emailAddress.trim() || !password.trim()) {
      Alert.alert('Missing Information', 'Please complete all registration fields.');
      return;
    }

    if (!emailAddress.includes('@')) {
      Alert.alert('Invalid Email', 'Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Password Too Short', 'Password must contain at least 6 characters.');
      return;
    }

    const account = {
      fullName: fullName.trim(),
      emailAddress: emailAddress.trim(),
      password,
    };

    await AsyncStorage.setItem('plannerUserAccount', JSON.stringify(account));

    Alert.alert('Account Created', 'Your Task Planner account has been created.');
    navigation.replace('Login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.headerBlock}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>TP</Text>
        </View>

        <Text style={styles.appName}>Task Planner</Text>
        <Text style={styles.tagline}>
          Organise daily, academic and work tasks in one place.
        </Text>
      </View>

      <View style={styles.formPanel}>
        <Text style={styles.formTitle}>Create Profile</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#94A3B8"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          placeholderTextColor="#94A3B8"
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="At least 6 characters"
          placeholderTextColor="#94A3B8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={registerUser}>
          <Text style={styles.primaryButtonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Already registered? Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#2563EB',
    padding: 24,
    justifyContent: 'center',
  },

  headerBlock: {
    marginBottom: 26,
  },

  logoBox: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  logoText: {
    color: '#1E3A8A',
    fontSize: 25,
    fontWeight: 'bold',
  },

  appName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },

  tagline: {
    color: '#DBEAFE',
    fontSize: 14,
    marginTop: 6,
    lineHeight: 21,
  },

  formPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
  },

  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },

  label: {
    color: '#334155',
    fontWeight: '700',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    color: '#0F172A',
  },

  primaryButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 16,
    marginTop: 4,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },

  loginLink: {
    textAlign: 'center',
    color: '#2563EB',
    fontWeight: '700',
    marginTop: 18,
  },
});