import express from "express";
import bodyParser from "body-parser";
import mariadb from "mariadb";
import bcrypt from "bcrypt";

const pool = mariadb.createPool({
  host: process.env.DB_HOST ?? "mysql-cousin.alwaysdata.net",
  port: 8889,
  user: process.env.DB_USER ?? "cousin_admin",
  password: process.env.DB_PASSWORD ?? "Azertyuiop10!",
  database: process.env.DB_DATABASE ?? "cousin_projet",
  connectionLimit: 5,
});

console.log("ENV vars", process.env);
console.log("database pool", pool);

const app = express();
app.use(bodyParser.json());

// Fetch pour login

app.post("/api/auth/login", async (req, res) => {
  const user = req.body;
  console.log("login request for user", user);

  const connection = await pool.getConnection();
  try {
    const queryResult = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [user.email]
    );
    console.log(queryResult);
    if (queryResult.length > 0) {
      const storedPassword = queryResult[0].mdp;
      const isAdmin = queryResult[0].admin;
      const id_user = queryResult[0].id;

      const passwordMatch = await bcrypt.compare(user.mdp, storedPassword);

      if (passwordMatch) {
        // Vérifier si un token existe déjà pour cet utilisateur
        const tokenExists = await connection.query(
          "SELECT * FROM user_token WHERE id_user = ?",
          [queryResult[0].id]
        );

        if (tokenExists.length === 0) {
          // Création d'un token aléatoire
          const token = String(
            `${user.email}-${Number(new Date()).toString(36)}`
          );
          // Ajout du token dans la BDD (pour l'associer au user)
          await connection.query(
            "INSERT INTO user_token (id_user, token) VALUES (?, ?)",
            [queryResult[0].id, token]
          );
          res.json({ token, isAdmin, id_user });
        } else {
          res.json({ token: tokenExists[0].token, isAdmin, id_user });
        }
      } else {
        res.status(401).json({ message: "Mot de passe incorrect" });
      }
    } else {
      res
        .status(401)
        .json({ message: "Aucun utilisateur trouvé avec cet email" });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la vérification de l'utilisateur",
    });
  } finally {
    await connection.end();
  }
});

// Fetch pour register

app.post("/api/auth/register", async (req, res) => {
  const user = req.body;
  console.log("register request for user", user);

  const connection = await pool.getConnection();
  try {
    const existingUser = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [user.email]
    );

    if (existingUser.length > 0) {
      res.status(409).json({
        message: "Un utilisateur existe déjà avec cette adresse mail",
      });
    } else {
      const hashedPassword = await bcrypt.hash(user.mdp, 1);

      await connection.query(
        "INSERT INTO users (email, mdp, admin) VALUES (?, ?, 0)",
        [user.email, hashedPassword]
      );

      res.json({ message: "Utilisateur créé avec succès" });
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la création de l'utilisateur",
    });
  } finally {
    await connection.end();
  }
});


