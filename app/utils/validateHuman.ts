const validateHuman = async (token: string) => {
  const secret = process.env.NEXT_PUBLIC_CAPTCHA_SECRET_KEY_V2;

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: "POST",
    }
  );

  const data = await response.json();

  return data.success;
};

export default validateHuman;
