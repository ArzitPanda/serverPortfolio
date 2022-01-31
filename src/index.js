import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

import Vonage from "@vonage/server-sdk";

const vonage = new Vonage({
  apiKey: "d25681ac",
  apiSecret: "izR5m6SuGRstCBCk"
});

const app = express();

app.use(cors());
app.use(express.json());
async function sendMail({ from, text }) {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false,
    auth: {
      user: "arzit43.143@gmail.com",
      pass: "M2FSt1bXR0HTqUZr"
    }
  });

  try {
    await transporter.sendMail({
      from: from,
      to: "arzit43.143@gmail.com",
      subject: `message from`,
      text: text
    });
    console.log("sucessfully sent");
  } catch (err) {
    console.log(err);
  }

  try {
    await transporter.sendMail({
      from: "arzit43.143@gmail.com",
      to: from,
      subject: `message from`,
      text: "thank you for visiting my profile,i will def. check your query"
    });
    console.log("sucessfully sent");
  } catch (err) {
    console.log(err);
  }
}

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/sms", (req, res) => {
  const from = "91" + req.body.from;
  const to = "917064332448";
  const text = req.body.text;

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        console.log("Message sent successfully.");
        res.status(201).send("thank you");
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]["error-text"]}`
        );
        res.status(404).send("error");
      }
    }
  });
});

app.post("/", (req, res) => {
  sendMail(req.body);
  res.send("sucessfully sent");
});

app.listen(3000, () => {
  console.log("working perfectly");
});
