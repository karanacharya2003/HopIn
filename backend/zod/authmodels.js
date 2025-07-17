import {z} from 'zod'

export const LoginSchemaZod = z.object({

    email: z.string().email(),
  
    password: z.string().min(6),
  
  });

export const SignupSchemaZod = z.object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    phone : z.string(),
    gender: z.enum(["male", "female", "others"]),
})


export const requestMailSchemaZod = z.object({
  email: z.string().email(),
})

export const resetPasswordSchemaZod= z.object({
    Id: z.string(),
    // email: z.string().email(),
    token: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
})