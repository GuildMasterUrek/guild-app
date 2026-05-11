import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import type { GuildPetition } from '@/types/guild';

type ApprovedMemberSetupScreenProps = {
  petition: GuildPetition | undefined;
  onBack: () => void;
  onFinalizeApproval: (newMember: {
    name: string;
    sobriquet: string;
    rank: string;
    class: string;
    division: string;
    status: string;
    motto: string;
    image?: string | null;
  }) => void;
};

export function ApprovedMemberSetupScreen({
  petition,
  onBack,
  onFinalizeApproval,
}: ApprovedMemberSetupScreenProps) {
  const [assignedRank, setAssignedRank] = useState('');
  const [assignedClass, setAssignedClass] = useState('');
  const [assignedDivision, setAssignedDivision] = useState('');
  const [assignedStatus, setAssignedStatus] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  function handleFinalizeApproval() {
    if (!petition) {
      return;
    }
  
    const newMember = {
      name: petition.applicantName,
      sobriquet: petition.preferredSobriquet || 'Awaiting Sobriquet',
      rank: assignedRank || 'Initiate',
      class: assignedClass || 'Undeclared',
      division: assignedDivision || 'Unassigned',
      status: assignedStatus || 'Active',
      motto: petition.reasonForEntry || 'No motto submitted.',
      image: petition.image ?? null,
    };
  
    console.log('Approved member setup:', {
      petitionId: petition.id,
      ...newMember,
    });
  
    onFinalizeApproval(newMember);
    setConfirmationMessage('Member added to roster.');
  }

  if (!petition) {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>PETITION NOT FOUND</Text>
          <Text style={styles.subtitle}>The selected petition could not be located.</Text>
        </View>

        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back to Pending Petitions</Text>
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
        <Text style={styles.title}>APPROVED MEMBER SETUP</Text>
        <Text style={styles.subtitle}>Assign official Guild standing</Text>
      </View>

      <View style={styles.profilePreview}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>IMAGE</Text>
        </View>

        <Text style={styles.applicantName}>{petition.applicantName}</Text>
        <Text style={styles.applicantMeta}>
          Preferred Sobriquet: {petition.preferredSobriquet}
        </Text>
        <Text style={styles.applicantMeta}>
          Submitted Through: {petition.submittedThrough}
        </Text>

        {petition.sourceOwner ? (
          <Text style={styles.applicantMeta}>Owner: {petition.sourceOwner}</Text>
        ) : null}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Official Assignment</Text>

        <TextInput
          style={styles.input}
          value={assignedRank}
          onChangeText={setAssignedRank}
          placeholder="Assign Rank"
          placeholderTextColor="#666666"
        />

        <TextInput
          style={styles.input}
          value={assignedClass}
          onChangeText={setAssignedClass}
          placeholder="Assign Class"
          placeholderTextColor="#666666"
        />

        <TextInput
          style={styles.input}
          value={assignedDivision}
          onChangeText={setAssignedDivision}
          placeholder="Assign Division / Squad"
          placeholderTextColor="#666666"
        />

        <TextInput
          style={styles.input}
          value={assignedStatus}
          onChangeText={setAssignedStatus}
          placeholder="Set Status"
          placeholderTextColor="#666666"
        />
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteText}>
          Rank, class, division / squad, and status are official Guild fields and should require administrative permission.
        </Text>
      </View>

      <Pressable style={styles.finalizeButton} onPress={handleFinalizeApproval}>
        <Text style={styles.finalizeButtonText}>Finalize Approval</Text>
      </Pressable>

      {confirmationMessage ? (
        <Text style={styles.confirmationText}>{confirmationMessage}</Text>
      ) : null}

      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back to Pending Petitions</Text>
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
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 2.5,
    textAlign: 'center',
  },
  subtitle: {
    color: '#888888',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  profilePreview: {
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    gap: 10,
  },
  imagePlaceholder: {
    height: 160,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#050505',
    marginBottom: 8,
  },
  imagePlaceholderText: {
    color: '#555555',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '700',
  },
  applicantName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
  },
  applicantMeta: {
    color: '#AAAAAA',
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    gap: 12,
    marginBottom: 20,
  },
  sectionLabel: {
    color: '#777777',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 15,
  },
  noteCard: {
    borderWidth: 1,
    borderColor: '#222222',
    backgroundColor: '#050505',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  noteText: {
    color: '#888888',
    fontSize: 13,
    lineHeight: 19,
  },
  finalizeButton: {
    borderWidth: 1,
    borderColor: '#2D5A32',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  finalizeButtonText: {
    color: '#8FE09A',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
  confirmationText: {
    color: '#AAAAAA',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 18,
    letterSpacing: 0.6,
  },
  backButton: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#AAAAAA',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
});