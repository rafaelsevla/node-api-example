import express from "express";
import db from "./database";

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const [id] = await db("users").insert({ name, email });
    res.status(201).json({ id, name, email });
  } catch (error) {
    res.status(400).json({ error: "Usuário já existe ou erro no banco" });
  }
});

app.get("/users", async (req, res) => {
  const users = await db("users").select("*");
  res.json(users);
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
