import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskModal from "./TaskModal"; // Ensure TaskModal is in the same directory
import "./KanbanBoard.css"; // Add your styles here

const initialBoardData = {
  columns: [
    {
      id: "problems",
      title: "Problems",
      tasks: [
        {
          id: "task-1",
          title: "Task 1",
          details: "Details for Task 1",
          status: "halted",
        },
        {
          id: "task-2",
          title: "Task 2",
          details: "Details for Task 2",
          status: "in-progress",
        },
      ],
    },
    {
      id: "reproduced",
      title: "Reproduced",
      tasks: [
        {
          id: "task-3",
          title: "Task 3",
          details: "Details for Task 3",
          status: "complete",
        },
      ],
    },
    // Add more columns as needed
  ],
};

const taskStyles = {
  halted: { backgroundColor: "red", color: "white" },
  "in-progress": { backgroundColor: "yellow", color: "black" },
  complete: { backgroundColor: "green", color: "white" },
};

function KanbanBoard() {
  const [boardData, setBoardData] = useState(initialBoardData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = boardData.columns.find(
      (col) => col.id === source.droppableId
    );
    const destColumn = boardData.columns.find(
      (col) => col.id === destination.droppableId
    );
    const sourceTasks = Array.from(sourceColumn.tasks);
    const destTasks = Array.from(destColumn.tasks);
    const [movedTask] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, movedTask);

    setBoardData((prevState) => ({
      ...prevState,
      columns: prevState.columns.map((col) => {
        if (col.id === source.droppableId)
          return { ...col, tasks: sourceTasks };
        if (col.id === destination.droppableId)
          return { ...col, tasks: destTasks };
        return col;
      }),
    }));
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="kanban-board table-responsive">
      <DragDropContext onDragEnd={onDragEnd}>
        {boardData.columns.map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div
                className="column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>{column.title}</h2>
                {column.tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="task"
                        style={taskStyles[task.status]}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => openModal(task)} // Open modal on task click
                      >
                        <p>{task.title}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          task={selectedTask}
        />
      )}
    </div>
  );
}

export default KanbanBoard;
