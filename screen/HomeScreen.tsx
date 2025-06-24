import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../App';
import { useTaskContext } from '../state/context/TaskContext';
import TaskItem from '../components/TaskItem';
import { Loading } from '../components/component/Loading';
import { EmptyState } from '../components/component/EmptyState';
import { Card } from '../components/ui/Card';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { state, fetchTasks, completeTask, clearError } = useTaskContext();
  const { tasks, loading, error } = state;
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  useEffect(() => {
    fetchTasks();
    
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData(window);
    });

    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [
        { text: 'OK', onPress: clearError }
      ]);
    }
  }, [error]);

  const handleCompleteTask = async (id: number) => {
    try {
      await completeTask(id);
    } catch (err) {
      console.error('Error completing task:', err);
    }
  };

  const handleRefresh = async () => {
    await fetchTasks();
  };

  const handleCreateTask = () => {
    navigation.navigate('CreateTask');
  };

  if (loading && tasks.length === 0) {
    return <Loading message="Cargando tus tareas..." />;
  }

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <Ionicons name="list-outline" size={24} color="#007AFF" />
            <Text style={styles.statNumber}>{totalTasks}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </Card>
        
        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#4CAF50" />
            <Text style={styles.statNumber}>{completedTasks}</Text>
            <Text style={styles.statLabel}>Completadas</Text>
          </View>
        </Card>
        
        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <Ionicons name="time-outline" size={24} color="#FF9500" />
            <Text style={styles.statNumber}>{pendingTasks}</Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
        </Card>
      </View>

      {/* Progress Card */}
      {totalTasks > 0 && (
        <Card style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Progreso General</Text>
            <Text style={styles.progressPercentage}>{completionPercentage}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${completionPercentage}%` }
                ]} 
              />
            </View>
          </View>
        </Card>
      )}

      {/* Tasks Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mis Tareas</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleCreateTask}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Nueva</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          {renderHeader()}
          <EmptyState
            title="¡Comienza tu productividad!"
            subtitle="Crea tu primera tarea y mantente organizado"
            actionText="Crear Primera Tarea"
            onAction={handleCreateTask}
          />
        </View>
      ) : (
        <ScrollView
          style={[
            styles.scrollView,
            Platform.OS === 'web' && { height: screenData.height - 50 }
          ]}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              colors={['#007AFF']}
              tintColor="#007AFF"
              title="Actualizando tareas..."
              titleColor="#007AFF"
            />
          }
          showsVerticalScrollIndicator={Platform.OS !== 'web'}
        >
          {renderHeader()}
          {tasks.map((task, index) => (
            <View key={task.id.toString()}>
              <TaskItem
                task={task}
                onToggleComplete={() => handleCompleteTask(task.id)}
              />
              {index < tasks.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
  },
  statContent: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
  progressCard: {
    marginBottom: 20,
    padding: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
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
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  separator: {
    height: 8,
  },
});

export default HomeScreen;

