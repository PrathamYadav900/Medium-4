import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInputs, signinInputs } from "@npmuserhahaha/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { success, error } = signupInputs.safeParse(body);

    if (!success) {
      console.error("Validation failed:", error);
      c.status(400);
      return c.json({
        msg: "Inputs not correct",
      });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: body.password,
          name: body.name,
        },
      });

      const jwt = await sign(
        {
          id: user.id,
        },
        c.env.JWT_SECRET,
      );

      return c.text(jwt);
    } catch (prismaError) {
      console.error("Prisma error:", prismaError);
      c.status(500);
      return c.json({
        msg: "Internal server error",
      });
    } finally {
      await prisma.$disconnect();
    }
  } catch (generalError) {
    console.error("General error:", generalError);
    c.status(500);
    return c.json({
      msg: "Internal server error ",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInputs.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Inputs are not correct",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });
    if (!user) {
      c.status(411);
      return c.text("This user account does not exist");
    }
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET,
    );

    return c.text(jwt);
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.text("Invalid");
  }
});
