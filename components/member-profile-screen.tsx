import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { GuildMember } from '@/types/guild';

type MemberProfileScreenProps = {
  member: GuildMember | undefined;
  onBack: () => void;
};

export function MemberProfileScreen({ member, onBack }: MemberProfileScreenProps) {
  if (!member) {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>MEMBER NOT FOUND</Text>
          <Text style={styles.subtitle}>The selected member could not be located.</Text>
        </View>

        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back to Roster</Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{member.name.toUpperCase()}</Text>
        <Text style={styles.subtitle}>{member.sobriquet}</Text>
      </View>

      <View style={styles.imagePlaceholder}>
        <Text style={styles.imagePlaceholderText}>IMAGE</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Member-Controlled Profile</Text>

        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Name</Text>
          <Text style={styles.fieldValue}>{member.name}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Motto / Short Bio</Text>
          <Text style={styles.fieldValue}>{member.motto}</Text>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteText}>
            Name, image, and motto / bio are intended to be controlled by the member.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Official Guild Record</Text>

        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Sobriquet</Text>
          <Text style={styles.fieldValue}>{member.sobriquet}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Rank</Text>
          <Text style={styles.fieldValue}>{member.rank}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Class</Text>
          <Text style={styles.fieldValue}>{member.class}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Division / Squad</Text>
          <Text style={styles.fieldValue}>{member.division}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Status</Text>
          <Text style={styles.fieldValue}>{member.status}</Text>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteText}>
            Sobriquet, rank, class, division / squad, and status are intended to require administrative permission.
          </Text>
        </View>
      </View>

      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back to Roster</Text>
      </Pressable>
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
  imagePlaceholder: {
    height: 180,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#050505',
    marginBottom: 22,
  },
  imagePlaceholderText: {
    color: '#555555',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '700',
  },
  section: {
    gap: 12,
    marginBottom: 24,
  },
  sectionLabel: {
    color: '#777777',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  card: {
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#0A0A0A',
    borderRadius: 14,
    padding: 16,
  },
  fieldLabel: {
    color: '#666666',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  fieldValue: {
    color: '#DDDDDD',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  noteCard: {
    borderWidth: 1,
    borderColor: '#222222',
    backgroundColor: '#050505',
    borderRadius: 12,
    padding: 14,
  },
  noteText: {
    color: '#888888',
    fontSize: 13,
    lineHeight: 19,
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