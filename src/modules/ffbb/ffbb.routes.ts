import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { FFBBService } from "./ffbb.service.js";

export default async function ffbbRoutes(app: FastifyInstance) {
    app.get("/ffbb/senior-1/rencontres", async () =>
        FFBBService.getSenior1Rencontres()
    );
    app.get("/ffbb/senior-2/rencontres", async () =>
        FFBBService.getSenior2Rencontres()
    );
}

