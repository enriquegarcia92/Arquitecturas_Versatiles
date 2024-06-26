import { Task } from "./types";

export function numberToStatusConverter(num: number): string {
  // Define a lookup object for mapping numbers to status strings
  const statusMap: { [key: number]: string } = {
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

export function numberToStatusColorConverter(num: number): string {
  const statusMap: { [key: number]: string } = {
    0: "bg-toDo",
    1: "bg-doing",
    2: "bg-done",
    3: "bg-upcoming",
  };

  // Check if the number is within the valid range
  if (num < 0 || num > 3) {
    throw new Error("Invalid number. Input must be between 0 and 3.");
  }

  // Return the corresponding status string using the lookup object
  return statusMap[num];
}

export function isoToYYYYMMDD(dateString: string): string {
  // Split the date string on "T" to separate the date and time portions
  const parts = dateString.split("T");

  // Check if the split resulted in at least one part (date)
  if (parts.length < 1) {
    throw new Error("Invalid date format. Input must be in ISO 8601 format.");
  }

  // Return only the first part (YYYY-MM-DD)
  return parts[0];
}

export function yyyymmddToISO(dateString: string): string {
  // Check if the input string matches the expected format (YYYY-MM-DD)
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    throw new Error("Invalid date format. Input must be in YYYY-MM-DD format.");
  }

  // Return the date string with "T00:00:00.000+00:00" appended (assuming UTC and zero time)
  return `${dateString}T00:00:00.000+00:00`;
}

export function filterTasksById(tasks: Task[], id: number): Task[] {
  return tasks.filter(task => task.status === id);
}

