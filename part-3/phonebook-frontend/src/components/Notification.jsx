const Notification = ({ notification ,colorMessage}) => {
    
  if (notification === "") {
    return "";
  }
  return (
    <div
    className={
        colorMessage === "update"
          ? "update"
          : colorMessage === "error"
          ? "error"
          : "delete"
      }
    >
      {notification}
    </div>
  );
};

export default Notification;
