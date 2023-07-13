import swaggerUi from 'swagger-ui-express';
import YAML from 'js-yaml';
import { Application } from 'express';

const swaggerDocument = YAML.load("./locale.yaml");


export default function setupSwagger(app: Application): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument!));
}
