import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {signUpInput,signInInput} from '@chiragkottary/medium-common'
import{sign} from 'hono/jwt'

export const userRoute = new Hono<{
    Bindings:{
    DATABASE_URL:string;
    JWT_SECRET:string;
  }
}>();


userRoute.post('/signup',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body =await c.req.json();
    const {success} = signUpInput.safeParse(body)
    if (!success) {
      c.status(411);
      return c.json({
        message: " inputs incorrect"
      })
    }
    const user =await prisma.user.create({
      data:{
        email:body.email,
        password: body.password,
        name: body.name
      }
    })
    const token = await sign({id: user.id},c.env.JWT_SECRET);
    return c.json({
      id:token,
      user:body.name
    })
  } catch (error) {
    c.status(411);
    c.json({
      err:"Invalid"
    })
  }  
})

userRoute.post('/signin',async (c) => {
   const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const body =await c.req.json();
    const {success} = signInInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        message: " inputs incorrect"
      })
    }
  const user =await prisma.user.findUnique({
    where:{
      email:body.email,
      password: body.password
    },select:{
      id:true,
      name:true
    }
  });
  if (!user) {
    c.status(403);
    return c.json({
      error:"user Not Found"
    });
  }
  const token =await sign({id: user.id},c.env.JWT_SECRET)
    return c.json({
      token: token,
      name:user.name
    })
  } catch (error) {
    c.status(411);
    c.text("Invalid");
  }
})