import PropTypes from "prop-types";
import { GreenTickIcon, RedTickIcon } from "../Icons/TickIcon";
import { ExitIcon } from "../icons/ExitIcon";

export const Notification = ({ toggle, Toggler, message }) => {
  return (
    <div
      className={
        toggle.isOpen
          ? "fixed flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg top-5 right-5 dark:text-gray-400 dark:bg-gray-800 z-[52] shadow-lg"
          : "hidden"
      }
      role="alert"
    >
      <div
        className={
          toggle.status === "success"
            ? "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
            : "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
        }
      >
        {toggle.status === "success" ? <GreenTickIcon /> : <RedTickIcon />}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-success"
        aria-label="Close"
        onClick={() => Toggler({ isOpen: false, status: "" })}
      >
        <span className="sr-only">Close</span>

        <ExitIcon />
      </button>
    </div>
  );
};

Notification.propTypes = {
  toggle: PropTypes.object,
  Toggler: PropTypes.func,
  message: PropTypes.string,
};
