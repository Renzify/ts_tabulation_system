import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Hierarchy } from "./HierarchyTree"; // adjust path if needed

function EventHierarchy() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchFullEvent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/event/full/${eventId}`,
        );

        console.log("FULL EVENT FROM BACKEND:", res.data);

        const normalized = normalizeEvent(res.data);
        setEventData(normalized);
      } catch (err) {
        console.error("Failed to fetch full event:", err);
      }
    };

    if (eventId) fetchFullEvent();
  }, [eventId]);

  if (!eventData) return <p>Loading...</p>;

  return (
    <Hierarchy
      events={[eventData]}
      onAddCompetition={() => {}}
      onAddCategory={() => {}}
      onAddChoice={() => {}}
      onAddSubCategory={() => {}}
      onDelete={() => {}}
      onEditCompetition={() => {}}
      onEditEvent={() => {}}
      onEditCategory={() => {}}
      onEditChoice={() => {}}
    />
  );
}

export default EventHierarchy;

function normalizeEvent(data) {
  return {
    id: data.id,
    name: data.eventName, // FIX: eventName → name
    competitions:
      data.competitions?.map((comp) => ({
        id: comp.id,
        name: comp.competitionName, // FIX: competitionName → name
        categories: buildCategoryTree(comp.categories),
      })) || [],
  };
}

function buildCategoryTree(categories = []) {
  const map = {};
  const roots = [];

  // Create map first
  categories.forEach((cat) => {
    map[cat.id] = {
      id: cat.id,
      name: cat.categoryName, // FIX: categoryName → name
      choices:
        cat.choices?.map((choice) => ({
          id: choice.id,
          name: choice.choiceName || choice.name,
        })) || [],
      subCategories: [],
      parentCategoryId: cat.parentCategoryId,
    };
  });

  // Build tree
  categories.forEach((cat) => {
    if (cat.parentCategoryId) {
      map[cat.parentCategoryId]?.subCategories.push(map[cat.id]);
    } else {
      roots.push(map[cat.id]);
    }
  });

  return roots;
}
