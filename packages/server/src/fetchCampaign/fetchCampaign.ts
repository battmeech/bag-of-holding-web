import {
  Campaign,
  CampaignNotFound,
  getCampaignById,
  logger,
  mapDatabaseModelToGql,
  QueryResolvers,
} from 'shared';

export const fetchCampaignQuery: QueryResolvers['fetchCampaign'] = async (
  _,
  { id },
): Promise<Campaign | CampaignNotFound> => {
  logger.info(`Fetching campaign with ID ${id}`);

  const savedCampaign = await getCampaignById(id);

  if (!savedCampaign) {
    return {
      __typename: 'CampaignNotFound',
      message: `No campaign with ID ${id}`,
    };
  }

  return mapDatabaseModelToGql(savedCampaign);
};
