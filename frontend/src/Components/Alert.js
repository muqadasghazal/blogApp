import React from "react";

const Alert = (props) => {
  return (
    <div style={{ height: "54px" , marginTop:"53px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong> {props.alert.message} </strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          />
        </div>
      )}
    </div>
  );
};

export default Alert;
