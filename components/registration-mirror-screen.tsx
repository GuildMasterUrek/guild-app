import { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type RegistrationMirrorScreenProps = {
  onBack: () => void;
  onOpenPetition: () => void;
};

export function RegistrationMirrorScreen({
  onBack,
  onOpenPetition,
}: RegistrationMirrorScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3600,
      delay: 750,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.invitationBox, { opacity: fadeAnim }]}>
        <Text style={styles.question}>Will it be you?</Text>

        <Text style={styles.body}>
          This place is reserved for one who has yet to enter the Guild.
        </Text>

       <Pressable style={styles.registrationButton} onPress={onOpenPetition}>
        <Text style={styles.registrationButtonText}>
         Registration Link
        </Text>
      </Pressable>
      </Animated.View>

      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back to Roster</Text>
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
    paddingHorizontal: 28,
  },
  invitationBox: {
    width: '100%',
    maxWidth: 360,
    borderWidth: 1,
    borderColor: '#222222',
    backgroundColor: 'rgba(5, 5, 5, 0.92)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  question: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 14,
  },
  body: {
    color: '#999999',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 22,
  },
  registrationButton: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  registrationButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
  backButton: {
    position: 'absolute',
    bottom: 56,
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