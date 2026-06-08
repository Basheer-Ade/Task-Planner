import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.leftSide}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{task.title}</Text>

          <View
            style={[
              styles.statusBadge,
              task.status === 'Completed'
                ? styles.completedBadge
                : task.status === 'Not Started'
                ? styles.notStartedBadge
                : styles.progressBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                task.status === 'Completed'
                  ? styles.completedText
                  : task.status === 'Not Started'
                  ? styles.notStartedText
                  : styles.progressText,
              ]}
            >
              {task.status}
            </Text>
          </View>
        </View>

        <Text style={styles.category}>Category: {task.category}</Text>
        <Text style={styles.dueDate}>Due Date: {task.dueDate}</Text>

        {task.description ? (
          <Text style={styles.description}>{task.description}</Text>
        ) : null}

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.doneButton} onPress={onToggle}>
            <Text style={styles.actionText}>
              {task.status === 'Completed' ? 'Undo' : 'Done'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },

  leftSide: {
    flex: 1,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
    marginRight: 8,
  },

  category: {
    color: '#475569',
    marginTop: 4,
  },

  dueDate: {
    color: '#64748B',
    marginTop: 4,
    fontSize: 13,
  },

  description: {
    color: '#64748B',
    marginTop: 8,
    lineHeight: 20,
  },

  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 999,
  },

  completedBadge: {
    backgroundColor: '#DCFCE7',
  },

  progressBadge: {
    backgroundColor: '#DBEAFE',
  },

  notStartedBadge: {
    backgroundColor: '#F1F5F9',
  },

  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },

  completedText: {
    color: '#166534',
  },

  progressText: {
    color: '#1D4ED8',
  },

  notStartedText: {
    color: '#475569',
  },

  actionRow: {
    flexDirection: 'row',
    marginTop: 14,
  },

  doneButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 12,
    marginRight: 6,
  },

  editButton: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 10,
    borderRadius: 12,
    marginRight: 6,
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    padding: 10,
    borderRadius: 12,
  },

  actionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
});