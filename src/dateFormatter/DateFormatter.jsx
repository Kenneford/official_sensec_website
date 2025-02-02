const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  weekday: "short",
});
const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "numeric",
  year: "numeric",
  // weekday: "short",
});
// Helper function to format a date as "DD/MM/YYYY"
const formatDate = (date) => {
  const day = String(date.getUTCDate()).padStart(2, "0"); // Ensure 2 digits
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Ensure 2 digits (month is 0-indexed)
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

// Function to generate month labels with start and end dates
const getLastNMonthsData = (n) => {
  const results = [];

  for (let i = 0; i < n; i++) {
    // Calculate the target month
    const now = new Date();
    const targetDate = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1)
    ); // Go back `i` months

    // Start of the month
    const startOfMonth = new Date(targetDate);
    startOfMonth.setUTCDate(1); // Set to the 1st of the month
    startOfMonth.setUTCHours(0, 0, 0, 0); // Set to midnight

    // End of the month
    const endOfMonth = new Date(targetDate);
    endOfMonth.setUTCMonth(endOfMonth.getUTCMonth() + 1); // Move to the next month
    endOfMonth.setUTCDate(0); // Go back 1 day to get the last day of the current month
    endOfMonth.setUTCHours(23, 59, 59, 999); // Set to the end of the day

    // Determine the label
    let label;
    if (i === 0) {
      label = "Current Month";
    } else if (i === 1) {
      label = "Last Month";
    } else {
      label = `Last ${i} Months`;
    }
    // Add label and date range
    results.push({
      label,
      start: formatDate(startOfMonth),
      end: formatDate(endOfMonth),
    });
  }

  return results;
};

// Function to generate week labels with start and end dates for weeks
const getLastNWeeksData = (n) => {
  const results = [];

  for (let i = 0; i < n; i++) {
    const now = new Date();

    // Calculate the start of the week (Monday)
    const startOfWeek = new Date(now);
    startOfWeek.setUTCDate(now.getUTCDate() - now.getUTCDay() - 7 * i + 1); // Backtrack to Monday
    startOfWeek.setUTCHours(0, 0, 0, 0);

    // Calculate the end of the week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6); // Add 6 days to get Sunday
    endOfWeek.setUTCHours(23, 59, 59, 999);

    // Determine the label
    let label;
    if (i === 0) {
      label = "Current Week";
    } else if (i === 1) {
      label = "Last Week";
    } else {
      label = `${i} Weeks Ago`;
    }
    // Add label and date range
    results.push({
      label,
      start: formatDate(startOfWeek),
      end: formatDate(endOfWeek),
    });
  }

  return results;
};

export {
  dateFormatter,
  shortDateFormatter,
  getLastNMonthsData,
  getLastNWeeksData,
};
