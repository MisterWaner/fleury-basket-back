import fastify, { type FastifyRequest, type FastifyReply } from "fastify";
import { request } from "http";

const fastifyApp = fastify({
    logger: true,
});

fastifyApp.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    reply.send("API démarrée et opérationnelle !");
});

export default fastifyApp;