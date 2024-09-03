export function toBoolean(value?: string): boolean | undefined {
    if (value === undefined) {
        return undefined;
    }
    return value.toLowerCase() === 'true';
}

export function getMailBody({ name, email, message, confirmationLink }) {
    const _body = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Email Title</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }

              h1 {
                  color: #333333;
              }

              p {
                  font-family: cursive;
                  color: #555555;
              }

              a {
                  color: #007BFF;
                  text-decoration: underline;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Your Email</h1>
              <p>Hello <u>${name}</u>,</p>
              <p>Hope you are doing well, <u>${email}</u>.</p>
              <p><strong>${message}</strong></p>
              <p>Please confirm your presence by clicking on this link,
               feel free to contact us if have any feedback <a href="mailto:${confirmationLink}">Confirmation</a>.</p>
              <p>Best regards
          </div>
      </body>
      </html>
      `;
    return _body;
}