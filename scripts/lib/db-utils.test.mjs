import { describe, expect, it } from "vitest";
import {
  backupFolderName,
  formatBytes,
  getEnvKey,
  isSameDatabase,
  isValidAdminId,
  parseArgs,
  parseMongoUrl,
  redactSecrets,
} from "./db-utils.mjs";

describe("isValidAdminId", () => {
  it("accepts google: with a numeric id", () => {
    expect(isValidAdminId("google:104857263849201837465")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isValidAdminId(undefined)).toBe(false);
    expect(isValidAdminId("")).toBe(false);
    expect(isValidAdminId("google:")).toBe(false);
    expect(isValidAdminId("104857263849201837465")).toBe(false);
    expect(isValidAdminId("credentials:665f1c2a9b1e8a0012345678")).toBe(false);
    expect(isValidAdminId(" google:123")).toBe(false);
  });
});

describe("parseArgs", () => {
  const spec = { values: ["from", "target"], flags: ["apply", "drop"] };

  it("reads values and flags", () => {
    const argv = ["--from", "backups/x", "--target", "dev", "--apply"];
    expect(parseArgs(argv, spec)).toEqual({
      from: "backups/x",
      target: "dev",
      apply: true,
      drop: false,
    });
  });

  it("sets flags to false when they are missing", () => {
    expect(parseArgs([], spec)).toEqual({ apply: false, drop: false });
  });

  it("throws on an unknown argument", () => {
    expect(() => parseArgs(["--force"], spec)).toThrow("Unknown argument: --force");
    expect(() => parseArgs(["dev"], spec)).toThrow("Unknown argument: dev");
  });

  it("throws when a value is missing", () => {
    expect(() => parseArgs(["--target"], spec)).toThrow("Missing value for --target");
    expect(() => parseArgs(["--target", "--apply"], spec)).toThrow("Missing value for --target");
  });
});

describe("getEnvKey", () => {
  it("maps production and dev to their env keys", () => {
    expect(getEnvKey("production", "source")).toBe("MONGO_URL_PRODUCTION");
    expect(getEnvKey("dev", "source")).toBe("MONGO_URL");
  });

  it("throws on anything else", () => {
    expect(() => getEnvKey(undefined, "target")).toThrow("Use --target production or --target dev");
    expect(() => getEnvKey("toString", "source")).toThrow();
  });
});

describe("parseMongoUrl", () => {
  it("returns the host and database name without credentials", () => {
    const url = "mongodb+srv://user:p%40ss@cluster0.abc.mongodb.net/jovicData?retryWrites=true";
    expect(parseMongoUrl(url)).toEqual({
      host: "cluster0.abc.mongodb.net",
      dbName: "jovicData",
    });
  });

  it("uses the default database when there is no name", () => {
    expect(parseMongoUrl("mongodb+srv://u:p@cluster0.abc.mongodb.net/?w=majority").dbName).toBe(
      "test"
    );
    expect(parseMongoUrl("mongodb://localhost:27017").dbName).toBe("test");
  });

  it("supports several hosts", () => {
    const url = "mongodb://u:p@a.example.com:27017,b.example.com:27017/app-dev";
    expect(parseMongoUrl(url)).toEqual({
      host: "a.example.com:27017,b.example.com:27017",
      dbName: "app-dev",
    });
  });

  it("throws on an invalid url", () => {
    expect(() => parseMongoUrl(undefined)).toThrow();
    expect(() => parseMongoUrl("https://example.com")).toThrow();
  });
});

describe("isSameDatabase", () => {
  it("compares host and database name", () => {
    const production = { host: "cluster0.abc.mongodb.net", dbName: "jovicData" };
    expect(isSameDatabase(production, { ...production })).toBe(true);
    expect(isSameDatabase(production, { ...production, dbName: "jovicData-dev" })).toBe(false);
  });
});

describe("redactSecrets", () => {
  it("hides the user and password in a connection string", () => {
    const text = "failed for mongodb+srv://user:secret@cluster0.abc.mongodb.net/db";
    expect(redactSecrets(text)).toBe("failed for mongodb+srv://***@cluster0.abc.mongodb.net/db");
  });
});

describe("backupFolderName", () => {
  it("uses the database name and local date and time", () => {
    const date = new Date(2026, 10, 5, 9, 7);
    expect(backupFolderName("jovicData", date)).toBe("jovicData-2026-11-05_09-07");
  });
});

describe("formatBytes", () => {
  it("formats bytes, kilobytes and megabytes", () => {
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(5 * 1024 * 1024)).toBe("5.0 MB");
  });
});
