import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
type PetitionEntryScreenProps = {
  onBack: () => void;
};

export function PetitionEntryScreen({ onBack }: PetitionEntryScreenProps) {
  const [name, setName] = useState('');
  const [preferredSobriquet, setPreferredSobriquet] = useState('');
  const [referral, setReferral] = useState('');
  const [reasonForEntry, setReasonForEntry] = useState('');
  const [fitnessBackground, setFitnessBackground] = useState('');
  const [contribution, setContribution] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  function handleSubmitPetition() {
    console.log('Petition submitted:', {
      name,
      preferredSobriquet,
      referral,
      reasonForEntry,
      fitnessBackground,
      contribution,
    });
  
    setConfirmationMessage('Petition received. Await judgment.');
    setIsSubmitted(true);
  }
  if (isSubmitted) {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.submittedContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.submittedCard}>
          <Text style={styles.submittedTitle}>PETITION RECEIVED</Text>
  
          <Text style={styles.submittedBody}>
            Your request has been entered for review.
          </Text>
  
          <Text style={styles.submittedBody}>
            No further action is required.
          </Text>
  
          <Text style={styles.submittedJudgment}>Await judgment.</Text>
        </View>
  
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back to Mirror</Text>
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
        <Text style={styles.title}>PETITION FOR ENTRY</Text>
        <Text style={styles.subtitle}>Request consideration for the Guild</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Applicant Information</Text>

        <TextInput
  style={styles.input}
  value={name}
  onChangeText={setName}
  placeholder="Name"
  placeholderTextColor="#666666"
/>

<TextInput
  style={styles.input}
  value={preferredSobriquet}
  onChangeText={setPreferredSobriquet}
  placeholder="Preferred Sobriquet, if any"
  placeholderTextColor="#666666"
/>

<TextInput
  style={styles.input}
  value={referral}
  onChangeText={setReferral}
  placeholder="Referral / Sponsor"
  placeholderTextColor="#666666"
/>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Petition</Text>

        <TextInput
  style={styles.textArea}
  value={reasonForEntry}
  onChangeText={setReasonForEntry}
  placeholder="Why do you seek entry?"
  placeholderTextColor="#666666"
  multiline
/>

<TextInput
  style={styles.textArea}
  value={fitnessBackground}
  onChangeText={setFitnessBackground}
  placeholder="Describe your fitness background or current training."
  placeholderTextColor="#666666"
  multiline
/>

<TextInput
  style={styles.textArea}
  value={contribution}
  onChangeText={setContribution}
  placeholder="What can you contribute to the Guild?"
  placeholderTextColor="#666666"
  multiline
/>

<Pressable style={styles.submitButton} onPress={handleSubmitPetition}>
  <Text style={styles.submitButtonText}>Submit Petition</Text>
</Pressable>

      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back to Mirror</Text>
      </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#000000',
  },
  submittedContainer: {
    flexGrow: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 22,
    paddingTop: 72,
    paddingBottom: 48,
    justifyContent: 'center',
  },
  
  submittedCard: {
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  
  submittedTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 18,
  },
  
  submittedBody: {
    color: '#AAAAAA',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  
  submittedJudgment: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 12,
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
  textArea: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 15,
    textAlignVertical: 'top',
  },
  submitButton: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.9,
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
  confirmationText: {
    color: '#AAAAAA',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 18,
    letterSpacing: 0.6,
  },
});