const validateNotEmpty = (value: string): boolean => {
  return value.trim() !== "";
};

const validateEmail = (value: string): boolean => {
  // Basic email validation example
  return /\S+@\S+\.\S+/.test(value);
};

const validatePassword = (value: string): boolean => {
  // Password validation example (e.g., minimum length)
  // Password must be at least 8 characters long and contain at least one uppercase letter,
  // one lowercase letter, one digit, and one special character
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  return regex.test(value);
};

export async function send(
  formData: any,
  navigating: VoidFunction,
  apiPath: string
) {
  const response = await fetch(apiPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    // Success handling
    console.log("User registered successfully!");
    navigating();
  } else {
    // Error handling
    console.error("Failed to register user:", response.statusText);
  }
}

export { validateEmail, validateNotEmpty, validatePassword };
