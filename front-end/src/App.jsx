"use client";
import { useEffect, useState } from "react";
import List from "./List";
import InputBox from "./InputBox";

export default function App() {
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [list, setList] = useState([]);

  const getTodoList = () => {
    const url = "http://localhost:8000/todo";

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
      })
      .catch((error) => {})
      .finally(() => {
      });
  };

  const addTodoItem = (payload) => {
    const url = "http://localhost:8000/todo";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        getTodoList();
      })
      .catch((error) => {})
      .finally(() => {
      });
  };

  const updateTodoItem = (payload) => {
    const url = "http://localhost:8000/todo/" + payload.id;
   

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        getTodoList();
      })
      .catch((error) => {})
      .finally(() => {
      });
  };

  const deleteTodoItem = (payload) => {
    const url = "http://localhost:8000/todo/" + payload.id;
  
    return fetch(url, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("DELETE response:", data);
        getTodoList();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const onAdd = () => {
    console.log("On Add Pressed: 1 2 ", text);
    const obj = {
      text,
      isCompleted: false,
    };
    addTodoItem(obj);
    setText("");

  };

  const onDelete = (index) => {
    const deletedItem = list[index];

    deleteTodoItem(deletedItem).then(() => {
      const _list = [...list];
      _list.splice(index, 1);
      setList(_list);
    });
  };


  const onEdit = (index) => {
    console.log("on EDIT", index);
    setEditIndex(index);
    setText(list[index]);
  };

  const onUpdate = () => {
 
    list[editIndex] = text;

    setList([...list]);
    setText("");
    setEditIndex(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Todo List</h1>

      <InputBox
        text={text}
        setText={setText}
        onAdd={onAdd}
        editIndex={editIndex}
        onUpdate={onUpdate}
      />

      <List list={list} onDelete={onDelete} onEdit={onEdit} />
    </main>
  );
}