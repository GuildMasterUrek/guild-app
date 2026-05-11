import type { GuildCard } from '@/types/guild';

export const activeChallengeCards: GuildCard[] = [
    {
      label: 'Current Challenge',
      title: 'No active challenge posted.',
      body: 'The current competitive fitness trial will appear here once it is issued.',
    },
    {
      label: 'Challenge Rules',
      title: 'Rules awaiting publication.',
      body: 'This section will define the movements, scoring method, time limits, equipment, standards, and judging requirements for the active challenge.',
    },
    {
      label: 'Submission Requirements',
      title: 'No submission requirements posted.',
      body: 'Members will eventually see how to submit proof, scores, videos, photos, timestamps, or completion confirmations.',
    },
    {
      label: 'Leaderboard Preview',
      title: 'No scores submitted.',
      body: 'Rankings, scores, completion times, and member placements will appear here once challenge results are recorded.',
    },
    {
      label: 'Past Challenges',
      title: 'No challenge archive yet.',
      body: 'Completed challenges, historical winners, records, and archived rules will be stored here.',
    },
  ];