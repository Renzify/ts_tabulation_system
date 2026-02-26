import { useState } from "react";
import {
  Trophy,
  Calendar,
  Tag,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
} from "lucide-react";

// ─── CATEGORY NODE ────────────────────────────────────────────────
export function CategoryNode({
  category,
  eventId,
  onAddChoice,
  onAddSubCategory,
  onDelete,
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChoices = category.choices?.length > 0;
  const hasSubCategories = category.subCategories?.length > 0;
  const hasChildren = hasChoices || hasSubCategories;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all">
        {hasChildren ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-slate-400 hover:text-slate-600"
          >
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <div className="w-4" />
        )}

        <Tag size={16} className="text-purple-500" />
        <div className="flex-1 flex justify-between">
          <div>
            <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
              CATEGORY
            </div>
            <div className="font-semibold text-slate-800 text-sm">
              {category.name}
            </div>
          </div>
          <div className="mt-2 mr-4">
            <button
              onClick={() => onDelete("category", eventId, category.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="ml-6 pl-4 border-l-2 border-slate-200 flex flex-col gap-2 mt-2">
          {/* Choices */}
          {category.choices.map((choice) => (
            <div
              key={choice.id}
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm"
            >
              <div className="w-4" />
              <div className="w-2 h-2 rounded-full border-2 border-slate-300 flex-shrink-0" />
              <div className="flex-1 flex justify-between">
                <div>
                  <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                    CHOICE
                  </div>
                  <div className="font-semibold text-slate-800 text-sm">
                    {choice.name}
                  </div>
                </div>
                <div className="mt-2 mr-4">
                  <button
                    onClick={() =>
                      onDelete("choice", eventId, category.id, choice.id)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Sub-categories */}
          {category.subCategories?.map((sub) => (
            <CategoryNode
              key={sub.id}
              category={sub}
              eventId={eventId}
              onAddChoice={onAddChoice}
              onAddSubCategory={onAddSubCategory}
              onDelete={onDelete}
            />
          ))}

          {/* Add Choice + Add Sub-Category buttons */}
          <div className="flex gap-2 mt-1">
            <button
              className="flex items-center gap-1 text-xs font-semibold text-green-500 hover:text-white hover:bg-green-500 border border-green-300 hover:border-green-500 px-3 py-1.5 rounded-lg transition-all"
              onClick={() => onAddChoice(eventId, category.id)}
            >
              <Plus size={12} /> Add Choice
            </button>
            <button
              className="flex items-center gap-1 text-xs font-semibold text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-300 hover:border-purple-500 px-3 py-1.5 rounded-lg transition-all"
              onClick={() => onAddSubCategory(eventId, category.id)}
            >
              <Plus size={12} /> Add Category
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── HIERARCHY ────────────────────────────────────────────────
export function Hierarchy({
  events,
  onAddCompetition,
  onAddCategory,
  onAddChoice,
  onAddSubCategory,
  onDelete,
}) {
  return (
    <div className="flex justify-center items-center mt-7">
      <div className="w-[80vw] min-h-[70vh] border border-slate-300/60 rounded-2xl overflow-hidden">
        <div className="h-[10vh] border-b border-slate-200 px-5 pt-3 bg-white">
          <h2 className="text-xl font-semibold">Structure Hierarchy</h2>
          <h4 className="text-sm text-slate-500">
            Define nested categories and choices
          </h4>
        </div>

        <div className="p-6 flex flex-col gap-4 bg-slate-50">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col">
              {/* Event */}
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all">
                <div className="w-4" />
                <Trophy size={16} className="text-amber-500" />
                <div className="flex-1 flex justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                      EVENT TYPE
                    </div>
                    <div className="font-semibold text-slate-800 text-sm">
                      {event.name}
                    </div>
                  </div>
                  <div className="mt-2 mr-4">
                    <button
                      onClick={() => onDelete("event", event.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="ml-6 pl-4 border-l-2 border-slate-200 flex flex-col gap-2 mt-2">
                {/* Competition */}
                {event.competition ? (
                  <>
                    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all">
                      <div className="w-4" />
                      <Calendar size={16} className="text-blue-500" />
                      <div className="flex-1 flex justify-between">
                        <div>
                          <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                            COMPETITION
                          </div>
                          <div className="font-semibold text-slate-800 text-sm">
                            {event.competition.name}
                          </div>
                        </div>
                        <div className="mt-2 mr-4">
                          <button
                            onClick={() => onDelete("competition", event.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="ml-6 pl-4 border-l-2 border-slate-200 flex flex-col gap-2">
                      {event.competition.categories.map((cat) => (
                        <CategoryNode
                          key={cat.id}
                          category={cat}
                          eventId={event.id}
                          onAddChoice={onAddChoice}
                          onAddSubCategory={onAddSubCategory}
                          onDelete={onDelete}
                        />
                      ))}

                      {/* Add Category */}
                      <div className="flex flex-col">
                        <div className="ml-[22px] h-4 border-l-2 border-dashed border-slate-300" />
                        <div className="flex items-center ml-3">
                          <div className="w-4 border-t-2 border-dashed border-slate-300" />
                          <button
                            className="flex items-center gap-1.5 text-xs font-semibold text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-300 hover:border-purple-500 px-3 py-1.5 rounded-lg transition-all ml-1"
                            onClick={() => onAddCategory(event.id)}
                          >
                            <Plus size={13} /> Add Category
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col">
                    <div className="ml-[22px] h-4 border-l-2 border-dashed border-slate-300" />
                    <div className="flex items-center ml-3">
                      <div className="w-4 border-t-2 border-dashed border-slate-300" />
                      <button
                        className="flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-white hover:bg-blue-500 border border-blue-300 hover:border-blue-500 px-3 py-1.5 rounded-lg transition-all ml-1"
                        onClick={() => onAddCompetition(event.id)}
                      >
                        <Plus size={13} /> Add Competition
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
