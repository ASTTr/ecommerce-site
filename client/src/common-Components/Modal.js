import { forwardRef } from "react";

const Container = (
  {
    toggle = "",
    className = "",
    closeOnClick,
    children = "",
    menuClassName = "",
    ignoreListCount = false,
    stopScrolling = false,
    disabled = false,
  },
  ref
) => {
  return (
    <div>
      <div className="modal-container">{children}</div>
    </div>
  );
};

const Header = () => {
  return <div className="modal-header">modal Name</div>;
};

const Footer = () => {
  return (
    <div className="modal-footer" style={{ fontSize: "50px" }}>
      modal Footer
    </div>
  );
};

export const Modal = {
  constainer: Container,
  header: Header,
  footer: Footer,
};
