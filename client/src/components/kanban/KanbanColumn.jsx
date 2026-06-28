import { Droppable } from "@hello-pangea/dnd";
import TaskKanbanCard from "./TaskKanbanCard";

function KanbanColumn({ title, tasks, droppableId }) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-slate-800 rounded-xl p-5 min-h-[550px]"
        >
          <h2 className="text-xl font-bold text-cyan-400 mb-5">
            {title}
          </h2>

          {tasks.map((task, index) => (
            <TaskKanbanCard
              key={task._id}
              task={task}
              index={index}
            />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default KanbanColumn;