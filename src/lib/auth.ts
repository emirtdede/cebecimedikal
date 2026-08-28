import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";


if (!process.env.JWT_SECRET && process.env.NODE_ENV === "production") {
  console.error("CRITICAL SECURITY WARNING: JWT_SECRET environment variable is not defined in production!");
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || (process.env.NODE_ENV === "production" ? undefined : "cebeci_medikal_dev_secret_key_2026")
);

export const COOKIE_NAME = "cebeci_admin_token";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export function hasPermission(
  userRole: string,
  requiredRole: "SUPER_ADMIN" | "CONTENT_MANAGER" | "SALES_SUPPORT" | "ANALYST" | "VIEWER"
): boolean {
  const roleHierarchy: Record<string, number> = {
    SUPER_ADMIN: 5,
    CONTENT_MANAGER: 4,
    SALES_SUPPORT: 3,
    ANALYST: 2,
    VIEWER: 1,
  };

  const userLevel = roleHierarchy[userRole] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;

  return userLevel >= requiredLevel;
}
