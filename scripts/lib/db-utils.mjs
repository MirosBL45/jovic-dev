// Pure helpers for the database scripts. No connection and no env access here, so they can be tested.

export const ENV_KEYS = {
  production: "MONGO_URL_PRODUCTION",
  dev: "MONGO_URL",
};

// Mongoose uses this database when the connection string has no database name.
export const DEFAULT_DB_NAME = "test";

const MONGO_URL_PATTERN = /^mongodb(?:\+srv)?:\/\/(?:[^/?#]*@)?([^/?#]+)(?:\/([^?#]*))?/;
const CREDENTIALS_PATTERN = /(mongodb(?:\+srv)?:\/\/)[^/?#\s]*@/g;

export function parseArgs(argv, { values = [], flags = [] } = {}) {
  const options = Object.fromEntries(flags.map((flag) => [flag, false]));

  for (let i = 0; i < argv.length; i++) {
    const name = argv[i].startsWith("--") ? argv[i].slice(2) : null;

    if (flags.includes(name)) {
      options[name] = true;
    } else if (values.includes(name)) {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith("--")) {
        throw new Error(`Missing value for --${name}`);
      }
      options[name] = value;
      i++;
    } else {
      throw new Error(`Unknown argument: ${argv[i]}`);
    }
  }

  return options;
}

export function getEnvKey(environment, optionName) {
  if (!Object.hasOwn(ENV_KEYS, environment)) {
    throw new Error(`Use --${optionName} production or --${optionName} dev`);
  }
  return ENV_KEYS[environment];
}

// Returns only the host and the database name, never the user or the password.
export function parseMongoUrl(url) {
  const match = MONGO_URL_PATTERN.exec(url ?? "");
  if (!match) {
    throw new Error("The connection string is not a valid MongoDB URL");
  }
  const dbName = decodeURIComponent(match[2] ?? "");
  return { host: match[1].toLowerCase(), dbName: dbName || DEFAULT_DB_NAME };
}

export function isSameDatabase(a, b) {
  return a.host === b.host && a.dbName === b.dbName;
}

export function redactSecrets(text) {
  return String(text).replace(CREDENTIALS_PATTERN, "$1***@");
}

export function backupFolderName(dbName, date) {
  const pad = (number) => String(number).padStart(2, "0");
  const day = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const time = `${pad(date.getHours())}-${pad(date.getMinutes())}`;
  return `${dbName}-${day}_${time}`;
}

export function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
