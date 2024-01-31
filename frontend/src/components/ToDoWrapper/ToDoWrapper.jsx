import React, { useState, useEffect } from "react";
import "./ToDoWrapper.css";
import ToDo from "../ToDo/ToDo";
import ToDoForm from "../ToDoForm./ToDoForm";
import EditToDoForm from "../EditToDoForm/EditToDoForm";

export default function ToDoWrapper() {
  const [home, setHome] = useState("home");
  const [personal, setPersonal] = useState("personal");
  const [work, setWork] = useState("work");
  const [listes, setListes] = useState([]);
  const [check, setCheck] = useState(false);
  const [refresh, setRefresh] = useState(false);
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
    setListes((prevListes) => [
      ...prevListes,
      {
        id: getRandomInt(100),
        task: todo,
        completed: false,
        isEditing: false,
        names,
      },
    ]);
    setCheck(!check);
  };

  const deleteTodo = (id) => {
    setListes(listes.filter((todo) => todo.id !== id));
    setCheck(!check);
  };

  const toggleComplete = (id) => {
    setListes(
      listes.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = async (id) => {
    setListes(
      listes.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setListes(
      listes.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <div className="form">
        <h1>Get Things Done !</h1>
        <ToDoForm
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
          if (todo.isEditing && todo.names === "home") {
            return (
              <EditToDoForm
                task={todo}
                listeId={todo.id}
                setHome={setHome}
                setCheck={setCheck}
                setWork={setWork}
                setPersonal={setPersonal}
                editTask={editTask}
                editTodo={editTodo}
                check={check}
                home={home}
                personal={personal}
                work={work}
              />
            );
          }
          if (todo.names === "home") {
            return (
              <ToDo
                key={todo.id}
                task={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                toggleComplete={toggleComplete}
                names={todo.names}
              />
            );
          }
          return null;
        })}
      </div>
      <div className="personalContainer">
        {listes.map((todo) => {
          if (todo.isEditing && todo.names === "personal") {
            return (
              <EditToDoForm
                task={todo}
                listeId={todo.id}
                setHome={setHome}
                setCheck={setCheck}
                setWork={setWork}
                setPersonal={setPersonal}
                editTask={editTask}
                editTodo={editTodo}
                check={check}
                home={home}
                personal={personal}
                work={work}
                deleteTodo={deleteTodo}
              />
            );
          }
          if (todo.names === "personal") {
            return (
              <ToDo
                key={todo.id}
                task={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                toggleComplete={toggleComplete}
                names={todo.names}
              />
            );
          }
          return null;
        })}
      </div>
      <div className="workContainer">
        {listes.map((todo) => {
          if (todo.isEditing && todo.names === "work") {
            return (
              <EditToDoForm
                task={todo}
                listeId={todo.id}
                setHome={setHome}
                setCheck={setCheck}
                setWork={setWork}
                setPersonal={setPersonal}
                editTask={editTask}
                editTodo={editTodo}
                check={check}
                home={home}
                personal={personal}
                work={work}
                deleteTodo={deleteTodo}
              />
            );
          }
          if (todo.names === "work") {
            return (
              <ToDo
                key={todo.id}
                task={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                toggleComplete={toggleComplete}
                names={todo.names}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
