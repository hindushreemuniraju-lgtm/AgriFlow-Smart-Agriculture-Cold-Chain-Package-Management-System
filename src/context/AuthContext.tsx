import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, UserRole } from '../types';

interface AuthContextType {
  user: UserAccount;
  activeRole: UserRole;
  availableRoles: UserRole[];
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  isRoleOnboardingOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsRoleOnboardingOpen: (open: boolean) => void;
  loginWithPhone: (phone: string, otp: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  toggleRole: (role: UserRole) => void;
  updateUser: (updates: Partial<UserAccount>) => void;
}

const DEFAULT_USER: UserAccount = {
  id: 'AGF-USR-94821',
  name: 'Hindushree Muniraju',
  phone: '+91 98765 43210',
  email: 'hindushree@agriflow.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  location: 'Tumakuru & Nashik Hub',
  district: 'Tumakuru',
  state: 'Karnataka',
  address: 'Plot 42, Green Agro Hub, APMC Yard, Tumakuru, Karnataka - 572101',
  preferredLanguage: 'en',
  roles: ['farmer', 'customer', 'logistics', 'packaging'],
  activeRole: 'farmer',
  walletBalance: 48500,
  isLoggedIn: true,
  onboardingCompleted: true,
  createdAt: '2026-01-15T08:00:00.000Z'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem('agriflow_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_USER;
  });

  const [activeRole, setActiveRole] = useState<UserRole>(user.activeRole || 'farmer');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isRoleOnboardingOpen, setIsRoleOnboardingOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('agriflow_user', JSON.stringify({ ...user, activeRole }));
    } catch {
      // Storage unavailable
    }
  }, [user, activeRole]);

  const switchRole = (role: UserRole) => {
    if (!user.roles.includes(role)) {
      // Auto-add role if not present to empower seamless flow
      const updatedRoles = [...user.roles, role];
      setUser(prev => ({ ...prev, roles: updatedRoles, activeRole: role }));
    } else {
      setUser(prev => ({ ...prev, activeRole: role }));
    }
    setActiveRole(role);
  };

  const toggleRole = (role: UserRole) => {
    setUser(prev => {
      let updatedRoles = [...prev.roles];
      if (updatedRoles.includes(role)) {
        if (updatedRoles.length > 1) {
          updatedRoles = updatedRoles.filter(r => r !== role);
        }
      } else {
        updatedRoles.push(role);
      }
      const newActiveRole = updatedRoles.includes(prev.activeRole) ? prev.activeRole : updatedRoles[0];
      setActiveRole(newActiveRole);
      return { ...prev, roles: updatedRoles, activeRole: newActiveRole };
    });
  };

  const updateUser = (updates: Partial<UserAccount>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const loginWithPhone = async (phone: string, otp: string): Promise<boolean> => {
    if (otp === '123456' || otp.length === 6) {
      setUser(prev => ({
        ...prev,
        phone,
        isLoggedIn: true
      }));
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setUser(prev => ({
      ...prev,
      isLoggedIn: true
    }));
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setUser(prev => ({
      ...prev,
      isLoggedIn: false
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        activeRole,
        availableRoles: user.roles,
        isLoggedIn: user.isLoggedIn,
        isAuthModalOpen,
        isRoleOnboardingOpen,
        setIsAuthModalOpen,
        setIsRoleOnboardingOpen,
        loginWithPhone,
        loginWithGoogle,
        logout,
        switchRole,
        toggleRole,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
