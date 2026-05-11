import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type GuildmasterGateProps = {
  onAccessGranted: () => void;
  onBack: () => void;
};

const GUILDMASTER_ACCESS_CODE = 'Guildmaster2026';
const MASTER_ACCESS_CODE = 'W1ngedTr3eUnderTheM00n';

export function GuildmasterGate({
  onAccessGranted,
  onBack,
}: GuildmasterGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleEnter() {
    const enteredCode = password.trim();

if (
  enteredCode === GUILDMASTER_ACCESS_CODE ||
  enteredCode === MASTER_ACCESS_CODE
) {
      setError('');
      setPassword('');
      onAccessGranted();
    } else {
      setError('Command access denied.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GUILDMASTER ACCESS</Text>
      <Text style={styles.subtitle}>Restricted command authority</Text>

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Command Code"
        placeholderTextColor="#666666"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Pressable style={styles.enterButton} onPress={handleEnter}>
        <Text style={styles.enterButtonText}>Enter Hall</Text>
      </Pressable>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back to Leadership</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#888888',
    fontSize: 14,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 28,
  },
  input: {
    width: '100%',
    maxWidth: 360,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  enterButton: {
    width: '100%',
    maxWidth: 360,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  enterButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
  errorText: {
    color: '#FF4D4D',
    marginTop: 16,
    fontSize: 14,
  },
  backButton: {
    marginTop: 26,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButtonText: {
    color: '#AAAAAA',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
});