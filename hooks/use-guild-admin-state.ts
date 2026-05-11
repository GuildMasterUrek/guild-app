import { useState } from 'react';

import {
  guildMembers as initialGuildMembers,
  pendingPetitions as initialPendingPetitions,
} from '@/constants/guild-content';

import type {
  DeniedGuildPetition,
  GuildMember,
  GuildPetition,
} from '@/types/guild';

const CURRENT_LEADERSHIP_MEMBER = 'Urek';

type FinalizeApprovedMemberInput = {
  name: string;
  sobriquet: string;
  rank: string;
  class: string;
  division: string;
  status: string;
  motto: string;
  image?: string | null;
};

export function useGuildAdminState() {
  const [guildMembers, setGuildMembers] =
    useState<GuildMember[]>(initialGuildMembers);

  const [pendingPetitions, setPendingPetitions] =
    useState<GuildPetition[]>(initialPendingPetitions);

  const [deniedPetitions, setDeniedPetitions] =
    useState<DeniedGuildPetition[]>([]);

  const [selectedPetitionId, setSelectedPetitionId] =
    useState<string | null>(null);

  const selectedPetition = pendingPetitions.find(
    (petition) => petition.id === selectedPetitionId
  );

  function selectPetitionForApproval(petition: GuildPetition) {
    setSelectedPetitionId(petition.id);
  }

  function denyPetition(
    selectedPetition: GuildPetition,
    denialResponse: string
  ) {
    if (!denialResponse.trim()) {
      console.log('Denial response required before recording denial.');
      return;
    }

    const deniedRecord: DeniedGuildPetition = {
      ...selectedPetition,
      denialReason: denialResponse,
      deniedBy: CURRENT_LEADERSHIP_MEMBER,
      deniedAt: new Date().toISOString(),
    };

    setDeniedPetitions((currentDeniedPetitions) => [
      ...currentDeniedPetitions,
      deniedRecord,
    ]);

    setPendingPetitions((currentPetitions) =>
      currentPetitions.filter(
        (currentPetition) => currentPetition.id !== selectedPetition.id
      )
    );

    console.log('Petition denied and archived:', deniedRecord);
  }

  function restoreDeniedPetitionToPending(
    selectedDeniedPetition: DeniedGuildPetition
  ) {
    const restoredPetition: GuildPetition = {
      id: selectedDeniedPetition.id,
      applicantName: selectedDeniedPetition.applicantName,
      preferredSobriquet: selectedDeniedPetition.preferredSobriquet,
      referralOrSponsor: selectedDeniedPetition.referralOrSponsor,
      submittedThrough: selectedDeniedPetition.submittedThrough,
      sourceOwner: selectedDeniedPetition.sourceOwner,
      status: 'Awaiting Judgment',
      image: selectedDeniedPetition.image ?? null,
      reasonForEntry: selectedDeniedPetition.reasonForEntry,
      fitnessBackground: selectedDeniedPetition.fitnessBackground,
      contribution: selectedDeniedPetition.contribution,
      submittedAt: selectedDeniedPetition.submittedAt,
    };

    setPendingPetitions((currentPetitions) => {
      const alreadyPending = currentPetitions.some(
        (currentPetition) => currentPetition.id === restoredPetition.id
      );

      if (alreadyPending) {
        return currentPetitions;
      }

      return [...currentPetitions, restoredPetition];
    });

    setDeniedPetitions((currentDeniedPetitions) =>
      currentDeniedPetitions.map((currentDeniedPetition) =>
        currentDeniedPetition.id === selectedDeniedPetition.id &&
        currentDeniedPetition.deniedAt === selectedDeniedPetition.deniedAt
          ? {
              ...currentDeniedPetition,
              restoredToPending: true,
              restoredAt: new Date().toISOString(),
              restoredBy: CURRENT_LEADERSHIP_MEMBER,
            }
          : currentDeniedPetition
      )
    );
  }

  function deleteDeniedPetitionRecord(
    selectedDeniedPetition: DeniedGuildPetition
  ) {
    setDeniedPetitions((currentDeniedPetitions) =>
      currentDeniedPetitions.filter(
        (currentDeniedPetition) =>
          !(
            currentDeniedPetition.id === selectedDeniedPetition.id &&
            currentDeniedPetition.deniedAt === selectedDeniedPetition.deniedAt
          )
      )
    );
  }

  function finalizeApprovedMember(
    petition: GuildPetition | undefined,
    newMemberData: FinalizeApprovedMemberInput
  ) {
    if (!petition) {
      return;
    }

    const newMember: GuildMember = {
      id: `member-${petition.id}`,
      name: newMemberData.name,
      sobriquet: newMemberData.sobriquet,
      rank: newMemberData.rank,
      class: newMemberData.class,
      division: newMemberData.division,
      status: newMemberData.status,
      motto: newMemberData.motto,
      image: newMemberData.image ?? null,
    };

    setGuildMembers((currentMembers) => {
      const alreadyExists = currentMembers.some(
        (member) => member.id === newMember.id
      );

      if (alreadyExists) {
        return currentMembers;
      }

      return [...currentMembers, newMember];
    });

    setPendingPetitions((currentPetitions) =>
      currentPetitions.filter(
        (currentPetition) => currentPetition.id !== petition.id
      )
    );

    setDeniedPetitions((currentDeniedPetitions) =>
      currentDeniedPetitions.map((deniedPetition) =>
        deniedPetition.id === petition.id
          ? {
              ...deniedPetition,
              acceptedAfterDenial: true,
              acceptedAt: new Date().toISOString(),
              acceptedBy: CURRENT_LEADERSHIP_MEMBER,
            }
          : deniedPetition
      )
    );
  }

  return {
    guildMembers,
    pendingPetitions,
    deniedPetitions,
    selectedPetitionId,
    selectedPetition,
    selectPetitionForApproval,
    denyPetition,
    restoreDeniedPetitionToPending,
    deleteDeniedPetitionRecord,
    finalizeApprovedMember,
  }}