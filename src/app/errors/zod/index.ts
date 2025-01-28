import { z } from "zod";

// Preprocess and validate non-empty strings
export const preprocessString = (message:any) => z.preprocess(
    (val) => (typeof val === "string" ? val : ""),
    z.string().nonempty(message)
  );

// Preprocess and validate email addresses
export const preprocessEmail = (message:any) => z.preprocess(
    (val) => (typeof val === "string" ? val : ""),
    z.string().email(message)
  );

  // Preprocess and validate phone numbers (international format)
export const preprocessNumber = (message:any) => z.preprocess(
    (val) => (typeof val === "string" ? val : ""),
    z.string().regex(/^\+\d{10,15}$/,message),
  );

