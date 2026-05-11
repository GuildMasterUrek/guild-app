import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { GuildPetition } from '@/types/guild';

type PetitionReviewCardProps = {
  petition: GuildPetition;
  onApprove?: (petition: GuildPetition) => void;
  onDeny?: (petition: GuildPetition, denialResponse: string) => void;
};

function shouldShowSourceOwner(petition: GuildPetition) {
  return (
    petition.submittedThrough === 'Entry Mirror' ||
    petition.submittedThrough === 'Referral'
  );
}

export function PetitionReviewCard({
  petition,
  onApprove,
  onDeny,
}: PetitionReviewCardProps) {
  const [isReviewExpanded, setIsReviewExpanded] = useState(false);
  const [isDecisionExpanded, setIsDecisionExpanded] = useState(false);
  const [isDenyExpanded, setIsDenyExpanded] = useState(false);
  const [denialResponse, setDenialResponse] = useState('');

  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imagePlaceholderText}>IMAGE</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.label}>Pending Petition</Text>
        <Text style={styles.title}>{petition.applicantName}</Text>
        <Text style={styles.status}>{petition.status}</Text>
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
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          style={styles.secondaryButton}
          onPress={() => setIsReviewExpanded(!isReviewExpanded)}
        >
          <Text style={styles.secondaryButtonText}>
            {isReviewExpanded ? 'Minimize Info' : 'Review Info'}
          </Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => setIsDecisionExpanded(!isDecisionExpanded)}
        >
          <Text style={styles.secondaryButtonText}>Decision</Text>
        </Pressable>
      </View>

      {isReviewExpanded ? (
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

      {isDecisionExpanded ? (
        <View style={styles.expandedSection}>
          <View style={styles.buttonRow}>
            <Pressable
              style={styles.approveButton}
              onPress={() => onApprove?.(petition)}
            >
              <Text style={styles.approveButtonText}>Approve</Text>
            </Pressable>

            <Pressable
              style={styles.denyButton}
              onPress={() => setIsDenyExpanded(!isDenyExpanded)}
            >
              <Text style={styles.denyButtonText}>Deny</Text>
            </Pressable>
          </View>

          {isDenyExpanded ? (
            <View style={styles.denialSection}>
              <Text style={styles.answerLabel}>
                Denial Response / Reapplication Guidance
              </Text>

              <TextInput
                style={styles.denialInput}
                value={denialResponse}
                onChangeText={setDenialResponse}
                placeholder="Explain how the applicant may best reapply."
                placeholderTextColor="#666666"
                multiline
              />

<Pressable
  style={styles.recordDenialButton}
  onPress={() => onDeny?.(petition, denialResponse)}
>
  <Text style={styles.recordDenialButtonText}>Record Denial</Text>
</Pressable>
            </View>
          ) : null}
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
    color: '#AAAAAA',
    fontSize: 14,
    fontWeight: '600',
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
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
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
  approveButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2D5A32',
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
  },
  approveButtonText: {
    color: '#8FE09A',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  denyButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#5A1F1F',
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
  },
  denyButtonText: {
    color: '#FF7777',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  denialSection: {
    gap: 12,
  },
  denialInput: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#050505',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 14,
    textAlignVertical: 'top',
  },
  recordDenialButton: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
  },
  recordDenialButtonText: {
    color: '#AAAAAA',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});