import { AppColors } from '@/constants/colors';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <SignUpScreen />
    </SafeAreaView>
  );
}

function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const signup = async() => {
    try {
        const data = await fetch('http://10.0.0.62:3000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                userName: name,
                password,
            }),
        });

        const res = await data.json()

    } catch(err) {
        console.log(err)
    }

    router.replace('/')
  }
  return (
    <View style={styles.container}>
      {/* App Title */}
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
          placeholder="Name"
          placeholderTextColor="#94A3B8"
          value={name}
          onChangeText={setName}
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#94A3B8"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={signup}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Option to go to Login */}
      <View style={styles.optionsRow}>
        <Text style={styles.optionText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={[styles.optionText, { color: AppColors.primary, marginLeft: 4 }]}>Log In</Text>
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
    color: AppColors.primary,
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: AppColors.glowColor,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
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
  signUpButton: {
    backgroundColor: AppColors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: AppColors.primaryDark,
    fontWeight: '700',
    fontSize: 18,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  optionText: {
    color: AppColors.textSecondary,
    fontSize: 14,
  },
});
