import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter, AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Global exception filters
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // Global prefix
  app.setGlobalPrefix('api/store');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Store Microservice API')
    .setDescription('API para gestión de tienda - productos, pedidos, proveedores y reseñas')
    .setVersion('1.0')
    .addTag('dashboard', 'Estadísticas de la tienda')
    .addTag('products', 'Gestión de productos')
    .addTag('orders', 'Gestión de pedidos')
    .addTag('suppliers', 'Gestión de proveedores')
    .addTag('reviews', 'Gestión de reseñas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3002);
  console.log(`Store microservice running on: http://localhost:3002/api/store`);
  console.log(`Swagger documentation: http://localhost:3002/api/docs`);
}
bootstrap();
