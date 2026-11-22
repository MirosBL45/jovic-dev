import { isInputLengthValid } from "./GeneralFunctions";

// Used by the dashboard (browser) and by the API (server), so the rules cannot drift apart.

export const MAX_IMAGE_BYTES = 1024 * 1024;

export const POST_TEXT_FIELDS = [
  { name: "title", label: "Main Title", min: 2, max: 75 },
  { name: "headline1", label: "Headline 1", min: 2, max: 35 },
  { name: "description1", label: "Description 1", min: 2, max: 135 },
  { name: "content1", label: "Content 1", min: 2, max: 2000 },
  { name: "headline2", label: "Headline 2", min: 2, max: 35 },
  { name: "description2", label: "Description 2", min: 2, max: 135 },
  { name: "content2", label: "Content 2", min: 2, max: 2000 },
  { name: "slug", label: "Slug", min: 2, max: 35 },
];

export const POST_IMAGE_FIELDS = [
  { name: "image", label: "The first image" },
  { name: "imagesecond", label: "The second image" },
];

const POST_FIELD_NAMES = [...POST_TEXT_FIELDS, ...POST_IMAGE_FIELDS].map((field) => field.name);

const IMAGE_DATA_URL = /^data:image\/(?:png|jpeg|webp|gif);base64,([A-Za-z0-9+/]*={0,2})$/;

export const ALL_FIELDS_REQUIRED = "All fields are required.";

// Only the fields of a post are taken from the request body, everything else is ignored.
export function pickPostFields(body) {
  const source = body && typeof body === "object" ? body : {};
  return Object.fromEntries(POST_FIELD_NAMES.map((name) => [name, source[name]]));
}

export function getBase64DecodedSize(base64) {
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
  return Math.floor((base64.length * 3) / 4) - padding;
}

function validateImage(value, label) {
  const match = IMAGE_DATA_URL.exec(value);
  if (!match) {
    return `${label} must be a PNG, JPEG, WebP or GIF image.`;
  }
  if (getBase64DecodedSize(match[1]) > MAX_IMAGE_BYTES) {
    return `${label} is too large. Please select an image smaller than 1MB.`;
  }
  return null;
}

// Returns null for a valid post, otherwise the message to show to the user.
export function validatePost(post) {
  const fields = pickPostFields(post);

  const missing = POST_FIELD_NAMES.some(
    (name) => typeof fields[name] !== "string" || fields[name].trim() === ""
  );
  if (missing) {
    return ALL_FIELDS_REQUIRED;
  }

  for (const { name, label, min, max } of POST_TEXT_FIELDS) {
    if (!isInputLengthValid(fields[name], min, max)) {
      return `${label} must be ${min}–${max} characters.`;
    }
  }

  for (const { name, label } of POST_IMAGE_FIELDS) {
    const imageError = validateImage(fields[name], label);
    if (imageError) {
      return imageError;
    }
  }

  return null;
}
