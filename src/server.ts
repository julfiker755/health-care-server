import { Server } from "http";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    const server: Server = app.listen(config.port, () => {
      console.log(`Health Server is running ${config.port}`);
    });

    // uncaughtException
    process.on("uncaughtException", (error) => {
      if (server) {
        server.close(() => {
          console.info("Server Close");
        });
      }
      process.exit(1);
    });
    // unhandledRejection
    process.on("unhandledRejection", (error) => {
      if (server) {
        server.close(() => {
          console.info("Server Close");
        });
      }
      process.exit(1);
    });
  } catch (err: any) {
    console.log(err);
  }
}

main();
