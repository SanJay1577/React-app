// const API = "https://67664b11410f8499965745ad.mockapi.io/tasklist";
const API = "http://localhost:8000/api/v1/tasks";

const headers = {
  "Content-Type": "application/json",
};
// Get the data
export async function getAllTaskList() {
  let response = await fetch(API, {
    method: "GET",
    headers: {
      "x-auth-token": localStorage.getItem("accesToken"),
    },
  });
  let task = await response.json();
  return task;
}

//post data
export async function addNewTask(payload) {
  let response = await fetch(`${API}/add`, {
    method: "POST",
    body: JSON.stringify({
      createdTime: Date.now(),
      text: payload,
      completed: false,
    }),
    headers,
  });
  let data = await response.json();
  return data;
}

//get specificdata
export async function getTaskById(id) {
  let response = await fetch(`${API}/edit/${id}`, {
    method: "GET",
  });
  let data = await response.json();
  return data;
}

//delete specific data
export async function deleteTask(id) {
  let response = await fetch(`${API}/delete/${id}`, {
    method: "DELETE",
  });
  let data = await response.json();
  return data;
}

//[PUT] edit specific data
export async function editTask({ id, payload }) {
  let response = await fetch(`${API}/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers,
  });
  let data = await response.json();
  return data;
}
