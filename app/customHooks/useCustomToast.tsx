import { UseToastOptions, useToast } from "@chakra-ui/react";

type ToastStatus = "success" | "error" | "warning" | "info";

const useCustomToast = (): ((
  title: string,
  description?: string,
  status?: ToastStatus
) => void) => {
  const toast = useToast();

  const showToast = (
    title: string,
    description?: string,
    status?: ToastStatus
  ): void => {
    const toastOptions: UseToastOptions = {
      title,
      status,
      description,
      duration: 3000,
      isClosable: true,
      position: "top",
    };

    toast(toastOptions);
  };

  return showToast;
};

export default useCustomToast;
