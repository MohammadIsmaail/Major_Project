import { user } from "../../entities/user";
import { createResponse } from "../../helper/createResponse";
import bcrypt from "bcrypt";
import { generateToken } from "../../helper/jwt";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { generatePassword } from "../../helper/ForgetPassword";

const resend = new Resend(process.env.RESEND_API_KEY);


export const userRegister = async (req: any, res: any) => {
  try {
    const { name, email, password, mobile } = req.body;
    const isExist = await user.findOne({ where: { email: email } });
    if (isExist) {
      return createResponse(res, false, 400, "User Already Exist!", [], true);
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const result = await user.save({
        name,
        email,
        mobile,
        password: hashPassword,
      });
      return createResponse(
        res,
        true,
        201,
        "User Register Successfully!",
        result,
        false,
      );
    }
  } catch (err) {
    return createResponse(res, false, 500, "Internal Server Error!", [], true);
  }
};
export const userLogin = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const isExist = await user.findOne({ where: { email } });
    if (!isExist) {
      return createResponse(res, false, 404, "User Not Found!", [], true);
    } else {
      const isMatched = await bcrypt.compare(password, isExist.password);
      if (!isMatched) {
        return createResponse(
          res,
          false,
          404,
          "Please Enter Valid Password!",
          [],
          true,
        );
      } else {
        const payload = { email: isExist.email, id: isExist.id };
        const token = generateToken(payload);
        return createResponse(
          res,
          true,
          200,
          "Login Successful",
          { ...isExist, token },
          false,
        );
      }
    }
  } catch (err) {
    console.log(err);
    return createResponse(res, false, 404, "Internal Server Error!", [], true);
  }
};

export const forgetPassword = async (req: any, res: any) => {
  const { email } = req.body;
  try {
    let isExist = await user.findOne({ where: { email } });
    if (!isExist) {
      return createResponse(res, false, 404, "User Not Found!", [], true);
    } else {
      const newPassword = generatePassword();

      const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px 0;">
<tr>
<td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 5px 20px rgba(0,0,0,0.1);">
  <tr>
    <td align="center" style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:35px;">
      <h1 style="margin:0;color:#ffffff;font-size:28px;">🔐 Password Reset</h1>
      <p style="margin-top:10px;color:#e5e7eb;font-size:15px;">LMS Platform</p>
    </td>
  </tr>
  <tr>
    <td style="padding:40px;">
      <h2 style="margin-top:0;color:#333;">Hello ${isExist.name || "User"},</h2>
      <p style="color:#555;font-size:16px;line-height:1.8;">
        We received a request to reset your password.
        Your new temporary password is shown below.
      </p>
      <div style="margin:30px 0;background:#eef2ff;border:2px dashed #4f46e5;border-radius:10px;padding:20px;text-align:center;">
        <span style="font-size:28px;font-weight:bold;color:#4f46e5;letter-spacing:3px;">
          ${newPassword}
        </span>
      </div>
      <p style="color:#555;font-size:15px;line-height:1.8;">
        Please login using this password and change it immediately from your profile settings to keep your account secure.
      </p>
      <table cellpadding="0" cellspacing="0" align="center" style="margin:35px auto;">
        <tr>
          <td style="background:#4f46e5;padding:14px 35px;border-radius:8px;">
            <a href="http://localhost:5173/login" style="color:#ffffff;text-decoration:none;font-size:16px;font-weight:bold;">
              Login Now
            </a>
          </td>
        </tr>
      </table>
      <hr style="border:none;border-top:1px solid #eeeeee;margin:35px 0;">
      <p style="font-size:14px;color:#777;line-height:1.7;">
        <strong>Didn't request this?</strong><br>
        If you didn't request a password reset, please contact our support team immediately.
      </p>
    </td>
  </tr>
  <tr>
    <td align="center" style="background:#f8fafc;padding:20px;color:#888;font-size:13px;">
      © ${new Date().getFullYear()} LMS Platform<br>
      All Rights Reserved.
    </td>
  </tr>
</table>
</td>
</tr>
</table>
</body>
</html>
      `;

      // 👇 Resend se email bhejo
      try {
        const { data, error } = await resend.emails.send({
          from: `LMS Platform <${process.env.Email}>`,
          to: `${isExist.email}`,
          subject: "Password Reset Successful - LMS Platform",
          html: emailHtml,
        });

        if (error) {
          console.log("Email sending failed:", error);
          return createResponse(res, false, 500, "Failed to send email. Please try again.", [], true);
        }

        console.log("Email sent successfully:", data);
      } catch (mailError: any) {
        console.log("Email sending failed:", mailError);
        return createResponse(res, false, 500, "Failed to send email. Please try again.", [], true);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const password1 = await user.update({ email: isExist.email }, { password: hashedPassword });

      return createResponse(res, true, 200, "Password reset link sent to your email!", { password1, newPassword }, false);
    }
  } catch (err: any) {
    console.log(err);
    return createResponse(res, false, 500, `Internal Server Error! || ${err.message}`, [], true);
  }
};