import { modifyItem } from '../item';

describe('item', () => {
  let items: any[] = [];

  beforeEach(() => {
    items = [
      {
        _id: '1',
        name: 'name',
        description: 'description',
      },
    ];
  });

  it('returns null if item not found', () => {
    const output = modifyItem(items, { id: '2' });

    expect(output).toBeUndefined();
  });

  it('returns an unmodified item if found with no new fields', () => {
    const output = modifyItem(items, { id: '1' });

    expect(output).toStrictEqual({
      _id: '1',
      name: 'name',
      description: 'description',
    });
  });

  it('modifies the name if provided in input', () => {
    const output = modifyItem(items, { id: '1', name: 'new name' });

    expect(output).toStrictEqual({
      _id: '1',
      name: 'new name',
      description: 'description',
    });
  });

  it('modifies the description if provided in input', () => {
    const output = modifyItem(items, {
      id: '1',
      description: 'new description',
    });

    expect(output).toStrictEqual({
      _id: '1',
      name: 'name',
      description: 'new description',
    });
  });

  it('modifies the name & description if provided in input', () => {
    const output = modifyItem(items, {
      id: '1',
      name: 'new name',
      description: 'new description',
    });

    expect(output).toStrictEqual({
      _id: '1',
      name: 'new name',
      description: 'new description',
    });
  });
});
