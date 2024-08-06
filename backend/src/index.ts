import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

app.use('/api/*', cors())

/*******Middlewares */

app.use('/api/v1/blog/*', async (c, next) => {
  const token = c.req.header('Authorization')
  if (!token) {
    c.status(403)
    return c.json({ error: 'Unauthorized' })
  }
  const jwt = token.split(' ')[1]
  const payload = await verify(jwt, c.env.JWT_SECRET)
  if (!payload) {
    c.status(403)
    return c.json({ error: 'Unauthorized' })
  }

  c.set('userId', String(payload.id))
  await next()
})

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app
