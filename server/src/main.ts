import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // middleware
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })

  const config = new DocumentBuilder()
    .setTitle('Issue Tracker API')
    .setDescription('Track issues for your projects, comments, and more.')
    .setVersion('0.1')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  // start server
  await app.listen(3000)
}
bootstrap()
