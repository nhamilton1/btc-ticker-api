import { server } from "./src/index";
import * as dotenv from "dotenv";

dotenv.config();

const port: number = parseInt(process.env.PORT as string, 10) || 5000;

server.listen(port, () => {
  console.log("listening on " + port);
});