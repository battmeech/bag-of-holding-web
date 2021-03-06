import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { FetchCampaign_campaign_Campaign_items as Item } from "campaign/gql";
import React from "react";
import { CgNotes } from "react-icons/cg";
import { GoKebabVertical } from "react-icons/go";
import { RiPencilFill } from "react-icons/ri";
import { useModal } from "shared";
import { EditItemModal } from "../ItemModal";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { ItemNotes } from "./ItemNotesModal";
import { ItemQuantityEditor } from "./ItemQuantityEditor";
import { TagGroup } from "./TagGroup";

type ItemCardProps = {
  item: Item;
  onTagClick?: (tag: string) => void;
};

export const ItemCard = ({ item, onTagClick = () => {} }: ItemCardProps) => {
  const { openModal } = useModal();

  return (
    <VStack
      justify="space-between"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <VStack w="full">
        <HStack w="full" justify="space-between">
          <Text fontSize="md">{item.name}</Text>
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              aria-label="item options"
              icon={<GoKebabVertical />}
              variant="ghost"
              size="xs"
            />
            <MenuList>
              <MenuItem
                icon={<EditIcon />}
                onClick={() => openModal(<EditItemModal item={item} />)}
              >
                edit item
              </MenuItem>
              <MenuItem
                icon={<DeleteIcon />}
                onClick={() =>
                  openModal(<DeleteConfirmationModal itemId={item.id} />)
                }
              >
                delete item
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <Flex w="full" justify="flex-start">
          <Text fontSize="sm">{item.description}</Text>
        </Flex>
      </VStack>

      <VStack w="full">
        <TagGroup
          onTagClick={onTagClick}
          variant="outline"
          colorScheme="teal"
          w="full"
          displayLimit={10}
          tags={item.tags}
        />

        <HStack justify="space-between" w="full">
          <Tooltip label="view notes">
            <IconButton
              variant="ghost"
              aria-label="view notes"
              size="xs"
              icon={
                item.notes?.trim() ? (
                  <CgNotes data-testid="notes-icon" />
                ) : (
                  <RiPencilFill data-testid="no-notes-icon" />
                )
              }
              onClick={() =>
                openModal(
                  <ItemNotes currentNotes={item.notes} itemId={item.id} />,
                  "xl"
                )
              }
            />
          </Tooltip>

          <ItemQuantityEditor item={item} />
        </HStack>
      </VStack>
    </VStack>
  );
};
