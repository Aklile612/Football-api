export const getDateRange = () => {
  const today = new Date();

  const todayFormatted = formatDate(today);

  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 7); // Adding 7 days


  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - 7); // Subtracting 7 days

 
  const futureFormatted = formatDate(futureDate);
  const pastFormatted = formatDate(pastDate);

  return { today: todayFormatted, future: futureFormatted, past: pastFormatted };
};

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
  return `${year}-${month}-${day}`;
};
