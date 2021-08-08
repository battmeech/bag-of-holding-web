import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FetchCampaign_fetchCampaign_Campaign as Campaign } from "campaign/gql";
import React, { useEffect, useState } from "react";
import { useModal } from "shared";
import { AddItemModal } from "./AddItemModal";
import { Currency } from "./Currency";
import { ItemCard } from "./ItemCard";
import { MoneyModal } from "./MoneyModal";
import { FaPiggyBank } from "react-icons/fa";

export const CampaignLoaded = ({ campaign }: { campaign: Campaign }) => {
  const { openModal } = useModal();
  const [filterText, setFilterText] = useState("");
  const [filteredItems, setFilteredItems] = useState(campaign.items);
  useEffect(() => {
    const newFilteredItems = campaign.items.filter(
      (item) =>
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.description?.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredItems(newFilteredItems);
  }, [filterText, campaign.items]);
  return (
    <Box>
      <Flex as="header" width="full" align="center">
        <Text fontSize="xl">{campaign.name}</Text>

        <Box ml="auto">
          <Tooltip label="add item">
            <IconButton
              aria-label="add item"
              variant="ghost"
              size="lg"
              icon={<AddIcon />}
              onClick={() =>
                openModal(<AddItemModal campaignId={campaign.id} />)
              }
            />
          </Tooltip>
        </Box>
      </Flex>

      <Flex mb={2}>
        <Currency denomination="platinum" value={campaign.platinum} mr={3} />
        <Currency denomination="gold" value={campaign.gold} mr={3} />
        <Currency denomination="electrum" value={campaign.electrum} mr={3} />
        <Currency denomination="silver" value={campaign.silver} mr={3} />
        <Currency denomination="copper" value={campaign.copper} mr={2} />

        <Tooltip label="modify money">
          <IconButton
            aria-label="edit money"
            variant="ghost"
            size="lg"
            icon={<FaPiggyBank />}
            onClick={() => openModal(<MoneyModal campaignId={campaign.id} />)}
          />
        </Tooltip>
      </Flex>
      <InputGroup>
        <Input
          placeholder="Search for items..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
      </InputGroup>
      {campaign.items.length === 0 ? (
        <Box mb={6}>
          <Text mb={4}>looks empty in here</Text>
          <Button
            colorScheme="teal"
            onClick={() => openModal(<AddItemModal campaignId={campaign.id} />)}
          >
            add an item
          </Button>
        </Box>
      ) : (
        <SimpleGrid
          mt="4"
          data-testid="card-grid"
          columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
          spacing={4}
          mb={6}
        >
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} campaignId={campaign.id} />
          ))}
        </SimpleGrid>
      )}

      <Text fontSize="xs">campaign id: {campaign.id}</Text>
    </Box>
  );
};
