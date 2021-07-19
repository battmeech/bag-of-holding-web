import {
  Campaign,
  CampaignNotFound,
  getCampaignById,
  logger,
  mapDatabaseModelToGql,
  MutationResolvers,
  prepareCampaignForSave,
} from 'shared';
import { modifyItem } from './item';

export const editItemMutation: MutationResolvers['editItem'] = async (
  _,
  { id, input },
): Promise<Campaign | CampaignNotFound> => {
  logger.info(`Updating item: ${input.id} from campaign ${id}`);

  const savedCampaign = await getCampaignById(id);

  if (!savedCampaign) {
    return {
      __typename: 'CampaignNotFound',
      message: `No campaign with ID ${id}`,
    };
  }

  modifyItem(savedCampaign.items, input);
  prepareCampaignForSave(savedCampaign);

  savedCampaign.save();

  return mapDatabaseModelToGql(savedCampaign);
};
