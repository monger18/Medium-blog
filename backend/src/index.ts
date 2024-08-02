import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    })
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt })
  } catch (error) {
    c.status(403)
    return c.json({ error: 'Error while signing up' })
  }
})

app.post('/api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  })
  if (!user) {
    c.status(403)
    return c.json({ error: 'user not found' })
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({ jwt })
})
app.post('/api/v1/blog', (c) => {
  return c.text('blog route')
})
app.put('/api/v1/blog', (c) => {
  return c.text('blog put route')
})
app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
  console.log(id)
  return c.text('blog get route')
})
app.get('/api/v1/blog/bulk', (c) => {
  return c.text('all blog route')
})

export default app
