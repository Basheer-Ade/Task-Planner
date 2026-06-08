import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TaskItem from '../components/TaskItem';
import { fetchTasks, storeTasks } from '../storage/plannerStorage';

export default function DashboardScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [userName, setUserName] = useState('User');
  const [menuVisible, setMenuVisible] = useState(false);

  const loadDashboardData = async () => {
    const savedTasks = await fetchTasks();
    const userData = await AsyncStorage.getItem('activePlannerUser');

    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.fullName || 'User');
    }

    setTasks(savedTasks);
  };

  useFocusEffect(
    useCallback(() => {
      loadDashboardData();
    }, [])
  );

  const updateStatus = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status: task.status === 'Completed' ? 'In Progress' : 'Completed',
          }
        : task
    );

    setTasks(updatedTasks);
    await storeTasks(updatedTasks);
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await storeTasks(updatedTasks);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('activePlannerUser');
    setMenuVisible(false);
    navigation.replace('Login');
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.category.toLowerCase().includes(search.toLowerCase()) ||
    task.status.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = tasks.filter((task) => task.status === 'Completed').length;
  const inProgressCount = tasks.filter((task) => task.status === 'In Progress').length;

  return (
    <View style={styles.mainWrapper}>
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.drawer}>
            <View style={styles.drawerLogo}>
              <Text style={styles.drawerLogoText}>TP</Text>
            </View>

            <Text style={styles.drawerTitle}>Task Planner</Text>
            <Text style={styles.drawerSubtitle}>Productivity Menu</Text>

            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.drawerText}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('AddTask');
              }}
            >
              <Text style={styles.drawerText}>Create Task</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Settings');
              }}
            >
              <Text style={styles.drawerText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerLogout} onPress={logout}>
              <Text style={styles.drawerLogoutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.topRow}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setMenuVisible(true)}
            >
              <Text style={styles.menuText}>☰</Text>
            </TouchableOpacity>

            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>

          <Text style={styles.greeting}>Hello, {userName}</Text>
          <Text style={styles.heroTitle}>Plan your tasks with clarity.</Text>
          <Text style={styles.heroSubtitle}>
            Track personal, academic and work activities from one simple dashboard.
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{tasks.length}</Text>
            <Text style={styles.summaryLabel}>All Tasks</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{inProgressCount}</Text>
            <Text style={styles.summaryLabel}>In Progress</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{completedCount}</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            placeholder="Search by title, category or status..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.createButtonText}>Create New Task</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Task List</Text>
          <Text style={styles.sectionCount}>{filteredTasks.length} shown</Text>
        </View>

        {filteredTasks.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No tasks available</Text>
            <Text style={styles.emptyText}>
              Create a new task to begin organising your schedule.
            </Text>
          </View>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => updateStatus(task.id)}
              onEdit={() => navigation.navigate('EditTask', { task })}
              onDelete={() => deleteTask(task.id)}
            />
          ))
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  hero: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 34,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  menuButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },

  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#1E3A8A',
    fontSize: 18,
    fontWeight: 'bold',
  },

  greeting: {
    color: '#DBEAFE',
    marginTop: 28,
    fontSize: 15,
    fontWeight: '600',
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },

  heroSubtitle: {
    color: '#DBEAFE',
    marginTop: 8,
    lineHeight: 21,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginTop: -22,
    marginBottom: 20,
  },

  summaryCard: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },

  summaryNumber: {
    color: '#2563EB',
    fontSize: 25,
    fontWeight: 'bold',
  },

  summaryLabel: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 3,
    textAlign: 'center',
  },

  searchBox: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchIcon: {
    fontSize: 22,
    color: '#2563EB',
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 14,
    color: '#0F172A',
  },

  createButton: {
    backgroundColor: '#2563EB',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 18,
    marginBottom: 22,
  },

  createButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },

  sectionHeader: {
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 20,
    color: '#1E293B',
    fontWeight: 'bold',
  },

  sectionCount: {
    color: '#64748B',
    fontSize: 13,
  },

  emptyBox: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },

  emptyTitle: {
    color: '#1E293B',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  emptyText: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },

  drawer: {
    width: 270,
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: 24,
  },

  drawerLogo: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  drawerLogoText: {
    color: '#1E3A8A',
    fontWeight: 'bold',
    fontSize: 22,
  },

  drawerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  drawerSubtitle: {
    color: '#64748B',
    marginTop: 4,
    marginBottom: 26,
  },

  drawerItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },

  drawerText: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
  },

  drawerLogout: {
    backgroundColor: '#EF4444',
    padding: 15,
    borderRadius: 14,
    marginTop: 30,
  },

  drawerLogoutText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});