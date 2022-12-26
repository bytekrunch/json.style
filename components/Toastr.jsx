
import { toast } from "react-toastify";
import { TOASTR_OPTIONS } from "../constants/toastr";

const ToastrComponent = ({ message }) => {
  return (
    <div className="flex flex-row items-start justify-start">
      <p className="text-medium text-black dark:text-white">{message}</p>
    </div>
  )
}

const showToastr = message => {
  toast( <ToastrComponent message={message}/>, TOASTR_OPTIONS)
}

const isError = e => e && e.stack && e.message;

const showErrorToastr = error => {
  const errorMessage = isError(error) ? error.message : error;
  toast.error( <ToastrComponent message={errorMessage}/>, TOASTR_OPTIONS)
}

const Toastr = {
  success: showToastr,
  error: showErrorToastr
}

export default Toastr;