class Utils:
    def getTemplate(token):
        return  f"""
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Password Recovery</title>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            background-color: #ffffff;
                            color: #333333;
                            margin: 0;
                            padding: 0;
                        }}
                        .container {{
                            max-width: 600px;
                            margin: 20px auto;
                            padding: 20px;
                            border: 1px solid #006C67;
                            border-radius: 10px;
                            background-color: #ffffff;
                        }}
                        h1 {{
                            color: #006C67;
                        }}
                        .content {{
                            margin-top: 20px;
                            color: #333333;
                        }}
                        .cta-button {{
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #F2CF34;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 5px;
                        }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Password Recovery</h1>
                        <div class="content">
                            <p>Your password recovery token is: <strong>{token}</strong></p>
                            <p>If you did not request this, please ignore this email.</p>
                            <p>If you need further assistance, please contact support.</p>
                        </div>
                        <div class="cta-button">
                            <a href="#" style="color: #ffffff; text-decoration: none;">Recover Password</a>
                        </div>
                    </div>
                </body>
                </html>
                """