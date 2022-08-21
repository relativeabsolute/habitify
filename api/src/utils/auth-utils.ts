import { randomBytes } from "crypto";

export function generateRandomString(length: number): string {
    return randomBytes(length / 2).toString("hex");
}
