import { Server } from "http";
import { useServer as wsUseServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import { parse } from "graphql";
import { type Context } from ".keystone/types";

export const extendHttpServer = (
  httpServer: Server,
  commonContext: Context
) => {
  const wss = new WebSocketServer({
    server: httpServer,
    path: "/api/graphql",
  });

  wsUseServer(
    {
      schema: commonContext.graphql.schema,
      onSubscribe: async (ctx, msg) => {
        const context = await commonContext.withRequest(ctx.extra.request);
        return {
          schema: commonContext.graphql.schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: context,
        };
      },
    },
    wss
  );
};
