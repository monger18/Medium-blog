import z from 'zod'

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().optional(),
})

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const createpostInput = z.object({
  title: z.string(),
  content: z.string(),
})

export const updatepostInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
})

export type signupType = z.infer<typeof signupInput>
export type signinType = z.infer<typeof signinInput>
export type updatepostType = z.infer<typeof updatepostInput>
export type createPostType = z.infer<typeof createpostInput>
