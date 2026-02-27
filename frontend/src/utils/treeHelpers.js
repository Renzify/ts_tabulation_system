export const addChoiceRecursive = (categories, categoryId, input) => {
  return categories.map((cat) => {
    if (cat.id === categoryId) {
      return {
        ...cat,
        choices: [...cat.choices, { id: Date.now(), name: input }],
      };
    }

    return {
      ...cat,
      subCategories: addChoiceRecursive(
        cat.subCategories || [],
        categoryId,
        input,
      ),
    };
  });
};

// Add sub-category recursively
export const addSubCategoryRecursive = (categories, categoryId, input) => {
  return categories.map((cat) => {
    if (cat.id === categoryId) {
      return {
        ...cat,
        subCategories: [
          ...(cat.subCategories || []),
          {
            id: Date.now(),
            name: input,
            choices: [],
            subCategories: [],
          },
        ],
      };
    }

    return {
      ...cat,
      subCategories: addSubCategoryRecursive(
        cat.subCategories || [],
        categoryId,
        input,
      ),
    };
  });
};

// Delete category recursively
export const deleteCategoryRecursive = (categories, categoryId) => {
  return categories
    .filter((cat) => cat.id !== categoryId)
    .map((cat) => ({
      ...cat,
      subCategories: deleteCategoryRecursive(
        cat.subCategories || [],
        categoryId,
      ),
    }));
};

//  Delete choice recursively
export const deleteChoiceRecursive = (categories, choiceId) => {
  return categories.map((cat) => ({
    ...cat,
    choices: cat.choices.filter((c) => c.id !== choiceId),
    subCategories: deleteChoiceRecursive(cat.subCategories || [], choiceId),
  }));
};

export const updateCategoryRecursive = (categories, categoryId, newName) => {
  return categories.map((cat) => {
    if (cat.id === categoryId) {
      return { ...cat, name: newName };
    }

    if (cat.subCategories?.length) {
      return {
        ...cat,
        subCategories: updateCategoryRecursive(
          cat.subCategories,
          categoryId,
          newName,
        ),
      };
    }

    return cat;
  });
};

export const updateChoiceRecursive = (categories, choiceId, newName) => {
  return categories.map((cat) => ({
    ...cat,
    choices: cat.choices.map((choice) =>
      choice.id === choiceId ? { ...choice, name: newName } : choice,
    ),
    subCategories: updateChoiceRecursive(
      cat.subCategories || [],
      choiceId,
      newName,
    ),
  }));
};
