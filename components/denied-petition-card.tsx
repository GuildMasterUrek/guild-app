import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { DeniedGuildPetition } from '@/types/guild';

const LIBRARIAN_ACCESS_CODE = 'Librarian2026';
const MASTER_ACCESS_CODE = 'W1ngedTr3eUnderTheM00n';

type DeniedPetitionCardProps = {
  petition: DeniedGuildPetition;
  onRestoreToPending?: (petition: DeniedGuildPetition) => void;
  onDeleteRecord?: (petition: DeniedGuildPetition) => void;
};

function shouldShowSourceOwner(petition: DeniedGuildPetition) {
  return (
    petition.submittedThrough === 'Entry Mirror' ||
    petition.submittedThrough === 'Referral'
  );
}



export function DeniedPetitionCard({
  petition,
  onRestoreToPending,
  onDeleteRecord,
}: DeniedPetitionCardProps) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showUnlockPrompt, setShowUnlockPrompt] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState('');
  const [unlockError, setUnlockError] = useState('');

  function handleUnlockRecord() {
    const enteredCode = unlockPassword.trim();
  
    if (
      enteredCode !== LIBRARIAN_ACCESS_CODE &&
      enteredCode !== MASTER_ACCESS_CODE
    ) {
      setUnlockError('Librarian access denied.');
      return;
    }
  
    setUnlockError('');
    setUnlockPassword('');
    setShowUnlockPrompt(false);
    setIsUnlocked(true);
  }

  function handleConfirmDelete() {
    const enteredCode = deletePassword.trim();
  
    if (
      enteredCode !== LIBRARIAN_ACCESS_CODE &&
      enteredCode !== MASTER_ACCESS_CODE
    ) {
      setDeleteError('Librarian access denied.');
      return;
    }
  
    setDeleteError('');
    setDeletePassword('');
    setIsDeleteConfirmVisible(false);
    onDeleteRecord?.(petition);
  }

if (!isUnlocked) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>Denied Petition Record</Text>
        <Text style={styles.title}>{petition.applicantName}</Text>

        <Text style={styles.recordStatus}>
  {petition.acceptedAfterDenial
    ? 'Later Accepted into the Guild'
    : petition.restoredToPending
      ? 'Returned to Pending Queue'
      : 'Archived Record'}
</Text>
      </View>

      {petition.restoredToPending ? (
  <View style={styles.restoredBox}>
    <Text style={styles.restoredLabel}>Record Status</Text>
    <Text style={styles.restoredText}>Returned to Pending Queue</Text>

    {petition.restoredBy ? (
      <Text style={styles.restoredMeta}>Restored By: {petition.restoredBy}</Text>
    ) : null}

    {petition.restoredAt ? (
      <Text style={styles.restoredMeta}>Restored At: {petition.restoredAt}</Text>
    ) : null}
  </View>
) : null}
{petition.acceptedAfterDenial ? (
  <View style={styles.acceptedBox}>
    <Text style={styles.acceptedLabel}>Final Outcome</Text>
    <Text style={styles.acceptedText}>Accepted into the Guild</Text>

    {petition.acceptedBy ? (
      <Text style={styles.acceptedMeta}>Accepted By: {petition.acceptedBy}</Text>
    ) : null}

    {petition.acceptedAt ? (
      <Text style={styles.acceptedMeta}>Accepted At: {petition.acceptedAt}</Text>
    ) : null}
  </View>
) : null}

      <View style={styles.lockedPreview}>
        <View style={styles.lockedImage} />
        <View style={styles.lockedLineLong} />
        <View style={styles.lockedLineMedium} />
        <View style={styles.lockedLineShort} />
        <Text style={styles.lockedOverlayText}>LIBRARIAN LOCKED</Text>
      </View>

      {!showUnlockPrompt ? (
        <Pressable
          style={styles.secondaryButton}
          onPress={() => setShowUnlockPrompt(true)}
        >
          <Text style={styles.secondaryButtonText}>Unlock Record</Text>
        </Pressable>
      ) : (
        <View style={styles.unlockBox}>
          <Text style={styles.unlockLabel}>Librarian access required</Text>

          <TextInput
            style={styles.unlockInput}
            value={unlockPassword}
            onChangeText={setUnlockPassword}
            placeholder="Librarian Code"
            placeholderTextColor="#666666"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Pressable
            style={styles.confirmUnlockButton}
            onPress={handleUnlockRecord}
          >
            <Text style={styles.confirmUnlockButtonText}>Unlock Record</Text>
          </Pressable>

          {unlockError ? (
            <Text style={styles.unlockErrorText}>{unlockError}</Text>
          ) : null}
        </View>
      )}
    </View>
  );
}
  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imagePlaceholderText}>IMAGE</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.label}>Denied Petition</Text>
        <Text style={styles.title}>{petition.applicantName}</Text>
        <Text style={styles.status}>Denied</Text>
      </View>

      <View style={styles.metaSection}>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Submitted Through</Text>
          <Text style={styles.metaValue}>{petition.submittedThrough}</Text>
        </View>

        {shouldShowSourceOwner(petition) && petition.sourceOwner ? (
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Owner</Text>
            <Text style={styles.metaValue}>{petition.sourceOwner}</Text>
          </View>
        ) : null}

        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Denied By</Text>
          <Text style={styles.metaValue}>{petition.deniedBy}</Text>
        </View>

        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Denied At</Text>
          <Text style={styles.metaValue}>{petition.deniedAt}</Text>
        </View>
      </View>

      <View style={styles.denialBox}>
        <Text style={styles.denialLabel}>Denial Reason</Text>
        <Text style={styles.denialText}>{petition.denialReason}</Text>
      </View>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.secondaryButtonText}>
          {isExpanded ? 'Minimize Record' : 'View Full Petition'}
        </Text>
      </Pressable>
      <View style={styles.archiveActions}>
      <Pressable
  style={[
    styles.restoreButton,
    petition.restoredToPending ? styles.disabledActionButton : null,
  ]}
  onPress={() => {
    if (petition.restoredToPending) {
      return;
    }

    onRestoreToPending?.(petition);
  }}
