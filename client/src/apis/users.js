const API_USERS = "/api/users";

export async function createUser(newUser) {
  const response = await fetch(`${API_USERS}/client`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error api createUser");
    }
  }
}

export async function createPersonnel(newPersonnel) {
  const response = await fetch(`${API_USERS}/personnel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPersonnel),
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error api createPersonnel");
    }
  }
}
