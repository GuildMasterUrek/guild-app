import type { GuildCard } from '@/types/guild';

export const memberStandingCards: GuildCard[] = [
  {
    label: 'Member Stats',
    title: 'Stats not yet recorded.',
    body: 'This section will display personal metrics such as rank, status, participation, completed missions, completed challenges, and current standing.',
  },
  {
    label: 'Achievements',
    title: 'No achievements earned yet.',
    body: 'Badges, honors, milestones, challenge awards, service recognition, and special distinctions will appear here.',
  },
  {
    label: 'Challenge History',
    title: 'No challenge history recorded.',
    body: 'Completed trials, submitted scores, placements, records, and historical performance will be tracked here.',
  },
  {
    label: 'Rank Adjustment Application',
    title: 'Applications not yet open.',
    body: 'Members may eventually request rank review, advancement consideration, reinstatement, or adjustment based on contribution, performance, and conduct.',
  },
  {
    label: 'Leadership Application',
    title: 'Leadership applications not yet open.',
    body: 'Members interested in officer, coordinator, squad leader, mentor, or administrative roles may eventually apply here.',
  },
];