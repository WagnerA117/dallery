type EmailDataType = {
  name: string;
  emailAddress: string;
  emailContent: string;
};

export const sendEmail = async (data: EmailDataType) =>
  fetch("../api/sendEmail", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
