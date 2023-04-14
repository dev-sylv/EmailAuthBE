import { google } from "googleapis";
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

const GOOGLE_ID: string =
  "199704572461-jv6rghgvgv7a60u1fvdc6noe07ldjrcc.apps.googleusercontent.com";
const GOOGLE_SECRET: string = "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";
const GOOGLE_REFRESHTOKEN: string =
  "1//04D_FN5L_29sBCgYIARAAGAQSNwF-L9IrC2K5DQO5QeZ9XzO0k0xH8GU9PkD_J4UAZ2kPjDDRgc9YdxdYb7gHjOCz0N7-6VHcL00";
const GOOGLE_REDIRECT: string =
  "https://developers.google.com/oauthplayground/";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });

export const companyEmailVerification = async (companies: any) => {
  try {
    const access_token: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "peterotunuya2@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESHTOKEN,
        // accessToken: getToken,
        accessToken: access_token,
      },
    });
    const { RCNumber, name, OTP } = companies;
    const readEJS = path.join(__dirname, "../views/body.ejs");
    const data = await ejs.renderFile(readEJS, { RCNumber, name, OTP });

    const mailOption = {
      from: "verify your Account ",
      to: companies?.email,
      subject: "Account Verification",
      html: data,
    };

    transport.sendMail(mailOption).then(() => {
      console.log("sent");
    });
  } catch (error) {
    console.log(error);
  }
};
