import {
  addChoiceRecursive,
  addSubCategoryRecursive,
  deleteCategoryRecursive,
  deleteChoiceRecursive,
} from "../utils/treeHelpers";

function eventsReducer(state, action) {
  switch (action.type) {
    case "ADD_EVENT":
      return [
        ...state,
        { id: Date.now(), name: action.payload, competition: null },
      ];

    case "ADD_COMPETITION":
      return state.map((event) =>
        event.id === action.eventId
          ? {
              ...event,
              competition: {
                id: Date.now(),
                name: action.payload,
                categories: [],
              },
            }
          : event,
      );

    case "ADD_CATEGORY":
      return state.map((event) =>
        event.id === action.eventId
          ? {
              ...event,
              competition: {
                ...event.competition,
                categories: [
                  ...event.competition.categories,
                  {
                    id: Date.now(),
                    name: action.payload,
                    choices: [],
                    subCategories: [],
                  },
                ],
              },
            }
          : event,
      );

    case "ADD_CHOICE":
      return state.map((event) =>
        event.id === action.eventId
          ? {
              ...event,
              competition: {
                ...event.competition,
                categories: addChoiceRecursive(
                  event.competition.categories,
                  action.categoryId,
                  action.payload,
                ),
              },
            }
          : event,
      );

    case "ADD_SUBCATEGORY":
      return state.map((event) =>
        event.id === action.eventId
          ? {
              ...event,
              competition: {
                ...event.competition,
                categories: addSubCategoryRecursive(
                  event.competition.categories,
                  action.categoryId,
                  action.payload,
                ),
              },
            }
          : event,
      );

    case "DELETE_EVENT":
      return state.filter((event) => event.id !== action.eventId);

    case "DELETE_COMPETITION":
      return state.map((event) =>
        event.id === action.eventId ? { ...event, competition: null } : event,
      );

    case "DELETE_CATEGORY":
      return state.map((event) =>
        event.id === action.eventId
          ? {
              ...event,
              competition: {
                ...event.competition,
                categories: deleteCategoryRecursive(
                  event.competition.categories,
                  action.categoryId,
                ),
              },
            }
          : event,
      );

    case "DELETE_CHOICE":
      return state.map((event) =>
        event.id === action.eventId
          ? {
              ...event,
              competition: {
                ...event.competition,
                categories: deleteChoiceRecursive(
                  event.competition.categories,
                  action.itemId,
                ),
              },
            }
          : event,
      );

    case "DELETE_SUBCATEGORY":
      return state.map((event) =>
        event.id === action.eventId
          ? {
              ...event,
              competition: {
                ...event.competition,
                categories: event.competition.categories.map((cat) =>
                  cat.id === categoryId
                    ? {
                        ...cat,
                        subCategories: cat.subCategories.filter(
                          (sub) => sub.id !== itemId,
                        ),
                      }
                    : cat,
                ),
              },
            }
          : event,
      );

    default:
      return state;
  }
}

export default eventsReducer;
