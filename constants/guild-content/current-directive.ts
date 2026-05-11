import type { GuildCard } from '@/types/guild';

export const currentDirectiveCards: GuildCard[] = [
    {
      label: 'Current Assignment',
      title: 'No assignment issued.',
      body: 'The active assignment for Guild members will appear here once leadership publishes it.',
    },
    {
      label: 'Seasonal Objective',
      title: 'No seasonal objective declared.',
      body: 'This section will define the broader objective for the current training season, campaign, or Guild cycle.',
    },
    {
      label: 'Available Missions',
      title: 'No missions available.',
      body: 'Optional missions, tasks, events, service opportunities, and challenges will be listed here.',
    },
    {
      label: 'Leadership Assignments',
      title: 'No leadership assignments posted.',
      body: 'Leadership may assign members to organize events, guide squads, oversee missions, or carry out specific responsibilities.',
    },
    {
      label: 'Mission Expectations and Guidelines',
      title: 'Guidelines awaiting publication.',
      body: 'Expectations, standards of conduct, submission rules, deadlines, and completion requirements will be displayed here.',
    },
  ];