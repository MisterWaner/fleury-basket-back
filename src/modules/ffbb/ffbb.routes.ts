import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getTeamData } from "./ffbb.service.js";

export default async function ffbbRoutes(app: FastifyInstance) {
    app.get(
        "/ffbb/team",
        async (request: FastifyRequest, reply: FastifyReply) => {
            const { url } = request.query as { url: string };
            if (!url) {
                return reply
                    .status(400)
                    .send({ error: "Missing 'url' query parameter" });
            }

            try {
                const data = await getTeamData(url);
                return reply.send(data);
            } catch (error) {
                app.log.error(error);
                return reply
                    .status(500)
                    .send({ error: "Failed to fetch team data" });
            }
        }
    );
}
