import {
  Campaign,
  CampaignNotFound,
  getCampaignById,
  logger,
  mapDatabaseModelToGql,
  MutationResolvers,
  prepareCampaignForSave,
} from 'shared';

export const removeItemMutation: MutationResolvers['removeItem'] = async (
  _,
  { id, input },
): Promise<Campaign | CampaignNotFound> => {
  logger.info(`Removing item from campaign with ID ${id}`);
  const savedCampaign = await getCampaignById(id);

  if (!savedCampaign) {
    return {
      __typename: 'CampaignNotFound',
      message: `No campaign with ID ${id}`,
    };
  }

  const itemToRemove = savedCampaign.items.find(
    // eslint-disable-next-line no-underscore-dangle
    (item) => item._id.toString() === input.id,
  );

  if (itemToRemove) {
    const spliceIndex = savedCampaign.items.indexOf(itemToRemove);
    savedCampaign.items.splice(spliceIndex, 1);
    prepareCampaignForSave(savedCampaign);
    await savedCampaign.save();
  }

  return mapDatabaseModelToGql(savedCampaign);
};
