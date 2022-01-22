import { NestFactory } from "@nestjs/core";

import { ShortlinkModule } from "./shortlink.module";

async function bootstrap() {
  const app = await NestFactory.create(ShortlinkModule);
  app.listen(process.env.PORT || "3000");
}

bootstrap();
