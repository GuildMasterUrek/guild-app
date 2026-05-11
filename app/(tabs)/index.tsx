import type {
  GuildCard,
} from '@/types/guild';

import { CardScreen } from '@/components/card-screen';
import { CommandCenterScreen } from '@/components/command-center-screen';
import { LoginGate } from '@/components/login-gate';
import { guildScreens } from '@/constants/guild-content/guild-screens';
import { MemberProfileScreen } from '@/components/member-profile-screen';
import { RegistrationMirrorScreen } from '@/components/registration-mirror-screen';
import { PetitionEntryScreen } from '@/components/petition-entry-screen';
import { GuildmasterGate } from '@/components/guildmaster-gate';
import { PetitionReviewCard } from '@/components/petition-review-card';
import { ApprovedMemberSetupScreen } from '@/components/approved-member-setup-screen';
import { DeniedPetitionCard } from '@/components/denied-petition-card';
import { useGuildAdminState } from '@/hooks/use-guild-admin-state';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  commandCenterCards,
  guildmasterHallCards,
} from '@/constants/guild-content';
import { MemberCard } from '@/components/member-card';
import { InternalScreen } from '@/components/internal-screen';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

const ACCESS_CODE = 'GUILD2026';
const MASTER_ACCESS_CODE = 'W1ngedTr3eUnderTheM00n';
const DASHBOARD_ORDER_STORAGE_KEY = 'guild-dashboard-card-order';
const DEFAULT_DASHBOARD_CARDS = commandCenterCards;



