import type { CommandCenterCard } from '@/types/guild';

export const commandCenterCards: CommandCenterCard[] = [
    {
      id: 'directive',
      label: 'Current Directive',
      title: 'No active directive assigned.',
      body: 'Future orders, priorities, and collective objectives will appear here.',
      link: 'View Current Directive →',
    },
    {
      id: 'challenge',
      label: 'Active Challenge',
      title: 'Awaiting first trial.',
      body: 'Competitive fitness events, trials, and rankings will be displayed here.',
      link: 'View Active Challenge →',
    },
    {
      id: 'announcements',
      label: 'Guild Announcements',
      title: 'No announcements posted.',
      body: 'Member updates, ceremonies, events, and notices will appear here.',
      link: 'View Guild Announcements →',
    },
    {
      id: 'standing',
      label: 'Member Standing',
      title: 'Unranked',
      body: 'Personal status, achievements, and rank progression will appear here.',
      link: 'View Member Standing →',
    },
    {
      id: 'hall',
      label: 'Guild Hall',
      title: 'Roster awaiting formation.',
      body: 'Member rosters, rank explanations, leadership roles, and divisions will appear here.',
      link: 'View Guild Hall →',
    },
  ];
