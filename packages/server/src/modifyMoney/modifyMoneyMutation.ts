import {
  Campaign,
  CampaignNotFound,
  getCampaignById,
  logger,
  mapDatabaseModelToGql,
  MoneyModification,
  MutationResolvers,
  prepareCampaignForSave,
} from 'shared';

export const modifyMoneyMutation: MutationResolvers['modifyMoney'] = async (
  _,
  { id, input },
): Promise<Campaign | CampaignNotFound> => {
  logger.info(`Modifying gold on campaign with ID ${id}`);

  const savedCampaign = await getCampaignById(id);

  if (!savedCampaign) {
    return {
      __typename: 'CampaignNotFound',
      message: `No campaign with ID ${id}`,
    };
  }

  prepareCampaignForSave(savedCampaign);

  if (input.modification === MoneyModification.ADD) {
    savedCampaign.electrum += input.electrum;
    savedCampaign.platinum += input.platinum;
    savedCampaign.gold += input.gold;
    savedCampaign.silver += input.silver;
    savedCampaign.bronze += input.copper;
  } else {
    savedCampaign.electrum -= input.electrum;
    savedCampaign.platinum -= input.platinum;
    savedCampaign.gold -= input.gold;
    savedCampaign.silver -= input.silver;
    savedCampaign.bronze -= input.copper;
  }

  savedCampaign.save();

  return mapDatabaseModelToGql(savedCampaign);
};
