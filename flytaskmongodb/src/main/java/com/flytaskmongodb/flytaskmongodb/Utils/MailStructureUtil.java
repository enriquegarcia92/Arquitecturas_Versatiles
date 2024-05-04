package com.flytaskmongodb.flytaskmongodb.Utils;

public class MailStructureUtil {
    public String EmailTemplate(String token) {
        return "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Password Recovery</title>\n" +
                "    <style>\n" +
                "        body {\n" +
                "            font-family: Arial, sans-serif;\n" +
                "            background-color: #ffffff;\n" +
                "            color: #333333;\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "        }\n" +
                "        .container {\n" +
                "            max-width: 600px;\n" +
                "            margin: 20px auto;\n" +
                "            padding: 20px;\n" +
                "            border: 1px solid #006C67;\n" +
                "            border-radius: 10px;\n" +
                "            background-color: #ffffff;\n" +
                "        }\n" +
                "        h1 {\n" +
                "            color: #006C67;\n" +
                "        }\n" +
                "        .content {\n" +
                "            margin-top: 20px;\n" +
                "            color: #333333;\n" +
                "        }\n" +
                "        .cta-button {\n" +
                "            display: inline-block;\n" +
                "            padding: 10px 20px;\n" +
                "            background-color: #F2CF34;\n" +
                "            color: #ffffff;\n" +
                "            text-decoration: none;\n" +
                "            border-radius: 5px;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"container\">\n" +
                "        <h1>Password Recovery</h1>\n" +
                "        <div class=\"content\">\n" +
                "            <p>Your password recovery token is: <strong>"+ token +"</strong></p>\n" +
                "            <p>If you did not request this, please ignore this email.</p>\n" +
                "            <p>If you need further assistance, please contact support.</p>\n" +
                "        </div>\n" +
                "        <div class=\"cta-button\">\n" +
                "            <a href=\"#\" style=\"color: #ffffff; text-decoration: none;\">Recover Password</a>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
    }
}
