import { DragDropContext } from "@hello-pangea/dnd";
import { updateTaskStatus } from "../../services/api";
import KanbanColumn from "./KanbanColumn";

function Kanban({ tasks, refreshTasks }) {
  const todo = tasks.filter((task) => task.status === "To Do");
  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  );
  const done = tasks.filter((task) => task.status === "Done");

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    try {
      await updateTaskStatus(
        draggableId,
        destination.droppableId
      );

      refreshTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid lg:grid-cols-3 gap-6">

        <KanbanColumn
          title="📝 To Do"
          tasks={todo}
          droppableId="To Do"
        />

        <KanbanColumn
          title="🚧 In Progress"
          tasks={progress}
          droppableId="In Progress"
        />

        <KanbanColumn
          title="✅ Done"
          tasks={done}
          droppableId="Done"
        />

      </div>
    </DragDropContext>
  );
}

export default Kanban;