import { z } from "zod";
import validator, { isMobilePhone } from "validator";
import { userInfo } from "os";

const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  mobile: z.string().refine(validator.isMobilePhone),
  age: z.number().min(18),
  dob: z.date(),
  freinds: z.array(z.string()).min(1),
  details: z.object({
    isSubscribed: z.boolean(),
  }),
});

type User = z.infer<typeof userSchema>;

const emi: User = {
  firstName: "Emi",
  lastName: "Roberti",
  email: "emi@emi.ai",
  mobile: "+447501774545",
  age: 47,
  freinds: ["friend 1", "friend 2"],
  dob: new Date(1977, 4, 12),
  details: {
    isSubscribed: true,
  },
};

const success = JSON.stringify(userSchema.safeParse(emi), null, 2);
console.log(success);
