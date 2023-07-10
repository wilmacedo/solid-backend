import { server } from "./app";
import { env } from "./env";

server.listen(env.PORT);
server.on("listening", () => {
  console.log("🚀 HTTP Server Running!");
});
