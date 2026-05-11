import { DashboardCard } from '@/components/dashboard-card';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { CommandCenterCard } from '@/types/guild';


type CommandCenterScreenProps = {
  cards: CommandCenterCard[];
  isCustomizing: boolean;
  onToggleCustomize: () => void;
  onMoveCard: (index: number, direction: 'up' | 'down') => void;
  onOpenCard: (card: CommandCenterCard) => void;
  onReturnToGate: () => void;
  onResetDashboard: () => void;
};

export function CommandCenterScreen({
  cards,
  isCustomizing,
  onToggleCustomize,
  onMoveCard,
  onOpenCard,
  onReturnToGate,
  onResetDashboard,
}: CommandCenterScreenProps) {
  return (
    <ScrollView
      style={styles.internalScroll}
      contentContainerStyle={styles.internalContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.internalHeader}>
        <Text style={styles.internalTitle}>THE GUILD</Text>
        <Text style={styles.internalSubtitle}>Internal Command Center</Text>
      </View>

      <View style={styles.dashboard}>
        {cards.map((card, index) => (
          <DashboardCard
            key={card.id}
            label={card.label}
            title={card.title}
            body={card.body}
            link={card.link}
            onPress={() => {
              if (isCustomizing) {
                return;
              }

              onOpenCard(card);
            }}
          >
            {isCustomizing && (
              <View style={styles.cardControls}>
                <Pressable
                  style={[
                    styles.cardControlButton,
                    index === 0 && styles.disabledControlButton,
                  ]}
                  onPress={() => onMoveCard(index, 'up')}
                  disabled={index === 0}
                >
                  <Text style={styles.cardControlText}>Move Up</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.cardControlButton,
                    index === cards.length - 1 && styles.disabledControlButton,
                  ]}
                  onPress={() => onMoveCard(index, 'down')}
                  disabled={index === cards.length - 1}
                >
                  <Text style={styles.cardControlText}>Move Down</Text>
                </Pressable>
              </View>
            )}
          </DashboardCard>
        ))}
      </View>

      {isCustomizing && (
  <Pressable style={styles.resetButton} onPress={onResetDashboard}>
    <Text style={styles.resetButtonText}>Reset Dashboard</Text>
  </Pressable>
)}

<Pressable style={styles.customizeButton} onPress={onToggleCustomize}>
  <Text style={styles.customizeButtonText}>
    {isCustomizing ? 'Done Customizing' : 'Customize Dashboard'}
  </Text>
</Pressable>

<Pressable style={styles.logoutButton} onPress={onReturnToGate}>
  <Text style={styles.logoutButtonText}>Return to Gate</Text>
</Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  internalScroll: {
    flex: 1,
    backgroundColor: '#000000',
  },
  internalContainer: {
    backgroundColor: '#000000',
    paddingHorizontal: 22,
    paddingTop: 72,
    paddingBottom: 32,
  },
  internalHeader: {
    marginBottom: 28,
  },
  internalTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 3,
    textAlign: 'center',
  },
  internalSubtitle: {
    color: '#888888',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  dashboard: {
    gap: 14,
    marginBottom: 12,
  },
  cardControls: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  cardControlButton: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  disabledControlButton: {
    opacity: 0.35,
  },
  cardControlText: {
    color: '#AAAAAA',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  customizeButton: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignSelf: 'center',
    marginBottom: 14,
  },
  customizeButtonText: {
    color: '#AAAAAA',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 6,
    alignSelf: 'center',
    marginBottom: 64,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#5A1F1F',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignSelf: 'center',
    marginBottom: 14,
  },
  
  resetButtonText: {
    color: '#FF7777',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
});