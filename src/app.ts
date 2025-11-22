import fastify, { type FastifyRequest, type FastifyReply } from "fastify"

import ffbbRoutes from "./modules/ffbb/ffbb.routes.js";

const fastifyApp = fastify({
    logger: true,
});

// Routes
fastifyApp.register(ffbbRoutes, { prefix: "/api" });

fastifyApp.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    reply.send("API démarrée et opérationnelle !");
});

export default fastifyApp;