import "./LogOut.css";

const LogOut = () => {
  return (
    <div className="logout-container">
      <h1>
        Are you sure you want
        <br /> to log out?
      </h1>
      <button className="logout-button">Yes</button>
    </div>
  );
};

export default LogOut;
