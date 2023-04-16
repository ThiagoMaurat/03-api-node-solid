import { app } from "@/app";
import { env } from "@/env/index";

app
  .listen({
    host: "0.0.0.0",
    port: env.data.PORT,
  })
  .then(() => console.log("http server is running"));
