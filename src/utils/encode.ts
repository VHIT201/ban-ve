import { SHA256 } from "crypto-js";

export function encodeSHA256(input: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hash = SHA256(data as unknown as string);
  return hash.toString();
}
