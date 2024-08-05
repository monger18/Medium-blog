import z from 'zod'

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().optional(),
})

export type signupType = z.infer<typeof signupInput>

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type signinType = z.infer<typeof signinInput>

export const createpostInput = z.object({
  title: z.string(),
  content: z.string(),
})

export type createPostType = z.infer<typeof createpostInput>

export const updatepostInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
})

export type updatepostType = z.infer<typeof updatepostInput>
