const API_CARS = "/api/voitures";

export async function createVoiture(newCar) {
  const response = await fetch(API_CARS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCar),
  });
  const body = await response.json();
  console.log(response);
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error api createCar");
    }
  }
}
