import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 使用 DocumentBuilder来构建Swagger文档的基本信息。
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  //使用 SwaggerModule生成并注册了Swagger文档和UI。
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api', app, document);
  // static 
  app.useStaticAssets('public', { prefix: '/static'});
  await app.listen(3000);
}
bootstrap();