>
<Text style={styles.restoreButtonText}>
  {petition.restoredToPending ? 'Already Returned' : 'Restore to Pending'}
</Text>
</Pressable>

  <Pressable
    style={styles.deleteButton}
    onPress={() => setIsDeleteConfirmVisible(!isDeleteConfirmVisible)}
  >
    <Text style={styles.deleteButtonText}>Delete Record</Text>
  </Pressable>
</View>

{isDeleteConfirmVisible ? (
  <View style={styles.deleteConfirmBox}>
    <Text style={styles.deleteConfirmLabel}>
      Librarian confirmation required
    </Text>

    <TextInput
      style={styles.deleteInput}
      value={unlockPassword}
      onChangeText={setUnlockPassword}
      placeholder="Librarian Code"
      placeholderTextColor="#666666"
      secureTextEntry
      autoCapitalize="none"
      autoCorrect={false}
    />

    <Pressable
      style={styles.confirmDeleteButton}
      onPress={handleConfirmDelete}
    >
      <Text style={styles.confirmDeleteButtonText}>
        Confirm Permanent Deletion
      </Text>
    </Pressable>

    {deleteError ? (
      <Text style={styles.deleteErrorText}>{deleteError}</Text>
    ) : null}
  </View>
) : null}

      {isExpanded ? (
        <View style={styles.expandedSection}>
          <View style={styles.answerBlock}>
            <Text style={styles.answerLabel}>Preferred Sobriquet</Text>
            <Text style={styles.answerText}>{petition.preferredSobriquet}</Text>
          </View>

          <View style={styles.answerBlock}>
            <Text style={styles.answerLabel}>Referral / Sponsor</Text>
            <Text style={styles.answerText}>{petition.referralOrSponsor}</Text>
          </View>

          <View style={styles.answerBlock}>
            <Text style={styles.answerLabel}>Reason for Entry</Text>
            <Text style={styles.answerText}>{petition.reasonForEntry}</Text>
          </View>

          <View style={styles.answerBlock}>
            <Text style={styles.answerLabel}>Fitness Background</Text>
            <Text style={styles.answerText}>{petition.fitnessBackground}</Text>
          </View>

          <View style={styles.answerBlock}>
            <Text style={styles.answerLabel}>Contribution</Text>
            <Text style={styles.answerText}>{petition.contribution}</Text>
          </View>

          <View style={styles.answerBlock}>
            <Text style={styles.answerLabel}>Submitted At</Text>
            <Text style={styles.answerText}>{petition.submittedAt}</Text>
          </View>
        </View>
      ) : null}
    </View>
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
  imagePlaceholder: {
    height: 150,
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
  header: {
    gap: 6,
  },
  label: {
    color: '#777777',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
  },
  status: {
    color: '#FF7777',
    fontSize: 14,
    fontWeight: '700',
  },
  recordStatus: {
    color: '#AAAAAA',
    fontSize: 13,
    fontWeight: '700',
  },
  metaSection: {
    gap: 10,
  },
  metaItem: {
    borderTopWidth: 1,
    borderTopColor: '#222222',
    paddingTop: 10,
  },
  metaLabel: {
    color: '#666666',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  metaValue: {
    color: '#DDDDDD',
    fontSize: 14,
    fontWeight: '600',
  },
  denialBox: {
    borderWidth: 1,
    borderColor: '#5A1F1F',
    backgroundColor: '#080303',
    borderRadius: 12,
    padding: 14,
  },
  denialLabel: {
    color: '#FF7777',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 6,
    fontWeight: '700',
  },
  denialText: {
    color: '#DDDDDD',
    fontSize: 14,
    lineHeight: 20,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#AAAAAA',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  expandedSection: {
    borderTopWidth: 1,
    borderTopColor: '#222222',
    paddingTop: 16,
    gap: 14,
  },
  answerBlock: {
    gap: 5,
  },
  answerLabel: {
    color: '#666666',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  answerText: {
    color: '#AAAAAA',
    fontSize: 14,
    lineHeight: 20,
  },
  archiveActions: {
    flexDirection: 'row',
    gap: 10,
  },
  restoreButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2D5A32',
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
  },
  restoreButtonText: {
    color: '#8FE09A',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  disabledActionButton: {
    opacity: 0.45,
  },
  deleteButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#5A1F1F',
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FF7777',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  deleteConfirmBox: {
    borderWidth: 1,
    borderColor: '#5A1F1F',
    backgroundColor: '#080303',
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  deleteConfirmLabel: {
    color: '#FF7777',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  deleteInput: {
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#050505',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  confirmDeleteButton: {
    borderWidth: 1,
    borderColor: '#FF7777',
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
  },
  confirmDeleteButtonText: {
    color: '#FF7777',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  deleteErrorText: {
    color: '#FF7777',
    fontSize: 13,
    textAlign: 'center',
  },
  lockedPreview: {
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#050505',
    borderRadius: 12,
    padding: 16,
    gap: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  lockedImage: {
    height: 120,
    borderRadius: 10,
    backgroundColor: '#1A1A1A',
    opacity: 0.55,
  },
  lockedLineLong: {
    height: 14,
    borderRadius: 999,
    backgroundColor: '#1A1A1A',
    width: '90%',
    opacity: 0.55,
  },
  lockedLineMedium: {
    height: 14,
    borderRadius: 999,
    backgroundColor: '#1A1A1A',
    width: '70%',
    opacity: 0.55,
  },
  lockedLineShort: {
    height: 14,
    borderRadius: 999,
    backgroundColor: '#1A1A1A',
    width: '45%',
    opacity: 0.55,
  },
  lockedOverlayText: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#777777',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  unlockBox: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  unlockLabel: {
    color: '#AAAAAA',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    textAlign: 'center',
  },
  unlockInput: {
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#050505',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  confirmUnlockButton: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
  },
  confirmUnlockButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  unlockErrorText: {
    color: '#FF7777',
    fontSize: 13,
    textAlign: 'center',
  },
  restoredBox: {
    borderWidth: 1,
    borderColor: '#2D5A32',
    backgroundColor: '#041006',
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  restoredLabel: {
    color: '#8FE09A',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  restoredText: {
    color: '#DDDDDD',
    fontSize: 14,
    fontWeight: '700',
  },
  restoredMeta: {
    color: '#AAAAAA',
    fontSize: 13,
    lineHeight: 18,
  },
  acceptedBox: {
    borderWidth: 1,
    borderColor: '#2D5A32',
    backgroundColor: '#041006',
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  
  acceptedLabel: {
    color: '#8FE09A',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  
  acceptedText: {
    color: '#DDDDDD',
    fontSize: 14,
    fontWeight: '700',
  },
  
  acceptedMeta: {
    color: '#AAAAAA',
    fontSize: 13,
    lineHeight: 18,
  },
});