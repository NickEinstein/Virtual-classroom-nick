import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

const Notification = ({ title, message, type, onRemoval = () => {} }) => {
  store.addNotification({
    title: title || "Notification",
    message: message || "You just prompted me without a message.",
    type: type || "warning", // 'default', 'success', 'info', 'warning'
    container: "top-right", // where to position the notifications
    animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
    animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
    dismiss: {
      showIcon: true,
      duration: 5000,
    },
    onRemoval,
  });
};

export default Notification;
