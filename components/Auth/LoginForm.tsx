import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SupaBaseService } from '@/services/Supabase';

type Props = {
  onSignIn: () => void;
};

export default function LoginForm(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const success = await SupaBaseService.signInWithEmail(email, password);
    if (success) props.onSignIn();
  };

  const handleSignUp = () => {
    SupaBaseService.signUpWithEmail(email, password);
  };

  return (
    <View>
      <Text style={styles.inputLabel}>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter your email" />

      <Text style={styles.inputLabel}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Sign In" onPress={handleSignIn} />
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 36,
    backgroundColor: '#15141F',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputLabel: {
    color: '#fff',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
});
