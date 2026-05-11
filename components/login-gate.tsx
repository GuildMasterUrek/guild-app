import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type LoginGateProps = {
  password: string;
  error: string;
  onChangePassword: (value: string) => void;
  onEnter: () => void;
};

export function LoginGate({
  password,
  error,
  onChangePassword,
  onEnter,
}: LoginGateProps) {
  return (
    <ImageBackground
      source={require('@/assets/images/guild-symbol.jpeg')}
      style={styles.background}
      imageStyle={styles.backgroundImage}
      resizeMode="contain"
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.loginBox}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={onChangePassword}
            placeholder="Access Code"
            placeholderTextColor="#777777"
            secureTextEntry
            autoCapitalize="characters"
            autoCorrect={false}
          />

          <Pressable style={styles.enterButton} onPress={onEnter}>
            <Text style={styles.enterButtonText}>Enter</Text>
          </Pressable>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    opacity: 0.28,
    transform: [{ scale: 0.95 }],
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 110,
  },
  loginBox: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  passwordInput: {
    width: '100%',
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
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  enterButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF4D4D',
    marginTop: 16,
    fontSize: 14,
  },
});