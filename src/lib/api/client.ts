import { cookies } from "next/headers";
import axios, { AxiosInstance } from "axios";
import { env } from "@/configs/env";

/**
 * Create server-side API client with authentication
 */
export async function createServerApiClient(): Promise<AxiosInstance> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return axios.create({
    baseURL: env.apiBaseUrl,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    timeout: 30000,
  });
}

/**
 * Create public API client (no auth required)
 */
export function createPublicApiClient(): AxiosInstance {
  return axios.create({
    baseURL: env.apiBaseUrl,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });
}
