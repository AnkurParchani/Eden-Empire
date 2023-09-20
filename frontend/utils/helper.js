export const localhost = "https://eden-empire.onrender.com";

// helper search function for header
export const searchItems = (inputValue, items) => {
  const matchedItems = items.reduce((result, item) => {
    // Getting all the things from which i want to find
    const { name } = item;
    const { genericName, manufacturer, packer } = item.details;

    // Converting the search to lower case
    const lowerInput = inputValue.toLowerCase();

    // Converting all the rest variables to lower case
    const lowerName = name.toLowerCase();
    const lowerGenericName = genericName.toLowerCase();
    const lowerManufacturer = manufacturer.toLowerCase();
    const lowerPacker = packer.toLowerCase();

    // Check if any of the properties contain the search input
    if (
      lowerName.includes(lowerInput) ||
      lowerGenericName.includes(lowerInput) ||
      lowerManufacturer.includes(lowerInput) ||
      lowerPacker.includes(lowerInput)
    ) {
      // Create an object to store the matched item and matched properties
      const matchedItem = {
        item: item,
        searchValue: lowerInput,
        matchedProperties: [],
      };

      // Add the matched properties to the matchedItem object
      if (lowerName.includes(lowerInput)) {
        matchedItem.matchedProperties.push("name");
      }
      if (lowerGenericName.includes(lowerInput)) {
        matchedItem.matchedProperties.push("genericName");
      }
      if (lowerManufacturer.includes(lowerInput)) {
        matchedItem.matchedProperties.push("manufacturer");
      }
      if (lowerPacker.includes(lowerInput)) {
        matchedItem.matchedProperties.push("seller");
      }

      // Pushing to the accumulator
      result.push(matchedItem);
    }

    // Returning the acc array
    return result;
  }, []);

  return matchedItems;
};
