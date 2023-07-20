const validateHuman = async (token: string) => {
  const secret = process.env.NEXT_PUBLIC_CAPTCHA_SECRET_KEY_V2;

  console.log("this ran");

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: "POST",
    }
  );

  const data = await response.json();

  console.log(data, "data from validateHuman");

  return data.success;
};

export default validateHuman;
