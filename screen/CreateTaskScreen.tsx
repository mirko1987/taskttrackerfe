import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../App';
import { useTaskContext } from '../state/context/TaskContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

type CreateTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateTask'>;

const CreateTaskScreen: React.FC = () => {
  const navigation = useNavigation<CreateTaskScreenNavigationProp>();
  const { createTask, state } = useTaskContext();
  const { loading } = state;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ title: '', description: '' });

  const validateForm = (): boolean => {
    const newErrors = { title: '', description: '' };
    let isValid = true;

    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio';
      isValid = false;
    } else if (title.trim().length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres';
      isValid = false;
    } else if (title.trim().length > 50) {
      newErrors.title = 'El título no puede exceder 50 caracteres';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
      isValid = false;
    } else if (description.trim().length < 5) {
      newErrors.description = 'La descripción debe tener al menos 5 caracteres';
      isValid = false;
    } else if (description.trim().length > 200) {
      newErrors.description = 'La descripción no puede exceder 200 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await createTask({
        title: title.trim(),
        description: description.trim(),
      });

      // Navigate back and let the context handle the refresh
      navigation.goBack();
      
      // Optional: Show a brief success message (non-blocking)
      setTimeout(() => {
        Alert.alert(
          '✅ ¡Tarea creada!',
          `"${title.trim()}" se agregó a tu lista`,
          [{ text: 'OK' }],
          { cancelable: true }
        );
      }, 300);
      
    } catch (error) {
      Alert.alert(
        '❌ Error',
        'No se pudo crear la tarea. Inténtalo de nuevo.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleCancel = () => {
    if (title.trim() || description.trim()) {
      Alert.alert(
        '⚠️ Cancelar',
        '¿Estás seguro de que quieres salir? Se perderán los cambios.',
        [
          { text: 'Continuar editando', style: 'cancel' },
          { 
            text: 'Salir', 
            style: 'destructive',
            onPress: () => navigation.goBack() 
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const getCharacterCount = (text: string, max: number) => {
    const count = text.length;
    const color = count > max * 0.8 ? '#FF3B30' : count > max * 0.6 ? '#FF9500' : '#999';
    return { count, max, color };
  };

  const titleCount = getCharacterCount(title, 50);
  const descriptionCount = getCharacterCount(description, 200);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Card */}
          <Card style={styles.headerCard}>
            <View style={styles.headerContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="add-circle" size={32} color="#007AFF" />
              </View>
              <Text style={styles.headerTitle}>Nueva Tarea</Text>
              <Text style={styles.headerSubtitle}>
                Crea una nueva tarea para mantenerte organizado
              </Text>
            </View>
          </Card>

          {/* Form Card */}
          <Card style={styles.formCard}>
            <View style={styles.inputSection}>
              <View style={styles.inputHeader}>
                <Ionicons name="document-text-outline" size={20} color="#007AFF" />
                <Text style={styles.inputLabel}>Título de la tarea</Text>
              </View>
              
              <Input
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                  if (errors.title) setErrors({ ...errors, title: '' });
                }}
                placeholder="¿Qué necesitas hacer?"
                error={errors.title}
                style={styles.input}
              />
              
              <View style={styles.characterCount}>
                <Text style={[styles.countText, { color: titleCount.color }]}>
                  {titleCount.count}/{titleCount.max}
                </Text>
              </View>
            </View>

            <View style={styles.inputSection}>
              <View style={styles.inputHeader}>
                <Ionicons name="list-outline" size={20} color="#007AFF" />
                <Text style={styles.inputLabel}>Descripción</Text>
              </View>
              
              <Input
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  if (errors.description) setErrors({ ...errors, description: '' });
                }}
                placeholder="Describe los detalles de tu tarea..."
                multiline
                numberOfLines={4}
                error={errors.description}
                style={styles.input}
              />
              
              <View style={styles.characterCount}>
                <Text style={[styles.countText, { color: descriptionCount.color }]}>
                  {descriptionCount.count}/{descriptionCount.max}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                title="Cancelar"
                onPress={handleCancel}
                style={StyleSheet.flatten([styles.button, styles.cancelButton])}
                textStyle={styles.cancelButtonText}
                disabled={loading}
              />
              <Button
                title={loading ? "Creando..." : "Crear Tarea"}
                onPress={handleSubmit}
                style={StyleSheet.flatten([styles.button, styles.submitButton])}
                disabled={loading || !title.trim() || !description.trim()}
              />
            </View>
          </Card>

          {/* Tips Card */}
          <Card style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Ionicons name="bulb-outline" size={20} color="#FF9500" />
              <Text style={styles.tipsTitle}>Consejos</Text>
            </View>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle-outline" size={16} color="#4CAF50" />
                <Text style={styles.tipText}>Sé específico en el título</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle-outline" size={16} color="#4CAF50" />
                <Text style={styles.tipText}>Incluye detalles importantes en la descripción</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle-outline" size={16} color="#4CAF50" />
                <Text style={styles.tipText}>Mantén las tareas simples y accionables</Text>
              </View>
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerCard: {
    marginBottom: 20,
    padding: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  formCard: {
    marginBottom: 20,
    padding: 20,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  input: {
    marginBottom: 8,
  },
  characterCount: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  countText: {
    fontSize: 12,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  tipsCard: {
    padding: 20,
    marginBottom: 20,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
});

export default CreateTaskScreen;
