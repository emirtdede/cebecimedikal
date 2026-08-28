import { describe, it, expect } from "vitest";
import { createSessionToken, verifySessionToken, hasPermission } from "../src/lib/auth";

describe("Admin Authentication & RBAC Engine", () => {
  const sampleUser = {
    id: "usr_12345",
    email: "admin@cebecimedikal.com",
    name: "Cebeci Admin",
    role: "SUPER_ADMIN",
  };

  it("creates and verifies valid JWT session token", async () => {
    const token = await createSessionToken(sampleUser);
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");

    const payload = await verifySessionToken(token);
    expect(payload).toBeDefined();
    expect(payload?.id).toBe(sampleUser.id);
    expect(payload?.email).toBe(sampleUser.email);
    expect(payload?.role).toBe(sampleUser.role);
  });

  it("fails verification on invalid or tampered token", async () => {
    const payload = await verifySessionToken("invalid.jwt.token");
    expect(payload).toBeNull();
  });

  it("evaluates RBAC hierarchy correctly", () => {
    expect(hasPermission("SUPER_ADMIN", "SUPER_ADMIN")).toBe(true);
    expect(hasPermission("SUPER_ADMIN", "CONTENT_MANAGER")).toBe(true);
    expect(hasPermission("SUPER_ADMIN", "VIEWER")).toBe(true);

    expect(hasPermission("CONTENT_MANAGER", "SUPER_ADMIN")).toBe(false);
    expect(hasPermission("CONTENT_MANAGER", "CONTENT_MANAGER")).toBe(true);
    expect(hasPermission("CONTENT_MANAGER", "VIEWER")).toBe(true);

    expect(hasPermission("VIEWER", "SUPER_ADMIN")).toBe(false);
    expect(hasPermission("VIEWER", "CONTENT_MANAGER")).toBe(false);
    expect(hasPermission("VIEWER", "VIEWER")).toBe(true);
  });
});
