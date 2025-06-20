import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return {
    isAuthenticated: context.state.isAuthenticated,
    isLoading: context.state.isLoading,
    user: context.state.user,
    login: context.login,
    register: context.register,
    logout: context.logout,
  };
};
