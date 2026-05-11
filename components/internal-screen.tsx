import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type InternalScreenProps = {
  title: string;
  subtitle: string;
  backLabel?: string;
  onBack?: () => void;
  children: ReactNode;
};

export function InternalScreen({
  title,
  subtitle,
  backLabel = 'Back',
  onBack,
  children,
}: InternalScreenProps) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {children}

      {onBack ? (
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>{backLabel}</Text>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    backgroundColor: '#000000',
    paddingHorizontal: 22,
    paddingTop: 72,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 3,
    textAlign: 'center',
  },
  subtitle: {
    color: '#888888',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  backButton: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignSelf: 'center',
    marginTop: 8,
  },
  backButtonText: {
    color: '#AAAAAA',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
});