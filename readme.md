# Using Zod Library for Schema Validation

This project demonstrates the usage of the Zod library for schema validation in JavaScript/TypeScript. Zod is a TypeScript-first schema validation library that simplifies defining and validating the shape of objects, arrays, and other data structures. It ensures type safety and catches invalid inputs at runtime.

The project also incorporates validator.js to extend functionality, specifically validating mobile phone numbers.

## Dependencies

- Zod: For defining and validating schemas.
- Validator.js: For validating specific patterns such as mobile phone numbers.

```typescript
const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  mobile: z.string().refine(validator.isMobilePhone),
  age: z.number().min(18),
  dob: z.date(),
  details: z.object({
    isSubscribed: z.boolean(),
  }),
});
```

- z.string(): Validates string values.
- .email(): Built-in validation for valid email formats.
- .refine(): Custom validation using an external validator, such as checking if the mobile number is valid.
- .number().min(18): Ensures the age is a number and is at least 18.
- .date(): Validates that the value is a valid Date object.
- Nested object: details is an object with isSubscribed as a boolean value.

```typescript
type User = z.infer<typeof userSchema>;
```

The z.infer utility automatically infers the TypeScript type for the schema, ensuring type safety for data and reducing boilerplate.

```typescript
const emi: User = {
  firstName: "Emi",
  lastName: "Roberti",
  email: "emi@emi.ai",
  mobile: "+447500994545",
  age: 47,
  dob: new Date(1977, 5, 25),
  details: {
    isSubscribed: true,
  },
};
```

```typescript
const success = JSON.stringify(userSchema.safeParse(emi), null, 2);
console.log(success);
```
