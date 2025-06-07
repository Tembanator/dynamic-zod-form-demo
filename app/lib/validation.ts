import z from "zod";

const subscriptionTypeSchema = z.discriminatedUnion("subscriptionType", [
  z.object({
    subscriptionType: z.literal("free", {
      errorMap: () => ({ message: "Please select a subscription type" }),
    }),
  }),
  z.object({
    subscriptionType: z.literal("premium", {
      errorMap: () => ({ message: "Please select a subscription type" }),
    }),
    premiumFeatures: z.string().min(1, "Premium features are required"),
  }),
]);

export const FormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),

    hobbies: z
      .array(
        z.object({
          hobby: z.string().min(1, "Hobby is required"),
        })
      )
      .optional(),
    newsletter: z.boolean().optional(),
  })
  .and(subscriptionTypeSchema);

export type FormData = z.infer<typeof FormSchema>;

export const defaultValues: FormData = {
  name: "",
  email: "",
  subscriptionType: "free",

  hobbies: [],
  newsletter: false,
};
