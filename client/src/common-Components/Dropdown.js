import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

export function OutsideClickHandler({ children, handleClose }) {
  const wrapperRef = useRef(null);

  function handleClickOutside(event) {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target) &&
      handleClose
    )
      handleClose();
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return <div ref={wrapperRef}>{children}</div>;
}

const DropdownItem = ({
  children = "",
  className = "",
  closeList = null,
  ...rest
}) => (
  <div
    id="dropdownItems"
    className={`dropdown-custom-item ${className}`}
    {...rest}
  >
    {children}
  </div>
);

const DropdownMenu = ({ children = "", className = "", ...rest }) => (
  <div className={` dropdown-list ${className}`} {...rest}>
    {children}
  </div>
);

const DropdownContainer = forwardRef(
  (
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
    const [isShow, setIsShow] = useState(false);
    const [isDropUp, setIsDropUp] = useState(false);
    const dropdownRef = useRef(null);
    useImperativeHandle(ref, () => ({
      handleDropDown(value) {
        setIsShow(value);
      },
    }));

    const getParentNode = () => {
      let pnode = dropdownRef.current;
      return pnode;
    };

    const handleDropDownPosition = () => {
      if (disabled) return false;
      setIsShow(!isShow);
      let tb = getParentNode();
      const totalChildren = Array.isArray(children)
        ? children.filter((item) => item !== false).length
        : 1;
      let ddHeight = ignoreListCount ? 280 : totalChildren * 39;
      let ddd = dropdownRef.current.getBoundingClientRect().y - ddHeight;
      setIsDropUp(tb.getBoundingClientRect().y < ddd);
    };
    return (
      <>
        <OutsideClickHandler handleClose={() => setIsShow(false)}>
          <div className="dropdown-custom">
            <div
              className={`cursor-pointer`}
              onClick={() => handleDropDownPosition()}
              ref={dropdownRef}
            >
              {toggle}
            </div>
            {isShow && (
              <div
                className={`${
                  isDropUp ? "dropdown-up" : "dropdown-bottom"
                } dropdown-element-list`}
              >
                {stopScrolling && (
                  <div
                    className="dropdown-bg stop-scrolling"
                    onClick={() => setIsShow(false)}
                  ></div>
                )}
                <div
                  className={`dropdown-custom-menu  dropdown-menu text-left d-block ${menuClassName}`}
                  onClick={() => closeOnClick && setIsShow(false)}
                >
                  {" "}
                  {children}{" "}
                </div>
              </div>
            )}
          </div>
        </OutsideClickHandler>
      </>
    );
  }
);

export const Dropdown = {
  Container: DropdownContainer,
  Item: DropdownItem,
  Menu: DropdownMenu,
};

export default { Dropdown };
