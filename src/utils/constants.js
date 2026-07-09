export const asset = (name) =>
  new URL(`../assets/${name}`, import.meta.url).href;

export const genres = [
  "Fiction",
  "Mystery",
  "Science",
  "History",
  "Design",
  "Children",
  "Biography",
  "Travel",
];

export const conditions = ["Like New", "Very Good", "Good", "Fair"];
export const avails = ["Available", "Reserved", "Exchanged"];
