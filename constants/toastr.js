import { toast, Slide } from "react-toastify";

const TOASTR_OPTIONS = {
  position: toast.POSITION.TOP_CENTER,
  transition: Slide,
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true
};

export { TOASTR_OPTIONS };