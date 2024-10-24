import { toast, ToastOptions } from "react-toastify";

type AlertType = "success" | "error" | "info" | "warning";

const showAlert = (
  message: string,
  type: AlertType = "info",
  options?: ToastOptions
) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    ...options,
  });
};

export default showAlert;
