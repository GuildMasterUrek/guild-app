import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type DashboardCardProps = {
  label: string;
  title: string;
  body: string;
  link?: string;
  onPress?: () => void;
  children?: ReactNode;
};

export function DashboardCard({
  label,
  title,
  body,
  link,
  onPress,
  children,
}: DashboardCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && onPress ? styles.cardPressed : null,
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardBody}>{body}</Text>

      {link ? <Text style={styles.cardLink}>{link}</Text> : null}

      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#0A0A0A',
    borderRadius: 14,
    padding: 18,
  },
  cardPressed: {
    opacity: 0.75,
  },
  cardLabel: {
    color: '#777777',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardBody: {
    color: '#AAAAAA',
    fontSize: 14,
    lineHeight: 20,
  },
  cardLink: {
    color: '#777777',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginTop: 12,
    textTransform: 'uppercase',
  },
});