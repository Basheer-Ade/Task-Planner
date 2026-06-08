import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }) {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem('activePlannerUser');

    if (data) {
      setUser(JSON.parse(data));
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [])
  );

  const logout = async () => {
    await AsyncStorage.removeItem('activePlannerUser');
    navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.heading}>Settings</Text>
          <Text style={styles.subheading}>Manage account and app information</Text>
        </View>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileInitial}>
            {(user?.fullName || 'User').charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.profileName}>{user?.fullName || 'User'}</Text>
        <Text style={styles.profileEmail}>
          {user?.emailAddress || 'Not Available'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Application Details</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Application</Text>
          <Text style={styles.value}>Task Planner</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Version</Text>
          <Text style={styles.value}>1.0.0</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Theme</Text>
          <Text style={styles.value}>Blue Productivity Theme</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Storage</Text>
          <Text style={styles.value}>AsyncStorage</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>About Task Planner</Text>

        <Text style={styles.aboutText}>
          Task Planner is designed to help users organise personal, academic
          and work-related activities. Users can create tasks, update progress,
          search task records and manage local task data through a simple
          mobile interface.
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },

  headerCard: {
    backgroundColor: '#DBEAFE',
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: 44,
    height: 44,
    backgroundColor: '#2563EB',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  backText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },

  heading: {
    color: '#1E3A8A',
    fontSize: 25,
    fontWeight: 'bold',
  },

  subheading: {
    color: '#475569',
    marginTop: 3,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },

  profileIcon: {
    width: 70,
    height: 70,
    backgroundColor: '#2563EB',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  profileInitial: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  profileName: {
    color: '#1E293B',
    fontSize: 20,
    fontWeight: 'bold',
  },

  profileEmail: {
    color: '#64748B',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },

  cardTitle: {
    color: '#1E293B',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  infoRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },

  label: {
    color: '#64748B',
    fontSize: 13,
  },

  value: {
    color: '#1E293B',
    fontWeight: '700',
    marginTop: 3,
  },

  aboutText: {
    color: '#475569',
    lineHeight: 22,
  },

  logoutButton: {
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 18,
    marginTop: 6,
    marginBottom: 40,
  },

  logoutText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
});