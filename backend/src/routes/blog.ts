import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

blogRouter.post('/', async (c) => {
  const userId = c.get('userId')
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  })
  return c.json({ id: post.id })
})

blogRouter.put('/', async (c) => {
  const userId = c.get('userId')
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  try {
    await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body?.title,
        content: body?.content,
      },
    })
    return c.text('updated post')
  } catch (error) {
    return c.json({ error: 'Not Updated' })
  }
})

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const posts = await prisma.post.findMany()
    console.log('Post got')

    return c.json(posts)
  } catch (error) {
    console.log('Did not get the post')

    return c.json({
      error: 'Not able to fetch post. Something went wrong.....!',
    })
  }
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    })
    return c.json(post)
  } catch (error) {
    return c.json({ error: 'Post not found' })
  }
})
