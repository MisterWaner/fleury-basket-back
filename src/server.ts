import { config } from "dotenv";
import fastifyApp from "./app.js";

config();

const PORT = Number(process.env.SERVER_PORT) || 3001;

async function startServer() {
    try {
        await fastifyApp.listen({ port: PORT });
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

startServer();