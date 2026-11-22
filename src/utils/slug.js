// Spaces become "-" and everything is lower case.
export function normalizeSlug(value) {
  return value.trim().replace(/\s+/g, "-").toLowerCase();
}

export function makeUniqueSlug(slug, existingSlugs) {
  // if there is the same slug add number
  if (existingSlugs.includes(slug)) {
    let counter = 2;
    while (existingSlugs.includes(slug + counter)) {
      counter++;
    }
    return slug + counter;
  }

  return slug;
}

// For a MongoDB $regex that finds every slug starting with the given text.
export function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
