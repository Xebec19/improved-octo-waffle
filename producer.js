const { Queue } = require("bullmq");

const notificationQueue = new Queue("email-queue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

async function init() {
  for (let i = 0; i < 10; i++) {
    const result = await notificationQueue.add("email to Rohan", {
      email: "rohan@gmail.com",
      subject: "Hello Rohan",
      body: "This is a test email for Rohan",
    });

    console.log("Added job to queue:", result.id);
  }
}

init();
