
// 1). If the error is of validation (user hasn't provided something)
export const validationError = (err) => {
  console.log("Validation Error");
  const errors = Object.values(err.response.data.err.errors).map(
    (el) => el.message,
  );
  throw new Error(errors[0]);
};

// 2). Whole axios catch error handler
export const handleApiError = (err) => {
  // If there is direct message from backend from AppError
  if (err.response?.data?.message) {
    throw new Error(err.response.data.message);

    // If there is mongoose validation error
  } else if (err.response?.data?.err?.errors) {
    validationError(err);

    // If there is thrown error from frontend side by requests APIs
  } else if (err?.message) {
    throw new Error(err.message);

    // Don't know what the error is about
  } else {
    console.log(`Api Error`, err);
    throw new Error("Something went wrong. Please try again later!");
  }
};

