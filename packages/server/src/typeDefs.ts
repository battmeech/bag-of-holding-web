import { gql } from 'apollo-server';

export const typeDefs = gql`
  type CreatedCampaign {
    id: ID!
  }

  type Item {
    id: ID!
    name: String!
    description: String
  }

  type Campaign {
    id: ID!
    name: String!
    electrum: Int!
    platinum: Int!
    gold: Int!
    silver: Int!
    bronze: Int! @deprecated(reason: "use copper instead")
    copper: Int!
    items: [Item!]!
  }

  type CampaignNotFound {
    message: String!
  }

  enum MoneyModification {
    ADD
    DEDUCT
  }

  input AddItemInput {
    name: String!
    description: String
  }

  input EditItemInput {
    id: ID!
    name: String
    description: String
  }

  input RemoveItemInput {
    """
    ID of the item to be removed
    """
    id: ID!
  }

  input ModifyMoneyInput {
    modification: MoneyModification!
    electrum: Int!
    platinum: Int!
    gold: Int!
    silver: Int!
    copper: Int!
  }

  union FetchCampaignResult = Campaign | CampaignNotFound
  union AddItemResult = Campaign | CampaignNotFound
  union EditItemResult = Campaign | CampaignNotFound
  union RemoveItemResult = Campaign | CampaignNotFound
  union ModifyMoneyResult = Campaign | CampaignNotFound

  type Query {
    listCampaigns: [Campaign]!
    fetchCampaign(id: ID!): FetchCampaignResult!
  }

  type Mutation {
    createCampaign(name: String!): CreatedCampaign!
    addItem(id: ID!, input: AddItemInput!): AddItemResult!
    removeItem(id: ID!, input: RemoveItemInput!): RemoveItemResult!
    editItem(id: ID!, input: EditItemInput!): EditItemResult!
    modifyMoney(id: ID!, input: ModifyMoneyInput!): ModifyMoneyResult!
  }
`;
