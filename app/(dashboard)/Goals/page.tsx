"use client"
import React, { useState } from 'react';
import Board from '../../components/Board'; 
import AddBoardButton from '../../components/AddBoardButton'; 

function Goals() {
  const [boards, setBoards] = useState([
    {
      id: Date.now(),
      title: "Board 1",
      columns: [
        { id: 1, title: "To Do", tasks: [{ id: 1, title: "Task 1", status: "To Do" }] },
        { id: 2, title: "In Progress", tasks: [{ id: 2, title: "Task 2", status: "In Progess" }] },
        { id: 3, title: "Done", tasks: [{ id: 3, title: "Task 3", status: "Done" }] },
      ]
    }
  ]);

  const addBoard = (boardTitle) => {
    const newBoard = {
      id: Date.now(),
      title: boardTitle,
      columns: [] 
    };
    setBoards(prevBoards => [...prevBoards, newBoard]);
  };

  return (
    <div className="p-4 w-">
  <div className="mb-4">
    <AddBoardButton onAddBoard={addBoard} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
  </div>
  <div className="flex flex-wrap justify-start gap-4">
    {boards.map(board => (
      <Board key={board.id} board={board} />
    ))}
  </div>
</div>
  );
}

export default Goals;
