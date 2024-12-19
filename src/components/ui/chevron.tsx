interface Props {
  position?: "left" | "right" | "top" | "bottom";
  state?: "expanded" | "collapsed";
}

const Chevron = ({ position = "right", state = "expanded" }: Props) => {
  if (
    (position === "left" && state === "expanded") ||
    (position === "right" && state === "collapsed")
  ) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    );
  }
  if (
    (position === "right" && state === "expanded") ||
    (position === "left" && state === "collapsed")
  ) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    );
  }
  if (
    (position === "top" && state === "expanded") ||
    (position === "bottom" && state === "collapsed")
  ) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
      </svg>
    );
  }

  if (
    (position === "bottom" && state === "expanded") ||
    (position === "top" && state === "collapsed")
  ) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }
};

export { Chevron };
