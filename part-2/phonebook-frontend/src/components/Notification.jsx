const Notification = ({ notification }) => {
  if (notification === "") {
    return "";
  }
  return (
    <div
      style={{
        color: "green",
        fontStyle: "italic",
        fontSize: 24,
        fontWeight: 400,
        background: "#lightgrey",
        border: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 30,
      }}
    >
      {notification}
    </div>
  );
};

export default Notification;
