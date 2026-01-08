import { AppColors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// LOGIN PAGE UI ONLY
// UI-first, no navigation, no BLE yet

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <LoginScreen />
    </SafeAreaView>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    const res = await fetch('http://10.0.0.62:3000/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.error);
        return;
    }

    // Store userId locally
    await login(data.userId);
    router.replace('/(tabs)/dashboard')
  };




  return (
    <View style={styles.container}>
      {/* App Logo / Title */}
      <Text style={styles.title}>Glance</Text>
      <Text style={styles.subtitle}>Ambient Desk Display</Text>

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#94A3B8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#94A3B8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* Extra Options */}
      <View style={styles.optionsRow}>
        <TouchableOpacity>
          <Text style={styles.optionText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.optionText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: AppColors.background,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: AppColors.textPrimary,
    outline: AppColors.glowColor,
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: AppColors.glowColor,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: AppColors.surface,
    color: AppColors.textPrimary,
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: AppColors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: AppColors.primaryDark,
    fontWeight: '700',
    fontSize: 18,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionText: {
    color: AppColors.textSecondary,
    fontSize: 14,
  },
});
