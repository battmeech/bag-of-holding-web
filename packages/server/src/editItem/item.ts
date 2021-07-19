import { EditItemInput } from 'shared';
import { PersistedCampaign } from 'shared/model';

export const modifyItem = (
  items: PersistedCampaign['items'],
  input: EditItemInput,
) => {
  const itemToModify = items.find(
    // eslint-disable-next-line no-underscore-dangle
    (item) => item._id.toString() === input.id,
  );

  if (itemToModify) {
    if (input.name) itemToModify.name = input.name;
    if (input.description) itemToModify.description = input.description;
  }

  return itemToModify;
};
