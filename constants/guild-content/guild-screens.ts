import {
  activeChallengeCards,
  currentDirectiveCards,
  guildAnnouncementsCards,
  guildHallCards,
  guildLeadershipCards,
  guildmasterHallCards,
  memberStandingCards,
  rankStructureCards,
  roleDescriptionCards,
  rosterCards,
  squadsDivisionsCards,
} from '@/constants/guild-content';

import type { GuildCard } from '@/types/guild';

export type GuildScreenConfig = {
  title: string;
  subtitle: string;
  cards: GuildCard[];
  backLabel: string;
  backScreen: string;
  cardNavigation: boolean;
};

export const guildScreens: Record<string, GuildScreenConfig> = {
  currentDirective: {
    title: 'CURRENT DIRECTIVE',
    subtitle: 'Assignments, missions, and expectations',
    cards: currentDirectiveCards,
    backLabel: 'Back to Command Center',
    backScreen: 'home',
    cardNavigation: false,
  },

  activeChallenge: {
    title: 'ACTIVE CHALLENGE',
    subtitle: 'Trials, scoring, submissions, and records',
    cards: activeChallengeCards,
    backLabel: 'Back to Command Center',
    backScreen: 'home',
    cardNavigation: false,
  },

  guildAnnouncements: {
    title: 'GUILD ANNOUNCEMENTS',
    subtitle: 'Updates, notices, recognition, and discussion',
    cards: guildAnnouncementsCards,
    backLabel: 'Back to Command Center',
    backScreen: 'home',
    cardNavigation: false,
  },

  memberStanding: {
    title: 'MEMBER STANDING',
    subtitle: 'Personal status, progress, and advancement',
    cards: memberStandingCards,
    backLabel: 'Back to Command Center',
    backScreen: 'home',
    cardNavigation: false,
  },

  guildHall: {
    title: 'GUILD HALL',
    subtitle: 'Roster, ranks, leadership, and divisions',
    cards: guildHallCards,
    backLabel: 'Back to Command Center',
    backScreen: 'home',
    cardNavigation: true,
  },

  roster: {
    title: 'ROSTER',
    subtitle: 'Approved members of the Guild',
    cards: rosterCards,
    backLabel: 'Back to Guild Hall',
    backScreen: 'guildHall',
    cardNavigation: false,
  },

  rankStructure: {
    title: 'RANK STRUCTURE',
    subtitle: 'Hierarchy, advancement, and standing',
    cards: rankStructureCards,
    backLabel: 'Back to Guild Hall',
    backScreen: 'guildHall',
    cardNavigation: false,
  },

  roleDescriptions: {
    title: 'ROLES',
    subtitle: 'Responsibilities within the Guild',
    cards: roleDescriptionCards,
    backLabel: 'Back to Guild Hall',
    backScreen: 'guildHall',
    cardNavigation: false,
  },

  guildLeadership: {
    title: 'LEADERSHIP',
    subtitle: 'Authority, stewardship, and governance',
    cards: guildLeadershipCards,
    backLabel: 'Back to Guild Hall',
    backScreen: 'guildHall',
    cardNavigation: true,
  },

  squadsDivisions: {
    title: 'DIVISIONS',
    subtitle: 'Squads, teams, houses, and internal groups',
    cards: squadsDivisionsCards,
    backLabel: 'Back to Guild Hall',
    backScreen: 'guildHall',
    cardNavigation: false,
  },
  guildmasterHall: {
    title: "GUILDMASTER'S HALL",
    subtitle: 'Highest command permissions and administrative judgment',
    cards: guildmasterHallCards,
    backLabel: 'Back to Leadership',
    backScreen: 'guildLeadership',
    cardNavigation: true,
  },
};