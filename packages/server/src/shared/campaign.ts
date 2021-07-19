/* eslint-disable no-param-reassign */
import { Types } from 'mongoose';
import { CampaignModel, PersistedCampaign } from './model';
import { Campaign, Item } from './__generated__/schema-types';

export const mapDatabaseModelToGql = ({
  name,
  electrum,
  platinum,
  gold,
  silver,
  bronze,
  items: savedItems,
  _id: id,
}: PersistedCampaign): Campaign => {
  const items: Item[] = savedItems.map((savedItem) => ({
    __typename: 'Item',
    // eslint-disable-next-line no-underscore-dangle
    id: savedItem._id,
    name: savedItem.name,
    description: savedItem.description,
  }));

  return {
    __typename: 'Campaign',
    id,
    name,
    items: items || [],
    electrum: electrum || 0,
    platinum: platinum || 0,
    gold: gold || 0,
    silver: silver || 0,
    copper: bronze || 0,
    bronze: 0,
  };
};

export const getCampaignById = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  const savedCampaign = await CampaignModel.findById(id);

  return savedCampaign;
};

export const prepareCampaignForSave = (
  campaign: PersistedCampaign,
): PersistedCampaign => {
  campaign.electrum = campaign.electrum || 0;
  campaign.platinum = campaign.platinum || 0;
  campaign.gold = campaign.gold || 0;
  campaign.silver = campaign.silver || 0;
  campaign.bronze = campaign.bronze || 0;

  return campaign;
};
