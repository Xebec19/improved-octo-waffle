const { Worker } = require("bullmq");

const sendEmail = () =>
  new Promise((res, rej) => setTimeout(() => res(), 5000));

const worker = new Worker(
  "email-queue",
  async (job) => {
    console.group("Processing job: " + job.id);
    console.log("Job data:", job.data);
    console.groupEnd();

    await sendEmail();
    console.log("Email sent to:", job.data.email);
    console.log("Job completed:", job.id);

    return job.id;
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);
