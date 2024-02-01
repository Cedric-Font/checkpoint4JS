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
  const [workClass, setWorkClass] = useState("");
  const [homeClass, setHomeClass] = useState("");
  const [personalClass, setPersonalClass] = useState("");

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3310/api/listes`, {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

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

  useEffect(() => {
    const maDiv = document.getElementById("workContainer");

    if (maDiv && maDiv.children.length <= 1) {
      setWorkClass("workContainerEmpty");
    } else {
      setWorkClass("workContainer");
    }
  }, [listes]);

  useEffect(() => {
    const maDiv = document.getElementById("personalContainer");

    if (maDiv && maDiv.children.length <= 1) {
      setPersonalClass("personalContainerEmpty");
    } else {
      setPersonalClass("personalContainer");
    }
  }, [listes]);

  useEffect(() => {
    const maDiv = document.getElementById("homeContainer");

    if (maDiv && maDiv.children.length <= 1) {
      setHomeClass("homeContainerEmpty");
    } else {
      setHomeClass("homeContainer");
    }
  }, [listes]);

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
      <div className={homeClass} id="homeContainer">
        <h2 className="homeTitle">Home</h2>
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
              <div className="todo">
                <ToDo
                  key={todo.id}
                  task={todo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  toggleComplete={toggleComplete}
                  names={todo.names}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className={personalClass} id="personalContainer">
        <h2 className="personalTitle">Personal</h2>
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
              <div className="todo">
                <ToDo
                  key={todo.id}
                  task={todo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  toggleComplete={toggleComplete}
                  names={todo.names}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className={workClass} id="workContainer">
        <h2 className="workTitle">work</h2>
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
              <div className="todo">
                <ToDo
                  key={todo.id}
                  task={todo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  toggleComplete={toggleComplete}
                  names={todo.names}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
