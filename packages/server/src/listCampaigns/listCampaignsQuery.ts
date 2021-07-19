import {
  Campaign,
  CampaignModel,
  logger,
  mapDatabaseModelToGql,
  QueryResolvers,
} from 'shared';

export const listCampaignsQuery: QueryResolvers['listCampaigns'] = async (): Promise<
  Campaign[]
> => {
  logger.info('Fetching all campaigns');
  const savedCampaigns = await CampaignModel.find();

  const campaigns: Campaign[] = savedCampaigns.map(mapDatabaseModelToGql);

  return campaigns;
};
