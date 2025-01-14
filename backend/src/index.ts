import { Hono } from "hono";
import { blogRouter } from "./routes/blog";
import { userRouter } from "./routes/user";
import { cors } from "hono/cors";
// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
app.use("/*", cors());
app.route("/api/v1/blog", blogRouter);
app.route("/api/v1/user", userRouter);

app.get("/", (c) => {
  return c.text("Hello Hono Part1");
});

export default app;

//postgresql://postgres.oecgmnjntnedhozvlgyf:6xsLUu66JF6r5pQbU%t^m@aws-0-ap-south-1.pooler.supabase.com:6543/postgres

//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZDY3OWEyOTctY2E1Zi00N2QwLTk2NzctOWU0MWJjNGMyMTFjIiwidGVuYW50X2lkIjoiMWU0NGIwODM4ODc1MWU2ZjA5MGI5YWRiMzkyNjljYTBhYWE1ZDhmYTljMjIzN2JkNWQwMDNiMTFhYTgwOTdiMyIsImludGVybmFsX3NlY3JldCI6ImU5OTNiNjQ3LWE1MTgtNGRiNi05MDZjLTAxZTE5MjQ4NTE1MCJ9.6Opr1A24Sz-KE3eZRM2-4Ql-gVM9ES9_QJ8Vb61GgnY"
