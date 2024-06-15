

export function numberToStatusConverter(num){
  // Define a lookup object for mapping numbers to status strings
  const statusMap ={
    0: "To do",
    1: "Doing",
    2: "Done",
    3: "Upcoming",
  };

  // Check if the number is within the valid range
  if (num < 0 || num > 3) {
    throw new Error("Invalid number. Input must be between 0 and 3.");
  }

  // Return the corresponding status string using the lookup object
  return statusMap[num];
}

export function numberToStatusColorConverter(num) {
  const statusMap = {
    0: "bg-upcoming",
    1: "bg-toDo",
    2: "bg-doing",
    3: "bg-done",
  };

  // Check if the number is within the valid range
  if (num < 0 || num > 3) {
    throw new Error("Invalid number. Input must be between 0 and 3.");
  }

  // Return the corresponding status string using the lookup object
  return statusMap[num];
}

export function isoToYYYYMMDD(dateString){
  // Split the date string on "T" to separate the date and time portions
  const parts = dateString.split("T");

  // Check if the split resulted in at least one part (date)
  if (parts.length < 1) {
    throw new Error("Invalid date format. Input must be in ISO 8601 format.");
  }

  // Return only the first part (YYYY-MM-DD)
  return parts[0];
}

export function yyyymmddToISO(dateString){
  // Check if the input string matches the expected format (YYYY-MM-DD)
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    throw new Error("Invalid date format. Input must be in YYYY-MM-DD format.");
  }

  // Return the date string with "T00:00:00.000+00:00" appended (assuming UTC and zero time)
  return `${dateString}T00:00:00.000+00:00`;
}

export function filterTasksById(tasks, id) {
  return tasks.filter(task => task.status === id);
}
