import { toast, ToastOptions } from "react-toastify";

type AlertType = "success" | "error" | "info" | "warning";

const showAlert = (
  message: string,
  type: AlertType = "info",
  options?: ToastOptions
) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options,
  });
};

export default showAlert;
