import React from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { UserContext } from "../context/user";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { height } = React.useContext(UserContext);
  const scrollBackToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      className={height > 100 ? "scroll-btn show-scroll-btn" : "scroll-btn"}
      onClick={scrollBackToTop}
    >
      <FaAngleDoubleUp />
    </button>
  );
};
