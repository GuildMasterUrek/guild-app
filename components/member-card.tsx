import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { GuildMember } from '@/types/guild';

type MemberCardProps = {
  member: GuildMember;
  onPress?: (member: GuildMember) => void;
};

export function MemberCard({ member, onPress }: MemberCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && onPress ? styles.cardPressed : null,
      ]}
      onPress={() => onPress?.(member)}
    >
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imagePlaceholderText}>IMAGE</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.sobriquet}>{member.sobriquet}</Text>

        <View style={styles.detailGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Rank</Text>
            <Text style={styles.detailValue}>{member.rank}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Class</Text>
            <Text style={styles.detailValue}>{member.class}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Division / Squad</Text>
            <Text style={styles.detailValue}>{member.division}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Status</Text>
            <Text style={styles.detailValue}>{member.status}</Text>
          </View>
        </View>

        <Text style={styles.mottoLabel}>Motto / Bio</Text>
        <Text style={styles.motto}>{member.motto}</Text>

        <Text style={styles.cardLink}>View Member Profile →</Text>
      </View>
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
    gap: 16,
  },
  cardPressed: {
    opacity: 0.75,
  },
  imagePlaceholder: {
    height: 140,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#050505',
  },
  imagePlaceholderText: {
    color: '#555555',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '700',
  },
  content: {
    gap: 12,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
  },
  sobriquet: {
    color: '#888888',
    fontSize: 14,
    fontStyle: 'italic',
  },
  detailGrid: {
    gap: 10,
  },
  detailItem: {
    borderTopWidth: 1,
    borderTopColor: '#222222',
    paddingTop: 10,
  },
  detailLabel: {
    color: '#666666',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  detailValue: {
    color: '#DDDDDD',
    fontSize: 14,
    fontWeight: '600',
  },
  mottoLabel: {
    color: '#666666',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: 4,
  },
  motto: {
    color: '#AAAAAA',
    fontSize: 14,
    lineHeight: 20,
  },
  cardLink: {
    color: '#777777',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginTop: 4,
    textTransform: 'uppercase',
  },
});