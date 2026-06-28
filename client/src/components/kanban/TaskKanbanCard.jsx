import { Draggable } from "@hello-pangea/dnd";

function TaskKanbanCard({ task, index }) {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-slate-700 rounded-xl p-4 mb-3"
        >
          <h3 className="font-bold">
            {task.title}
          </h3>

         {task.dueDate && (
  <p className="text-cyan-300 text-sm mt-2">
    📅 {new Date(task.dueDate).toLocaleDateString()}
  </p>
)}

          <span className="inline-block mt-3 bg-cyan-500 px-3 py-1 rounded text-xs">
            {task.priority}
          </span>
        </div>
      )}
    </Draggable>
  );
}

export default TaskKanbanCard;