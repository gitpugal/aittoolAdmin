import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().refine((password) => {
    return password.length >= 8;
  }, {
    message: "Password must be at least 8 characters long",
  }),
});
