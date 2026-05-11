import type { GuildCard } from '@/types/guild';

export const guildHallCards: GuildCard[] = [
    {
    label: 'Roster of All Members',
    title: 'The roster has not yet been formed.',
    body: 'This section will display approved members, their status, divisions, and public Guild identifiers.',
    link: 'View Roster →',
    screen: 'roster',
  },
  {
    label: 'Rank Explanations',
    title: 'Rank structure awaiting definition.',
    body: 'This section will explain the hierarchy, advancement requirements, and meaning of each rank.',
    link: 'View Rank Structure →',
    screen: 'rankStructure',
  },
  {
    label: 'Role Descriptions',
    title: 'Roles awaiting assignment.',
    body: 'This section will define responsibilities such as leadership, training, event coordination, and moderation.',
    link: 'View Role Descriptions →',
    screen: 'roleDescriptions',
  },
  {
    label: 'Guild Leadership',
    title: 'Leadership council not yet published.',
    body: 'This section will identify leadership positions, officers, administrators, and governing responsibilities.',
    link: 'View Leadership →',
    screen: 'guildLeadership',
  },
  {
    label: 'Squads / Divisions',
    title: 'Divisions awaiting formation.',
    body: 'This section will display teams, divisions, squads, or houses within the Guild.',
    link: 'View Squads / Divisions →',
    screen: 'squadsDivisions',
  },
];

export const rosterCards: GuildCard[] = [
    {
    label: 'Roster Status',
    title: 'No members published yet.',
    body: 'This page will eventually display all approved Guild members, their public identifiers, ranks, divisions, and active status.',
  },
  {
    label: 'Future Information',
    title: 'Member cards will live here.',
    body: 'Each member may eventually have a public-facing roster card showing name, callsign, rank, squad, achievements, and standing.',
  },
];

export const rankStructureCards: GuildCard[] = [
    {
    label: 'Purpose',
    title: 'Rank gives structure to progress.',
    body: 'Guild rank will represent commitment, contribution, reliability, physical readiness, and service to the collective.',
  },
  {
    label: 'Entry Rank',
    title: 'Initiate',
    body: 'A new approved member who has entered the Guild but has not yet proven consistency through participation, conduct, and challenge completion.',
  },
  {
    label: 'Core Rank',
    title: 'Member',
    body: 'A recognized Guild participant who regularly engages, completes assigned challenges, and contributes to the community.',
  },
  {
    label: 'Advanced Standing',
    title: 'Proven Member',
    body: 'A member who has demonstrated discipline, reliability, performance, and positive influence over time.',
  },
  {
    label: 'Leadership Track',
    title: 'Officer / Council',
    body: 'Higher ranks may carry responsibility for organizing events, guiding members, moderating conduct, and maintaining the Guild standard.',
  },
];

export const roleDescriptionCards: GuildCard[] = [
    {
    label: 'Role System',
    title: 'Roles awaiting definition.',
    body: 'This page will explain responsibilities assigned to members beyond rank, such as training, leadership, communication, event coordination, and moderation.',
  },
  {
    label: 'Future Examples',
    title: 'Officer, Trainer, Scribe, Coordinator.',
    body: 'Roles can define what a member does for the Guild, while rank defines where a member stands within the Guild.',
  },
];

export const guildLeadershipCards: GuildCard[] = [
    {
    label: 'Leadership Status',
    title: 'Leadership council not yet published.',
    body: 'This page will identify Guild leadership, officers, administrators, council members, and the responsibilities attached to each position.',
  },
  {
    label: 'Purpose',
    title: 'Leadership maintains the standard.',
    body: 'This section should eventually explain who makes decisions, who oversees conduct, who manages challenges, and who guides Guild direction.',
  },
  {
    label: "Guildmaster's Hall",
    title: 'Restricted command access.',
    body: 'Administrative tools, petition review, mission assignment, and leadership operations will be managed here.',
    link: "Enter Guildmaster's Hall →",
    screen: 'guildmasterGate',
  },
];

export const squadsDivisionsCards: GuildCard[] = [
      {
    label: 'Division Status',
    title: 'No divisions formed yet.',
    body: 'This page will eventually display internal squads, divisions, houses, or teams within the Guild.',
  },
  {
    label: 'Future Use',
    title: 'Competition and identity can branch from here.',
    body: 'Divisions can be used for team challenges, mentorship groups, internal rivalries, event organization, or member specialization.',
  },
];
export const guildmasterHallCards: GuildCard[] = [
  {
    label: 'Pending Petitions',
    title: 'Petitions awaiting judgment.',
    body: 'Applications submitted through the entry mirror, referrals, or website will appear here for Guildmaster review.',
    link: 'Review Pending Petitions →',
    screen: 'pendingPetitions',
  },
  {
    label: 'Denied Petitions Archive',
    title: 'No denied petitions archived.',
    body: 'Denied applications, leadership reasoning, and reapplication guidance will be recorded here.',
    link: 'View Denied Archive →',
    screen: 'deniedPetitionsArchive',
  },
  {
    label: 'Rank Upgrade Requests',
    title: 'No rank requests pending.',
    body: 'Members seeking rank review, advancement, reinstatement, or adjustment will eventually be reviewed here.',
  },
  {
    label: 'Squad Formation Petitions',
    title: 'No squad petitions pending.',
    body: 'Requests to form new squads will eventually appear here for review and approval.',
  },
  {
    label: 'Division Formation Petitions',
    title: 'No division petitions pending.',
    body: 'Requests to create new divisions, houses, or larger organizational branches will eventually be reviewed here.',
  },
  {
    label: 'Mission Assignment',
    title: 'No missions assigned.',
    body: 'Leadership will eventually create, assign, and manage missions for members, squads, and divisions here.',
  },
  {
    label: 'Squad Member Application Review',
    title: 'No squad applications pending.',
    body: 'Applications from members seeking entry into specific squads will eventually be reviewed here.',
  },
  {
    label: 'Event Announcement Scheduler',
    title: 'No scheduled announcements.',
    body: 'Guild events, ceremonies, trials, and official notices will eventually be scheduled from here.',
  },
];