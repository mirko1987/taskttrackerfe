import { TouchableOpacityProps, TextInputProps } from 'react-native';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: any;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}


export interface CardProps {
  children: React.ReactNode;
  style?: any;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  elevation?: boolean;
}
