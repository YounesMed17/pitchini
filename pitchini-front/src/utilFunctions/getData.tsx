export async function get() {
  // apiPath: string
  const response = await fetch("http://localhost:3001/api/skills/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseBody = await response.json();

  if (response.ok) {
    // Success handling
    console.log("data received successfully!");
    //console.log(responseBody.id);

    return responseBody;
  } else {
    // Error handling
    console.error("Failed to receive user:", response.statusText);
  }
}
