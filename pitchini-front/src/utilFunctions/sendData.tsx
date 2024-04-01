export async function send(
  navigationStatus: boolean,
  formData: any,
  navigating: VoidFunction,
  apiPath: string
) {
  console.log("this is formdata");
  console.log(formData);
  const response = await fetch(apiPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (response.ok) {
    // Success handling
    console.log("User registered successfully!");
    //console.log(responseBody.id);

    navigationStatus ? navigating() : "";
    return responseBody.id;
  } else {
    // Error handling
    console.error("Failed to register user:", response.statusText);
  }
}
