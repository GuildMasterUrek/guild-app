export type GuildCard = {
    label: string;
    title: string;
    body: string;
    link?: string;
    screen?: string;
  };
  
  export type CommandCenterCard = GuildCard & {
    id: string;
  };
  export type GuildMember = {
    id: string;
    name: string;
    sobriquet: string;
    rank: string;
    class: string;
    division: string;
    status: string;
    motto: string;
    image?: string | null;
  };
  export type GuildPetition = {
    id: string;
    applicantName: string;
    preferredSobriquet: string;
    referralOrSponsor: string;
    submittedThrough: string;
    sourceOwner?: string;
    status: string;
    image?: string | null;
    reasonForEntry: string;
    fitnessBackground: string;
    contribution: string;
    submittedAt: string;
  };
  export type DeniedGuildPetition = GuildPetition & {
    denialReason: string;
    deniedBy: string;
    deniedAt: string;
    restoredToPending?: boolean;
    restoredAt?: string;
    restoredBy?: string;
    acceptedAfterDenial?: boolean;
    acceptedAt?: string;
    acceptedBy?: string;
  };