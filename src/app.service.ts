import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<!DOCTYPE html>
      <html>
      <head>
        <title>University System API</title>
      </head>
      <body>
        <div class="welcome-box">
          <h1>👋 University System API</h1>
          <p>Your API is up and running!</p>
        </div>
      </body>
      </html> `;
  }
}
