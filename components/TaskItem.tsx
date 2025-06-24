import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../interfaces/interfaces';
import { Card } from './ui/Card';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Card style={StyleSheet.flatten([styles.container, task.completed && styles.completedContainer])}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={task.completed ? "checkmark-circle" : "ellipse-outline"}
              size={24}
              color={task.completed ? "#4CAF50" : "#007AFF"}
            />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={[styles.title, task.completed && styles.completedText]}>
              {task.title}
            </Text>
            <Text style={[styles.description, task.completed && styles.completedText]}>
              {task.description}
            </Text>
            <View style={styles.metaContainer}>
              <Ionicons name="calendar-outline" size={12} color="#999" />
              <Text style={styles.metaText}>
                {task.completed ? 'Completada' : 'Pendiente'}
              </Text>
            </View>
          </View>
          
          {!task.completed && (
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => onToggleComplete(task.id)}
              activeOpacity={0.7}
              testID="complete-button"
            >
              <Ionicons name="checkmark" size={18} color="#fff" />
              <Text style={styles.buttonText}>Completar</Text>
            </TouchableOpacity>
          )}
          
          {task.completed && (
            <View style={styles.completedBadge} testID="completed-badge">
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.completedBadgeText}>Hecho</Text>
            </View>
          )}
        </View>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedContainer: {
    opacity: 0.8,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
    fontWeight: '500',
  },
  completeButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  completedBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedBadgeText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default TaskItem;
