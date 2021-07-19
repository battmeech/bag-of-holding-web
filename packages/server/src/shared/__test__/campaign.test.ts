import { mapDatabaseModelToGql, prepareCampaignForSave } from '../campaign';

describe('campaign', () => {
  const fullInput = {
    _id: 'unique-campaign-id',
    name: 'Campaign name',
    electrum: 1,
    platinum: 2,
    gold: 3,
    silver: 4,
    bronze: 5,
    items: [
      { _id: 'unique-item-id', name: 'item-1', description: 'description' },
    ],
  } as any;

  it('maps a database model to the GQL model', () => {
    const output = mapDatabaseModelToGql(fullInput);

    expect(output).toStrictEqual({
      __typename: 'Campaign',
      electrum: 1,
      platinum: 2,
      gold: 3,
      silver: 4,
      copper: 5,
      bronze: 0,
      items: [
        {
          __typename: 'Item',
          id: 'unique-item-id',
          name: 'item-1',
          description: 'description',
        },
      ],
      name: 'Campaign name',
      id: 'unique-campaign-id',
    });
  });

  it('maps an item without description', () => {
    const input = {
      ...fullInput,
      items: [{ _id: 'unique-item-id', name: 'item-1' }],
    } as any;

    const output = mapDatabaseModelToGql(input);

    expect(output.items[0]).toStrictEqual({
      __typename: 'Item',
      id: 'unique-item-id',
      name: 'item-1',
      description: undefined,
    });
  });

  it('handles undefined money values sensible', () => {
    const input = {
      _id: 'unique-campaign-id',
      name: 'Campaign name',
      items: [],
    } as any;

    const output = mapDatabaseModelToGql(input);

    expect(output).toStrictEqual({
      __typename: 'Campaign',
      electrum: 0,
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 0,
      bronze: 0,
      items: [],
      name: 'Campaign name',
      id: 'unique-campaign-id',
    });
  });

  it('does not modify a ready to save campaign', () => {
    const output = prepareCampaignForSave(fullInput);

    expect(output).toStrictEqual(fullInput);
  });

  it('removes undefined values where for money', () => {
    const input = {
      ...fullInput,
      electrum: undefined,
      platinum: undefined,
      gold: undefined,
      silver: undefined,
      bronze: undefined,
    };

    const output = prepareCampaignForSave(input);

    expect(output.electrum).toStrictEqual(0);
    expect(output.platinum).toStrictEqual(0);
    expect(output.gold).toStrictEqual(0);
    expect(output.silver).toStrictEqual(0);
    expect(output.bronze).toStrictEqual(0);
  });
});
