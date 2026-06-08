import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

import { fetchTasks, storeTasks } from '../storage/plannerStorage';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('In Progress');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const createTask = async () => {
    if (!title.trim() || !category.trim() || !dueDate.trim()) {
      setError('Please complete task title, category and due date.');
      return;
    }

    const currentTasks = await fetchTasks();

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      category: category.trim(),
      dueDate: dueDate.trim(),
      status,
      description: description.trim(),
    };

    const updatedTasks = [...currentTasks, newTask];

    await storeTasks(updatedTasks);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.heading}>Create Task</Text>
        <Text style={styles.subheading}>
          Add a new activity and track its progress.
        </Text>
      </View>

      {error ? <Text style={styles.errorBox}>{error}</Text> : null}

      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Submit project report"
        placeholderTextColor="#94A3B8"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Academic, Work, Personal"
        placeholderTextColor="#94A3B8"
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Due Date</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 2026-06-20"
        placeholderTextColor="#94A3B8"
        value={dueDate}
        onChangeText={setDueDate}
      />

      <Text style={styles.label}>Task Status</Text>
      <View style={styles.statusRow}>
        {['Not Started', 'In Progress', 'Completed'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.statusButton,
              status === item && styles.selectedStatus,
            ]}
            onPress={() => setStatus(item)}
          >
            <Text
              style={[
                styles.statusText,
                status === item && styles.selectedStatusText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.descriptionBox]}
        placeholder="Add task details..."
        placeholderTextColor="#94A3B8"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.primaryButton} onPress={createTask}>
        <Text style={styles.primaryButtonText}>Save New Task</Text>
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

  headerBox: {
    backgroundColor: '#DBEAFE',
    padding: 20,
    borderRadius: 22,
    marginBottom: 20,
  },

  heading: {
    color: '#1E3A8A',
    fontSize: 26,
    fontWeight: 'bold',
  },

  subheading: {
    color: '#475569',
    marginTop: 6,
    lineHeight: 20,
  },

  errorBox: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    fontWeight: '600',
  },

  label: {
    color: '#1E293B',
    fontWeight: '700',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    color: '#0F172A',
  },

  descriptionBox: {
    minHeight: 110,
    textAlignVertical: 'top',
  },

  statusRow: {
    marginBottom: 16,
  },

  statusButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 15,
    padding: 14,
    marginBottom: 10,
  },

  selectedStatus: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  statusText: {
    color: '#1E293B',
    textAlign: 'center',
    fontWeight: '700',
  },

  selectedStatusText: {
    color: '#FFFFFF',
  },

  primaryButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 18,
    marginBottom: 40,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
});