import { useState } from "react";
import {
  Trophy,
  Calendar,
  Tag,
  ChevronDown,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  Circle,
} from "lucide-react";

const levelConfig = {
  event: {
    icon: Trophy,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    borderColor: "border-amber-200",
    accent: "#f59e0b",
    label: "EVENT TYPE",
    trackColor: "bg-amber-300",
  },
  competition: {
    icon: Calendar,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    borderColor: "border-blue-200",
    accent: "#3b82f6",
    label: "COMPETITION",
    trackColor: "bg-blue-300",
  },
  category: {
    icon: Tag,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-50",
    borderColor: "border-violet-200",
    accent: "#8b5cf6",
    label: "CATEGORY",
    trackColor: "bg-violet-300",
  },
  choice: {
    icon: Circle,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    borderColor: "border-emerald-200",
    accent: "#10b981",
    label: "CHOICE",
    trackColor: "bg-emerald-300",
  },
};

function NodeCard({
  level,
  name,
  onEdit,
  onDelete,
  isExpanded,
  onToggle,
  hasChildren,
}) {
  const cfg = levelConfig[level];
  const Icon = cfg.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex items-center gap-3 bg-white rounded-2xl px-4 py-3 cursor-default transition-all duration-200"
      style={{
        border: `1.5px solid ${hovered ? cfg.accent : "#e8eaf0"}`,
        boxShadow: hovered
          ? `0 4px 20px -4px ${cfg.accent}30, 0 1px 4px rgba(0,0,0,0.06)`
          : "0 1px 4px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-all duration-200"
        style={{ backgroundColor: hovered ? cfg.accent : "transparent" }}
      />

      {/* Expand toggle */}
      <button
        onClick={onToggle}
        className="w-6 h-6 flex items-center justify-center rounded-lg transition-colors duration-150 flex-shrink-0"
        style={{
          color: hasChildren ? cfg.accent : "transparent",
          background:
            hasChildren && hovered ? `${cfg.accent}12` : "transparent",
          cursor: hasChildren ? "pointer" : "default",
        }}
      >
        {hasChildren ? (
          isExpanded ? (
            <ChevronDown size={14} strokeWidth={2.5} />
          ) : (
            <ChevronRight size={14} strokeWidth={2.5} />
          )
        ) : (
          <span />
        )}
      </button>

      {/* Icon */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}
      >
        <Icon size={15} className={cfg.iconColor} strokeWidth={2} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <div
          className="text-[9px] uppercase font-bold tracking-[0.12em]"
          style={{ color: cfg.accent }}
        >
          {cfg.label}
        </div>
        <div className="font-semibold text-slate-800 text-sm truncate mt-0.5">
          {name}
        </div>
      </div>

      {/* Actions */}
      <div
        className="flex items-center gap-1 transition-all duration-150"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        {onEdit && (
          <button
            onClick={onEdit}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <Pencil size={13} strokeWidth={2} />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={13} strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}

function AddButton({ label, color, onClick }) {
  const colors = {
    blue: "text-blue-500 border-blue-200 hover:bg-blue-500 hover:border-blue-500 hover:text-white",
    violet:
      "text-violet-500 border-violet-200 hover:bg-violet-500 hover:border-violet-500 hover:text-white",
    emerald:
      "text-emerald-500 border-emerald-200 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 text-[11px] font-semibold border px-3 py-1.5 rounded-xl transition-all duration-150 ${colors[color]}`}
    >
      <Plus size={11} strokeWidth={2.5} /> {label}
    </button>
  );
}

function TreeBranch({ children, trackColor = "bg-slate-200" }) {
  return (
    <div className="relative ml-3 mt-2 flex flex-col gap-2">
      {/* Vertical track line */}
      <div
        className={`absolute left-0 top-0 bottom-4 w-[2px] rounded-full ${trackColor} opacity-40`}
      />
      <div className="flex flex-col gap-2 pl-3">{children}</div>
    </div>
  );
}

export function CategoryNode({
  category,
  eventId,
  competitionId,
  onAddChoice,
  onAddSubCategory,
  onDelete,
  onEditCategory,
  onEditChoice,
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren =
    category.choices?.length > 0 || category.subCategories?.length > 0;

  return (
    <div>
      <NodeCard
        level="category"
        name={category.name}
        hasChildren={hasChildren}
        isExpanded={expanded}
        onToggle={() => hasChildren && setExpanded(!expanded)}
        onEdit={() => {
          console.log("Clicked edit category", {
            eventId,
            competitionId,
            categoryId: category.id,
          });
          onEditCategory(eventId, competitionId, category.id);
        }}
        onDelete={() =>
          onDelete("category", eventId, competitionId, category.id)
        }
      />

      {expanded && (
        <TreeBranch trackColor="bg-violet-300">
          {category.choices?.map((choice) => (
            <NodeCard
              key={choice.id}
              level="choice"
              name={choice.name}
              hasChildren={false}
              onEdit={() =>
                onEditChoice(
                  eventId,
                  category.id,
                  choice.id,
                  competitionId,
                  choice.name,
                )
              }
              onDelete={() =>
                onDelete(
                  "choice",
                  eventId,
                  competitionId,
                  category.id,
                  choice.id,
                )
              }
            />
          ))}

          {category.subCategories?.map((sub) => (
            <CategoryNode
              key={sub.id}
              category={sub}
              eventId={eventId}
              competitionId={competitionId}
              onAddChoice={onAddChoice}
              onAddSubCategory={onAddSubCategory}
              onDelete={onDelete}
              onEditCategory={onEditCategory}
              onEditChoice={onEditChoice}
            />
          ))}

          <div className="flex gap-2 pt-1">
            <AddButton
              label="Add Choice"
              color="emerald"
              onClick={() => onAddChoice(eventId, competitionId, category.id)}
            />
            <AddButton
              label="Add Sub-Category"
              color="violet"
              onClick={() =>
                onAddSubCategory(eventId, competitionId, category.id)
              }
            />
          </div>
        </TreeBranch>
      )}
    </div>
  );
}

export function CompetitionNode({
  competition,
  eventId,
  onAddCategory,
  onAddChoice,
  onAddSubCategory,
  onDelete,
  onEditCompetition,
  onEditCategory,
  onEditChoice,
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = competition.categories?.length > 0;

  return (
    <div>
      <NodeCard
        level="competition"
        name={competition.name}
        hasChildren={true}
        isExpanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        onEdit={() =>
          onEditCompetition(eventId, competition.id, competition.name)
        }
        onDelete={() => onDelete("competition", eventId, competition.id)}
      />

      {expanded && (
        <TreeBranch trackColor="bg-blue-300">
          {competition.categories?.map((cat) => (
            <CategoryNode
              key={cat.id}
              category={cat}
              eventId={eventId}
              competitionId={competition.id}
              onAddChoice={onAddChoice}
              onAddSubCategory={onAddSubCategory}
              onDelete={onDelete}
              onEditCategory={onEditCategory}
              onEditChoice={onEditChoice}
            />
          ))}

          <div className="pt-1">
            <AddButton
              label="Add Category"
              color="violet"
              onClick={() => onAddCategory(eventId, competition.id)}
            />
          </div>
        </TreeBranch>
      )}
    </div>
  );
}
function EventNode({
  event,
  onAddCompetition,
  onAddCategory,
  onAddChoice,
  onAddSubCategory,
  onDelete,
  onEditCompetition,
  onEditEvent,
  onEditCategory,
  onEditChoice,
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = event.competitions?.length > 0;

  return (
    <div className="flex-shrink-0 bg-slate-50 border border-slate-200 rounded-3xl p-4">
      <NodeCard
        level="event"
        name={event.name}
        hasChildren={hasChildren}
        isExpanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        onEdit={() => onEditEvent(event.id, event.name)}
        onDelete={() => onDelete("event", event.id)}
      />

      {expanded && (
        <TreeBranch trackColor="bg-amber-300">
          {event.competitions?.map((competition) => (
            <CompetitionNode
              key={competition.id}
              competition={competition}
              eventId={event.id}
              onAddCategory={onAddCategory}
              onAddChoice={onAddChoice}
              onAddSubCategory={onAddSubCategory}
              onDelete={onDelete}
              onEditCompetition={onEditCompetition}
              onEditCategory={onEditCategory}
              onEditChoice={onEditChoice}
            />
          ))}

          <div className="pt-1">
            <AddButton
              label="Add Competition"
              color="blue"
              onClick={() => onAddCompetition(event.id)}
            />
          </div>
        </TreeBranch>
      )}
    </div>
  );
}
export function Hierarchy({
  events,
  onAddCompetition,
  onAddCategory,
  onAddChoice,
  onAddSubCategory,
  onDelete,
  onEditCompetition,
  onEditEvent,
  onEditCategory,
  onEditChoice,
}) {
  return (
    <div className="flex justify-center mt-8 px-4 w-full">
      <div className="w-full max-w-3xl flex flex-col h-[80vh]">
        <div className="mb-6 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Structure Hierarchy
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Define nested categories and choices for your events
          </p>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden pr-2 pb-4">
          {events.map((event) => (
            <EventNode
              key={event.id}
              event={event}
              onAddCompetition={onAddCompetition}
              onAddCategory={onAddCategory}
              onAddChoice={onAddChoice}
              onAddSubCategory={onAddSubCategory}
              onDelete={onDelete}
              onEditCompetition={onEditCompetition}
              onEditEvent={onEditEvent}
              onEditCategory={onEditCategory}
              onEditChoice={onEditChoice}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
