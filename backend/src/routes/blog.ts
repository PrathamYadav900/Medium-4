import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@npmuserhahaha/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

//Authentication System
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);

    if (user) {
      c.set("userId", `${user.id}`);
      await next();
    } else {
      c.status(403);
      return c.json({
        msg: "You are not Logged in",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      msg: "You are not Logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Inputs are not correct",
    });
  }

  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId),
    },
  });
  return c.json({
    id: post.id,
  });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    c.json({
      msg: "The Inputs are not correct",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.update({
    where: { id: body.id },
    data: { title: body.title, content: body.content },
  });
  return c.json({
    id: post.id,
    msg: "The Blog has been updated succesfully",
  });
});

//Add Pagination means at first give user only 10 blog if they ask for more give them more

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const Posts = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    Posts,
  });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const ID = Number(id);

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log("Extracted id param:", id);
  console.log("Parsed id:", ID);

  if (isNaN(ID)) {
    return c.json({ msg: "InValid id", Number: ID, parms: id });
  }

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: ID,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!blog) {
      c.status(404);
      return c.json({ msg: "Blog post not found" });
    }
    return c.json({
      blog,
    });
  } catch (e) {
    c.status(500);
    return c.json({
      msg: "error while fetching the blog",
    });
  }
});
