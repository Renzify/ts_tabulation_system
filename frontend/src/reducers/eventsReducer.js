import {
  addChoiceRecursive,
  addSubCategoryRecursive,
  deleteCategoryRecursive,
  deleteChoiceRecursive,
  updateCategoryRecursive,
  updateChoiceRecursive,
} from "../utils/treeHelpers";

// Helper: update a specific competition within an event's competitions array
const mapCompetition = (event, competitionId, updater) => ({
  ...event,
  competitions: event.competitions.map((comp) =>
    comp.id === competitionId ? updater(comp) : comp,
  ),
});

function eventsReducer(state, action) {
  switch (action.type) {
    case "ADD_EVENT":
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.eventName,
          competitions: [],
        },
      ];

    case "UPDATE_EVENT":
      return state.map((event) =>
        event.id === action.eventId
          ? { ...event, name: action.payload }
          : event,
      );

    case "ADD_COMPETITION":
      return state.map((event) =>
        event.id === action.eventId
          ? {
              ...event,
              competitions: [
                ...event.competitions,
                {
                  id: action.payload.id,
                  name: action.payload.competitionName,
                  categories: [],
                },
              ],
            }
          : event,
      );

    case "UPDATE_COMPETITION":
      return state.map((event) =>
        event.id === action.eventId
          ? mapCompetition(event, action.competitionId, (comp) => ({
              ...comp,
              name: action.payload,
            }))
          : event,
      );

    case "DELETE_COMPETITION":
      return state.map((event) =>
        event.id === action.eventId
          ? {
              ...event,
              competitions: event.competitions.filter(
                (comp) => comp.id !== action.competitionId,
              ),
            }
          : event,
      );

    case "ADD_CATEGORY":
      return state.map((event) =>
        event.id === action.eventId
          ? mapCompetition(event, action.competitionId, (comp) => ({
              ...comp,
              categories: [
                ...comp.categories,
                {
                  id: action.payload.id,
                  name: action.payload.categoryName,
                  description: action.payload.categoryDesc,
                  parentCategoryId: action.payload.parentCategoryId,
                  choices: [],
                  subCategories: [],
                },
              ],
            }))
          : event,
      );

    case "UPDATE_CATEGORY":
      return state.map((event) =>
        event.id === action.eventId
          ? mapCompetition(event, action.competitionId, (comp) => ({
              ...comp,
              categories: updateCategoryRecursive(
                comp.categories,
                action.categoryId,
                action.payload,
              ),
            }))
          : event,
      );

    case "DELETE_CATEGORY":
      return state.map((event) =>
        event.id === action.eventId
          ? mapCompetition(event, action.competitionId, (comp) => ({
              ...comp,
              categories: deleteCategoryRecursive(
                comp.categories,
                action.categoryId,
              ),
            }))
          : event,
      );

    case "ADD_CHOICE":
      return state.map((event) =>
        event.id === action.eventId
          ? mapCompetition(event, action.competitionId, (comp) => ({
              ...comp,
              categories: addChoiceRecursive(
                comp.categories,
                action.categoryId,
                {
                  id: action.payload.id,
                  name: action.payload.choiceName, // map for frontend
                  description: action.payload.choiceDesc,
                  noOfJudges: action.payload.noOfJudges,
                },
              ),
            }))
          : event,
      );

    case "UPDATE_CHOICE":
      return state.map((event) =>
        event.id === action.eventId
          ? mapCompetition(event, action.competitionId, (comp) => ({
              ...comp,
              categories: updateChoiceRecursive(
                comp.categories,
                action.choiceId,
                action.payload,
              ),
            }))
          : event,
      );

    case "DELETE_CHOICE":
      return state.map((event) =>
        event.id === action.eventId
          ? mapCompetition(event, action.competitionId, (comp) => ({
              ...comp,
              categories: deleteChoiceRecursive(comp.categories, action.itemId),
            }))
          : event,
      );

    case "ADD_SUBCATEGORY":
      return state.map((event) =>
        event.id === action.eventId
          ? mapCompetition(event, action.competitionId, (comp) => ({
              ...comp,
              categories: addSubCategoryRecursive(
                comp.categories,
                action.payload,
              ),
            }))
          : event,
      );

    case "DELETE_SUBCATEGORY":
      return state.map((event) =>
        event.id === action.eventId
          ? mapCompetition(event, action.competitionId, (comp) => ({
              ...comp,
              categories: deleteCategoryRecursive(
                comp.categories,
                action.itemId,
              ),
            }))
          : event,
      );

    case "DELETE_EVENT":
      return state.filter((event) => event.id !== action.eventId);

    case "SET_EVENTS":
      return action.payload;

    default:
      return state;
  }
}

export default eventsReducer;
