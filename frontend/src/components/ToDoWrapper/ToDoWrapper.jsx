import React, { useState, useEffect } from "react";
import "./ToDoWrapper.css";
import ToDo from "../ToDo/ToDo";
import TodoForm from "../ToDoForm./ToDoForm";
import EditToDoForm from "../EditToDoForm/EditToDoForm";

export default function ToDoWrapper() {
  const [home, setHome] = useState("home");
  const [personal, setPersonal] = useState("personal");
  const [work, setWork] = useState("work");
  const [listes, setListes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [check, setCheck] = useState(false);
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3310/api/listes`);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        setListes(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle the error here, e.g., set a default value or display an error message
      }
    };
    fetchData();
  }, [check]);

  const addTodo = (todo, names) => {
    setListes([
      ...listes,
      {
        id: getRandomInt(100),
        task: todo,
        completed: false,
        isEditing: false,
        names,
      },
    ]);
  };

  return (
    <div className="TodoWrapper">
      <div className="form">
        <h1>Get Things Done !</h1>
        <TodoForm
          addTodo={addTodo}
          home={home}
          personal={personal}
          work={work}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </div>
      {/* display todos */}
      <div className="homeContainer">
        {listes.map((todo) => {
          if (todo.isEditing === true) {
            return (
              <EditToDoForm
                task={todo}
                listeId={todo.id}
                setHome={setHome}
                setCheck={setCheck}
                setWork={setWork}
                setPersonal={setPersonal}
              />
            );
          }
          if (todo.names === "home") {
            <ToDo key={todo.id} task={todo} names={todo.names} />;
          }
          return "coucou";
        })}
      </div>
    </div>
  );
}