export default function HomeScreen() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [dashboardCards, setDashboardCards] = useState(DEFAULT_DASHBOARD_CARDS);
  const [isCustomizingDashboard, setIsCustomizingDashboard] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);


  const {
    guildMembers,
    pendingPetitions,
    deniedPetitions,
    selectedPetition,
    selectPetitionForApproval,
    denyPetition,
    restoreDeniedPetitionToPending,
    deleteDeniedPetitionRecord,
    finalizeApprovedMember,
  } = useGuildAdminState();

  const dynamicGuildmasterHallCards: GuildCard[] = guildmasterHallCards.map((card) => {
    if (card.screen === 'pendingPetitions') {
      return {
        ...card,
        title:
          pendingPetitions.length === 0
            ? 'No petitions pending judgment.'
            : `${pendingPetitions.length} petition${
                pendingPetitions.length === 1 ? '' : 's'
              } awaiting judgment.`,
        body:
          pendingPetitions.length === 0
            ? 'No applications currently await Guildmaster review.'
            : 'Applications are awaiting Guildmaster review and decision.',
      };
    }
  
    if (card.screen === 'deniedPetitionsArchive') {
      return {
        ...card,
        title:
          deniedPetitions.length === 0
            ? 'No denied petitions archived.'
            : `${deniedPetitions.length} denied petition${
                deniedPetitions.length === 1 ? '' : 's'
              } archived.`,
        body:
          deniedPetitions.length === 0
            ? 'Denied applications, leadership reasoning, and reapplication guidance will be recorded here.'
            : 'View denied applications, leadership reasoning, reapplication guidance, and later outcomes.',
      };
    }
  
    return card;
  });

  useEffect(() => {
    async function loadDashboardOrder() {
      try {
        const savedOrder = await AsyncStorage.getItem(DASHBOARD_ORDER_STORAGE_KEY);
  
        if (!savedOrder) {
          return;
        }
  
        const savedIds = JSON.parse(savedOrder);
  
        if (!Array.isArray(savedIds)) {
          return;
        }
  
        const orderedCards = savedIds
  .map((id) => DEFAULT_DASHBOARD_CARDS.find((card) => card.id === id))
  .filter((card): card is (typeof DEFAULT_DASHBOARD_CARDS)[number] => Boolean(card));

const missingCards = DEFAULT_DASHBOARD_CARDS.filter(
  (card) => !savedIds.includes(card.id)
);

setDashboardCards([...orderedCards, ...missingCards]);
      } catch (error) {
        console.log('Failed to load dashboard order:', error);
      }
    }
  
    loadDashboardOrder();
  }, []);

  function handleEnter() {
    const enteredCode = password.trim();
  
    if (enteredCode === ACCESS_CODE || enteredCode === MASTER_ACCESS_CODE) {
      setIsAuthorized(true);
      setError('');
      setPassword('');
    } else {
      setError('Access denied.');
    }
  }
  async function saveDashboardOrder(updatedCards: typeof DEFAULT_DASHBOARD_CARDS) {
    try {
      const cardIds = updatedCards.map((card) => card.id);
      await AsyncStorage.setItem(
        DASHBOARD_ORDER_STORAGE_KEY,
        JSON.stringify(cardIds)
      );
    } catch (error) {
      console.log('Failed to save dashboard order:', error);
    }
  }
  function moveCard(index: number, direction: 'up' | 'down') {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= dashboardCards.length) {
      return;
    }
  
    const updatedCards = [...dashboardCards];
    const selectedCard = updatedCards[index];
  
    updatedCards[index] = updatedCards[newIndex];
    updatedCards[newIndex] = selectedCard;
  
    setDashboardCards(updatedCards);
    saveDashboardOrder(updatedCards);
  }
  function resetDashboardOrder() {
    setDashboardCards(DEFAULT_DASHBOARD_CARDS);
    saveDashboardOrder(DEFAULT_DASHBOARD_CARDS);
  }
  
  function openCommandCenterCard(card: { id: string }) {
        if (card.id === 'hall') {
      setCurrentScreen('guildHall');
    }
  
    if (card.id === 'directive') {
      setCurrentScreen('currentDirective');
    }
  
    if (card.id === 'challenge') {
      setCurrentScreen('activeChallenge');
    }
  
    if (card.id === 'announcements') {
      setCurrentScreen('guildAnnouncements');
    }
  
    if (card.id === 'standing') {
      setCurrentScreen('memberStanding');
    }
  }
  
  function returnToGate() {
    setIsAuthorized(false);
    setCurrentScreen('home');
    setIsCustomizingDashboard(false);
  }
  if (isAuthorized && currentScreen === 'roster') {
    return (
      <InternalScreen
        title="ROSTER"
        subtitle="Approved members of the Guild"
        backLabel="Back to Guild Hall"
        onBack={() => setCurrentScreen('guildHall')}
      >  
      <View style={styles.rosterCounter}>
       <Text style={styles.rosterCounterLabel}>Members Listed</Text>
       <Text style={styles.rosterCounterValue}>{guildMembers.length}</Text>
     </View>
      
        <View style={styles.memberSection}>
          {guildMembers.map((member) => (
            <MemberCard
            key={member.id}
            member={member}
            onPress={(selectedMember) => {
              if (selectedMember.id === 'initiate-001') {
                setCurrentScreen('registrationMirror');
                return;
              }
          
              setSelectedMemberId(selectedMember.id);
              setCurrentScreen('memberProfile');
            }}
          />
          ))}
        </View>
      </InternalScreen>
    );
  }
  if (isAuthorized && currentScreen === 'memberProfile') {
    const selectedMember = guildMembers.find(
      (member) => member.id === selectedMemberId
    );
  
    return (
      <MemberProfileScreen
        member={selectedMember}
        onBack={() => setCurrentScreen('roster')}
      />
    );
  }
  if (isAuthorized && currentScreen === 'registrationMirror') {
    return (
      <RegistrationMirrorScreen
        onBack={() => setCurrentScreen('roster')}
        onOpenPetition={() => setCurrentScreen('petitionEntry')}
      />
    );
  }
  if (isAuthorized && currentScreen === 'petitionEntry') {
    return (
      <PetitionEntryScreen
        onBack={() => setCurrentScreen('registrationMirror')}
      />
    );
  }
  if (isAuthorized && currentScreen === 'guildmasterGate') {
    return (
      <GuildmasterGate
        onAccessGranted={() => {
          setCurrentScreen('guildmasterHall');
        }}
        onBack={() => setCurrentScreen('guildLeadership')}
      />
    );
  }
  if (isAuthorized && currentScreen === 'pendingPetitions') {
    return (
      <InternalScreen
        title="PENDING PETITIONS"
        subtitle="Applications awaiting Guildmaster judgment"
        backLabel="Back to Guildmaster's Hall"
        onBack={() => setCurrentScreen('guildmasterHall')}
      >
        <View style={styles.petitionSection}>
          {pendingPetitions.length === 0 ? (
            <Text style={styles.emptyStateText}>
              No petitions pending judgment.
            </Text>
          ) : (
            pendingPetitions.map((petition) => (
              <PetitionReviewCard
                key={petition.id}
                petition={petition}
                onApprove={(selectedPetition) => {
                selectPetitionForApproval(selectedPetition);
                setCurrentScreen('approvedMemberSetup');
              }}
              onDeny={denyPetition}
            />
            ))
          )}
        </View>
      </InternalScreen>
    );
  }
  if (isAuthorized && currentScreen === 'approvedMemberSetup') {
    return (
      <ApprovedMemberSetupScreen
        petition={selectedPetition}
        onBack={() => setCurrentScreen('pendingPetitions')}
        onFinalizeApproval={(newMemberData) => {
          finalizeApprovedMember(selectedPetition, newMemberData);
        }}
      />
    );
  }
  if (isAuthorized && currentScreen === 'deniedPetitionsArchive') {
    return (
      <InternalScreen
        title="DENIED PETITIONS"
        subtitle="Archived denials and reapplication guidance"
        backLabel="Back to Guildmaster's Hall"
        onBack={() => setCurrentScreen('guildmasterHall')}
      >
        <View style={styles.petitionSection}>
          {deniedPetitions.length === 0 ? (
            <Text style={styles.emptyStateText}>
              No denied petitions archived.
            </Text>
          ) : (
            deniedPetitions.map((petition) => (
              <DeniedPetitionCard
                key={`${petition.id}-${petition.deniedAt}`}
                petition={petition}
                onRestoreToPending={restoreDeniedPetitionToPending}
                onDeleteRecord={deleteDeniedPetitionRecord}
/>
            ))
          )}
        </View>
      </InternalScreen>
    );
  }

 const selectedCardScreen =
  currentScreen === 'guildmasterHall'
    ? {
        ...guildScreens.guildmasterHall,
        cards: dynamicGuildmasterHallCards,
      }
    : guildScreens[currentScreen];

   if (isAuthorized && selectedCardScreen) {
    return (
      <CardScreen
        title={selectedCardScreen.title}
        subtitle={selectedCardScreen.subtitle}
        cards={selectedCardScreen.cards}
        backLabel={selectedCardScreen.backLabel}
        onBack={() => setCurrentScreen(selectedCardScreen.backScreen)}
        onCardPress={
          selectedCardScreen.cardNavigation
            ? (card) => {
                if (card.screen) {
                  setCurrentScreen(card.screen);
                }
              }
            : undefined
        }
      />
    );
  }
  
  if (isAuthorized) {
    return (
      <CommandCenterScreen
        cards={dashboardCards}
        isCustomizing={isCustomizingDashboard}
        onToggleCustomize={() =>
          setIsCustomizingDashboard(!isCustomizingDashboard)
        }
        onMoveCard={moveCard}
        onOpenCard={openCommandCenterCard}
        onReturnToGate={returnToGate}
        onResetDashboard={resetDashboardOrder}
      />
    );
  }

  return (
    <LoginGate
      password={password}
      error={error}
      onChangePassword={setPassword}
      onEnter={handleEnter}
    />
  );
}
const styles = StyleSheet.create({
  rosterSection: {
    gap: 14,
    marginBottom: 20,
  },
  memberSection: {
    gap: 14,
  },
  petitionSection: {
    gap: 14,
  },
  rosterCounter: {
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#0A0A0A',
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    alignItems: 'center',
  },
  rosterCounterLabel: {
    color: '#777777',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  rosterCounterValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1,
  },
  emptyStateText: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingVertical: 32,
  },

});