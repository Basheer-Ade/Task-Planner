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

export default function LoginScreen({ navigation }) {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const signInUser = async () => {
    try {
      if (!emailAddress.trim() || !password.trim()) {
        Alert.alert('Missing Details', 'Please enter your email and password.');
        return;
      }

      const storedAccount = await AsyncStorage.getItem('plannerUserAccount');

      if (!storedAccount) {
        Alert.alert('Account Not Found', 'Please create an account before signing in.');
        return;
      }

      const account = JSON.parse(storedAccount);

      if (
        emailAddress.toLowerCase() === account.emailAddress.toLowerCase() &&
        password === account.password
      ) {
        await AsyncStorage.setItem('activePlannerUser', JSON.stringify(account));
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Sign In Failed', 'The email or password entered is incorrect.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to sign in. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.topSection}>
        <Text style={styles.smallTitle}>Welcome Back</Text>
        <Text style={styles.mainTitle}>Task Planner</Text>
        <Text style={styles.description}>
          Sign in to organise tasks, track progress and manage your daily workload.
        </Text>
      </View>

      <View style={styles.loginPanel}>
        <Text style={styles.panelTitle}>Sign In</Text>

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
          placeholder="Enter password"
          placeholderTextColor="#94A3B8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={signInUser}>
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>New user? Create account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  topSection: {
    backgroundColor: '#2563EB',
    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 42,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
  },

  smallTitle: {
    color: '#DBEAFE',
    fontSize: 16,
    fontWeight: '600',
  },

  mainTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 6,
  },

  description: {
    color: '#DBEAFE',
    marginTop: 10,
    lineHeight: 21,
  },

  loginPanel: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 22,
    marginTop: -22,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },

  panelTitle: {
    fontSize: 23,
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
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 4,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },

  registerLink: {
    textAlign: 'center',
    color: '#2563EB',
    fontWeight: '700',
    marginTop: 18,
  },
});