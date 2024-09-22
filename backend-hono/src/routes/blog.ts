import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {createBlog,updateBlog} from '@chiragkottary/medium-common'
import{verify} from 'hono/jwt'

 
export const blogRoute = new Hono<{
    Bindings:{
    DATABASE_URL:string;
    JWT_SECRET:string;
  },
  Variables: {
    userId: string
  }
}>();

blogRoute.use('/*', async (c, next) => {
    
    const token = c.req.header('Authorization');
    if (!token) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    
    try {
    const payload:any = await verify(token, c.env.JWT_SECRET); // Ensure payload can be any
    if (!payload || !payload.id) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }

    
    c.set("userId", payload.id);

    await next();
  } catch (error) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
});



blogRoute.post('/upload',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    try {
        const body = await c.req.json();
        const success = createBlog.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({
                message : "incorrect inputs"
            })
        }
        const userId = c.get("userId");
        const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })
    return c.json({
        message: blog.id
    })
    } catch (error) {
        return c.json({
        message: error
    })
    }
    
})

blogRoute.put('/edits',async (c) => {
    
    try {
        const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const userId = c.get('userId');
        const body = await c.req.json();
        const success = updateBlog.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({
                message : "incorrect inputs"
            })
        }
        const blog =await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});
    if (!blog) {
        return c.json({
        message:"not updated"
        })
    }
    return c.json({
        message: "updated the blog",
        blog
    })
    } catch (error) {
        return c.json({
        message: error
    })
    }
})

blogRoute.get('/bulk',async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    try {
        const blog = await prisma.post.findMany({
            select:{
                id:true,
                title:true,
                content:true,
                created:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
    return c.json({
        message: "all the blogs",
        blog
    })
    } catch (error) {
        return c.json({
        message: error
    })
    }
})

blogRoute.get('/:id',async (c) => {
   const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    try {
        const id =  c.req.param("id");
        const blog = await prisma.post.findUnique({
        where:{
            id: id
        },select:{
                id:true,
                title:true,
                content:true,
                created:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
    })
    if(!blog){
    return c.json({
        message: "notfound"
    })
    }
    return c.json({
        message: "blog found123",
        blog
    })
    } catch (error) {
        return c.json({
        message: error
    })
    }
})


