import { ItemCard } from "campaign/components/ItemCard";
import { createItem } from "shared/testData";
import { FetchCampaign_campaign_Campaign_items as Item } from "campaign/gql";
import React from "react";
import { fireEvent, render } from "shared";

describe("ItemCard", () => {
  const setUpComponent = ({
    item = createItem({}),
  }: {
    campaignId?: string;
    item?: Item;
  }) => {
    const rendered = render(<ItemCard item={item} />);
    return rendered;
  };

  it("renders information about the item", () => {
    const { getByText } = setUpComponent({});

    expect(getByText("Test name")).toBeInTheDocument();
    expect(getByText("Test description")).toBeInTheDocument();
  });

  it("clicking the options menu brings up the 2 options", () => {
    const { getByLabelText, getByText } = setUpComponent({});

    const optionsMenu = getByLabelText("item options");

    fireEvent.click(optionsMenu);

    expect(getByText("edit item")).toBeInTheDocument();
    expect(getByText("delete item")).toBeInTheDocument();
  });

  it("clicking edit item brings up the edit modal", () => {
    const { getByLabelText, getByText } = setUpComponent({});

    const optionsMenu = getByLabelText("item options");

    fireEvent.click(optionsMenu);

    const editItemButton = getByText("edit item");

    fireEvent.click(editItemButton);

    expect(getByText("item name")).toBeInTheDocument();
    expect(getByText("item description")).toBeInTheDocument();
  });

  it("clicking delete item brings up the delete confirmation modal", () => {
    const { getByLabelText, getByText } = setUpComponent({});

    const optionsMenu = getByLabelText("item options");

    fireEvent.click(optionsMenu);

    const deleteItemButton = getByText("delete item");

    fireEvent.click(deleteItemButton);

    expect(getByText("it will be deleted forever")).toBeInTheDocument();
  });

  it("clicking the notes button displays the notes", () => {
    const { getByLabelText, getByText } = setUpComponent({});

    const notesButton = getByLabelText("view notes");

    fireEvent.click(notesButton);

    expect(getByText("item notes")).toBeInTheDocument();
  });
});
