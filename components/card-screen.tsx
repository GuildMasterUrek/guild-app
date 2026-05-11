import { StyleSheet, View } from 'react-native';
import type { GuildCard } from '@/types/guild';
import { DashboardCard } from '@/components/dashboard-card';
import { InternalScreen } from '@/components/internal-screen';



type CardScreenProps = {
  title: string;
  subtitle: string;
  cards: GuildCard[];
  backLabel: string;
  onBack: () => void;
  onCardPress?: (card: GuildCard) => void;
};

export function CardScreen({
  title,
  subtitle,
  cards,
  backLabel,
  onBack,
  onCardPress,
}: CardScreenProps) {
  return (
    <InternalScreen
      title={title}
      subtitle={subtitle}
      backLabel={backLabel}
      onBack={onBack}
    >
      <View style={styles.dashboard}>
      {cards.map((card) => (
  <DashboardCard
    key={card.label}
    label={card.label}
    title={card.title}
    body={card.body}
    link={card.link}
    onPress={
      onCardPress && card.screen
        ? () => onCardPress(card)
        : undefined
    }
  />
))}
      </View>
    </InternalScreen>
  );
}
const styles = StyleSheet.create({
  dashboard: {
    gap: 14,
    marginBottom: 12,
  },
});