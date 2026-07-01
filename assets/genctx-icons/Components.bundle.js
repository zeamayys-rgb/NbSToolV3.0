// Components bundle — 2 component(s) materialized from a .fig as one
// self-contained file: no imports/exports; every component is assigned to window below.
// Design tokens / typography still ship separately (fig-tokens.css / fig-typography.css).

// figma node: 2:4928 Icon: Land Cover  (20 variants)
const __venc_IconLandCover = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey_IconLandCover = p => "property1=" + __venc_IconLandCover(p.property1);
function IconLandCover(_p = {}) {
  const props = {
    ..._p,
    property1: _p.property1 ?? "aquaculture"
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(232,244,253)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 66.667,
    height: 6.667,
    viewBox: "0 0 66.667 6.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 6.667,
      top: 36.667,
      width: 66.667,
      height: 6.667,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.447 2.439 C -0.941 2.686 -1.141 3.287 -0.894 3.781 C -0.647 4.275 -0.047 4.475 0.447 4.228 L 0 3.333 L -0.447 2.439 Z M 53.333 3.333 L 52.91 2.427 L 52.898 2.433 L 52.886 2.439 L 53.333 3.333 Z M 65.853 3.915 C 66.174 4.364 66.798 4.468 67.248 4.147 C 67.697 3.826 67.801 3.202 67.48 2.752 L 66.667 3.333 L 65.853 3.915 Z M 0 3.333 L 0.447 4.228 C 9.055 -0.076 17.612 -0.076 26.219 4.228 L 26.667 3.333 L 27.114 2.439 C 17.943 -2.146 8.723 -2.146 -0.447 2.439 L 0 3.333 Z M 26.667 3.333 L 26.219 4.228 C 35.39 8.813 44.61 8.813 53.781 4.228 L 53.333 3.333 L 52.886 2.439 C 44.279 6.743 35.721 6.743 27.114 2.439 L 26.667 3.333 Z M 53.333 3.333 L 53.756 4.24 C 57.033 2.71 59.656 2 61.667 2 C 63.626 2 64.962 2.667 65.853 3.915 L 66.667 3.333 L 67.48 2.752 C 66.149 0.888 64.152 0 61.667 0 C 59.233 0 56.3 0.845 52.91 2.427 L 53.333 3.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 66.667,
    height: 6.667,
    viewBox: "0 0 66.667 6.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 6.667,
      top: 47.333,
      width: 66.667,
      height: 6.667,
      opacity: 0.6,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.447 2.439 C -0.941 2.686 -1.141 3.287 -0.894 3.781 C -0.647 4.275 -0.047 4.475 0.447 4.228 L 0 3.333 L -0.447 2.439 Z M 53.333 3.333 L 52.91 2.427 L 52.898 2.433 L 52.886 2.439 L 53.333 3.333 Z M 65.853 3.915 C 66.174 4.364 66.798 4.468 67.248 4.147 C 67.697 3.826 67.801 3.202 67.48 2.752 L 66.667 3.333 L 65.853 3.915 Z M 0 3.333 L 0.447 4.228 C 9.055 -0.076 17.612 -0.076 26.219 4.228 L 26.667 3.333 L 27.114 2.439 C 17.943 -2.146 8.723 -2.146 -0.447 2.439 L 0 3.333 Z M 26.667 3.333 L 26.219 4.228 C 35.39 8.813 44.61 8.813 53.781 4.228 L 53.333 3.333 L 52.886 2.439 C 44.279 6.743 35.721 6.743 27.114 2.439 L 26.667 3.333 Z M 53.333 3.333 L 53.756 4.24 C 57.033 2.71 59.656 2 61.667 2 C 63.626 2 64.962 2.667 65.853 3.915 L 66.667 3.333 L 67.48 2.752 C 66.149 0.888 64.152 0 61.667 0 C 59.233 0 56.3 0.845 52.91 2.427 L 53.333 3.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 40,
    height: 24,
    viewBox: "0 0 40 24",
    fill: "none",
    style: {
      position: "absolute",
      left: 20,
      top: 25.333,
      width: 40,
      height: 24,
      opacity: 0.55
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 0 L 2.667 -0.75 C 2.137 -0.75 1.633 -0.629 1.184 -0.412 L 1.509 0.264 L 1.835 0.939 C 2.086 0.818 2.367 0.75 2.667 0.75 L 2.667 0 Z M 0.264 1.509 L -0.412 1.184 C -0.629 1.633 -0.75 2.137 -0.75 2.667 L 0 2.667 L 0.75 2.667 C 0.75 2.367 0.818 2.086 0.939 1.835 L 0.264 1.509 Z M 0 2.667 L -0.75 2.667 L -0.75 4.444 L 0 4.444 L 0.75 4.444 L 0.75 2.667 L 0 2.667 Z M 0 7.111 L -0.75 7.111 L -0.75 10.667 L 0 10.667 L 0.75 10.667 L 0.75 7.111 L 0 7.111 Z M 0 13.333 L -0.75 13.333 L -0.75 16.889 L 0 16.889 L 0.75 16.889 L 0.75 13.333 L 0 13.333 Z M 0 19.556 L -0.75 19.556 L -0.75 21.333 L 0 21.333 L 0.75 21.333 L 0.75 19.556 L 0 19.556 Z M 0 21.333 L -0.75 21.333 C -0.75 21.863 -0.629 22.367 -0.412 22.816 L 0.264 22.491 L 0.939 22.165 C 0.818 21.914 0.75 21.633 0.75 21.333 L 0 21.333 Z M 1.509 23.736 L 1.184 24.412 C 1.633 24.629 2.137 24.75 2.667 24.75 L 2.667 24 L 2.667 23.25 C 2.367 23.25 2.086 23.182 1.835 23.061 L 1.509 23.736 Z M 2.667 24 L 2.667 24.75 L 4.648 24.75 L 4.648 24 L 4.648 23.25 L 2.667 23.25 L 2.667 24 Z M 7.619 24 L 7.619 24.75 L 11.581 24.75 L 11.581 24 L 11.581 23.25 L 7.619 23.25 L 7.619 24 Z M 14.552 24 L 14.552 24.75 L 18.514 24.75 L 18.514 24 L 18.514 23.25 L 14.552 23.25 L 14.552 24 Z M 21.486 24 L 21.486 24.75 L 25.448 24.75 L 25.448 24 L 25.448 23.25 L 21.486 23.25 L 21.486 24 Z M 28.419 24 L 28.419 24.75 L 32.381 24.75 L 32.381 24 L 32.381 23.25 L 28.419 23.25 L 28.419 24 Z M 35.352 24 L 35.352 24.75 L 37.333 24.75 L 37.333 24 L 37.333 23.25 L 35.352 23.25 L 35.352 24 Z M 37.333 24 L 37.333 24.75 C 37.863 24.75 38.367 24.629 38.816 24.412 L 38.491 23.736 L 38.165 23.061 C 37.914 23.182 37.633 23.25 37.333 23.25 L 37.333 24 Z M 39.736 22.491 L 40.412 22.816 C 40.629 22.367 40.75 21.863 40.75 21.333 L 40 21.333 L 39.25 21.333 C 39.25 21.633 39.182 21.914 39.061 22.165 L 39.736 22.491 Z M 40 21.333 L 40.75 21.333 L 40.75 19.556 L 40 19.556 L 39.25 19.556 L 39.25 21.333 L 40 21.333 Z M 40 16.889 L 40.75 16.889 L 40.75 13.333 L 40 13.333 L 39.25 13.333 L 39.25 16.889 L 40 16.889 Z M 40 10.667 L 40.75 10.667 L 40.75 7.111 L 40 7.111 L 39.25 7.111 L 39.25 10.667 L 40 10.667 Z M 40 4.444 L 40.75 4.444 L 40.75 2.667 L 40 2.667 L 39.25 2.667 L 39.25 4.444 L 40 4.444 Z M 40 2.667 L 40.75 2.667 C 40.75 2.137 40.629 1.633 40.412 1.184 L 39.736 1.509 L 39.061 1.835 C 39.182 2.086 39.25 2.367 39.25 2.667 L 40 2.667 Z M 38.491 0.264 L 38.816 -0.412 C 38.367 -0.629 37.863 -0.75 37.333 -0.75 L 37.333 0 L 37.333 0.75 C 37.633 0.75 37.914 0.818 38.165 0.939 L 38.491 0.264 Z M 37.333 0 L 37.333 -0.75 L 35.352 -0.75 L 35.352 0 L 35.352 0.75 L 37.333 0.75 L 37.333 0 Z M 32.381 0 L 32.381 -0.75 L 28.419 -0.75 L 28.419 0 L 28.419 0.75 L 32.381 0.75 L 32.381 0 Z M 25.448 0 L 25.448 -0.75 L 21.486 -0.75 L 21.486 0 L 21.486 0.75 L 25.448 0.75 L 25.448 0 Z M 18.514 0 L 18.514 -0.75 L 14.552 -0.75 L 14.552 0 L 14.552 0.75 L 18.514 0.75 L 18.514 0 Z M 11.581 0 L 11.581 -0.75 L 7.619 -0.75 L 7.619 0 L 7.619 0.75 L 11.581 0.75 L 11.581 0 Z M 4.648 0 L 4.648 -0.75 L 2.667 -0.75 L 2.667 0 L 2.667 0.75 L 4.648 0.75 L 4.648 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 8,
    viewBox: "0 0 16 8",
    fill: "none",
    style: {
      position: "absolute",
      left: 32,
      top: 33.333,
      width: 16,
      height: 8,
      opacity: 0.7,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8 8 C 12.418 8 16 6.209 16 4 C 16 1.791 12.418 0 8 0 C 3.582 0 0 1.791 0 4 C 0 6.209 3.582 8 8 8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 8,
    viewBox: "0 0 5.333 8",
    fill: "none",
    style: {
      position: "absolute",
      left: 48,
      top: 33.333,
      width: 5.333,
      height: 8,
      opacity: 0.7,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 4 L 5.333 0 L 5.333 8 L 0 4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2,
    height: 2,
    viewBox: "0 0 2 2",
    fill: "none",
    style: {
      position: "absolute",
      left: 35,
      top: 35,
      width: 2,
      height: 2,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1 2 C 1.552 2 2 1.552 2 1 C 2 0.448 1.552 0 1 0 C 0.448 0 0 0.448 0 1 C 0 1.552 0.448 2 1 2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(245,240,232)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 66.667,
    height: 17.037,
    viewBox: "0 0 66.667 17.037",
    fill: "none",
    style: {
      position: "absolute",
      left: 6.667,
      top: 49.63,
      width: 66.667,
      height: 17.037,
      opacity: 0.6,
      color: "rgb(201,169,110)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 3.704 C 11.111 -0.741 22.222 -1.185 33.333 2.37 C 44.444 5.926 55.556 5.259 66.667 0.37 L 66.667 17.037 L 0 17.037 L 0 3.704 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 66.667,
    height: 17.714,
    viewBox: "0 0 66.667 17.714",
    fill: "none",
    style: {
      position: "absolute",
      left: 6.667,
      top: 55.619,
      width: 66.667,
      height: 17.714,
      opacity: 0.5,
      color: "rgb(184,148,90)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 3.048 C 11.111 -0.508 22.222 -0.952 33.333 1.714 C 44.444 4.381 55.556 3.937 66.667 0.381 L 66.667 17.714 L 0 17.714 L 0 3.048 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 4,
    viewBox: "0 0 6.667 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 20,
      top: 48,
      width: 6.667,
      height: 4,
      opacity: 0.6,
      color: "rgb(160,120,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 4 C 5.174 4 6.667 3.105 6.667 2 C 6.667 0.895 5.174 0 3.333 0 C 1.492 0 0 0.895 0 2 C 0 3.105 1.492 4 3.333 4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 3.333,
    viewBox: "0 0 5.333 3.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 44,
      top: 45,
      width: 5.333,
      height: 3.333,
      opacity: 0.5,
      color: "rgb(160,120,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 3.333 C 4.139 3.333 5.333 2.587 5.333 1.667 C 5.333 0.746 4.139 0 2.667 0 C 1.194 0 0 0.746 0 1.667 C 0 2.587 1.194 3.333 2.667 3.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 3.333,
    viewBox: "0 0 5.333 3.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 60.667,
      top: 51.667,
      width: 5.333,
      height: 3.333,
      opacity: 0.55,
      color: "rgb(160,120,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 3.333 C 4.139 3.333 5.333 2.587 5.333 1.667 C 5.333 0.746 4.139 0 2.667 0 C 1.194 0 0 0.746 0 1.667 C 0 2.587 1.194 3.333 2.667 3.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 45.333,
      top: 16,
      width: 16,
      height: 16,
      opacity: 0.55,
      color: "rgb(232,160,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8 16 C 12.418 16 16 12.418 16 8 C 16 3.582 12.418 0 8 0 C 3.582 0 0 3.582 0 8 C 0 12.418 3.582 16 8 16 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.500,
    height: 3.333,
    viewBox: "-0.750 0 1.500 3.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 53.333,
      top: 8.667,
      width: 1.5,
      height: 3.333,
      opacity: 0.6,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.75 3.333 C -0.75 3.748 -0.414 4.083 0 4.083 C 0.414 4.083 0.75 3.748 0.75 3.333 L 0 3.333 L -0.75 3.333 Z M 0.75 0 C 0.75 -0.414 0.414 -0.75 0 -0.75 C -0.414 -0.75 -0.75 -0.414 -0.75 0 L 0 0 L 0.75 0 Z M 0 3.333 L 0.75 3.333 L 0.75 0 L 0 0 L -0.75 0 L -0.75 3.333 L 0 3.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2.667,
    height: 2.667,
    viewBox: "0 0 2.667 2.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 62,
      top: 12.667,
      width: 2.667,
      height: 2.667,
      opacity: 0.6,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.53 2.136 C -0.823 2.429 -0.823 2.904 -0.53 3.197 C -0.237 3.49 0.237 3.49 0.53 3.197 L 0 2.667 L -0.53 2.136 Z M 3.197 0.53 C 3.49 0.237 3.49 -0.237 3.197 -0.53 C 2.904 -0.823 2.429 -0.823 2.136 -0.53 L 2.667 0 L 3.197 0.53 Z M 0 2.667 L 0.53 3.197 L 3.197 0.53 L 2.667 0 L 2.136 -0.53 L -0.53 2.136 L 0 2.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.333,
    height: 1.500,
    viewBox: "0 -0.750 3.333 1.500",
    fill: "none",
    style: {
      position: "absolute",
      left: 65.333,
      top: 24,
      width: 3.333,
      height: 1.5,
      opacity: 0.6,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -0.75 C -0.414 -0.75 -0.75 -0.414 -0.75 0 C -0.75 0.414 -0.414 0.75 0 0.75 L 0 0 L 0 -0.75 Z M 3.333 0.75 C 3.748 0.75 4.083 0.414 4.083 0 C 4.083 -0.414 3.748 -0.75 3.333 -0.75 L 3.333 0 L 3.333 0.75 Z M 0 0 L 0 0.75 L 3.333 0.75 L 3.333 0 L 3.333 -0.75 L 0 -0.75 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2.667,
    height: 2.667,
    viewBox: "0 0 2.667 2.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 42,
      top: 12.667,
      width: 2.667,
      height: 2.667,
      opacity: 0.6,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.136 3.197 C 2.429 3.49 2.904 3.49 3.197 3.197 C 3.49 2.904 3.49 2.429 3.197 2.136 L 2.667 2.667 L 2.136 3.197 Z M 0.53 -0.53 C 0.237 -0.823 -0.237 -0.823 -0.53 -0.53 C -0.823 -0.237 -0.823 0.237 -0.53 0.53 L 0 0 L 0.53 -0.53 Z M 2.667 2.667 L 3.197 2.136 L 0.53 -0.53 L 0 0 L -0.53 0.53 L 2.136 3.197 L 2.667 2.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body2 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(238,246,228)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 64,
    height: 5.333,
    viewBox: "0 0 64 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 8,
      top: 36,
      width: 64,
      height: 5.333,
      opacity: 0.35,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 62.667 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 L 0 4 C 0 4.736 0.597 5.333 1.333 5.333 L 62.667 5.333 C 63.403 5.333 64 4.736 64 4 L 64 1.333 C 64 0.597 63.403 0 62.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 64,
    height: 5.333,
    viewBox: "0 0 64 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 8,
      top: 44,
      width: 64,
      height: 5.333,
      opacity: 0.35,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 62.667 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 L 0 4 C 0 4.736 0.597 5.333 1.333 5.333 L 62.667 5.333 C 63.403 5.333 64 4.736 64 4 L 64 1.333 C 64 0.597 63.403 0 62.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 64,
    height: 5.333,
    viewBox: "0 0 64 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 8,
      top: 52,
      width: 64,
      height: 5.333,
      opacity: 0.35,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 62.667 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 L 0 4 C 0 4.736 0.597 5.333 1.333 5.333 L 62.667 5.333 C 63.403 5.333 64 4.736 64 4 L 64 1.333 C 64 0.597 63.403 0 62.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 14.667,
      top: 22.667,
      width: 46.667,
      height: 13.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 1.800,
    height: 12,
    viewBox: "-0.900 0 1.800 12",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 1.333,
      width: 1.7999999523162842,
      height: 12,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.9 12 C -0.9 12.497 -0.497 12.9 0 12.9 C 0.497 12.9 0.9 12.497 0.9 12 L 0 12 L -0.9 12 Z M 0.9 0 C 0.9 -0.497 0.497 -0.9 0 -0.9 C -0.497 -0.9 -0.9 -0.497 -0.9 0 L 0 0 L 0.9 0 Z M 0 12 L 0.9 12 L 0.9 0 L 0 0 L -0.9 0 L -0.9 12 L 0 12 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.800,
    height: 10.667,
    viewBox: "-0.900 0 1.800 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 9.333,
      top: 2.667,
      width: 1.7999999523162842,
      height: 10.667,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.9 10.667 C -0.9 11.164 -0.497 11.567 0 11.567 C 0.497 11.567 0.9 11.164 0.9 10.667 L 0 10.667 L -0.9 10.667 Z M 0.9 0 C 0.9 -0.497 0.497 -0.9 0 -0.9 C -0.497 -0.9 -0.9 -0.497 -0.9 0 L 0 0 L 0.9 0 Z M 0 10.667 L 0.9 10.667 L 0.9 0 L 0 0 L -0.9 0 L -0.9 10.667 L 0 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.800,
    height: 13.333,
    viewBox: "-0.900 0 1.800 13.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 18.667,
      top: 0,
      width: 1.7999999523162842,
      height: 13.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.9 13.333 C -0.9 13.83 -0.497 14.233 0 14.233 C 0.497 14.233 0.9 13.83 0.9 13.333 L 0 13.333 L -0.9 13.333 Z M 0.9 0 C 0.9 -0.497 0.497 -0.9 0 -0.9 C -0.497 -0.9 -0.9 -0.497 -0.9 0 L 0 0 L 0.9 0 Z M 0 13.333 L 0.9 13.333 L 0.9 0 L 0 0 L -0.9 0 L -0.9 13.333 L 0 13.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.800,
    height: 12,
    viewBox: "-0.900 0 1.800 12",
    fill: "none",
    style: {
      position: "absolute",
      left: 28,
      top: 1.333,
      width: 1.7999999523162842,
      height: 12,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.9 12 C -0.9 12.497 -0.497 12.9 0 12.9 C 0.497 12.9 0.9 12.497 0.9 12 L 0 12 L -0.9 12 Z M 0.9 0 C 0.9 -0.497 0.497 -0.9 0 -0.9 C -0.497 -0.9 -0.9 -0.497 -0.9 0 L 0 0 L 0.9 0 Z M 0 12 L 0.9 12 L 0.9 0 L 0 0 L -0.9 0 L -0.9 12 L 0 12 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.800,
    height: 10.667,
    viewBox: "-0.900 0 1.800 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 37.333,
      top: 2.667,
      width: 1.7999999523162842,
      height: 10.667,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.9 10.667 C -0.9 11.164 -0.497 11.567 0 11.567 C 0.497 11.567 0.9 11.164 0.9 10.667 L 0 10.667 L -0.9 10.667 Z M 0.9 0 C 0.9 -0.497 0.497 -0.9 0 -0.9 C -0.497 -0.9 -0.9 -0.497 -0.9 0 L 0 0 L 0.9 0 Z M 0 10.667 L 0.9 10.667 L 0.9 0 L 0 0 L -0.9 0 L -0.9 10.667 L 0 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.800,
    height: 12,
    viewBox: "-0.900 0 1.800 12",
    fill: "none",
    style: {
      position: "absolute",
      left: 46.667,
      top: 1.333,
      width: 1.7999999523162842,
      height: 12,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.9 12 C -0.9 12.497 -0.497 12.9 0 12.9 C 0.497 12.9 0.9 12.497 0.9 12 L 0 12 L -0.9 12 Z M 0.9 0 C 0.9 -0.497 0.497 -0.9 0 -0.9 C -0.497 -0.9 -0.9 -0.497 -0.9 0 L 0 0 L 0.9 0 Z M 0 12 L 0.9 12 L 0.9 0 L 0 0 L -0.9 0 L -0.9 12 L 0 12 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 11.333,
      top: 16,
      width: 53.334,
      height: 12,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 9.333,
    viewBox: "0 0 6.667 9.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 1.333,
      width: 6.667,
      height: 9.333,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 9.333 C 5.174 9.333 6.667 7.244 6.667 4.667 C 6.667 2.089 5.174 0 3.333 0 C 1.492 0 0 2.089 0 4.667 C 0 7.244 1.492 9.333 3.333 9.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 9.333,
    viewBox: "0 0 6.667 9.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 9.333,
      top: 2.667,
      width: 6.667,
      height: 9.333,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 9.333 C 5.174 9.333 6.667 7.244 6.667 4.667 C 6.667 2.089 5.174 0 3.333 0 C 1.492 0 0 2.089 0 4.667 C 0 7.244 1.492 9.333 3.333 9.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 9.333,
    viewBox: "0 0 6.667 9.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 18.667,
      top: 0,
      width: 6.667,
      height: 9.333,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 9.333 C 5.174 9.333 6.667 7.244 6.667 4.667 C 6.667 2.089 5.174 0 3.333 0 C 1.492 0 0 2.089 0 4.667 C 0 7.244 1.492 9.333 3.333 9.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 9.333,
    viewBox: "0 0 6.667 9.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 28,
      top: 1.333,
      width: 6.667,
      height: 9.333,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 9.333 C 5.174 9.333 6.667 7.244 6.667 4.667 C 6.667 2.089 5.174 0 3.333 0 C 1.492 0 0 2.089 0 4.667 C 0 7.244 1.492 9.333 3.333 9.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 9.333,
    viewBox: "0 0 6.667 9.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 37.333,
      top: 2.667,
      width: 6.667,
      height: 9.333,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 9.333 C 5.174 9.333 6.667 7.244 6.667 4.667 C 6.667 2.089 5.174 0 3.333 0 C 1.492 0 0 2.089 0 4.667 C 0 7.244 1.492 9.333 3.333 9.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 9.333,
    viewBox: "0 0 6.667 9.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 46.667,
      top: 1.333,
      width: 6.667,
      height: 9.333,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 9.333 C 5.174 9.333 6.667 7.244 6.667 4.667 C 6.667 2.089 5.174 0 3.333 0 C 1.492 0 0 2.089 0 4.667 C 0 7.244 1.492 9.333 3.333 9.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))));
  const __body3 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(232,244,224)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 12,
      top: 32,
      width: 56,
      height: 30.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 13.333,
    height: 13.333,
    viewBox: "0 0 13.333 13.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 2.667,
      width: 13.333,
      height: 13.333,
      color: "rgb(45,122,46)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.667 0 L 13.333 13.333 L 0 13.333 L 6.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 14.667,
    viewBox: "0 0 16 14.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 20,
      top: 0,
      width: 16,
      height: 14.667,
      color: "rgb(45,122,46)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8 0 L 16 14.667 L 0 14.667 L 8 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 13.333,
    height: 13.333,
    viewBox: "0 0 13.333 13.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 42.667,
      top: 2.667,
      width: 13.333,
      height: 13.333,
      color: "rgb(45,122,46)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.667 0 L 13.333 13.333 L 0 13.333 L 6.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.667,
    height: 10.667,
    viewBox: "0 0 10.667 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 12,
      top: 20,
      width: 10.667,
      height: 10.667,
      opacity: 0.55,
      color: "rgb(45,122,46)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.333 0 L 10.667 10.667 L 0 10.667 L 5.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.667,
    height: 10.667,
    viewBox: "0 0 10.667 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 33.333,
      top: 20,
      width: 10.667,
      height: 10.667,
      opacity: 0.55,
      color: "rgb(45,122,46)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.333 0 L 10.667 10.667 L 0 10.667 L 5.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 18.667,
      top: 46.667,
      width: 42.667,
      height: 8,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 2,
    height: 6.667,
    viewBox: "-1 0 2 6.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 1.333,
      width: 2,
      height: 6.667,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1 0 C 1 -0.552 0.552 -1 0 -1 C -0.552 -1 -1 -0.552 -1 0 L 0 0 L 1 0 Z M -1 6.667 C -1 7.219 -0.552 7.667 0 7.667 C 0.552 7.667 1 7.219 1 6.667 L 0 6.667 L -1 6.667 Z M 0 0 L -1 0 L -1 6.667 L 0 6.667 L 1 6.667 L 1 0 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2,
    height: 8,
    viewBox: "-1 0 2 8",
    fill: "none",
    style: {
      position: "absolute",
      left: 21.333,
      top: 0,
      width: 2,
      height: 8,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1 0 C 1 -0.552 0.552 -1 0 -1 C -0.552 -1 -1 -0.552 -1 0 L 0 0 L 1 0 Z M -1 8 C -1 8.552 -0.552 9 0 9 C 0.552 9 1 8.552 1 8 L 0 8 L -1 8 Z M 0 0 L -1 0 L -1 8 L 0 8 L 1 8 L 1 0 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2,
    height: 6.667,
    viewBox: "-1 0 2 6.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 42.667,
      top: 1.333,
      width: 2,
      height: 6.667,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1 0 C 1 -0.552 0.552 -1 0 -1 C -0.552 -1 -1 -0.552 -1 0 L 0 0 L 1 0 Z M -1 6.667 C -1 7.219 -0.552 7.667 0 7.667 C 0.552 7.667 1 7.219 1 6.667 L 0 6.667 L -1 6.667 Z M 0 0 L -1 0 L -1 6.667 L 0 6.667 L 1 6.667 L 1 0 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))));
  const __body4 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(240,248,232)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 40,
    height: 40,
    viewBox: "0 0 40 40",
    fill: "none",
    style: {
      position: "absolute",
      left: 20,
      top: 14.667,
      width: 40,
      height: 40,
      opacity: 0.85,
      color: "rgb(90,158,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 20 40 C 31.046 40 40 31.046 40 20 C 40 8.954 31.046 0 20 0 C 8.954 0 0 8.954 0 20 C 0 31.046 8.954 40 20 40 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 13.333,
    height: 13.333,
    viewBox: "0 0 13.333 13.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 25.333,
      top: 22.667,
      width: 13.333,
      height: 13.333,
      opacity: 0.5,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.667 13.333 C 10.349 13.333 13.333 10.349 13.333 6.667 C 13.333 2.985 10.349 0 6.667 0 C 2.985 0 0 2.985 0 6.667 C 0 10.349 2.985 13.333 6.667 13.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.667,
    height: 10.667,
    viewBox: "0 0 10.667 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 40,
      top: 21.333,
      width: 10.667,
      height: 10.667,
      opacity: 0.45,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.333 10.667 C 8.279 10.667 10.667 8.279 10.667 5.333 C 10.667 2.388 8.279 0 5.333 0 C 2.388 0 0 2.388 0 5.333 C 0 8.279 2.388 10.667 5.333 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 6.667,
    viewBox: "0 0 6.667 6.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 44.667,
      top: 35.333,
      width: 6.667,
      height: 6.667,
      opacity: 0.45,
      color: "rgb(224,160,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 6.667 C 5.174 6.667 6.667 5.174 6.667 3.333 C 6.667 1.492 5.174 0 3.333 0 C 1.492 0 0 1.492 0 3.333 C 0 5.174 1.492 6.667 3.333 6.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 5.333,
    viewBox: "0 0 5.333 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 26.667,
      top: 37.333,
      width: 5.333,
      height: 5.333,
      opacity: 0.35,
      color: "rgb(224,120,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 5.333 C 4.139 5.333 5.333 4.139 5.333 2.667 C 5.333 1.194 4.139 0 2.667 0 C 1.194 0 0 1.194 0 2.667 C 0 4.139 1.194 5.333 2.667 5.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8,
    height: 12,
    viewBox: "0 0 8 12",
    fill: "none",
    style: {
      position: "absolute",
      left: 36,
      top: 53.333,
      width: 8,
      height: 12,
      opacity: 0.75,
      color: "rgb(107,61,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6 0 L 2 0 C 0.895 0 0 0.895 0 2 L 0 10 C 0 11.105 0.895 12 2 12 L 6 12 C 7.105 12 8 11.105 8 10 L 8 2 C 8 0.895 7.105 0 6 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 40,
    height: 2.667,
    viewBox: "0 0 40 2.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 20,
      top: 64.667,
      width: 40,
      height: 2.667,
      opacity: 0.3,
      color: "rgb(90,158,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 38.667 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 C 0 2.07 0.597 2.667 1.333 2.667 L 38.667 2.667 C 39.403 2.667 40 2.07 40 1.333 C 40 0.597 39.403 0 38.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body5 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(230,242,230)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 37.333,
    height: 25.333,
    viewBox: "0 0 37.333 25.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 21.333,
      top: 12,
      width: 37.333,
      height: 25.333,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 18.667 0 L 37.333 25.333 L 0 25.333 L 18.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 42.667,
    height: 26.667,
    viewBox: "0 0 42.667 26.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 18.667,
      top: 24,
      width: 42.667,
      height: 26.667,
      opacity: 0.8,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.333 0 L 42.667 26.667 L 0 26.667 L 21.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 48,
    height: 28,
    viewBox: "0 0 48 28",
    fill: "none",
    style: {
      position: "absolute",
      left: 16,
      top: 36,
      width: 48,
      height: 28,
      opacity: 0.65,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 24 0 L 48 28 L 0 28 L 24 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 21.333,
    height: 0.800,
    viewBox: "0 -0.400 21.333 0.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 29.333,
      top: 28,
      width: 21.333,
      height: 0.800000011920929,
      opacity: 0.5,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 0 L 0 0.4 L 21.333 0.4 L 21.333 0 L 21.333 -0.4 L 0 -0.4 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 29.333,
    height: 0.800,
    viewBox: "0 -0.400 29.333 0.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 25.333,
      top: 41.333,
      width: 29.333,
      height: 0.800000011920929,
      opacity: 0.4,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 0 L 0 0.4 L 29.333 0.4 L 29.333 0 L 29.333 -0.4 L 0 -0.4 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 6.667,
    viewBox: "0 0 6.667 6.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 36.667,
      top: 64,
      width: 6.667,
      height: 6.667,
      opacity: 0.5,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.333 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 L 0 5.333 C 0 6.07 0.597 6.667 1.333 6.667 L 5.333 6.667 C 6.07 6.667 6.667 6.07 6.667 5.333 L 6.667 1.333 C 6.667 0.597 6.07 0 5.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body6 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(224,238,248)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 34,
    height: 36,
    viewBox: "0 0 34 36",
    fill: "none",
    style: {
      position: "absolute",
      left: 7,
      top: 8,
      width: 34,
      height: 36,
      opacity: 0.85,
      color: "rgb(45,107,50)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 17 0 L 34 36 L 0 36 L 17 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 10.667,
    viewBox: "0 0 5.333 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 20.667,
      top: 44,
      width: 5.333,
      height: 10.667,
      opacity: 0.6,
      color: "rgb(45,107,50)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 L 0 9.333 C 0 10.07 0.597 10.667 1.333 10.667 L 4 10.667 C 4.736 10.667 5.333 10.07 5.333 9.333 L 5.333 1.333 C 5.333 0.597 4.736 0 4 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 25.333,
    height: 26.667,
    viewBox: "0 0 25.333 26.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 44,
      top: 16,
      width: 25.333,
      height: 26.667,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 12.667 0 L 25.333 26.667 L 0 26.667 L 12.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 13.333,
    viewBox: "0 0 5.333 13.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 54,
      top: 42.667,
      width: 5.333,
      height: 13.333,
      opacity: 0.6,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 L 0 12 C 0 12.736 0.597 13.333 1.333 13.333 L 4 13.333 C 4.736 13.333 5.333 12.736 5.333 12 L 5.333 1.333 C 5.333 0.597 4.736 0 4 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 69.333,
    height: 16.056,
    viewBox: "0 0 69.333 16.056",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 50.611,
      width: 69.333,
      height: 16.056,
      opacity: 0.3,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 2.722 C 8.889 -0.833 17.778 -0.833 26.667 2.722 C 35.556 6.278 44.444 6.278 53.333 2.722 C 60.444 -0.389 65.778 -0.833 69.333 1.389 L 69.333 16.056 L 0 16.056 L 0 2.722 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 68,
    height: 4.733,
    viewBox: "0 0 68 4.733",
    fill: "none",
    style: {
      position: "absolute",
      left: 6.667,
      top: 52.267,
      width: 68,
      height: 4.733,
      opacity: 0.6,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.248 1.692 C -0.639 1.829 -0.845 2.257 -0.708 2.648 C -0.571 3.039 -0.143 3.245 0.248 3.108 L 0 2.4 L -0.248 1.692 Z M 53.333 2.4 L 53.581 3.108 L 53.605 3.099 L 53.629 3.089 L 53.333 2.4 Z M 67.665 1.737 C 68.035 1.923 68.486 1.773 68.671 1.402 C 68.856 1.032 68.706 0.581 68.335 0.396 L 68 1.067 L 67.665 1.737 Z M 0 2.4 L 0.248 3.108 C 8.976 0.053 17.69 0.053 26.419 3.108 L 26.667 2.4 L 26.914 1.692 C 17.865 -1.475 8.802 -1.475 -0.248 1.692 L 0 2.4 Z M 26.667 2.4 L 26.419 3.108 C 35.468 6.275 44.532 6.275 53.581 3.108 L 53.333 2.4 L 53.086 1.692 C 44.357 4.747 35.643 4.747 26.914 1.692 L 26.667 2.4 Z M 53.333 2.4 L 53.629 3.089 C 59.785 0.451 64.409 0.11 67.665 1.737 L 68 1.067 L 68.335 0.396 C 64.48 -1.532 59.326 -0.984 53.038 1.711 L 53.333 2.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 68,
    height: 4.733,
    viewBox: "0 0 68 4.733",
    fill: "none",
    style: {
      position: "absolute",
      left: 6.667,
      top: 57.6,
      width: 68,
      height: 4.733,
      opacity: 0.4,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.198 1.834 C -0.511 1.943 -0.676 2.285 -0.566 2.598 C -0.457 2.911 -0.115 3.076 0.198 2.966 L 0 2.4 L -0.198 1.834 Z M 53.333 2.4 L 53.532 2.966 L 53.551 2.96 L 53.57 2.951 L 53.333 2.4 Z M 67.732 1.603 C 68.028 1.752 68.388 1.631 68.537 1.335 C 68.685 1.039 68.565 0.678 68.268 0.53 L 68 1.067 L 67.732 1.603 Z M 0 2.4 L 0.198 2.966 C 8.959 -0.1 17.708 -0.1 26.468 2.966 L 26.667 2.4 L 26.865 1.834 C 17.848 -1.322 8.819 -1.322 -0.198 1.834 L 0 2.4 Z M 26.667 2.4 L 26.468 2.966 C 35.486 6.122 44.514 6.122 53.532 2.966 L 53.333 2.4 L 53.135 1.834 C 44.375 4.9 35.625 4.9 26.865 1.834 L 26.667 2.4 Z M 53.333 2.4 L 53.57 2.951 C 59.739 0.307 64.416 -0.054 67.732 1.603 L 68 1.067 L 68.268 0.53 C 64.473 -1.368 59.372 -0.841 53.097 1.849 L 53.333 2.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body7 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(228,239,228)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 8.667,
      top: 30.667,
      width: 16,
      height: 16,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8 0 L 16 16 L 0 16 L 8 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 17.333,
    viewBox: "0 0 16 17.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 32,
      top: 28,
      width: 16,
      height: 17.333,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8 0 L 16 17.333 L 0 17.333 L 8 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 55.333,
      top: 30.667,
      width: 16,
      height: 16,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8 0 L 16 16 L 0 16 L 8 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 14.667,
      top: 45.333,
      width: 50.667,
      height: 8,
      opacity: 0.5,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 6.667,
    viewBox: "0 0 4 6.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 1.333,
      width: 4,
      height: 6.667,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 0 L 0.667 0 C 0.298 0 0 0.298 0 0.667 L 0 6 C 0 6.368 0.298 6.667 0.667 6.667 L 3.333 6.667 C 3.702 6.667 4 6.368 4 6 L 4 0.667 C 4 0.298 3.702 0 3.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 8,
    viewBox: "0 0 4 8",
    fill: "none",
    style: {
      position: "absolute",
      left: 23.333,
      top: 0,
      width: 4,
      height: 8,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 0 L 0.667 0 C 0.298 0 0 0.298 0 0.667 L 0 7.333 C 0 7.702 0.298 8 0.667 8 L 3.333 8 C 3.702 8 4 7.702 4 7.333 L 4 0.667 C 4 0.298 3.702 0 3.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 6.667,
    viewBox: "0 0 4 6.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 46.667,
      top: 1.333,
      width: 4,
      height: 6.667,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 0 L 0.667 0 C 0.298 0 0 0.298 0 0.667 L 0 6 C 0 6.368 0.298 6.667 0.667 6.667 L 3.333 6.667 C 3.702 6.667 4 6.368 4 6 L 4 0.667 C 4 0.298 3.702 0 3.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 12,
    height: 10.667,
    viewBox: "0 0 12 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 22,
      top: 50.667,
      width: 12,
      height: 10.667,
      opacity: 0.6,
      color: "rgb(45,107,50)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6 0 L 12 10.667 L 0 10.667 L 6 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 12,
    height: 10.667,
    viewBox: "0 0 12 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 46,
      top: 50.667,
      width: 12,
      height: 10.667,
      opacity: 0.6,
      color: "rgb(45,107,50)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6 0 L 12 10.667 L 0 10.667 L 6 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body8 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(240,251,224)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 69.333,
    height: 26.667,
    viewBox: "0 0 69.333 26.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 43.333,
      width: 69.333,
      height: 26.667,
      opacity: 0.4,
      color: "rgb(122,186,46)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 10 C 9.778 1.111 21.333 -1.111 34.667 3.333 C 48 7.778 59.556 6.667 69.333 0 L 69.333 26.667 L 0 26.667 L 0 10 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 69.333,
    height: 19.333,
    viewBox: "0 0 69.333 19.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 50.667,
      width: 69.333,
      height: 19.333,
      opacity: 0.35,
      color: "rgb(90,158,26)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 9.333 C 9.778 1.333 21.333 -0.889 34.667 2.667 C 48 6.222 59.556 5.333 69.333 0 L 69.333 19.333 L 0 19.333 L 0 9.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 11.333,
      top: 33.333,
      width: 58,
      height: 18.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 2,
    height: 10.667,
    viewBox: "0 0 2 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 8,
      width: 2,
      height: 10.667,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.115 10.833 C 1.207 11.321 1.677 11.643 2.166 11.551 C 2.654 11.46 2.976 10.989 2.885 10.501 L 2 10.667 L 1.115 10.833 Z M 0.885 -0.166 C 0.793 -0.654 0.323 -0.976 -0.166 -0.885 C -0.654 -0.793 -0.976 -0.323 -0.885 0.166 L 0 0 L 0.885 -0.166 Z M 2 10.667 L 2.885 10.501 L 0.885 -0.166 L 0 0 L -0.885 0.166 L 1.115 10.833 L 2 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.800,
    height: 9.333,
    viewBox: "-0.900 0 1.800 9.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 6,
      top: 9.333,
      width: 1.7999999523162842,
      height: 9.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.9 9.333 C -0.9 9.83 -0.497 10.233 0 10.233 C 0.497 10.233 0.9 9.83 0.9 9.333 L 0 9.333 L -0.9 9.333 Z M 0.9 0 C 0.9 -0.497 0.497 -0.9 0 -0.9 C -0.497 -0.9 -0.9 -0.497 -0.9 0 L 0 0 L 0.9 0 Z M 0 9.333 L 0.9 9.333 L 0.9 0 L 0 0 L -0.9 0 L -0.9 9.333 L 0 9.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2,
    height: 9.333,
    viewBox: "0 0 2 9.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 12,
      top: 2.667,
      width: 2,
      height: 9.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.12 9.522 C 1.224 10.008 1.703 10.318 2.189 10.213 C 2.675 10.109 2.984 9.631 2.88 9.145 L 2 9.333 L 1.12 9.522 Z M 0.88 -0.189 C 0.776 -0.675 0.297 -0.984 -0.189 -0.88 C -0.675 -0.776 -0.984 -0.297 -0.88 0.189 L 0 0 L 0.88 -0.189 Z M 2 9.333 L 2.88 9.145 L 0.88 -0.189 L 0 0 L -0.88 0.189 L 1.12 9.522 L 2 9.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.800,
    height: 8,
    viewBox: "-0.900 0 1.800 8",
    fill: "none",
    style: {
      position: "absolute",
      left: 18,
      top: 4,
      width: 1.7999999523162842,
      height: 8,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.9 8 C -0.9 8.497 -0.497 8.9 0 8.9 C 0.497 8.9 0.9 8.497 0.9 8 L 0 8 L -0.9 8 Z M 0.9 0 C 0.9 -0.497 0.497 -0.9 0 -0.9 C -0.497 -0.9 -0.9 -0.497 -0.9 0 L 0 0 L 0.9 0 Z M 0 8 L 0.9 8 L 0.9 0 L 0 0 L -0.9 0 L -0.9 8 L 0 8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2,
    height: 9.333,
    viewBox: "0 0 2 9.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 26.667,
      top: 5.333,
      width: 2,
      height: 9.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.12 9.522 C 1.224 10.008 1.703 10.318 2.189 10.213 C 2.675 10.109 2.984 9.631 2.88 9.145 L 2 9.333 L 1.12 9.522 Z M 0.88 -0.189 C 0.776 -0.675 0.297 -0.984 -0.189 -0.88 C -0.675 -0.776 -0.984 -0.297 -0.88 0.189 L 0 0 L 0.88 -0.189 Z M 2 9.333 L 2.88 9.145 L 0.88 -0.189 L 0 0 L -0.88 0.189 L 1.12 9.522 L 2 9.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.800,
    height: 8,
    viewBox: "-0.900 0 1.800 8",
    fill: "none",
    style: {
      position: "absolute",
      left: 32.667,
      top: 6.667,
      width: 1.7999999523162842,
      height: 8,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.9 8 C -0.9 8.497 -0.497 8.9 0 8.9 C 0.497 8.9 0.9 8.497 0.9 8 L 0 8 L -0.9 8 Z M 0.9 0 C 0.9 -0.497 0.497 -0.9 0 -0.9 C -0.497 -0.9 -0.9 -0.497 -0.9 0 L 0 0 L 0.9 0 Z M 0 8 L 0.9 8 L 0.9 0 L 0 0 L -0.9 0 L -0.9 8 L 0 8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.333,
    height: 9.333,
    viewBox: "0 0 1.333 9.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 40.667,
      top: 2.667,
      width: 1.333,
      height: 9.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.442 9.461 C 0.513 9.953 0.969 10.295 1.461 10.224 C 1.953 10.154 2.295 9.698 2.224 9.206 L 1.333 9.333 L 0.442 9.461 Z M 0.891 -0.127 C 0.821 -0.619 0.365 -0.961 -0.127 -0.891 C -0.619 -0.821 -0.961 -0.365 -0.891 0.127 L 0 0 L 0.891 -0.127 Z M 1.333 9.333 L 2.224 9.206 L 0.891 -0.127 L 0 0 L -0.891 0.127 L 0.442 9.461 L 1.333 9.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.800,
    height: 8,
    viewBox: "-0.900 0 1.800 8",
    fill: "none",
    style: {
      position: "absolute",
      left: 46,
      top: 4,
      width: 1.7999999523162842,
      height: 8,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.9 8 C -0.9 8.497 -0.497 8.9 0 8.9 C 0.497 8.9 0.9 8.497 0.9 8 L 0 8 L -0.9 8 Z M 0.9 0 C 0.9 -0.497 0.497 -0.9 0 -0.9 C -0.497 -0.9 -0.9 -0.497 -0.9 0 L 0 0 L 0.9 0 Z M 0 8 L 0.9 8 L 0.9 0 L 0 0 L -0.9 0 L -0.9 8 L 0 8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.333,
    height: 9.333,
    viewBox: "0 0 1.333 9.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 52.667,
      top: 0,
      width: 1.333,
      height: 9.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.442 9.461 C 0.513 9.953 0.969 10.295 1.461 10.224 C 1.953 10.154 2.295 9.698 2.224 9.206 L 1.333 9.333 L 0.442 9.461 Z M 0.891 -0.127 C 0.821 -0.619 0.365 -0.961 -0.127 -0.891 C -0.619 -0.821 -0.961 -0.365 -0.891 0.127 L 0 0 L 0.891 -0.127 Z M 1.333 9.333 L 2.224 9.206 L 0.891 -0.127 L 0 0 L -0.891 0.127 L 0.442 9.461 L 1.333 9.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.800,
    height: 8.667,
    viewBox: "-0.900 0 1.800 8.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 58,
      top: 1.333,
      width: 1.7999999523162842,
      height: 8.667,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.9 8.667 C -0.9 9.164 -0.497 9.567 0 9.567 C 0.497 9.567 0.9 9.164 0.9 8.667 L 0 8.667 L -0.9 8.667 Z M 0.9 0 C 0.9 -0.497 0.497 -0.9 0 -0.9 C -0.497 -0.9 -0.9 -0.497 -0.9 0 L 0 0 L 0.9 0 Z M 0 8.667 L 0.9 8.667 L 0.9 0 L 0 0 L -0.9 0 L -0.9 8.667 L 0 8.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))));
  const __body9 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(220,238,248)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 37.333,
    height: 24,
    viewBox: "0 0 37.333 24",
    fill: "none",
    style: {
      position: "absolute",
      left: 21.333,
      top: 12,
      width: 37.333,
      height: 24,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 18.667 24 C 28.976 24 37.333 18.627 37.333 12 C 37.333 5.373 28.976 0 18.667 0 C 8.357 0 0 5.373 0 12 C 0 18.627 8.357 24 18.667 24 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 21.333,
    height: 16,
    viewBox: "0 0 21.333 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 17.333,
      top: 21.333,
      width: 21.333,
      height: 16,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.667 16 C 16.558 16 21.333 12.418 21.333 8 C 21.333 3.582 16.558 0 10.667 0 C 4.776 0 0 3.582 0 8 C 0 12.418 4.776 16 10.667 16 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 21.333,
    height: 16,
    viewBox: "0 0 21.333 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 41.333,
      top: 21.333,
      width: 21.333,
      height: 16,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.667 16 C 16.558 16 21.333 12.418 21.333 8 C 21.333 3.582 16.558 0 10.667 0 C 4.776 0 0 3.582 0 8 C 0 12.418 4.776 16 10.667 16 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 29.333,
    height: 18.667,
    viewBox: "0 0 29.333 18.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 25.333,
      top: 18.667,
      width: 29.333,
      height: 18.667,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14.667 18.667 C 22.767 18.667 29.333 14.488 29.333 9.333 C 29.333 4.179 22.767 0 14.667 0 C 6.566 0 0 4.179 0 9.333 C 0 14.488 6.566 18.667 14.667 18.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 12,
    viewBox: "0 0 4 12",
    fill: "none",
    style: {
      position: "absolute",
      left: 38,
      top: 34.667,
      width: 4,
      height: 12,
      opacity: 0.8,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 L 0 10.667 C 0 11.403 0.597 12 1.333 12 L 2.667 12 C 3.403 12 4 11.403 4 10.667 L 4 1.333 C 4 0.597 3.403 0 2.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 15.333,
    height: 16,
    viewBox: "0 0 15.333 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 24,
      top: 41.333,
      width: 15.333,
      height: 16,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16.027 1.04 C 16.601 0.657 16.756 -0.119 16.373 -0.693 C 15.99 -1.268 15.214 -1.423 14.64 -1.04 L 15.333 0 L 16.027 1.04 Z M -1.085 15.38 C -1.428 15.979 -1.22 16.743 -0.62 17.085 C -0.021 17.428 0.743 17.22 1.085 16.62 L 0 16 L -1.085 15.38 Z M 15.333 0 L 14.64 -1.04 C 7.831 3.499 2.577 8.97 -1.085 15.38 L 0 16 L 1.085 16.62 C 4.534 10.585 9.502 5.39 16.027 1.04 L 15.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10,
    height: 13.333,
    viewBox: "0 0 10 13.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 29.333,
      top: 44,
      width: 10,
      height: 13.333,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.664 0.747 C 11.077 0.38 11.114 -0.252 10.747 -0.664 C 10.38 -1.077 9.748 -1.114 9.336 -0.747 L 10 0 L 10.664 0.747 Z M -0.894 12.886 C -1.141 13.38 -0.941 13.981 -0.447 14.228 C 0.047 14.475 0.647 14.275 0.894 13.781 L 0 13.333 L -0.894 12.886 Z M 10 0 L 9.336 -0.747 C 5.23 2.902 1.823 7.452 -0.894 12.886 L 0 13.333 L 0.894 13.781 C 3.511 8.548 6.77 4.209 10.664 0.747 L 10 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 15.333,
    height: 16,
    viewBox: "0 0 15.333 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 40.667,
      top: 41.333,
      width: 15.333,
      height: 16,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.693 -1.04 C 0.119 -1.423 -0.657 -1.268 -1.04 -0.693 C -1.423 -0.119 -1.268 0.657 -0.693 1.04 L 0 0 L 0.693 -1.04 Z M 14.248 16.62 C 14.591 17.22 15.354 17.428 15.954 17.085 C 16.553 16.743 16.761 15.979 16.419 15.38 L 15.333 16 L 14.248 16.62 Z M 0 0 L -0.693 1.04 C 5.831 5.39 10.8 10.585 14.248 16.62 L 15.333 16 L 16.419 15.38 C 12.756 8.97 7.502 3.499 0.693 -1.04 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10,
    height: 13.333,
    viewBox: "0 0 10 13.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 40.667,
      top: 44,
      width: 10,
      height: 13.333,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.664 -0.747 C 0.252 -1.114 -0.38 -1.077 -0.747 -0.664 C -1.114 -0.252 -1.077 0.38 -0.664 0.747 L 0 0 L 0.664 -0.747 Z M 9.106 13.781 C 9.353 14.275 9.953 14.475 10.447 14.228 C 10.941 13.981 11.141 13.38 10.894 12.886 L 10 13.333 L 9.106 13.781 Z M 0 0 L -0.664 0.747 C 3.23 4.209 6.489 8.548 9.106 13.781 L 10 13.333 L 10.894 12.886 C 8.177 7.452 4.77 2.902 0.664 -0.747 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 57.333,
    height: 4,
    viewBox: "0 0 57.333 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 12,
      top: 56.667,
      width: 57.333,
      height: 4,
      opacity: 0.65,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.316 1.157 C -0.781 1.332 -1.017 1.851 -0.843 2.316 C -0.668 2.781 -0.149 3.017 0.316 2.843 L 0 2 L -0.316 1.157 Z M 42.667 2 L 42.364 1.152 L 42.357 1.155 L 42.351 1.157 L 42.667 2 Z M 56.931 2.138 C 57.375 2.361 57.916 2.18 58.138 1.736 C 58.361 1.291 58.18 0.751 57.736 0.528 L 57.333 1.333 L 56.931 2.138 Z M 0 2 L 0.316 2.843 C 7.223 0.252 14.11 0.252 21.017 2.843 L 21.333 2 L 21.649 1.157 C 14.334 -1.586 6.999 -1.586 -0.316 1.157 L 0 2 Z M 21.333 2 L 21.017 2.843 C 28.332 5.586 35.668 5.586 42.983 2.843 L 42.667 2 L 42.351 1.157 C 35.443 3.748 28.557 3.748 21.649 1.157 L 21.333 2 Z M 42.667 2 L 42.969 2.848 C 49.106 0.656 53.703 0.524 56.931 2.138 L 57.333 1.333 L 57.736 0.528 C 53.853 -1.413 48.671 -1.1 42.364 1.152 L 42.667 2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 57.333,
    height: 4,
    viewBox: "0 0 57.333 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 12,
      top: 62,
      width: 57.333,
      height: 4,
      opacity: 0.4,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.228 1.391 C -0.564 1.517 -0.735 1.892 -0.609 2.228 C -0.483 2.564 -0.108 2.735 0.228 2.609 L 0 2 L -0.228 1.391 Z M 42.667 2 L 42.448 1.388 L 42.438 1.391 L 42.667 2 Z M 57.043 1.915 C 57.364 2.075 57.754 1.945 57.915 1.624 C 58.075 1.303 57.945 0.912 57.624 0.752 L 57.333 1.333 L 57.043 1.915 Z M 0 2 L 0.228 2.609 C 7.192 -0.003 14.141 -0.003 21.105 2.609 L 21.333 2 L 21.562 1.391 C 14.303 -1.33 7.03 -1.33 -0.228 1.391 L 0 2 Z M 21.333 2 L 21.105 2.609 C 28.363 5.33 35.637 5.33 42.895 2.609 L 42.667 2 L 42.438 1.391 C 35.474 4.003 28.526 4.003 21.562 1.391 L 21.333 2 Z M 42.667 2 L 42.885 2.612 C 49.046 0.412 53.723 0.255 57.043 1.915 L 57.333 1.333 L 57.624 0.752 C 53.832 -1.144 48.732 -0.856 42.448 1.388 L 42.667 2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body10 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(234,243,228)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 18.667,
    height: 24,
    viewBox: "0 0 18.667 24",
    fill: "none",
    style: {
      position: "absolute",
      left: 12,
      top: 14.667,
      width: 18.667,
      height: 24,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.333 0 L 18.667 24 L 0 24 L 9.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 8,
    viewBox: "0 0 5.333 8",
    fill: "none",
    style: {
      position: "absolute",
      left: 18.667,
      top: 38.667,
      width: 5.333,
      height: 8,
      opacity: 0.5,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 L 0 6.667 C 0 7.403 0.597 8 1.333 8 L 4 8 C 4.736 8 5.333 7.403 5.333 6.667 L 5.333 1.333 C 5.333 0.597 4.736 0 4 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 32,
    height: 32,
    viewBox: "0 0 32 32",
    fill: "none",
    style: {
      position: "absolute",
      left: 40,
      top: 14.667,
      width: 32,
      height: 32,
      opacity: 0.85,
      color: "rgb(90,158,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16 32 C 24.837 32 32 24.837 32 16 C 32 7.163 24.837 0 16 0 C 7.163 0 0 7.163 0 16 C 0 24.837 7.163 32 16 32 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.667,
    height: 10.667,
    viewBox: "0 0 10.667 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 44.667,
      top: 20,
      width: 10.667,
      height: 10.667,
      opacity: 0.5,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.333 10.667 C 8.279 10.667 10.667 8.279 10.667 5.333 C 10.667 2.388 8.279 0 5.333 0 C 2.388 0 0 2.388 0 5.333 C 0 8.279 2.388 10.667 5.333 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 8,
    viewBox: "0 0 5.333 8",
    fill: "none",
    style: {
      position: "absolute",
      left: 53.333,
      top: 45.333,
      width: 5.333,
      height: 8,
      opacity: 0.7,
      color: "rgb(107,61,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 L 0 6.667 C 0 7.403 0.597 8 1.333 8 L 4 8 C 4.736 8 5.333 7.403 5.333 6.667 L 5.333 1.333 C 5.333 0.597 4.736 0 4 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 61.333,
    height: 2.667,
    viewBox: "0 0 61.333 2.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 9.333,
      top: 48,
      width: 61.333,
      height: 2.667,
      opacity: 0.2,
      color: "rgb(61,122,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 60 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 C 0 2.07 0.597 2.667 1.333 2.667 L 60 2.667 C 60.736 2.667 61.333 2.07 61.333 1.333 C 61.333 0.597 60.736 0 60 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body11 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(234,244,220)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.667,
    height: 30.667,
    viewBox: "0 0 4.667 30.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 38,
      top: 33.333,
      width: 4.667,
      height: 30.667,
      opacity: 0.75,
      color: "rgb(138,96,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 0 L 2 0 C 0.895 0 0 0.895 0 2 L 0 28.667 C 0 29.771 0.895 30.667 2 30.667 L 2.667 30.667 C 3.771 30.667 4.667 29.771 4.667 28.667 L 4.667 2 C 4.667 0.895 3.771 0 2.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 16,
      top: 10.667,
      width: 48,
      height: 22.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 20,
    height: 13.333,
    viewBox: "0 0 20 13.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 4,
      top: 9.333,
      width: 20,
      height: 13.333,
      color: "rgb(74,140,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 19.177 14.274 C 19.696 14.729 20.486 14.676 20.941 14.156 C 21.395 13.637 21.343 12.847 20.823 12.393 L 20 13.333 L 19.177 14.274 Z M 0.492 -1.149 C -0.142 -1.421 -0.877 -1.127 -1.149 -0.492 C -1.421 0.142 -1.127 0.877 -0.492 1.149 L 0 0 L 0.492 -1.149 Z M 20 13.333 L 20.823 12.393 C 13.649 6.116 6.872 1.585 0.492 -1.149 L 0 0 L -0.492 1.149 C 5.572 3.748 12.128 8.107 19.177 14.274 L 20 13.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 22.667,
    viewBox: "0 0 4.267 22.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 19.733,
      top: 0,
      width: 4.267,
      height: 22.667,
      color: "rgb(74,140,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.124 23.174 C 3.405 23.805 4.143 24.089 4.774 23.809 C 5.405 23.529 5.689 22.79 5.409 22.159 L 4.267 22.667 L 3.124 23.174 Z M 1.507 0.155 C 1.593 -0.53 1.107 -1.155 0.422 -1.24 C -0.263 -1.326 -0.888 -0.84 -0.974 -0.155 L 0.267 0 L 1.507 0.155 Z M 4.267 22.667 L 5.409 22.159 C 1.925 14.321 0.652 6.995 1.507 0.155 L 0.267 0 L -0.974 -0.155 C -1.896 7.227 -0.503 15.013 3.124 23.174 L 4.267 22.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 22.667,
    viewBox: "0 0 4.267 22.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 24,
      top: 0,
      width: 4.267,
      height: 22.667,
      color: "rgb(74,140,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.142 22.159 C -1.423 22.79 -1.139 23.529 -0.508 23.809 C 0.123 24.089 0.862 23.805 1.142 23.174 L 0 22.667 L -1.142 22.159 Z M 5.24 -0.155 C 5.155 -0.84 4.53 -1.326 3.845 -1.24 C 3.16 -1.155 2.674 -0.53 2.76 0.155 L 4 0 L 5.24 -0.155 Z M 0 22.667 L 1.142 23.174 C 4.77 15.013 6.163 7.227 5.24 -0.155 L 4 0 L 2.76 0.155 C 3.615 6.995 2.341 14.321 -1.142 22.159 L 0 22.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 20,
    height: 13.333,
    viewBox: "0 0 20 13.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 24,
      top: 9.333,
      width: 20,
      height: 13.333,
      color: "rgb(74,140,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.823 12.393 C -1.343 12.847 -1.395 13.637 -0.941 14.156 C -0.486 14.676 0.304 14.729 0.823 14.274 L 0 13.333 L -0.823 12.393 Z M 20.492 1.149 C 21.127 0.877 21.421 0.142 21.149 -0.492 C 20.877 -1.127 20.142 -1.421 19.508 -1.149 L 20 0 L 20.492 1.149 Z M 0 13.333 L 0.823 14.274 C 7.872 8.107 14.428 3.748 20.492 1.149 L 20 0 L 19.508 -1.149 C 13.128 1.585 6.351 6.116 -0.823 12.393 L 0 13.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 24,
    height: 1.333,
    viewBox: "0 0 24 1.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 24,
      top: 21.333,
      width: 24,
      height: 1.333,
      color: "rgb(74,140,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.271 0.113 C -0.945 0.263 -1.37 0.931 -1.22 1.604 C -1.07 2.278 -0.403 2.703 0.271 2.554 L 0 1.333 L -0.271 0.113 Z M 23.729 2.554 C 24.403 2.703 25.07 2.278 25.22 1.604 C 25.37 0.931 24.945 0.263 24.271 0.113 L 24 1.333 L 23.729 2.554 Z M 0 1.333 L 0.271 2.554 C 8.093 0.815 15.907 0.815 23.729 2.554 L 24 1.333 L 24.271 0.113 C 16.093 -1.704 7.907 -1.704 -0.271 0.113 L 0 1.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 24,
    height: 1.333,
    viewBox: "0 0 24 1.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 21.333,
      width: 24,
      height: 1.333,
      color: "rgb(74,140,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 23.729 2.554 C 24.403 2.703 25.07 2.278 25.22 1.604 C 25.37 0.931 24.945 0.263 24.271 0.113 L 24 1.333 L 23.729 2.554 Z M -0.271 0.113 C -0.945 0.263 -1.37 0.931 -1.22 1.604 C -1.07 2.278 -0.403 2.703 0.271 2.554 L 0 1.333 L -0.271 0.113 Z M 24 1.333 L 24.271 0.113 C 16.093 -1.704 7.907 -1.704 -0.271 0.113 L 0 1.333 L 0.271 2.554 C 8.093 0.815 15.907 0.815 23.729 2.554 L 24 1.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 24.28,
      top: 16.428,
      width: 31.44,
      height: 12.016,
      opacity: 0.6,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 3.333,
    viewBox: "0 0 6.667 3.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.866,-0.500,0.500,0.866,0,9.129)",
      transformOrigin: "0 0",
      width: 6.667,
      height: 3.333,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 3.333 C 5.174 3.333 6.667 2.587 6.667 1.667 C 6.667 0.746 5.174 0 3.333 0 C 1.492 0 0 0.746 0 1.667 C 0 2.587 1.492 3.333 3.333 3.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 3.333,
    viewBox: "0 0 6.667 3.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.174,-0.985,0.985,0.174,9.500,6.565)",
      transformOrigin: "0 0",
      width: 6.667,
      height: 3.333,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 3.333 C 5.174 3.333 6.667 2.587 6.667 1.667 C 6.667 0.746 5.174 0 3.333 0 C 1.492 0 0 0.746 0 1.667 C 0 2.587 1.492 3.333 3.333 3.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 3.333,
    viewBox: "0 0 6.667 3.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.174,0.985,-0.985,0.174,21.449,0)",
      transformOrigin: "0 0",
      width: 6.667,
      height: 3.333,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 3.333 C 5.174 3.333 6.667 2.587 6.667 1.667 C 6.667 0.746 5.174 0 3.333 0 C 1.492 0 0 0.746 0 1.667 C 0 2.587 1.492 3.333 3.333 3.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 3.333,
    viewBox: "0 0 6.667 3.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.866,0.500,-0.500,0.866,25.667,5.795)",
      transformOrigin: "0 0",
      width: 6.667,
      height: 3.333,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 3.333 C 5.174 3.333 6.667 2.587 6.667 1.667 C 6.667 0.746 5.174 0 3.333 0 C 1.492 0 0 0.746 0 1.667 C 0 2.587 1.492 3.333 3.333 3.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 6.667,
    viewBox: "0 0 6.667 6.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 36.667,
      top: 31.333,
      width: 6.667,
      height: 6.667,
      opacity: 0.7,
      color: "rgb(200,90,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 6.667 C 5.174 6.667 6.667 5.174 6.667 3.333 C 6.667 1.492 5.174 0 3.333 0 C 1.492 0 0 1.492 0 3.333 C 0 5.174 1.492 6.667 3.333 6.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body12 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(232,245,224)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 72 0 L 8 0 C 3.582 0 0 3.582 0 8 L 0 72 C 0 76.418 3.582 80 8 80 L 72 80 C 76.418 80 80 76.418 80 72 L 80 8 C 80 3.582 76.418 0 72 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 5.21,
      top: 30,
      width: 71.2,
      height: 38.6,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 5.81,
      top: 4.098,
      width: 9.18,
      height: 28.197,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 4.762,
    height: 28.197,
    viewBox: "-2.381 0 4.762 28.197",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.718,
      top: 0,
      width: 4.761904716491699,
      height: 28.197,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -2.381 28.197 C -2.381 29.512 -1.315 30.578 0 30.578 C 1.315 30.578 2.381 29.512 2.381 28.197 L 0 28.197 L -2.381 28.197 Z M 2.381 0 C 2.381 -1.315 1.315 -2.381 0 -2.381 C -1.315 -2.381 -2.381 -1.315 -2.381 0 L 0 0 L 2.381 0 Z M 0 28.197 L 2.381 28.197 L 2.381 0 L 0 0 L -2.381 0 L -2.381 28.197 L 0 28.197 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.590,
    height: 4.590,
    viewBox: "0 0 4.590 4.590",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 16.754,
      width: 4.59,
      height: 4.59,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.907 6.274 C 3.836 7.204 5.344 7.204 6.274 6.274 C 7.204 5.344 7.204 3.836 6.274 2.907 L 4.59 4.59 L 2.907 6.274 Z M 1.684 -1.684 C 0.754 -2.613 -0.754 -2.613 -1.684 -1.684 C -2.613 -0.754 -2.613 0.754 -1.684 1.684 L 0 0 L 1.684 -1.684 Z M 4.59 4.59 L 6.274 2.907 L 1.684 -1.684 L 0 0 L -1.684 1.684 L 2.907 6.274 L 4.59 4.59 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.590,
    height: 4.590,
    viewBox: "0 0 4.590 4.590",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.59,
      top: 16.754,
      width: 4.59,
      height: 4.59,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.684 2.907 C -2.613 3.836 -2.613 5.344 -1.684 6.274 C -0.754 7.204 0.754 7.204 1.684 6.274 L 0 4.59 L -1.684 2.907 Z M 6.274 1.684 C 7.204 0.754 7.204 -0.754 6.274 -1.684 C 5.344 -2.613 3.836 -2.613 2.907 -1.684 L 4.59 0 L 6.274 1.684 Z M 0 4.59 L 1.684 6.274 L 6.274 1.684 L 4.59 0 L 2.907 -1.684 L -1.684 2.907 L 0 4.59 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.934,
    height: 3.934,
    viewBox: "0 0 3.934 3.934",
    fill: "none",
    style: {
      position: "absolute",
      left: 0.656,
      top: 10.197,
      width: 3.934,
      height: 3.934,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.251 5.618 C 3.181 6.548 4.688 6.548 5.618 5.618 C 6.548 4.688 6.548 3.181 5.618 2.251 L 3.934 3.934 L 2.251 5.618 Z M 1.684 -1.684 C 0.754 -2.613 -0.754 -2.613 -1.684 -1.684 C -2.613 -0.754 -2.613 0.754 -1.684 1.684 L 0 0 L 1.684 -1.684 Z M 3.934 3.934 L 5.618 2.251 L 1.684 -1.684 L 0 0 L -1.684 1.684 L 2.251 5.618 L 3.934 3.934 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.934,
    height: 3.934,
    viewBox: "0 0 3.934 3.934",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.59,
      top: 10.197,
      width: 3.934,
      height: 3.934,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.684 2.251 C -2.613 3.181 -2.613 4.688 -1.684 5.618 C -0.754 6.548 0.754 6.548 1.684 5.618 L 0 3.934 L -1.684 2.251 Z M 5.618 1.684 C 6.548 0.754 6.548 -0.754 5.618 -1.684 C 4.688 -2.613 3.181 -2.613 2.251 -1.684 L 3.934 0 L 5.618 1.684 Z M 0 3.934 L 1.684 5.618 L 5.618 1.684 L 3.934 0 L 2.251 -1.684 L -1.684 2.251 L 0 3.934 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.279,
    height: 4.590,
    viewBox: "0 0 3.279 4.590",
    fill: "none",
    style: {
      position: "absolute",
      left: 1.312,
      top: 3.639,
      width: 3.279,
      height: 4.59,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.341 5.974 C 2.106 7.044 3.593 7.292 4.663 6.528 C 5.733 5.763 5.98 4.276 5.216 3.206 L 3.279 4.59 L 1.341 5.974 Z M 1.937 -1.384 C 1.173 -2.454 -0.314 -2.702 -1.384 -1.937 C -2.454 -1.173 -2.702 0.314 -1.937 1.384 L 0 0 L 1.937 -1.384 Z M 3.279 4.59 L 5.216 3.206 L 1.937 -1.384 L 0 0 L -1.937 1.384 L 1.341 5.974 L 3.279 4.59 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.279,
    height: 4.590,
    viewBox: "0 0 3.279 4.590",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.59,
      top: 3.639,
      width: 3.279,
      height: 4.59,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.937 3.206 C -2.702 4.276 -2.454 5.763 -1.384 6.528 C -0.314 7.292 1.173 7.044 1.937 5.974 L 0 4.59 L -1.937 3.206 Z M 5.216 1.384 C 5.98 0.314 5.733 -1.173 4.663 -1.937 C 3.593 -2.702 2.106 -2.454 1.341 -1.384 L 3.279 0 L 5.216 1.384 Z M 0 4.59 L 1.937 5.974 L 5.216 1.384 L 3.279 0 L 1.341 -1.384 L -1.937 3.206 L 0 4.59 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 19.2,
      top: 0,
      width: 11.2,
      height: 32,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 4.762,
    height: 32,
    viewBox: "-2.381 0 4.762 32",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.6,
      top: 0,
      width: 4.761904716491699,
      height: 32,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -2.381 32 C -2.381 33.315 -1.315 34.381 0 34.381 C 1.315 34.381 2.381 33.315 2.381 32 L 0 32 L -2.381 32 Z M 2.381 0 C 2.381 -1.315 1.315 -2.381 0 -2.381 C -1.315 -2.381 -2.381 -1.315 -2.381 0 L 0 0 L 2.381 0 Z M 0 32 L 2.381 32 L 2.381 0 L 0 0 L -2.381 0 L -2.381 32 L 0 32 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.600,
    height: 5.600,
    viewBox: "0 0 5.600 5.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 18.4,
      width: 5.6,
      height: 5.6,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.916 7.284 C 4.846 8.213 6.354 8.213 7.284 7.284 C 8.213 6.354 8.213 4.846 7.284 3.916 L 5.6 5.6 L 3.916 7.284 Z M 1.684 -1.684 C 0.754 -2.613 -0.754 -2.613 -1.684 -1.684 C -2.613 -0.754 -2.613 0.754 -1.684 1.684 L 0 0 L 1.684 -1.684 Z M 5.6 5.6 L 7.284 3.916 L 1.684 -1.684 L 0 0 L -1.684 1.684 L 3.916 7.284 L 5.6 5.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.600,
    height: 5.600,
    viewBox: "0 0 5.600 5.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.6,
      top: 18.4,
      width: 5.6,
      height: 5.6,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.684 3.916 C -2.613 4.846 -2.613 6.354 -1.684 7.284 C -0.754 8.213 0.754 8.213 1.684 7.284 L 0 5.6 L -1.684 3.916 Z M 7.284 1.684 C 8.213 0.754 8.213 -0.754 7.284 -1.684 C 6.354 -2.613 4.846 -2.613 3.916 -1.684 L 5.6 0 L 7.284 1.684 Z M 0 5.6 L 1.684 7.284 L 7.284 1.684 L 5.6 0 L 3.916 -1.684 L -1.684 3.916 L 0 5.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.800,
    height: 5.600,
    viewBox: "0 0 4.800 5.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 0.8,
      top: 9.6,
      width: 4.8,
      height: 5.6,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.992 7.15 C 3.848 8.148 5.351 8.264 6.35 7.408 C 7.348 6.552 7.464 5.049 6.608 4.05 L 4.8 5.6 L 2.992 7.15 Z M 1.808 -1.55 C 0.952 -2.548 -0.551 -2.664 -1.55 -1.808 C -2.548 -0.952 -2.664 0.551 -1.808 1.55 L 0 0 L 1.808 -1.55 Z M 4.8 5.6 L 6.608 4.05 L 1.808 -1.55 L 0 0 L -1.808 1.55 L 2.992 7.15 L 4.8 5.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.800,
    height: 5.600,
    viewBox: "0 0 4.800 5.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.6,
      top: 9.6,
      width: 4.8,
      height: 5.6,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.808 4.05 C -2.664 5.049 -2.548 6.552 -1.55 7.408 C -0.551 8.264 0.952 8.148 1.808 7.15 L 0 5.6 L -1.808 4.05 Z M 6.608 1.55 C 7.464 0.551 7.348 -0.952 6.35 -1.808 C 5.351 -2.664 3.848 -2.548 2.992 -1.55 L 4.8 0 L 6.608 1.55 Z M 0 5.6 L 1.808 7.15 L 6.608 1.55 L 4.8 0 L 2.992 -1.55 L -1.808 4.05 L 0 5.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 5.600,
    viewBox: "0 0 4 5.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 1.6,
      top: 1.6,
      width: 4,
      height: 5.6,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.063 6.984 C 2.827 8.054 4.314 8.302 5.384 7.537 C 6.454 6.773 6.702 5.286 5.937 4.216 L 4 5.6 L 2.063 6.984 Z M 1.937 -1.384 C 1.173 -2.454 -0.314 -2.702 -1.384 -1.937 C -2.454 -1.173 -2.702 0.314 -1.937 1.384 L 0 0 L 1.937 -1.384 Z M 4 5.6 L 5.937 4.216 L 1.937 -1.384 L 0 0 L -1.937 1.384 L 2.063 6.984 L 4 5.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 5.600,
    viewBox: "0 0 4 5.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.6,
      top: 1.6,
      width: 4,
      height: 5.6,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.937 4.216 C -2.702 5.286 -2.454 6.773 -1.384 7.537 C -0.314 8.302 1.173 8.054 1.937 6.984 L 0 5.6 L -1.937 4.216 Z M 5.937 1.384 C 6.702 0.314 6.454 -1.173 5.384 -1.937 C 4.314 -2.702 2.827 -2.454 2.063 -1.384 L 4 0 L 5.937 1.384 Z M 0 5.6 L 1.937 6.984 L 5.937 1.384 L 4 0 L 2.063 -1.384 L -1.937 4.216 L 0 5.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 33.6,
      top: 0,
      width: 11.201,
      height: 32,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 4.762,
    height: 32,
    viewBox: "-2.381 0 4.762 32",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.6,
      top: 0,
      width: 4.761904716491699,
      height: 32,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -2.381 32 C -2.381 33.315 -1.315 34.381 0 34.381 C 1.315 34.381 2.381 33.315 2.381 32 L 0 32 L -2.381 32 Z M 2.381 0 C 2.381 -1.315 1.315 -2.381 0 -2.381 C -1.315 -2.381 -2.381 -1.315 -2.381 0 L 0 0 L 2.381 0 Z M 0 32 L 2.381 32 L 2.381 0 L 0 0 L -2.381 0 L -2.381 32 L 0 32 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.600,
    height: 5.600,
    viewBox: "0 0 5.600 5.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 18.4,
      width: 5.6,
      height: 5.6,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.916 7.284 C 4.846 8.213 6.354 8.213 7.284 7.284 C 8.213 6.354 8.213 4.846 7.284 3.916 L 5.6 5.6 L 3.916 7.284 Z M 1.684 -1.684 C 0.754 -2.613 -0.754 -2.613 -1.684 -1.684 C -2.613 -0.754 -2.613 0.754 -1.684 1.684 L 0 0 L 1.684 -1.684 Z M 5.6 5.6 L 7.284 3.916 L 1.684 -1.684 L 0 0 L -1.684 1.684 L 3.916 7.284 L 5.6 5.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.600,
    height: 5.600,
    viewBox: "0 0 5.600 5.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.6,
      top: 18.4,
      width: 5.6,
      height: 5.6,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.684 3.916 C -2.613 4.846 -2.613 6.354 -1.684 7.284 C -0.754 8.213 0.754 8.213 1.684 7.284 L 0 5.6 L -1.684 3.916 Z M 7.284 1.684 C 8.213 0.754 8.213 -0.754 7.284 -1.684 C 6.354 -2.613 4.846 -2.613 3.916 -1.684 L 5.6 0 L 7.284 1.684 Z M 0 5.6 L 1.684 7.284 L 7.284 1.684 L 5.6 0 L 3.916 -1.684 L -1.684 3.916 L 0 5.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.800,
    height: 5.600,
    viewBox: "0 0 4.800 5.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 0.8,
      top: 9.6,
      width: 4.8,
      height: 5.6,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.992 7.15 C 3.848 8.148 5.351 8.264 6.35 7.408 C 7.348 6.552 7.464 5.049 6.608 4.05 L 4.8 5.6 L 2.992 7.15 Z M 1.808 -1.55 C 0.952 -2.548 -0.551 -2.664 -1.55 -1.808 C -2.548 -0.952 -2.664 0.551 -1.808 1.55 L 0 0 L 1.808 -1.55 Z M 4.8 5.6 L 6.608 4.05 L 1.808 -1.55 L 0 0 L -1.808 1.55 L 2.992 7.15 L 4.8 5.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.800,
    height: 5.600,
    viewBox: "0 0 4.800 5.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.6,
      top: 9.6,
      width: 4.8,
      height: 5.6,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.808 4.05 C -2.664 5.049 -2.548 6.552 -1.55 7.408 C -0.551 8.264 0.952 8.148 1.808 7.15 L 0 5.6 L -1.808 4.05 Z M 6.608 1.55 C 7.464 0.551 7.348 -0.952 6.35 -1.808 C 5.351 -2.664 3.848 -2.548 2.992 -1.55 L 4.8 0 L 6.608 1.55 Z M 0 5.6 L 1.808 7.15 L 6.608 1.55 L 4.8 0 L 2.992 -1.55 L -1.808 4.05 L 0 5.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 5.600,
    viewBox: "0 0 4 5.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 1.6,
      top: 1.6,
      width: 4,
      height: 5.6,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.063 6.984 C 2.827 8.054 4.314 8.302 5.384 7.537 C 6.454 6.773 6.702 5.286 5.937 4.216 L 4 5.6 L 2.063 6.984 Z M 1.937 -1.384 C 1.173 -2.454 -0.314 -2.702 -1.384 -1.937 C -2.454 -1.173 -2.702 0.314 -1.937 1.384 L 0 0 L 1.937 -1.384 Z M 4 5.6 L 5.937 4.216 L 1.937 -1.384 L 0 0 L -1.937 1.384 L 2.063 6.984 L 4 5.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 5.600,
    viewBox: "0 0 4 5.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.6,
      top: 1.6,
      width: 4,
      height: 5.6,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.937 4.216 C -2.702 5.286 -2.454 6.773 -1.384 7.537 C -0.314 8.302 1.173 8.054 1.937 6.984 L 0 5.6 L -1.937 4.216 Z M 5.937 1.384 C 6.702 0.314 6.454 -1.173 5.384 -1.937 C 4.314 -2.702 2.827 -2.454 2.063 -1.384 L 4 0 L 5.937 1.384 Z M 0 5.6 L 1.937 6.984 L 5.937 1.384 L 4 0 L 2.063 -1.384 L -1.937 4.216 L 0 5.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 48.8,
      top: 7.2,
      width: 9.6,
      height: 28,
      opacity: 0.75,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 3.810,
    height: 28,
    viewBox: "-1.905 0 3.810 28",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.8,
      top: 0,
      width: 3.809523820877075,
      height: 28,
      color: "rgb(45,90,10)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.905 28 C -1.905 29.052 -1.052 29.905 0 29.905 C 1.052 29.905 1.905 29.052 1.905 28 L 0 28 L -1.905 28 Z M 1.905 0 C 1.905 -1.052 1.052 -1.905 0 -1.905 C -1.052 -1.905 -1.905 -1.052 -1.905 0 L 0 0 L 1.905 0 Z M 0 28 L 1.905 28 L 1.905 0 L 0 0 L -1.905 0 L -1.905 28 L 0 28 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.800,
    height: 4.800,
    viewBox: "0 0 4.800 4.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 16,
      width: 4.8,
      height: 4.8,
      color: "rgb(45,90,10)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.453 6.147 C 4.197 6.891 5.403 6.891 6.147 6.147 C 6.891 5.403 6.891 4.197 6.147 3.453 L 4.8 4.8 L 3.453 6.147 Z M 1.347 -1.347 C 0.603 -2.091 -0.603 -2.091 -1.347 -1.347 C -2.091 -0.603 -2.091 0.603 -1.347 1.347 L 0 0 L 1.347 -1.347 Z M 4.8 4.8 L 6.147 3.453 L 1.347 -1.347 L 0 0 L -1.347 1.347 L 3.453 6.147 L 4.8 4.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.800,
    height: 4.800,
    viewBox: "0 0 4.800 4.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.8,
      top: 16,
      width: 4.8,
      height: 4.8,
      color: "rgb(45,90,10)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.347 3.453 C -2.091 4.197 -2.091 5.403 -1.347 6.147 C -0.603 6.891 0.603 6.891 1.347 6.147 L 0 4.8 L -1.347 3.453 Z M 6.147 1.347 C 6.891 0.603 6.891 -0.603 6.147 -1.347 C 5.403 -2.091 4.197 -2.091 3.453 -1.347 L 4.8 0 L 6.147 1.347 Z M 0 4.8 L 1.347 6.147 L 6.147 1.347 L 4.8 0 L 3.453 -1.347 L -1.347 3.453 L 0 4.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.400,
    height: 4.800,
    viewBox: "0 0 4.400 4.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 0.4,
      top: 8.8,
      width: 4.4,
      height: 4.8,
      color: "rgb(45,90,10)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.996 6.087 C 3.707 6.863 4.912 6.915 5.687 6.204 C 6.463 5.493 6.515 4.288 5.804 3.513 L 4.4 4.8 L 2.996 6.087 Z M 1.404 -1.287 C 0.693 -2.063 -0.512 -2.115 -1.287 -1.404 C -2.063 -0.693 -2.115 0.512 -1.404 1.287 L 0 0 L 1.404 -1.287 Z M 4.4 4.8 L 5.804 3.513 L 1.404 -1.287 L 0 0 L -1.404 1.287 L 2.996 6.087 L 4.4 4.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.400,
    height: 4.800,
    viewBox: "0 0 4.400 4.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.8,
      top: 8.8,
      width: 4.4,
      height: 4.8,
      color: "rgb(45,90,10)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.404 3.513 C -2.115 4.288 -2.063 5.493 -1.287 6.204 C -0.512 6.915 0.693 6.863 1.404 6.087 L 0 4.8 L -1.404 3.513 Z M 5.804 1.287 C 6.515 0.512 6.463 -0.693 5.687 -1.404 C 4.912 -2.115 3.707 -2.063 2.996 -1.287 L 4.4 0 L 5.804 1.287 Z M 0 4.8 L 1.404 6.087 L 5.804 1.287 L 4.4 0 L 2.996 -1.287 L -1.404 3.513 L 0 4.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.600,
    height: 4.800,
    viewBox: "0 0 3.600 4.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 1.2,
      top: 1.6,
      width: 3.6,
      height: 4.8,
      color: "rgb(45,90,10)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.076 5.943 C 2.707 6.784 3.901 6.955 4.743 6.324 C 5.584 5.693 5.755 4.499 5.124 3.657 L 3.6 4.8 L 2.076 5.943 Z M 1.524 -1.143 C 0.893 -1.984 -0.301 -2.155 -1.143 -1.524 C -1.984 -0.893 -2.155 0.301 -1.524 1.143 L 0 0 L 1.524 -1.143 Z M 3.6 4.8 L 5.124 3.657 L 1.524 -1.143 L 0 0 L -1.524 1.143 L 2.076 5.943 L 3.6 4.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.600,
    height: 4.800,
    viewBox: "0 0 3.600 4.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.8,
      top: 1.6,
      width: 3.6,
      height: 4.8,
      color: "rgb(45,90,10)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.524 3.657 C -2.155 4.499 -1.984 5.693 -1.143 6.324 C -0.301 6.955 0.893 6.784 1.524 5.943 L 0 4.8 L -1.524 3.657 Z M 5.124 1.143 C 5.755 0.301 5.584 -0.893 4.743 -1.524 C 3.901 -2.155 2.707 -1.984 2.076 -1.143 L 3.6 0 L 5.124 1.143 Z M 0 4.8 L 1.524 5.943 L 5.124 1.143 L 3.6 0 L 2.076 -1.143 L -1.524 3.657 L 0 4.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 62,
      top: 12,
      width: 8.799,
      height: 24.8,
      opacity: 0.6,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 3.810,
    height: 24.800,
    viewBox: "-1.905 0 3.810 24.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.4,
      top: 0,
      width: 3.809523820877075,
      height: 24.8,
      color: "rgb(45,90,10)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.905 24.8 C -1.905 25.852 -1.052 26.705 0 26.705 C 1.052 26.705 1.905 25.852 1.905 24.8 L 0 24.8 L -1.905 24.8 Z M 1.905 0 C 1.905 -1.052 1.052 -1.905 0 -1.905 C -1.052 -1.905 -1.905 -1.052 -1.905 0 L 0 0 L 1.905 0 Z M 0 24.8 L 1.905 24.8 L 1.905 0 L 0 0 L -1.905 0 L -1.905 24.8 L 0 24.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.400,
    height: 4.800,
    viewBox: "0 0 4.400 4.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 13.6,
      width: 4.4,
      height: 4.8,
      color: "rgb(45,90,10)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.996 6.087 C 3.707 6.863 4.912 6.915 5.687 6.204 C 6.463 5.493 6.515 4.288 5.804 3.513 L 4.4 4.8 L 2.996 6.087 Z M 1.404 -1.287 C 0.693 -2.063 -0.512 -2.115 -1.287 -1.404 C -2.063 -0.693 -2.115 0.512 -1.404 1.287 L 0 0 L 1.404 -1.287 Z M 4.4 4.8 L 5.804 3.513 L 1.404 -1.287 L 0 0 L -1.404 1.287 L 2.996 6.087 L 4.4 4.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.400,
    height: 4.800,
    viewBox: "0 0 4.400 4.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.4,
      top: 13.6,
      width: 4.4,
      height: 4.8,
      color: "rgb(45,90,10)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.404 3.513 C -2.115 4.288 -2.063 5.493 -1.287 6.204 C -0.512 6.915 0.693 6.863 1.404 6.087 L 0 4.8 L -1.404 3.513 Z M 5.804 1.287 C 6.515 0.512 6.463 -0.693 5.687 -1.404 C 4.912 -2.115 3.707 -2.063 2.996 -1.287 L 4.4 0 L 5.804 1.287 Z M 0 4.8 L 1.404 6.087 L 5.804 1.287 L 4.4 0 L 2.996 -1.287 L -1.404 3.513 L 0 4.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 4.800,
    viewBox: "0 0 4 4.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 0.4,
      top: 7.2,
      width: 4,
      height: 4.8,
      color: "rgb(45,90,10)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.537 6.019 C 3.21 6.828 4.411 6.937 5.219 6.263 C 6.028 5.59 6.137 4.389 5.463 3.581 L 4 4.8 L 2.537 6.019 Z M 1.463 -1.219 C 0.79 -2.028 -0.411 -2.137 -1.219 -1.463 C -2.028 -0.79 -2.137 0.411 -1.463 1.219 L 0 0 L 1.463 -1.219 Z M 4 4.8 L 5.463 3.581 L 1.463 -1.219 L 0 0 L -1.463 1.219 L 2.537 6.019 L 4 4.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 4.800,
    viewBox: "0 0 4 4.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.4,
      top: 7.2,
      width: 4,
      height: 4.8,
      color: "rgb(45,90,10)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.463 3.581 C -2.137 4.389 -2.028 5.59 -1.219 6.263 C -0.411 6.937 0.79 6.828 1.463 6.019 L 0 4.8 L -1.463 3.581 Z M 5.463 1.219 C 6.137 0.411 6.028 -0.79 5.219 -1.463 C 4.411 -2.137 3.21 -2.028 2.537 -1.219 L 4 0 L 5.463 1.219 Z M 0 4.8 L 1.463 6.019 L 5.463 1.219 L 4 0 L 2.537 -1.219 L -1.463 3.581 L 0 4.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 4.800,
    viewBox: "0 0 3.200 4.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 1.2,
      top: 0.8,
      width: 3.2,
      height: 4.8,
      color: "rgb(45,90,10)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.615 5.857 C 2.199 6.732 3.381 6.968 4.257 6.385 C 5.132 5.801 5.368 4.619 4.785 3.743 L 3.2 4.8 L 1.615 5.857 Z M 1.585 -1.057 C 1.001 -1.932 -0.181 -2.168 -1.057 -1.585 C -1.932 -1.001 -2.168 0.181 -1.585 1.057 L 0 0 L 1.585 -1.057 Z M 3.2 4.8 L 4.785 3.743 L 1.585 -1.057 L 0 0 L -1.585 1.057 L 1.615 5.857 L 3.2 4.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 4.800,
    viewBox: "0 0 3.200 4.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.4,
      top: 0.8,
      width: 3.2,
      height: 4.8,
      color: "rgb(45,90,10)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.585 3.743 C -2.168 4.619 -1.932 5.801 -1.057 6.385 C -0.181 6.968 1.001 6.732 1.585 5.857 L 0 4.8 L -1.585 3.743 Z M 4.785 1.057 C 5.368 0.181 5.132 -1.001 4.257 -1.585 C 3.381 -2.168 2.199 -1.932 1.615 -1.057 L 3.2 0 L 4.785 1.057 Z M 0 4.8 L 1.585 5.857 L 4.785 1.057 L 3.2 0 L 1.615 -1.057 L -1.585 3.743 L 0 4.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 71.200,
    height: 3.200,
    viewBox: "0 0 71.200 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 32.8,
      width: 71.2,
      height: 3.2,
      color: "rgb(58,110,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 69.6 0 L 1.6 0 C 0.716 0 0 0.716 0 1.6 C 0 2.484 0.716 3.2 1.6 3.2 L 69.6 3.2 C 70.484 3.2 71.2 2.484 71.2 1.6 C 71.2 0.716 70.484 0 69.6 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 69.600,
    height: 2,
    viewBox: "0 0 69.600 2",
    fill: "none",
    style: {
      position: "absolute",
      left: 0.8,
      top: 36.6,
      width: 69.6,
      height: 2,
      opacity: 0.45,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.167 0.062 C -0.685 0.155 -1.03 0.65 -0.938 1.167 C -0.845 1.685 -0.35 2.03 0.167 1.938 L 0 1 L -0.167 0.062 Z M 69.42 1.935 C 69.937 2.035 70.436 1.696 70.535 1.18 C 70.635 0.663 70.296 0.164 69.78 0.065 L 69.6 1 L 69.42 1.935 Z M 0 1 L 0.167 1.938 C 7.52 0.625 15.143 0.623 23.043 1.939 L 23.2 1 L 23.357 0.061 C 15.257 -1.289 7.414 -1.291 -0.167 0.062 L 0 1 Z M 23.2 1 L 23.043 1.939 C 31.147 3.29 39.253 3.29 47.357 1.939 L 47.2 1 L 47.043 0.061 C 39.147 1.377 31.253 1.377 23.357 0.061 L 23.2 1 Z M 47.2 1 L 47.357 1.939 C 55.261 0.622 62.613 0.626 69.42 1.935 L 69.6 1 L 69.78 0.065 C 62.72 -1.293 55.139 -1.289 47.043 0.061 L 47.2 1 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))));
  const __body13 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(240,246,228)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 2.92,
      top: 17.333,
      width: 30.539,
      height: 49.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 6.008,
    height: 36.413,
    viewBox: "0 0 6.008 36.413",
    fill: "none",
    style: {
      position: "absolute",
      left: 13.017,
      top: 12.92,
      width: 6.008,
      height: 36.413,
      opacity: 0.75,
      color: "rgb(122,80,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.005 0 L 2.003 0 C 0.897 0 0 1.052 0 2.349 L 0 34.063 C 0 35.361 0.897 36.413 2.003 36.413 L 4.005 36.413 C 5.111 36.413 6.008 35.361 6.008 34.063 L 6.008 2.349 C 6.008 1.052 5.111 0 4.005 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.008,
    height: 9.397,
    viewBox: "0 0 6.008 9.397",
    fill: "none",
    style: {
      position: "absolute",
      left: 13.017,
      top: 25.841,
      width: 6.008,
      height: 9.397,
      opacity: 0.6,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.632 -0.404 C 0.409 -0.753 -0.055 -0.855 -0.404 -0.632 C -0.753 -0.409 -0.855 0.055 -0.632 0.404 L 0 0 L 0.632 -0.404 Z M 5.376 9.801 C 5.599 10.15 6.063 10.252 6.412 10.029 C 6.761 9.806 6.863 9.342 6.64 8.993 L 6.008 9.397 L 5.376 9.801 Z M 0 0 L -0.632 0.404 L 5.376 9.801 L 6.008 9.397 L 6.64 8.993 L 0.632 -0.404 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.001,
    height: 8.222,
    viewBox: "0 0 1.001 8.222",
    fill: "none",
    style: {
      position: "absolute",
      left: 15.52,
      top: 35.238,
      width: 1.001,
      height: 8.222,
      opacity: 0.8,
      color: "rgb(232,224,192)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.501 0 C -0.167 3.132 -0.167 5.873 0.501 8.222 C 1.168 5.873 1.168 3.132 0.501 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.005,
    height: 2.937,
    viewBox: "0 0 4.005 2.937",
    fill: "none",
    style: {
      position: "absolute",
      left: 14.018,
      top: 41.992,
      width: 4.005,
      height: 2.937,
      opacity: 0.7,
      color: "rgb(232,224,192)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.003 2.937 C 3.109 2.937 4.005 2.279 4.005 1.468 C 4.005 0.657 3.109 0 2.003 0 C 0.897 0 0 0.657 0 1.468 C 0 2.279 0.897 2.937 2.003 2.937 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 29.038,
    height: 21.143,
    viewBox: "0 0 29.038 21.143",
    fill: "none",
    style: {
      position: "absolute",
      left: 1.002,
      top: 0,
      width: 29.038,
      height: 21.143,
      opacity: 0.8,
      color: "rgb(74,140,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14.519 21.143 C 22.537 21.143 29.038 16.41 29.038 10.571 C 29.038 4.733 22.537 0 14.519 0 C 6.5 0 0 4.733 0 10.571 C 0 16.41 6.5 21.143 14.519 21.143 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8.010,
    height: 9.397,
    viewBox: "0 0 8.010 9.397",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 8.222,
      width: 8.01,
      height: 9.397,
      opacity: 0.4,
      color: "rgb(90,158,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.005 9.397 C 6.217 9.397 8.01 7.293 8.01 4.698 C 8.01 2.104 6.217 0 4.005 0 C 1.793 0 0 2.104 0 4.698 C 0 7.293 1.793 9.397 4.005 9.397 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.009,
    height: 8.222,
    viewBox: "0 0 7.009 8.222",
    fill: "none",
    style: {
      position: "absolute",
      left: 23.531,
      top: 13.508,
      width: 7.009,
      height: 8.222,
      opacity: 0.4,
      color: "rgb(90,158,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.505 8.222 C 5.44 8.222 7.009 6.382 7.009 4.111 C 7.009 1.841 5.44 0 3.505 0 C 1.569 0 0 1.841 0 4.111 C 0 6.382 1.569 8.222 3.505 8.222 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 24.063,
      top: 17.333,
      width: 30.539,
      height: 49.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 6.008,
    height: 36.413,
    viewBox: "0 0 6.008 36.413",
    fill: "none",
    style: {
      position: "absolute",
      left: 13.017,
      top: 12.92,
      width: 6.008,
      height: 36.413,
      opacity: 0.75,
      color: "rgb(122,80,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.005 0 L 2.003 0 C 0.897 0 0 1.052 0 2.349 L 0 34.063 C 0 35.361 0.897 36.413 2.003 36.413 L 4.005 36.413 C 5.111 36.413 6.008 35.361 6.008 34.063 L 6.008 2.349 C 6.008 1.052 5.111 0 4.005 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.008,
    height: 9.397,
    viewBox: "0 0 6.008 9.397",
    fill: "none",
    style: {
      position: "absolute",
      left: 13.017,
      top: 25.841,
      width: 6.008,
      height: 9.397,
      opacity: 0.6,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.632 -0.404 C 0.409 -0.753 -0.055 -0.855 -0.404 -0.632 C -0.753 -0.409 -0.855 0.055 -0.632 0.404 L 0 0 L 0.632 -0.404 Z M 5.376 9.801 C 5.599 10.15 6.063 10.252 6.412 10.029 C 6.761 9.806 6.863 9.342 6.64 8.993 L 6.008 9.397 L 5.376 9.801 Z M 0 0 L -0.632 0.404 L 5.376 9.801 L 6.008 9.397 L 6.64 8.993 L 0.632 -0.404 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.001,
    height: 8.222,
    viewBox: "0 0 1.001 8.222",
    fill: "none",
    style: {
      position: "absolute",
      left: 15.52,
      top: 35.238,
      width: 1.001,
      height: 8.222,
      opacity: 0.8,
      color: "rgb(232,224,192)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.501 0 C -0.167 3.132 -0.167 5.873 0.501 8.222 C 1.168 5.873 1.168 3.132 0.501 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.005,
    height: 2.937,
    viewBox: "0 0 4.005 2.937",
    fill: "none",
    style: {
      position: "absolute",
      left: 14.018,
      top: 41.992,
      width: 4.005,
      height: 2.937,
      opacity: 0.7,
      color: "rgb(232,224,192)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.003 2.937 C 3.109 2.937 4.005 2.279 4.005 1.468 C 4.005 0.657 3.109 0 2.003 0 C 0.897 0 0 0.657 0 1.468 C 0 2.279 0.897 2.937 2.003 2.937 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 29.038,
    height: 21.143,
    viewBox: "0 0 29.038 21.143",
    fill: "none",
    style: {
      position: "absolute",
      left: 1.001,
      top: 0,
      width: 29.038,
      height: 21.143,
      opacity: 0.8,
      color: "rgb(74,140,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14.519 21.143 C 22.537 21.143 29.038 16.41 29.038 10.571 C 29.038 4.733 22.537 0 14.519 0 C 6.5 0 0 4.733 0 10.571 C 0 16.41 6.5 21.143 14.519 21.143 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8.010,
    height: 9.397,
    viewBox: "0 0 8.010 9.397",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 8.222,
      width: 8.01,
      height: 9.397,
      opacity: 0.4,
      color: "rgb(90,158,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.005 9.397 C 6.217 9.397 8.01 7.293 8.01 4.698 C 8.01 2.104 6.217 0 4.005 0 C 1.793 0 0 2.104 0 4.698 C 0 7.293 1.793 9.397 4.005 9.397 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.009,
    height: 8.222,
    viewBox: "0 0 7.009 8.222",
    fill: "none",
    style: {
      position: "absolute",
      left: 23.531,
      top: 13.508,
      width: 7.009,
      height: 8.222,
      opacity: 0.4,
      color: "rgb(90,158,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.505 8.222 C 5.44 8.222 7.009 6.382 7.009 4.111 C 7.009 1.841 5.44 0 3.505 0 C 1.569 0 0 1.841 0 4.111 C 0 6.382 1.569 8.222 3.505 8.222 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 45.207,
      top: 17.333,
      width: 30.539,
      height: 49.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 6.008,
    height: 36.413,
    viewBox: "0 0 6.008 36.413",
    fill: "none",
    style: {
      position: "absolute",
      left: 13.017,
      top: 12.92,
      width: 6.008,
      height: 36.413,
      opacity: 0.75,
      color: "rgb(122,80,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.005 0 L 2.003 0 C 0.897 0 0 1.052 0 2.349 L 0 34.063 C 0 35.361 0.897 36.413 2.003 36.413 L 4.005 36.413 C 5.111 36.413 6.008 35.361 6.008 34.063 L 6.008 2.349 C 6.008 1.052 5.111 0 4.005 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.008,
    height: 9.397,
    viewBox: "0 0 6.008 9.397",
    fill: "none",
    style: {
      position: "absolute",
      left: 13.017,
      top: 25.841,
      width: 6.008,
      height: 9.397,
      opacity: 0.6,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.632 -0.404 C 0.409 -0.753 -0.055 -0.855 -0.404 -0.632 C -0.753 -0.409 -0.855 0.055 -0.632 0.404 L 0 0 L 0.632 -0.404 Z M 5.376 9.801 C 5.599 10.15 6.063 10.252 6.412 10.029 C 6.761 9.806 6.863 9.342 6.64 8.993 L 6.008 9.397 L 5.376 9.801 Z M 0 0 L -0.632 0.404 L 5.376 9.801 L 6.008 9.397 L 6.64 8.993 L 0.632 -0.404 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.001,
    height: 8.222,
    viewBox: "0 0 1.001 8.222",
    fill: "none",
    style: {
      position: "absolute",
      left: 15.52,
      top: 35.238,
      width: 1.001,
      height: 8.222,
      opacity: 0.8,
      color: "rgb(232,224,192)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.501 0 C -0.167 3.132 -0.167 5.873 0.501 8.222 C 1.168 5.873 1.168 3.132 0.501 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.005,
    height: 2.937,
    viewBox: "0 0 4.005 2.937",
    fill: "none",
    style: {
      position: "absolute",
      left: 14.018,
      top: 41.992,
      width: 4.005,
      height: 2.937,
      opacity: 0.7,
      color: "rgb(232,224,192)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.003 2.937 C 3.109 2.937 4.005 2.279 4.005 1.468 C 4.005 0.657 3.109 0 2.003 0 C 0.897 0 0 0.657 0 1.468 C 0 2.279 0.897 2.937 2.003 2.937 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 29.038,
    height: 21.143,
    viewBox: "0 0 29.038 21.143",
    fill: "none",
    style: {
      position: "absolute",
      left: 1.001,
      top: 0,
      width: 29.038,
      height: 21.143,
      opacity: 0.8,
      color: "rgb(74,140,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14.519 21.143 C 22.537 21.143 29.038 16.41 29.038 10.571 C 29.038 4.733 22.537 0 14.519 0 C 6.5 0 0 4.733 0 10.571 C 0 16.41 6.5 21.143 14.519 21.143 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8.010,
    height: 9.397,
    viewBox: "0 0 8.010 9.397",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 8.222,
      width: 8.01,
      height: 9.397,
      opacity: 0.4,
      color: "rgb(90,158,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.005 9.397 C 6.217 9.397 8.01 7.293 8.01 4.698 C 8.01 2.104 6.217 0 4.005 0 C 1.793 0 0 2.104 0 4.698 C 0 7.293 1.793 9.397 4.005 9.397 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.009,
    height: 8.222,
    viewBox: "0 0 7.009 8.222",
    fill: "none",
    style: {
      position: "absolute",
      left: 23.53,
      top: 13.508,
      width: 7.009,
      height: 8.222,
      opacity: 0.4,
      color: "rgb(90,158,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.505 8.222 C 5.44 8.222 7.009 6.382 7.009 4.111 C 7.009 1.841 5.44 0 3.505 0 C 1.569 0 0 1.841 0 4.111 C 0 6.382 1.569 8.222 3.505 8.222 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))));
  const __body14 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(238,245,224)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 26.667,
    height: 18.667,
    viewBox: "0 0 26.667 18.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 6.667,
      top: 38.667,
      width: 26.667,
      height: 18.667,
      opacity: 0.8,
      color: "rgb(122,176,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 13.333 18.667 C 20.697 18.667 26.667 14.488 26.667 9.333 C 26.667 4.179 20.697 0 13.333 0 C 5.97 0 0 4.179 0 9.333 C 0 14.488 5.97 18.667 13.333 18.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 13.333,
    height: 10.667,
    viewBox: "0 0 13.333 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 8,
      top: 40,
      width: 13.333,
      height: 10.667,
      opacity: 0.5,
      color: "rgb(142,192,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.667 10.667 C 10.349 10.667 13.333 8.279 13.333 5.333 C 13.333 2.388 10.349 0 6.667 0 C 2.985 0 0 2.388 0 5.333 C 0 8.279 2.985 10.667 6.667 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 32,
    height: 21.333,
    viewBox: "0 0 32 21.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 25.333,
      top: 34.667,
      width: 32,
      height: 21.333,
      opacity: 0.85,
      color: "rgb(90,144,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16 21.333 C 24.837 21.333 32 16.558 32 10.667 C 32 4.776 24.837 0 16 0 C 7.163 0 0 4.776 0 10.667 C 0 16.558 7.163 21.333 16 21.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 14.667,
    height: 10.667,
    viewBox: "0 0 14.667 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 28.667,
      top: 36.667,
      width: 14.667,
      height: 10.667,
      opacity: 0.5,
      color: "rgb(122,176,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.333 10.667 C 11.383 10.667 14.667 8.279 14.667 5.333 C 14.667 2.388 11.383 0 7.333 0 C 3.283 0 0 2.388 0 5.333 C 0 8.279 3.283 10.667 7.333 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 24,
    height: 16,
    viewBox: "0 0 24 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 52,
      top: 41.333,
      width: 24,
      height: 16,
      opacity: 0.8,
      color: "rgb(106,154,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 12 16 C 18.627 16 24 12.418 24 8 C 24 3.582 18.627 0 12 0 C 5.373 0 0 3.582 0 8 C 0 12.418 5.373 16 12 16 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 12,
    height: 9.333,
    viewBox: "0 0 12 9.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 54,
      top: 42,
      width: 12,
      height: 9.333,
      opacity: 0.45,
      color: "rgb(142,192,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6 9.333 C 9.314 9.333 12 7.244 12 4.667 C 12 2.089 9.314 0 6 0 C 2.686 0 0 2.089 0 4.667 C 0 7.244 2.686 9.333 6 9.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 20,
      top: 56,
      width: 44,
      height: 5.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 1.500,
    height: 5.333,
    viewBox: "-0.750 0 1.500 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 1.5,
      height: 5.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.75 0 C 0.75 -0.414 0.414 -0.75 0 -0.75 C -0.414 -0.75 -0.75 -0.414 -0.75 0 L 0 0 L 0.75 0 Z M -0.75 5.333 C -0.75 5.748 -0.414 6.083 0 6.083 C 0.414 6.083 0.75 5.748 0.75 5.333 L 0 5.333 L -0.75 5.333 Z M 0 0 L -0.75 0 L -0.75 5.333 L 0 5.333 L 0.75 5.333 L 0.75 0 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.500,
    height: 5.333,
    viewBox: "-0.750 0 1.500 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 21.333,
      top: 0,
      width: 1.5,
      height: 5.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.75 0 C 0.75 -0.414 0.414 -0.75 0 -0.75 C -0.414 -0.75 -0.75 -0.414 -0.75 0 L 0 0 L 0.75 0 Z M -0.75 5.333 C -0.75 5.748 -0.414 6.083 0 6.083 C 0.414 6.083 0.75 5.748 0.75 5.333 L 0 5.333 L -0.75 5.333 Z M 0 0 L -0.75 0 L -0.75 5.333 L 0 5.333 L 0.75 5.333 L 0.75 0 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.500,
    height: 5.333,
    viewBox: "-0.750 0 1.500 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 44,
      top: 0,
      width: 1.5,
      height: 5.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.75 0 C 0.75 -0.414 0.414 -0.75 0 -0.75 C -0.414 -0.75 -0.75 -0.414 -0.75 0 L 0 0 L 0.75 0 Z M -0.75 5.333 C -0.75 5.748 -0.414 6.083 0 6.083 C 0.414 6.083 0.75 5.748 0.75 5.333 L 0 5.333 L -0.75 5.333 Z M 0 0 L -0.75 0 L -0.75 5.333 L 0 5.333 L 0.75 5.333 L 0.75 0 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 66.667,
    height: 2.667,
    viewBox: "0 0 66.667 2.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 6.667,
      top: 61.333,
      width: 66.667,
      height: 2.667,
      opacity: 0.2,
      color: "rgb(74,112,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 65.333 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 C 0 2.07 0.597 2.667 1.333 2.667 L 65.333 2.667 C 66.07 2.667 66.667 2.07 66.667 1.333 C 66.667 0.597 66.07 0 65.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body15 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(244,240,252)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 18.667,
    height: 33.333,
    viewBox: "0 0 18.667 33.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 10.667,
      top: 29.333,
      width: 18.667,
      height: 33.333,
      opacity: 0.75,
      color: "rgb(112,96,192)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16.667 0 L 2 0 C 0.895 0 0 0.895 0 2 L 0 31.333 C 0 32.438 0.895 33.333 2 33.333 L 16.667 33.333 C 17.771 33.333 18.667 32.438 18.667 31.333 L 18.667 2 C 18.667 0.895 17.771 0 16.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 4,
    viewBox: "0 0 4 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 14.667,
      top: 34.667,
      width: 4,
      height: 4,
      opacity: 0.6,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 0 L 0.667 0 C 0.298 0 0 0.298 0 0.667 L 0 3.333 C 0 3.702 0.298 4 0.667 4 L 3.333 4 C 3.702 4 4 3.702 4 3.333 L 4 0.667 C 4 0.298 3.702 0 3.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 4,
    viewBox: "0 0 4 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 21.333,
      top: 34.667,
      width: 4,
      height: 4,
      opacity: 0.6,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 0 L 0.667 0 C 0.298 0 0 0.298 0 0.667 L 0 3.333 C 0 3.702 0.298 4 0.667 4 L 3.333 4 C 3.702 4 4 3.702 4 3.333 L 4 0.667 C 4 0.298 3.702 0 3.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 4,
    viewBox: "0 0 4 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 14.667,
      top: 42.667,
      width: 4,
      height: 4,
      opacity: 0.6,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 0 L 0.667 0 C 0.298 0 0 0.298 0 0.667 L 0 3.333 C 0 3.702 0.298 4 0.667 4 L 3.333 4 C 3.702 4 4 3.702 4 3.333 L 4 0.667 C 4 0.298 3.702 0 3.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 4,
    viewBox: "0 0 4 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 21.333,
      top: 42.667,
      width: 4,
      height: 4,
      opacity: 0.6,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 0 L 0.667 0 C 0.298 0 0 0.298 0 0.667 L 0 3.333 C 0 3.702 0.298 4 0.667 4 L 3.333 4 C 3.702 4 4 3.702 4 3.333 L 4 0.667 C 4 0.298 3.702 0 3.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 24,
    viewBox: "0 0 16 24",
    fill: "none",
    style: {
      position: "absolute",
      left: 32,
      top: 38.667,
      width: 16,
      height: 24,
      opacity: 0.7,
      color: "rgb(144,128,208)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14 0 L 2 0 C 0.895 0 0 0.895 0 2 L 0 22 C 0 23.105 0.895 24 2 24 L 14 24 C 15.105 24 16 23.105 16 22 L 16 2 C 16 0.895 15.105 0 14 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 4,
    viewBox: "0 0 4 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 36,
      top: 44,
      width: 4,
      height: 4,
      opacity: 0.6,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 0 L 0.667 0 C 0.298 0 0 0.298 0 0.667 L 0 3.333 C 0 3.702 0.298 4 0.667 4 L 3.333 4 C 3.702 4 4 3.702 4 3.333 L 4 0.667 C 4 0.298 3.702 0 3.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 4,
    viewBox: "0 0 4 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 40,
      top: 44,
      width: 4,
      height: 4,
      opacity: 0.45,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 0 L 0.667 0 C 0.298 0 0 0.298 0 0.667 L 0 3.333 C 0 3.702 0.298 4 0.667 4 L 3.333 4 C 3.702 4 4 3.702 4 3.333 L 4 0.667 C 4 0.298 3.702 0 3.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4,
    height: 4,
    viewBox: "0 0 4 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 36,
      top: 52,
      width: 4,
      height: 4,
      opacity: 0.6,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 0 L 0.667 0 C 0.298 0 0 0.298 0 0.667 L 0 3.333 C 0 3.702 0.298 4 0.667 4 L 3.333 4 C 3.702 4 4 3.702 4 3.333 L 4 0.667 C 4 0.298 3.702 0 3.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 18.667,
    height: 12,
    viewBox: "0 0 18.667 12",
    fill: "none",
    style: {
      position: "absolute",
      left: 50.667,
      top: 25.333,
      width: 18.667,
      height: 12,
      opacity: 0.65,
      color: "rgb(90,64,160)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 12 L 18.667 12 L 9.333 0 L 0 12 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 18.667,
    height: 25.333,
    viewBox: "0 0 18.667 25.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 50.667,
      top: 37.333,
      width: 18.667,
      height: 25.333,
      opacity: 0.65,
      color: "rgb(112,96,192)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 17.333 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 L 0 24 C 0 24.736 0.597 25.333 1.333 25.333 L 17.333 25.333 C 18.07 25.333 18.667 24.736 18.667 24 L 18.667 1.333 C 18.667 0.597 18.07 0 17.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 6.667,
    viewBox: "0 0 5.333 6.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 56,
      top: 48,
      width: 5.333,
      height: 6.667,
      opacity: 0.55,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.667 0 L 0.667 0 C 0.298 0 0 0.298 0 0.667 L 0 6 C 0 6.368 0.298 6.667 0.667 6.667 L 4.667 6.667 C 5.035 6.667 5.333 6.368 5.333 6 L 5.333 0.667 C 5.333 0.298 5.035 0 4.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 66.667,
    height: 2.667,
    viewBox: "0 0 66.667 2.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 6.667,
      top: 62.667,
      width: 66.667,
      height: 2.667,
      opacity: 0.35,
      color: "rgb(160,144,224)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 65.333 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 C 0 2.07 0.597 2.667 1.333 2.667 L 65.333 2.667 C 66.07 2.667 66.667 2.07 66.667 1.333 C 66.667 0.597 66.07 0 65.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body16 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(216,238,250)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 61.333,
    height: 45.333,
    viewBox: "0 0 61.333 45.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 9.333,
      top: 18.667,
      width: 61.333,
      height: 45.333,
      opacity: 0.2,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 30.667 45.333 C 47.603 45.333 61.333 35.185 61.333 22.667 C 61.333 10.148 47.603 0 30.667 0 C 13.73 0 0 10.148 0 22.667 C 0 35.185 13.73 45.333 30.667 45.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 56,
    height: 5.037,
    viewBox: "0 0 56 5.037",
    fill: "none",
    style: {
      position: "absolute",
      left: 12,
      top: 36.296,
      width: 56,
      height: 5.037,
      opacity: 0.7,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.486 2.83 C -0.968 3.098 -1.142 3.707 -0.874 4.189 C -0.606 4.672 0.003 4.846 0.486 4.578 L 0 3.704 L -0.486 2.83 Z M 56.406 3.284 C 56.911 3.06 57.138 2.469 56.914 1.964 C 56.69 1.46 56.099 1.232 55.594 1.457 L 56 2.37 L 56.406 3.284 Z M 0 3.704 L 0.486 4.578 C 8.186 0.3 17.218 -0.17 27.684 3.319 L 28 2.37 L 28.316 1.422 C 17.449 -2.201 7.814 -1.781 -0.486 2.83 L 0 3.704 Z M 28 2.37 L 27.684 3.319 C 38.518 6.93 48.119 6.967 56.406 3.284 L 56 2.37 L 55.594 1.457 C 47.881 4.885 38.816 4.922 28.316 1.422 L 28 2.37 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 50.667,
    height: 5.037,
    viewBox: "0 0 50.667 5.037",
    fill: "none",
    style: {
      position: "absolute",
      left: 14.667,
      top: 44.296,
      width: 50.667,
      height: 5.037,
      opacity: 0.55,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.437 2.917 C -0.872 3.158 -1.028 3.706 -0.787 4.141 C -0.545 4.575 0.003 4.732 0.437 4.49 L 0 3.704 L -0.437 2.917 Z M 51.032 3.193 C 51.486 2.991 51.691 2.459 51.489 2.005 C 51.287 1.551 50.755 1.346 50.301 1.548 L 50.667 2.37 L 51.032 3.193 Z M 0 3.704 L 0.437 4.49 C 8.188 0.184 16.348 -0.254 24.999 3.206 L 25.333 2.37 L 25.668 1.535 C 16.541 -2.116 7.812 -1.666 -0.437 2.917 L 0 3.704 Z M 25.333 2.37 L 24.999 3.206 C 34.09 6.842 42.788 6.857 51.032 3.193 L 50.667 2.37 L 50.301 1.548 C 42.545 4.995 34.354 5.009 25.668 1.535 L 25.333 2.37 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 42.667,
    height: 3.714,
    viewBox: "0 0 42.667 3.714",
    fill: "none",
    style: {
      position: "absolute",
      left: 18.667,
      top: 51.619,
      width: 42.667,
      height: 3.714,
      opacity: 0.38,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.284 2.408 C -0.638 2.565 -0.797 2.979 -0.64 3.332 C -0.483 3.685 -0.069 3.844 0.284 3.687 L 0 3.048 L -0.284 2.408 Z M 42.888 2.378 C 43.255 2.256 43.453 1.86 43.331 1.493 C 43.208 1.126 42.812 0.928 42.445 1.05 L 42.667 1.714 L 42.888 2.378 Z M 0 3.048 L 0.284 3.687 C 8.161 0.186 15.063 -0.211 21.058 2.358 L 21.333 1.714 L 21.609 1.071 C 15.159 -1.693 7.839 -1.202 -0.284 2.408 L 0 3.048 Z M 21.333 1.714 L 21.058 2.358 C 27.473 5.107 34.767 5.085 42.888 2.378 L 42.667 1.714 L 42.445 1.05 C 34.566 3.677 27.638 3.655 21.609 1.071 L 21.333 1.714 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8,
    height: 8,
    viewBox: "0 0 8 8",
    fill: "none",
    style: {
      position: "absolute",
      left: 36,
      top: 34.667,
      width: 8,
      height: 8,
      opacity: 0.18,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4 8 C 6.209 8 8 6.209 8 4 C 8 1.791 6.209 0 4 0 C 1.791 0 0 1.791 0 4 C 0 6.209 1.791 8 4 8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 32,
      top: 30.667,
      width: 16,
      height: 16,
      opacity: 0.2,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16 8 L 15.5 8 C 15.5 12.142 12.142 15.5 8 15.5 L 8 16 L 8 16.5 C 12.694 16.5 16.5 12.694 16.5 8 L 16 8 Z M 8 16 L 8 15.5 C 3.858 15.5 0.5 12.142 0.5 8 L 0 8 L -0.5 8 C -0.5 12.694 3.306 16.5 8 16.5 L 8 16 Z M 0 8 L 0.5 8 C 0.5 3.858 3.858 0.5 8 0.5 L 8 0 L 8 -0.5 C 3.306 -0.5 -0.5 3.306 -0.5 8 L 0 8 Z M 8 0 L 8 0.5 C 12.142 0.5 15.5 3.858 15.5 8 L 16 8 L 16.5 8 C 16.5 3.306 12.694 -0.5 8 -0.5 L 8 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body17 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(220,238,240)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 69.333,
    height: 17.333,
    viewBox: "0 0 69.333 17.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 49.333,
      width: 69.333,
      height: 17.333,
      opacity: 0.3,
      color: "rgb(90,174,204)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 2.667 C 8.889 -0.889 18.222 -0.889 28 2.667 C 37.778 6.222 47.111 6.222 56 2.667 C 62.222 0.444 66.667 0 69.333 1.333 L 69.333 17.333 L 0 17.333 L 0 2.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 16,
      top: 25.333,
      width: 44,
      height: 26.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 2,
    height: 22.667,
    viewBox: "-1 0 2 22.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 4,
      width: 2,
      height: 22.667,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1 22.667 C -1 23.219 -0.552 23.667 0 23.667 C 0.552 23.667 1 23.219 1 22.667 L 0 22.667 L -1 22.667 Z M 1 0 C 1 -0.552 0.552 -1 0 -1 C -0.552 -1 -1 -0.552 -1 0 L 0 0 L 1 0 Z M 0 22.667 L 1 22.667 L 1 0 L 0 0 L -1 0 L -1 22.667 L 0 22.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2,
    height: 25.333,
    viewBox: "-1 0 2 25.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 10.667,
      top: 1.333,
      width: 2,
      height: 25.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1 25.333 C -1 25.886 -0.552 26.333 0 26.333 C 0.552 26.333 1 25.886 1 25.333 L 0 25.333 L -1 25.333 Z M 1 0 C 1 -0.552 0.552 -1 0 -1 C -0.552 -1 -1 -0.552 -1 0 L 0 0 L 1 0 Z M 0 25.333 L 1 25.333 L 1 0 L 0 0 L -1 0 L -1 25.333 L 0 25.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2,
    height: 24,
    viewBox: "-1 0 2 24",
    fill: "none",
    style: {
      position: "absolute",
      left: 22.667,
      top: 2.667,
      width: 2,
      height: 24,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1 24 C -1 24.552 -0.552 25 0 25 C 0.552 25 1 24.552 1 24 L 0 24 L -1 24 Z M 1 0 C 1 -0.552 0.552 -1 0 -1 C -0.552 -1 -1 -0.552 -1 0 L 0 0 L 1 0 Z M 0 24 L 1 24 L 1 0 L 0 0 L -1 0 L -1 24 L 0 24 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2,
    height: 26.667,
    viewBox: "-1 0 2 26.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 33.333,
      top: 0,
      width: 2,
      height: 26.667,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1 26.667 C -1 27.219 -0.552 27.667 0 27.667 C 0.552 27.667 1 27.219 1 26.667 L 0 26.667 L -1 26.667 Z M 1 0 C 1 -0.552 0.552 -1 0 -1 C -0.552 -1 -1 -0.552 -1 0 L 0 0 L 1 0 Z M 0 26.667 L 1 26.667 L 1 0 L 0 0 L -1 0 L -1 26.667 L 0 26.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2,
    height: 22.667,
    viewBox: "-1 0 2 22.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 44,
      top: 4,
      width: 2,
      height: 22.667,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1 22.667 C -1 23.219 -0.552 23.667 0 23.667 C 0.552 23.667 1 23.219 1 22.667 L 0 22.667 L -1 22.667 Z M 1 0 C 1 -0.552 0.552 -1 0 -1 C -0.552 -1 -1 -0.552 -1 0 L 0 0 L 1 0 Z M 0 22.667 L 1 22.667 L 1 0 L 0 0 L -1 0 L -1 22.667 L 0 22.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 13.333,
      top: 22.667,
      width: 49.333,
      height: 14.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 10.667,
    viewBox: "0 0 5.333 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 4,
      width: 5.333,
      height: 10.667,
      color: "rgb(122,74,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 10.667 C 4.139 10.667 5.333 8.279 5.333 5.333 C 5.333 2.388 4.139 0 2.667 0 C 1.194 0 0 2.388 0 5.333 C 0 8.279 1.194 10.667 2.667 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 10.667,
    viewBox: "0 0 5.333 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 10.667,
      top: 1.333,
      width: 5.333,
      height: 10.667,
      color: "rgb(122,74,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 10.667 C 4.139 10.667 5.333 8.279 5.333 5.333 C 5.333 2.388 4.139 0 2.667 0 C 1.194 0 0 2.388 0 5.333 C 0 8.279 1.194 10.667 2.667 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 10.667,
    viewBox: "0 0 5.333 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 22.667,
      top: 2.667,
      width: 5.333,
      height: 10.667,
      color: "rgb(122,74,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 10.667 C 4.139 10.667 5.333 8.279 5.333 5.333 C 5.333 2.388 4.139 0 2.667 0 C 1.194 0 0 2.388 0 5.333 C 0 8.279 1.194 10.667 2.667 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 10.667,
    viewBox: "0 0 5.333 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 33.333,
      top: 0,
      width: 5.333,
      height: 10.667,
      color: "rgb(122,74,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 10.667 C 4.139 10.667 5.333 8.279 5.333 5.333 C 5.333 2.388 4.139 0 2.667 0 C 1.194 0 0 2.388 0 5.333 C 0 8.279 1.194 10.667 2.667 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 10.667,
    viewBox: "0 0 5.333 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 44,
      top: 4,
      width: 5.333,
      height: 10.667,
      color: "rgb(122,74,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 10.667 C 4.139 10.667 5.333 8.279 5.333 5.333 C 5.333 2.388 4.139 0 2.667 0 C 1.194 0 0 2.388 0 5.333 C 0 8.279 1.194 10.667 2.667 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 68,
    height: 4,
    viewBox: "0 0 68 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 6.667,
      top: 52.667,
      width: 68,
      height: 4,
      opacity: 0.5,
      color: "rgb(42,138,170)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.216 1.282 C -0.612 1.401 -0.837 1.819 -0.718 2.216 C -0.599 2.612 -0.181 2.837 0.216 2.718 L 0 2 L -0.216 1.282 Z M 53.333 2 L 53.127 1.279 L 53.118 1.282 L 53.333 2 Z M 67.737 2.036 C 68.124 2.181 68.557 1.985 68.702 1.597 C 68.848 1.209 68.651 0.777 68.263 0.631 L 68 1.333 L 67.737 2.036 Z M 0 2 L 0.216 2.718 C 8.964 0.094 17.703 0.094 26.451 2.718 L 26.667 2 L 26.882 1.282 C 17.853 -1.427 8.814 -1.427 -0.216 1.282 L 0 2 Z M 26.667 2 L 26.451 2.718 C 35.481 5.427 44.519 5.427 53.549 2.718 L 53.333 2 L 53.118 1.282 C 44.37 3.906 35.63 3.906 26.882 1.282 L 26.667 2 Z M 53.333 2 L 53.539 2.721 C 59.705 0.96 64.405 0.786 67.737 2.036 L 68 1.333 L 68.263 0.631 C 64.484 -0.786 59.406 -0.515 53.127 1.279 L 53.333 2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body18 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(240,246,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 48,
    height: 44,
    viewBox: "0 0 48 44",
    fill: "none",
    style: {
      position: "absolute",
      left: 16,
      top: 10.667,
      width: 48,
      height: 44,
      opacity: 0.7,
      color: "rgb(200,216,240)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 24 0 L 48 44 L 0 44 L 24 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 24,
    height: 20,
    viewBox: "0 0 24 20",
    fill: "none",
    style: {
      position: "absolute",
      left: 28,
      top: 10.667,
      width: 24,
      height: 20,
      opacity: 0.95,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 12 0 L 24 20 L 0 20 L 12 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 18.667,
    height: 16,
    viewBox: "0 0 18.667 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 30.667,
      top: 10.667,
      width: 18.667,
      height: 16,
      color: "rgb(232,240,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.333 0 L 18.667 16 L 0 16 L 9.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 50.2,
      top: 13.333,
      width: 11.6,
      height: 13.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 1.500,
    height: 13.333,
    viewBox: "-0.750 0 1.500 13.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.8,
      top: 0,
      width: 1.5,
      height: 13.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.75 0 C 0.75 -0.414 0.414 -0.75 0 -0.75 C -0.414 -0.75 -0.75 -0.414 -0.75 0 L 0 0 L 0.75 0 Z M -0.75 13.333 C -0.75 13.748 -0.414 14.083 0 14.083 C 0.414 14.083 0.75 13.748 0.75 13.333 L 0 13.333 L -0.75 13.333 Z M 0 0 L -0.75 0 L -0.75 13.333 L 0 13.333 L 0.75 13.333 L 0.75 0 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 11.600,
    height: 6.667,
    viewBox: "0 0 11.600 6.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 3.333,
      width: 11.6,
      height: 6.667,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.374 -0.65 C 0.015 -0.857 -0.444 -0.733 -0.65 -0.374 C -0.857 -0.015 -0.733 0.444 -0.374 0.65 L 0 0 L 0.374 -0.65 Z M 11.226 7.317 C 11.585 7.523 12.044 7.4 12.25 7.04 C 12.457 6.681 12.333 6.223 11.974 6.016 L 11.6 6.667 L 11.226 7.317 Z M 0 0 L -0.374 0.65 L 11.226 7.317 L 11.6 6.667 L 11.974 6.016 L 0.374 -0.65 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 11.600,
    height: 6.667,
    viewBox: "0 0 11.600 6.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 3.333,
      width: 11.6,
      height: 6.667,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.374 6.016 C -0.733 6.223 -0.857 6.681 -0.65 7.04 C -0.444 7.4 0.015 7.523 0.374 7.317 L 0 6.667 L -0.374 6.016 Z M 11.974 0.65 C 12.333 0.444 12.457 -0.015 12.25 -0.374 C 12.044 -0.733 11.585 -0.857 11.226 -0.65 L 11.6 0 L 11.974 0.65 Z M 0 6.667 L 0.374 7.317 L 11.974 0.65 L 11.6 0 L 11.226 -0.65 L -0.374 6.016 L 0 6.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2.667,
    height: 1.333,
    viewBox: "0 0 2.667 1.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 3.133,
      top: 0,
      width: 2.667,
      height: 1.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.335 0.663 C -0.706 0.848 -0.856 1.298 -0.671 1.669 C -0.486 2.039 -0.035 2.189 0.335 2.004 L 0 1.333 L -0.335 0.663 Z M 3.002 0.671 C 3.373 0.486 3.523 0.035 3.337 -0.335 C 3.152 -0.706 2.702 -0.856 2.331 -0.671 L 2.667 0 L 3.002 0.671 Z M 0 1.333 L 0.335 2.004 L 3.002 0.671 L 2.667 0 L 2.331 -0.671 L -0.335 0.663 L 0 1.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2.667,
    height: 1.333,
    viewBox: "0 0 2.667 1.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.8,
      top: 0,
      width: 2.667,
      height: 1.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.331 2.004 C 2.702 2.189 3.152 2.039 3.337 1.669 C 3.523 1.298 3.373 0.848 3.002 0.663 L 2.667 1.333 L 2.331 2.004 Z M 0.335 -0.671 C -0.035 -0.856 -0.486 -0.706 -0.671 -0.335 C -0.856 0.035 -0.706 0.486 -0.335 0.671 L 0 0 L 0.335 -0.671 Z M 2.667 1.333 L 3.002 0.663 L 0.335 -0.671 L 0 0 L -0.335 0.671 L 2.331 2.004 L 2.667 1.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.133,
    height: 2.667,
    viewBox: "0 0 1.133 2.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 10.467,
      top: 5.333,
      width: 1.133,
      height: 2.667,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.69 2.373 C -0.852 2.755 -0.675 3.195 -0.293 3.357 C 0.088 3.519 0.528 3.341 0.69 2.96 L 0 2.667 L -0.69 2.373 Z M 1.824 0.293 C 1.986 -0.088 1.808 -0.528 1.427 -0.69 C 1.045 -0.852 0.605 -0.675 0.443 -0.293 L 1.133 0 L 1.824 0.293 Z M 0 2.667 L 0.69 2.96 L 1.824 0.293 L 1.133 0 L 0.443 -0.293 L -0.69 2.373 L 0 2.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.133,
    height: 2.667,
    viewBox: "0 0 1.133 2.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 10.467,
      top: 5.333,
      width: 1.133,
      height: 2.667,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.69 -0.293 C 0.528 -0.675 0.088 -0.852 -0.293 -0.69 C -0.675 -0.528 -0.852 -0.088 -0.69 0.293 L 0 0 L 0.69 -0.293 Z M 0.443 2.96 C 0.605 3.341 1.045 3.519 1.427 3.357 C 1.808 3.195 1.986 2.755 1.824 2.373 L 1.133 2.667 L 0.443 2.96 Z M 0 0 L -0.69 0.293 L 0.443 2.96 L 1.133 2.667 L 1.824 2.373 L 0.69 -0.293 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 58.667,
    height: 9.333,
    viewBox: "0 0 58.667 9.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 10.667,
      top: 54.667,
      width: 58.667,
      height: 9.333,
      opacity: 0.4,
      color: "rgb(168,192,232)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 56 0 L 2.667 0 C 1.194 0 0 1.194 0 2.667 L 0 6.667 C 0 8.139 1.194 9.333 2.667 9.333 L 56 9.333 C 57.473 9.333 58.667 8.139 58.667 6.667 L 58.667 2.667 C 58.667 1.194 57.473 0 56 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body19 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 80,
      height: 80,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 80,
      height: 80,
      color: "rgb(244,242,240)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.667 0 L 9.333 0 C 4.179 0 0 4.179 0 9.333 L 0 70.667 C 0 75.821 4.179 80 9.333 80 L 70.667 80 C 75.821 80 80 75.821 80 70.667 L 80 9.333 C 80 4.179 75.821 0 70.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 24,
    height: 22.667,
    viewBox: "0 0 24 22.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 9.333,
      top: 14.667,
      width: 24,
      height: 22.667,
      opacity: 0.5,
      color: "rgb(106,176,76)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 20.667 0 L 3.333 0 C 1.492 0 0 1.492 0 3.333 L 0 19.333 C 0 21.174 1.492 22.667 3.333 22.667 L 20.667 22.667 C 22.508 22.667 24 21.174 24 19.333 L 24 3.333 C 24 1.492 22.508 0 20.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 18.667,
    height: 20,
    viewBox: "0 0 18.667 20",
    fill: "none",
    style: {
      position: "absolute",
      left: 12,
      top: 16,
      width: 18.667,
      height: 20,
      opacity: 0.5,
      color: "rgb(45,107,50)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.333 0 L 18.667 20 L 0 20 L 9.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 33.333,
    height: 22.667,
    viewBox: "0 0 33.333 22.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 37.333,
      top: 14.667,
      width: 33.333,
      height: 22.667,
      opacity: 0.25,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 30 0 L 3.333 0 C 1.492 0 0 1.492 0 3.333 L 0 19.333 C 0 21.174 1.492 22.667 3.333 22.667 L 30 22.667 C 31.841 22.667 33.333 21.174 33.333 19.333 L 33.333 3.333 C 33.333 1.492 31.841 0 30 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 30.667,
    height: 4,
    viewBox: "0 0 30.667 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 38.667,
      top: 26,
      width: 30.667,
      height: 4,
      opacity: 0.55,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.386 1.357 C -0.741 1.57 -0.856 2.031 -0.643 2.386 C -0.43 2.741 0.031 2.856 0.386 2.643 L 0 2 L -0.386 1.357 Z M 31.002 2.671 C 31.373 2.486 31.523 2.035 31.337 1.665 C 31.152 1.294 30.702 1.144 30.331 1.329 L 30.667 2 L 31.002 2.671 Z M 0 2 L 0.386 2.643 C 4.574 0.13 9.187 0.099 14.331 2.671 L 14.667 2 L 15.002 1.329 C 9.48 -1.432 4.315 -1.463 -0.386 1.357 L 0 2 Z M 14.667 2 L 14.331 2.671 C 19.876 5.443 25.458 5.443 31.002 2.671 L 30.667 2 L 30.331 1.329 C 25.209 3.89 20.124 3.89 15.002 1.329 L 14.667 2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 30.667,
    height: 4,
    viewBox: "0 0 30.667 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 38.667,
      top: 19.333,
      width: 30.667,
      height: 4,
      opacity: 0.55,
      color: "rgb(21,101,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.386 1.357 C -0.741 1.57 -0.856 2.031 -0.643 2.386 C -0.43 2.741 0.031 2.856 0.386 2.643 L 0 2 L -0.386 1.357 Z M 31.002 2.671 C 31.373 2.486 31.523 2.035 31.337 1.665 C 31.152 1.294 30.702 1.144 30.331 1.329 L 30.667 2 L 31.002 2.671 Z M 0 2 L 0.386 2.643 C 4.574 0.13 9.187 0.099 14.331 2.671 L 14.667 2 L 15.002 1.329 C 9.48 -1.432 4.315 -1.463 -0.386 1.357 L 0 2 Z M 14.667 2 L 14.331 2.671 C 19.876 5.443 25.458 5.443 31.002 2.671 L 30.667 2 L 30.331 1.329 C 25.209 3.89 20.124 3.89 15.002 1.329 L 14.667 2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 46.667,
      top: 41.333,
      width: 24,
      height: 22.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 24,
    height: 22.667,
    viewBox: "0 0 24 22.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 24,
      height: 22.667,
      opacity: 0.45,
      color: "rgb(201,169,110)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 20.667 0 L 3.333 0 C 1.492 0 0 1.492 0 3.333 L 0 19.333 C 0 21.174 1.492 22.667 3.333 22.667 L 20.667 22.667 C 22.508 22.667 24 21.174 24 19.333 L 24 3.333 C 24 1.492 22.508 0 20.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 4,
    viewBox: "0 0 6.667 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 8.667,
      top: 7.333,
      width: 6.667,
      height: 4,
      opacity: 0.45,
      color: "rgb(160,120,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 4 C 5.174 4 6.667 3.105 6.667 2 C 6.667 0.895 5.174 0 3.333 0 C 1.492 0 0 0.895 0 2 C 0 3.105 1.492 4 3.333 4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 4,
    viewBox: "0 0 6.667 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 13.333,
      width: 6.667,
      height: 4,
      opacity: 0.45,
      color: "rgb(160,120,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 4 C 5.174 4 6.667 3.105 6.667 2 C 6.667 0.895 5.174 0 3.333 0 C 1.492 0 0 0.895 0 2 C 0 3.105 1.492 4 3.333 4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.667,
    height: 4,
    viewBox: "0 0 6.667 4",
    fill: "none",
    style: {
      position: "absolute",
      left: 14.667,
      top: 13.333,
      width: 6.667,
      height: 4,
      opacity: 0.45,
      color: "rgb(160,120,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.333 4 C 5.174 4 6.667 3.105 6.667 2 C 6.667 0.895 5.174 0 3.333 0 C 1.492 0 0 0.895 0 2 C 0 3.105 1.492 4 3.333 4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 9.333,
      top: 41.333,
      width: 33.333,
      height: 22.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 33.333,
    height: 22.667,
    viewBox: "0 0 33.333 22.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 33.333,
      height: 22.667,
      opacity: 0.3,
      color: "rgb(144,128,208)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 30 0 L 3.333 0 C 1.492 0 0 1.492 0 3.333 L 0 19.333 C 0 21.174 1.492 22.667 3.333 22.667 L 30 22.667 C 31.841 22.667 33.333 21.174 33.333 19.333 L 33.333 3.333 C 33.333 1.492 31.841 0 30 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8,
    height: 12,
    viewBox: "0 0 8 12",
    fill: "none",
    style: {
      position: "absolute",
      left: 6.667,
      top: 5.333,
      width: 8,
      height: 12,
      opacity: 0.5,
      color: "rgb(112,96,192)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.667 0 L 1.333 0 C 0.597 0 0 0.597 0 1.333 L 0 10.667 C 0 11.403 0.597 12 1.333 12 L 6.667 12 C 7.403 12 8 11.403 8 10.667 L 8 1.333 C 8 0.597 7.403 0 6.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8,
    height: 5.333,
    viewBox: "0 0 8 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 21.333,
      top: 7.333,
      width: 8,
      height: 5.333,
      opacity: 0.45,
      color: "rgb(90,64,160)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 5.333 L 8 5.333 L 4 0 L 0 5.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))));
  const __impls = {
    // figma: Property 1=Aquaculture
    "property1=aquaculture": __body0,
    // figma: Property 1=Barren
    "property1=barren": __body1,
    // figma: Property 1=Cropland
    "property1=cropland": __body2,
    // figma: Property 1=Crop plantation
    "property1=crop plantation": __body3,
    // figma: Property 1=Deciduous
    "property1=deciduous": __body4,
    // figma: Property 1=Evergreen
    "property1=evergreen": __body5,
    // figma: Property 1=Flooded forests
    "property1=flooded forests": __body6,
    // figma: Property 1=Forest plantation
    "property1=forest plantation": __body7,
    // figma: Property 1=Grass
    "property1=grass": __body8,
    // figma: Property 1=Mangrove
    "property1=mangrove": __body9,
    // figma: Property 1=Mixed forest
    "property1=mixed forest": __body10,
    // figma: Property 1=Oil palm
    "property1=oil palm": __body11,
    // figma: Property 1=Rice
    "property1=rice": __body12,
    // figma: Property 1=Rubber
    "property1=rubber": __body13,
    // figma: Property 1=Shrub
    "property1=shrub": __body14,
    // figma: Property 1=Settlement
    "property1=settlement": __body15,
    // figma: Property 1=Water
    "property1=water": __body16,
    // figma: Property 1=Wetlands
    "property1=wetlands": __body17,
    // figma: Property 1=Snow and ice
    "property1=snow and ice": __body18,
    // figma: Property 1=Other land
    "property1=other land": __body19
  };
  return (__impls[__vkey_IconLandCover(props)] ?? __body0)();
}

// figma node: 2:5242 Icon: Natural Disaster (12 variants)
const __venc_IconNaturalDisaster = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey_IconNaturalDisaster = p => "property1=" + __venc_IconNaturalDisaster(p.property1) + '|' + "opsi2=" + __venc_IconNaturalDisaster(p.opsi2) + '|' + "image=" + __venc_IconNaturalDisaster(p.image);
function IconNaturalDisaster(_p = {}) {
  const props = {
    ..._p,
    property1: _p.property1 ?? "drought",
    opsi2: _p.opsi2 ?? false,
    image: _p.image ?? false
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 160,
      height: 213.333,
      overflow: "hidden",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 2.123,
      width: 160,
      height: 275.954,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 275.954,
    viewBox: "0 0 160 275.954",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 160,
      height: 275.954,
      color: "rgb(184,216,240)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 145.067 0 L 14.933 0 C 6.686 0 0 6.653 0 14.859 L 0 261.095 C 0 269.301 6.686 275.954 14.933 275.954 L 145.067 275.954 C 153.314 275.954 160 269.301 160 261.095 L 160 14.859 C 160 6.653 153.314 0 145.067 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 57.600,
    height: 34.133,
    viewBox: "0 0 57.600 34.133",
    fill: "none",
    style: {
      position: "absolute",
      left: 11.733,
      top: 21.344,
      width: 57.6,
      height: 34.133,
      color: "rgb(90,122,152)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 28.8 34.133 C 44.706 34.133 57.6 26.492 57.6 17.067 C 57.6 7.641 44.706 0 28.8 0 C 12.894 0 0 7.641 0 17.067 C 0 26.492 12.894 34.133 28.8 34.133 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 65.067,
    height: 37.333,
    viewBox: "0 0 65.067 37.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 38.4,
      top: 12.811,
      width: 65.067,
      height: 37.333,
      color: "rgb(74,106,136)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 32.533 37.333 C 50.501 37.333 65.067 28.976 65.067 18.667 C 65.067 8.357 50.501 0 32.533 0 C 14.566 0 0 8.357 0 18.667 C 0 28.976 14.566 37.333 32.533 37.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 54.400,
    height: 30.933,
    viewBox: "0 0 54.400 30.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 100.267,
      top: 19.211,
      width: 54.4,
      height: 30.933,
      color: "rgb(90,122,152)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 27.2 30.933 C 42.222 30.933 54.4 24.009 54.4 15.467 C 54.4 6.925 42.222 0 27.2 0 C 12.178 0 0 6.925 0 15.467 C 0 24.009 12.178 30.933 27.2 30.933 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 38.400,
    height: 23.467,
    viewBox: "0 0 38.400 23.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 34.133,
      top: 16.011,
      width: 38.4,
      height: 23.467,
      color: "rgb(58,90,120)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 19.2 23.467 C 29.804 23.467 38.4 18.213 38.4 11.733 C 38.4 5.253 29.804 0 19.2 0 C 8.596 0 0 5.253 0 11.733 C 0 18.213 8.596 23.467 19.2 23.467 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 44.800,
    height: 27.733,
    viewBox: "0 0 44.800 27.733",
    fill: "none",
    style: {
      position: "absolute",
      left: 72.533,
      top: 18.144,
      width: 44.8,
      height: 27.733,
      color: "rgb(58,90,120)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 22.4 27.733 C 34.771 27.733 44.8 21.525 44.8 13.867 C 44.8 6.208 34.771 0 22.4 0 C 10.029 0 0 6.208 0 13.867 C 0 21.525 10.029 27.733 22.4 27.733 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 14.933,
      top: 46.7,
      width: 128,
      height: 42.454,
      opacity: 0.7,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.104,
    viewBox: "0 0 4.267 19.104",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 4.245,
      width: 4.267,
      height: 19.104,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.891 0.139 C 4.968 -0.205 4.751 -0.548 4.406 -0.625 C 4.061 -0.702 3.719 -0.484 3.642 -0.139 L 4.267 0 L 4.891 0.139 Z M -0.625 18.965 C -0.702 19.31 -0.484 19.652 -0.139 19.729 C 0.205 19.806 0.548 19.589 0.625 19.244 L 0 19.104 L -0.625 18.965 Z M 4.267 0 L 3.642 -0.139 L -0.625 18.965 L 0 19.104 L 0.625 19.244 L 4.891 0.139 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.104,
    viewBox: "0 0 4.267 19.104",
    fill: "none",
    style: {
      position: "absolute",
      left: 12.8,
      top: 0,
      width: 4.267,
      height: 19.104,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.891 0.139 C 4.968 -0.205 4.751 -0.548 4.406 -0.625 C 4.061 -0.702 3.719 -0.484 3.642 -0.139 L 4.267 0 L 4.891 0.139 Z M -0.625 18.965 C -0.702 19.31 -0.484 19.652 -0.139 19.729 C 0.205 19.806 0.548 19.589 0.625 19.244 L 0 19.104 L -0.625 18.965 Z M 4.267 0 L 3.642 -0.139 L -0.625 18.965 L 0 19.104 L 0.625 19.244 L 4.891 0.139 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.104,
    viewBox: "0 0 4.267 19.104",
    fill: "none",
    style: {
      position: "absolute",
      left: 27.733,
      top: 6.368,
      width: 4.267,
      height: 19.104,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.891 0.139 C 4.968 -0.205 4.751 -0.548 4.406 -0.625 C 4.061 -0.702 3.719 -0.484 3.642 -0.139 L 4.267 0 L 4.891 0.139 Z M -0.625 18.965 C -0.702 19.31 -0.484 19.652 -0.139 19.729 C 0.205 19.806 0.548 19.589 0.625 19.244 L 0 19.104 L -0.625 18.965 Z M 4.267 0 L 3.642 -0.139 L -0.625 18.965 L 0 19.104 L 0.625 19.244 L 4.891 0.139 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.104,
    viewBox: "0 0 4.267 19.104",
    fill: "none",
    style: {
      position: "absolute",
      left: 42.666,
      top: 0,
      width: 4.267,
      height: 19.104,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.891 0.139 C 4.968 -0.205 4.751 -0.548 4.406 -0.625 C 4.061 -0.702 3.719 -0.484 3.642 -0.139 L 4.267 0 L 4.891 0.139 Z M -0.625 18.965 C -0.702 19.31 -0.484 19.652 -0.139 19.729 C 0.205 19.806 0.548 19.589 0.625 19.244 L 0 19.104 L -0.625 18.965 Z M 4.267 0 L 3.642 -0.139 L -0.625 18.965 L 0 19.104 L 0.625 19.244 L 4.891 0.139 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.104,
    viewBox: "0 0 4.267 19.104",
    fill: "none",
    style: {
      position: "absolute",
      left: 57.6,
      top: 4.245,
      width: 4.267,
      height: 19.104,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.891 0.139 C 4.968 -0.205 4.751 -0.548 4.406 -0.625 C 4.061 -0.702 3.719 -0.484 3.642 -0.139 L 4.267 0 L 4.891 0.139 Z M -0.625 18.965 C -0.702 19.31 -0.484 19.652 -0.139 19.729 C 0.205 19.806 0.548 19.589 0.625 19.244 L 0 19.104 L -0.625 18.965 Z M 4.267 0 L 3.642 -0.139 L -0.625 18.965 L 0 19.104 L 0.625 19.244 L 4.891 0.139 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.104,
    viewBox: "0 0 4.267 19.104",
    fill: "none",
    style: {
      position: "absolute",
      left: 72.533,
      top: 0,
      width: 4.267,
      height: 19.104,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.891 0.139 C 4.968 -0.205 4.751 -0.548 4.406 -0.625 C 4.061 -0.702 3.719 -0.484 3.642 -0.139 L 4.267 0 L 4.891 0.139 Z M -0.625 18.965 C -0.702 19.31 -0.484 19.652 -0.139 19.729 C 0.205 19.806 0.548 19.589 0.625 19.244 L 0 19.104 L -0.625 18.965 Z M 4.267 0 L 3.642 -0.139 L -0.625 18.965 L 0 19.104 L 0.625 19.244 L 4.891 0.139 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.104,
    viewBox: "0 0 4.267 19.104",
    fill: "none",
    style: {
      position: "absolute",
      left: 87.466,
      top: 4.245,
      width: 4.267,
      height: 19.104,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.891 0.139 C 4.968 -0.205 4.751 -0.548 4.406 -0.625 C 4.061 -0.702 3.719 -0.484 3.642 -0.139 L 4.267 0 L 4.891 0.139 Z M -0.625 18.965 C -0.702 19.31 -0.484 19.652 -0.139 19.729 C 0.205 19.806 0.548 19.589 0.625 19.244 L 0 19.104 L -0.625 18.965 Z M 4.267 0 L 3.642 -0.139 L -0.625 18.965 L 0 19.104 L 0.625 19.244 L 4.891 0.139 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.104,
    viewBox: "0 0 4.267 19.104",
    fill: "none",
    style: {
      position: "absolute",
      left: 102.4,
      top: 0,
      width: 4.267,
      height: 19.104,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.891 0.139 C 4.968 -0.205 4.751 -0.548 4.406 -0.625 C 4.061 -0.702 3.719 -0.484 3.642 -0.139 L 4.267 0 L 4.891 0.139 Z M -0.625 18.965 C -0.702 19.31 -0.484 19.652 -0.139 19.729 C 0.205 19.806 0.548 19.589 0.625 19.244 L 0 19.104 L -0.625 18.965 Z M 4.267 0 L 3.642 -0.139 L -0.625 18.965 L 0 19.104 L 0.625 19.244 L 4.891 0.139 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.104,
    viewBox: "0 0 4.267 19.104",
    fill: "none",
    style: {
      position: "absolute",
      left: 117.333,
      top: 6.368,
      width: 4.267,
      height: 19.104,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.891 0.139 C 4.968 -0.205 4.751 -0.548 4.406 -0.625 C 4.061 -0.702 3.719 -0.484 3.642 -0.139 L 4.267 0 L 4.891 0.139 Z M -0.625 18.965 C -0.702 19.31 -0.484 19.652 -0.139 19.729 C 0.205 19.806 0.548 19.589 0.625 19.244 L 0 19.104 L -0.625 18.965 Z M 4.267 0 L 3.642 -0.139 L -0.625 18.965 L 0 19.104 L 0.625 19.244 L 4.891 0.139 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.104,
    viewBox: "0 0 4.267 19.104",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.266,
      top: 21.227,
      width: 4.267,
      height: 19.104,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.891 0.139 C 4.968 -0.205 4.751 -0.548 4.406 -0.625 C 4.061 -0.702 3.719 -0.484 3.642 -0.139 L 4.267 0 L 4.891 0.139 Z M -0.625 18.965 C -0.702 19.31 -0.484 19.652 -0.139 19.729 C 0.205 19.806 0.548 19.589 0.625 19.244 L 0 19.104 L -0.625 18.965 Z M 4.267 0 L 3.642 -0.139 L -0.625 18.965 L 0 19.104 L 0.625 19.244 L 4.891 0.139 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.104,
    viewBox: "0 0 4.267 19.104",
    fill: "none",
    style: {
      position: "absolute",
      left: 34.133,
      top: 19.105,
      width: 4.267,
      height: 19.104,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.891 0.139 C 4.968 -0.205 4.751 -0.548 4.406 -0.625 C 4.061 -0.702 3.719 -0.484 3.642 -0.139 L 4.267 0 L 4.891 0.139 Z M -0.625 18.965 C -0.702 19.31 -0.484 19.652 -0.139 19.729 C 0.205 19.806 0.548 19.589 0.625 19.244 L 0 19.104 L -0.625 18.965 Z M 4.267 0 L 3.642 -0.139 L -0.625 18.965 L 0 19.104 L 0.625 19.244 L 4.891 0.139 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.104,
    viewBox: "0 0 4.267 19.104",
    fill: "none",
    style: {
      position: "absolute",
      left: 64,
      top: 21.227,
      width: 4.267,
      height: 19.104,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.891 0.139 C 4.968 -0.205 4.751 -0.548 4.406 -0.625 C 4.061 -0.702 3.719 -0.484 3.642 -0.139 L 4.267 0 L 4.891 0.139 Z M -0.625 18.965 C -0.702 19.31 -0.484 19.652 -0.139 19.729 C 0.205 19.806 0.548 19.589 0.625 19.244 L 0 19.104 L -0.625 18.965 Z M 4.267 0 L 3.642 -0.139 L -0.625 18.965 L 0 19.104 L 0.625 19.244 L 4.891 0.139 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.104,
    viewBox: "0 0 4.267 19.104",
    fill: "none",
    style: {
      position: "absolute",
      left: 93.866,
      top: 19.105,
      width: 4.267,
      height: 19.104,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.891 0.139 C 4.968 -0.205 4.751 -0.548 4.406 -0.625 C 4.061 -0.702 3.719 -0.484 3.642 -0.139 L 4.267 0 L 4.891 0.139 Z M -0.625 18.965 C -0.702 19.31 -0.484 19.652 -0.139 19.729 C 0.205 19.806 0.548 19.589 0.625 19.244 L 0 19.104 L -0.625 18.965 Z M 4.267 0 L 3.642 -0.139 L -0.625 18.965 L 0 19.104 L 0.625 19.244 L 4.891 0.139 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.104,
    viewBox: "0 0 4.267 19.104",
    fill: "none",
    style: {
      position: "absolute",
      left: 123.733,
      top: 23.35,
      width: 4.267,
      height: 19.104,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.891 0.139 C 4.968 -0.205 4.751 -0.548 4.406 -0.625 C 4.061 -0.702 3.719 -0.484 3.642 -0.139 L 4.267 0 L 4.891 0.139 Z M -0.625 18.965 C -0.702 19.31 -0.484 19.652 -0.139 19.729 C 0.205 19.806 0.548 19.589 0.625 19.244 L 0 19.104 L -0.625 18.965 Z M 4.267 0 L 3.642 -0.139 L -0.625 18.965 L 0 19.104 L 0.625 19.244 L 4.891 0.139 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 116.750,
    viewBox: "0 0 160 116.750",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 159.204,
      width: 160,
      height: 116.75,
      opacity: 0.4,
      color: "rgb(106,158,192)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 160 0 L 0 0 L 0 116.75 L 160 116.75 L 160 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8.533,
    height: 53.068,
    viewBox: "0 0 8.533 53.068",
    fill: "none",
    style: {
      position: "absolute",
      left: 19.2,
      top: 137.977,
      width: 8.533,
      height: 53.068,
      opacity: 0.6,
      color: "rgb(90,58,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.333 0 L 3.2 0 C 1.433 0 0 1.426 0 3.184 L 0 49.884 C 0 51.642 1.433 53.068 3.2 53.068 L 5.333 53.068 C 7.101 53.068 8.533 51.642 8.533 49.884 L 8.533 3.184 C 8.533 1.426 7.101 0 5.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 9.600,
    height: 63.682,
    viewBox: "0 0 9.600 63.682",
    fill: "none",
    style: {
      position: "absolute",
      left: 72.533,
      top: 127.363,
      width: 9.6,
      height: 63.682,
      opacity: 0.55,
      color: "rgb(90,58,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.4 0 L 3.2 0 C 1.433 0 0 1.426 0 3.184 L 0 60.498 C 0 62.256 1.433 63.682 3.2 63.682 L 6.4 63.682 C 8.167 63.682 9.6 62.256 9.6 60.498 L 9.6 3.184 C 9.6 1.426 8.167 0 6.4 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.467,
    height: 47.761,
    viewBox: "0 0 7.467 47.761",
    fill: "none",
    style: {
      position: "absolute",
      left: 128,
      top: 143.284,
      width: 7.467,
      height: 47.761,
      opacity: 0.5,
      color: "rgb(90,58,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.267 0 L 3.2 0 C 1.433 0 0 1.426 0 3.184 L 0 44.577 C 0 46.336 1.433 47.761 3.2 47.761 L 4.267 47.761 C 6.034 47.761 7.467 46.336 7.467 44.577 L 7.467 3.184 C 7.467 1.426 6.034 0 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 38.400,
    height: 29.718,
    viewBox: "0 0 38.400 29.718",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.267,
      top: 117.811,
      width: 38.4,
      height: 29.718,
      opacity: 0.7,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 19.2 29.718 C 29.804 29.718 38.4 23.065 38.4 14.859 C 38.4 6.653 29.804 0 19.2 0 C 8.596 0 0 6.653 0 14.859 C 0 23.065 8.596 29.718 19.2 29.718 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 46.933,
    height: 33.964,
    viewBox: "0 0 46.933 33.964",
    fill: "none",
    style: {
      position: "absolute",
      left: 53.333,
      top: 101.89,
      width: 46.933,
      height: 33.964,
      opacity: 0.75,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 23.467 33.964 C 36.427 33.964 46.933 26.361 46.933 16.982 C 46.933 7.603 36.427 0 23.467 0 C 10.506 0 0 7.603 0 16.982 C 0 26.361 10.506 33.964 23.467 33.964 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 29.867,
    height: 21.227,
    viewBox: "0 0 29.867 21.227",
    fill: "none",
    style: {
      position: "absolute",
      left: 49.067,
      top: 114.627,
      width: 29.867,
      height: 21.227,
      opacity: 0.5,
      color: "rgb(45,107,50)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14.933 21.227 C 23.181 21.227 29.867 16.475 29.867 10.614 C 29.867 4.752 23.181 0 14.933 0 C 6.686 0 0 4.752 0 10.614 C 0 16.475 6.686 21.227 14.933 21.227 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 34.133,
    height: 25.473,
    viewBox: "0 0 34.133 25.473",
    fill: "none",
    style: {
      position: "absolute",
      left: 115.2,
      top: 123.118,
      width: 34.133,
      height: 25.473,
      opacity: 0.65,
      color: "rgb(26,74,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 17.067 25.473 C 26.492 25.473 34.133 19.77 34.133 12.736 C 34.133 5.702 26.492 0 17.067 0 C 7.641 0 0 5.702 0 12.736 C 0 19.77 7.641 25.473 17.067 25.473 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.667,
    height: 84.909,
    viewBox: "0 0 10.667 84.909",
    fill: "none",
    style: {
      position: "absolute",
      left: 38.4,
      top: 114.627,
      width: 10.667,
      height: 84.909,
      color: "rgb(74,46,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.467 0 L 3.2 0 C 1.433 0 0 1.426 0 3.184 L 0 81.725 C 0 83.483 1.433 84.909 3.2 84.909 L 7.467 84.909 C 9.234 84.909 10.667 83.483 10.667 81.725 L 10.667 3.184 C 10.667 1.426 9.234 0 7.467 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 11.733,
    height: 93.400,
    viewBox: "0 0 11.733 93.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 106.667,
      top: 106.136,
      width: 11.733,
      height: 93.4,
      color: "rgb(74,46,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.533 0 L 3.2 0 C 1.433 0 0 1.426 0 3.184 L 0 90.216 C 0 91.974 1.433 93.4 3.2 93.4 L 8.533 93.4 C 10.301 93.4 11.733 91.974 11.733 90.216 L 11.733 3.184 C 11.733 1.426 10.301 0 8.533 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 55.467,
    height: 42.454,
    viewBox: "0 0 55.467 42.454",
    fill: "none",
    style: {
      position: "absolute",
      left: 16,
      top: 84.909,
      width: 55.467,
      height: 42.454,
      color: "rgb(26,90,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 27.733 42.454 C 43.05 42.454 55.467 32.951 55.467 21.227 C 55.467 9.504 43.05 0 27.733 0 C 12.417 0 0 9.504 0 21.227 C 0 32.951 12.417 42.454 27.733 42.454 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 34.133,
    height: 25.473,
    viewBox: "0 0 34.133 25.473",
    fill: "none",
    style: {
      position: "absolute",
      left: 12.8,
      top: 99.768,
      width: 34.133,
      height: 25.473,
      opacity: 0.6,
      color: "rgb(45,107,50)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 17.067 25.473 C 26.492 25.473 34.133 19.77 34.133 12.736 C 34.133 5.702 26.492 0 17.067 0 C 7.641 0 0 5.702 0 12.736 C 0 19.77 7.641 25.473 17.067 25.473 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 29.867,
    height: 21.227,
    viewBox: "0 0 29.867 21.227",
    fill: "none",
    style: {
      position: "absolute",
      left: 42.667,
      top: 104.013,
      width: 29.867,
      height: 21.227,
      opacity: 0.5,
      color: "rgb(45,107,50)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14.933 21.227 C 23.181 21.227 29.867 16.475 29.867 10.614 C 29.867 4.752 23.181 0 14.933 0 C 6.686 0 0 4.752 0 10.614 C 0 16.475 6.686 21.227 14.933 21.227 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 59.733,
    height: 46.700,
    viewBox: "0 0 59.733 46.700",
    fill: "none",
    style: {
      position: "absolute",
      left: 83.2,
      top: 74.295,
      width: 59.733,
      height: 46.7,
      color: "rgb(26,90,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 29.867 46.7 C 46.362 46.7 59.733 36.246 59.733 23.35 C 59.733 10.454 46.362 0 29.867 0 C 13.372 0 0 10.454 0 23.35 C 0 36.246 13.372 46.7 29.867 46.7 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 38.400,
    height: 27.595,
    viewBox: "0 0 38.400 27.595",
    fill: "none",
    style: {
      position: "absolute",
      left: 76.8,
      top: 92.338,
      width: 38.4,
      height: 27.595,
      opacity: 0.55,
      color: "rgb(45,107,50)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 19.2 27.595 C 29.804 27.595 38.4 21.418 38.4 13.798 C 38.4 6.177 29.804 0 19.2 0 C 8.596 0 0 6.177 0 13.798 C 0 21.418 8.596 27.595 19.2 27.595 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 34.133,
    height: 23.350,
    viewBox: "0 0 34.133 23.350",
    fill: "none",
    style: {
      position: "absolute",
      left: 113.067,
      top: 94.461,
      width: 34.133,
      height: 23.35,
      opacity: 0.5,
      color: "rgb(45,107,50)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 17.067 23.35 C 26.492 23.35 34.133 18.123 34.133 11.675 C 34.133 5.227 26.492 0 17.067 0 C 7.641 0 0 5.227 0 11.675 C 0 18.123 7.641 23.35 17.067 23.35 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 117.280,
    viewBox: "0 0 160 117.280",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 158.673,
      width: 160,
      height: 117.28,
      opacity: 0.88,
      color: "rgb(26,106,170)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 5.837 C 14.222 -1.946 28.444 -1.946 42.667 5.837 C 56.889 13.621 71.111 13.621 85.333 5.837 C 99.556 -1.946 113.778 -1.946 128 5.837 C 140.8 10.79 151.467 10.79 160 5.837 L 160 117.28 L 0 117.28 L 0 5.837 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 103.888,
    viewBox: "0 0 160 103.888",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 172.065,
      width: 160,
      height: 103.888,
      opacity: 0.6,
      color: "rgb(18,88,160)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 6.243 C 17.778 -0.832 35.556 -0.832 53.333 6.243 C 71.111 13.319 88.889 13.319 106.667 6.243 C 124.444 -0.832 142.222 -1.894 160 3.059 L 160 103.888 L 0 103.888 L 0 6.243 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 152.533,
    height: 9.833,
    viewBox: "0 0 152.533 9.833",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 162.638,
      width: 152.533,
      height: 9.833,
      opacity: 0.55,
      color: "rgb(90,170,238)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.373 4.349 C -0.764 4.555 -0.914 5.039 -0.708 5.43 C -0.502 5.821 -0.018 5.971 0.373 5.765 L 0 5.057 L -0.373 4.349 Z M 124.8 3.996 L 124.504 4.739 L 124.512 4.742 L 124.52 4.745 L 124.8 3.996 Z M 152.89 5.773 C 153.285 5.577 153.446 5.096 153.25 4.701 C 153.053 4.305 152.573 4.144 152.177 4.341 L 152.533 5.057 L 152.89 5.773 Z M 0 5.057 L 0.373 5.765 C 12.212 -0.472 25.106 -0.496 39.14 5.787 L 39.467 5.057 L 39.794 4.327 C 25.383 -2.126 11.966 -2.151 -0.373 4.349 L 0 5.057 Z M 39.467 5.057 L 39.14 5.787 C 53.57 12.249 68.03 12.249 82.46 5.787 L 82.133 5.057 L 81.806 4.327 C 67.792 10.602 53.808 10.602 39.794 4.327 L 39.467 5.057 Z M 82.133 5.057 L 82.46 5.787 C 96.489 -0.494 110.487 -0.84 124.504 4.739 L 124.8 3.996 L 125.096 3.252 C 110.669 -2.49 96.222 -2.128 81.806 4.327 L 82.133 5.057 Z M 124.8 3.996 L 124.52 4.745 C 135.997 9.028 145.496 9.452 152.89 5.773 L 152.533 5.057 L 152.177 4.341 C 145.348 7.738 136.359 7.455 125.08 3.246 L 124.8 3.996 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 152.533,
    height: 10.507,
    viewBox: "0 0 152.533 10.507",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 176.823,
      width: 152.533,
      height: 10.507,
      opacity: 0.38,
      color: "rgb(90,170,238)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.232 5.135 C -0.562 5.263 -0.725 5.634 -0.596 5.964 C -0.468 6.293 -0.097 6.456 0.232 6.328 L 0 5.731 L -0.232 5.135 Z M 109.867 5.731 L 110.075 6.336 L 110.092 6.331 L 110.108 6.324 L 109.867 5.731 Z M 152.332 3.155 C 152.667 3.266 153.03 3.084 153.141 2.749 C 153.252 2.413 153.07 2.051 152.735 1.94 L 152.533 2.547 L 152.332 3.155 Z M 0 5.731 L 0.232 6.328 C 16.428 0.022 34.051 0.01 53.132 6.339 L 53.333 5.731 L 53.535 5.124 C 34.216 -1.284 16.283 -1.295 -0.232 5.135 L 0 5.731 Z M 53.333 5.731 L 53.132 6.339 C 72.46 12.75 91.449 12.752 110.075 6.336 L 109.867 5.731 L 109.658 5.126 C 91.307 11.447 72.607 11.45 53.535 5.124 L 53.333 5.731 Z M 109.867 5.731 L 110.108 6.324 C 125.648 -0.002 139.71 -1.032 152.332 3.155 L 152.533 2.547 L 152.735 1.94 C 139.757 -2.365 125.374 -1.272 109.625 5.139 L 109.867 5.731 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 21.330,
    height: 6.369,
    viewBox: "0 0 21.330 6.369",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.985,-0.173,0.174,0.985,20.940,170.648)",
      transformOrigin: "0 0",
      width: 21.33,
      height: 6.369,
      opacity: 0.6,
      color: "rgb(90,58,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.665 6.369 C 16.555 6.369 21.33 4.943 21.33 3.185 C 21.33 1.426 16.555 0 10.665 0 C 4.775 0 0 1.426 0 3.185 C 0 4.943 4.775 6.369 10.665 6.369 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 17.065,
    height: 5.307,
    viewBox: "0 0 17.065 5.307",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.990,0.138,-0.140,0.990,109.254,176.622)",
      transformOrigin: "0 0",
      width: 17.065,
      height: 5.307,
      opacity: 0.5,
      color: "rgb(45,107,50)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.533 5.307 C 13.245 5.307 17.065 4.119 17.065 2.654 C 17.065 1.188 13.245 0 8.533 0 C 3.82 0 0 1.188 0 2.654 C 0 4.119 3.82 5.307 8.533 5.307 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 12.800,
    height: 4.245,
    viewBox: "0 0 12.800 4.245",
    fill: "none",
    style: {
      position: "absolute",
      left: 68.267,
      top: 186.799,
      width: 12.8,
      height: 4.245,
      opacity: 0.45,
      color: "rgb(90,58,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.4 4.245 C 9.935 4.245 12.8 3.295 12.8 2.123 C 12.8 0.95 9.935 0 6.4 0 C 2.865 0 0 0.95 0 2.123 C 0 3.295 2.865 4.245 6.4 4.245 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 27.731,
    height: 16.983,
    viewBox: "0 0 27.731 16.983",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.991,0.135,-0.136,0.991,86.291,114.627)",
      transformOrigin: "0 0",
      width: 27.731,
      height: 16.983,
      opacity: 0.65,
      color: "rgb(90,64,160)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 16.983 L 27.731 16.983 L 13.865 0 L 0 16.983 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 27.731,
    height: 37.151,
    viewBox: "0 0 27.731 37.151",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.991,0.135,-0.136,0.991,83.982,131.453)",
      transformOrigin: "0 0",
      width: 27.731,
      height: 37.151,
      opacity: 0.65,
      color: "rgb(112,96,192)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 25.75 0 L 1.981 0 C 0.887 0 0 0.875 0 1.955 L 0 35.196 C 0 36.276 0.887 37.151 1.981 37.151 L 25.75 37.151 C 26.844 37.151 27.731 36.276 27.731 35.196 L 27.731 1.955 C 27.731 0.875 26.844 0 25.75 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8.533,
    height: 9.553,
    viewBox: "0 0 8.533 9.553",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.991,0.135,-0.136,0.991,89.217,148.232)",
      transformOrigin: "0 0",
      width: 8.533,
      height: 9.553,
      opacity: 0.55,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.466 0 L 1.067 0 C 0.478 0 0 0.428 0 0.955 L 0 8.598 C 0 9.125 0.478 9.553 1.067 9.553 L 7.466 9.553 C 8.055 9.553 8.533 9.125 8.533 8.598 L 8.533 0.955 C 8.533 0.428 8.055 0 7.466 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 160,
      height: 213.333,
      overflow: "hidden",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -37.333,
      top: 0,
      width: 219.733,
      height: 277.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 277.333,
    viewBox: "0 0 160 277.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 37.333,
      top: 0,
      width: 160,
      height: 277.333,
      color: "rgb(215,224,231)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 145.067 0 L 14.933 0 C 6.686 0 0 6.686 0 14.933 L 0 262.4 C 0 270.647 6.686 277.333 14.933 277.333 L 145.067 277.333 C 153.314 277.333 160 270.647 160 262.4 L 160 14.933 C 160 6.686 153.314 0 145.067 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 49.635,
      top: 14.601,
      width: 129.588,
      height: 48.915,
      opacity: 0.7,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 129.588,
    height: 3.285,
    viewBox: "0 0 129.588 3.285",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 129.588,
      height: 3.285,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 1.825 C 21.902 -0.608 45.021 -0.608 69.357 1.825 C 87.609 4.259 107.686 3.65 129.588 0",
    fill: "rgb(0,0,0)",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M -0.147 0.5 C -0.879 0.581 -1.406 1.241 -1.325 1.972 C -1.244 2.704 -0.585 3.232 0.147 3.15 L 0 1.825 L -0.147 0.5 Z M 69.357 1.825 L 69.533 0.504 L 69.512 0.501 L 69.49 0.498 L 69.357 1.825 Z M 129.807 1.315 C 130.534 1.194 131.024 0.507 130.903 -0.219 C 130.782 -0.946 130.095 -1.436 129.369 -1.315 L 129.588 0 L 129.807 1.315 Z M 0 1.825 L 0.147 3.15 C 21.947 0.728 44.972 0.727 69.224 3.152 L 69.357 1.825 L 69.49 0.498 C 45.071 -1.943 21.857 -1.945 -0.147 0.5 L 0 1.825 Z M 69.357 1.825 L 69.181 3.147 C 87.588 5.601 107.8 4.983 129.807 1.315 L 129.588 0 L 129.369 -1.315 C 107.572 2.318 87.63 2.916 69.533 0.504 L 69.357 1.825 Z",
    fill: "rgb(168,208,192)",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 129.588,
    height: 3.285,
    viewBox: "0 0 129.588 3.285",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 10.951,
      width: 129.588,
      height: 3.285,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 1.825 C 18.86 -0.608 38.937 -0.608 60.231 1.825 C 81.525 4.259 104.644 3.65 129.588 0",
    fill: "rgb(0,0,0)",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M -0.171 0.503 C -0.901 0.597 -1.417 1.265 -1.322 1.996 C -1.228 2.726 -0.56 3.242 0.171 3.148 L 0 1.825 L -0.171 0.503 Z M 129.781 1.319 C 130.51 1.213 131.014 0.536 130.907 -0.193 C 130.801 -0.922 130.124 -1.426 129.395 -1.319 L 129.588 0 L 129.781 1.319 Z M 0 1.825 L 0.171 3.148 C 18.912 0.729 38.88 0.727 60.08 3.15 L 60.231 1.825 L 60.383 0.5 C 38.995 -1.944 18.809 -1.946 -0.171 0.503 L 0 1.825 Z M 60.231 1.825 L 60.08 3.15 C 81.506 5.599 104.742 4.984 129.781 1.319 L 129.588 0 L 129.395 -1.319 C 104.546 2.317 81.544 2.919 60.383 0.5 L 60.231 1.825 Z",
    fill: "rgb(168,208,192)",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 129.588,
    height: 3.285,
    viewBox: "0 0 129.588 3.285",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 21.902,
      width: 129.588,
      height: 3.285,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 1.825 C 15.818 -0.608 34.374 -0.608 55.668 1.825 C 76.962 4.259 101.602 3.65 129.588 0",
    fill: "rgb(0,0,0)",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M -0.203 0.507 C -0.931 0.619 -1.43 1.3 -1.318 2.028 C -1.206 2.756 -0.525 3.255 0.203 3.143 L 0 1.825 L -0.203 0.507 Z M 129.761 1.322 C 130.491 1.227 131.006 0.558 130.91 -0.172 C 130.815 -0.903 130.146 -1.417 129.416 -1.322 L 129.588 0 L 129.761 1.322 Z M 0 1.825 L 0.203 3.143 C 15.872 0.732 34.304 0.726 55.517 3.15 L 55.668 1.825 L 55.82 0.5 C 34.445 -1.942 15.765 -1.949 -0.203 0.507 L 0 1.825 Z M 55.668 1.825 L 55.517 3.15 C 76.946 5.599 101.699 4.982 129.761 1.322 L 129.588 0 L 129.416 -1.322 C 101.505 2.318 76.978 2.919 55.82 0.5 L 55.668 1.825 Z",
    fill: "rgb(168,208,192)",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 105.861,
    height: 3.448,
    viewBox: "0 0 105.861 3.448",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 33.765,
      width: 105.861,
      height: 3.448,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 1.825 C 14.601 -0.608 31.028 -0.608 49.28 1.825 C 67.532 4.259 86.392 3.955 105.861 0.913",
    fill: "rgb(0,0,0)",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M -0.219 0.51 C -0.946 0.631 -1.436 1.318 -1.315 2.044 C -1.194 2.771 -0.507 3.261 0.219 3.14 L 0 1.825 L -0.219 0.51 Z M 106.067 2.23 C 106.794 2.116 107.292 1.434 107.178 0.707 C 107.064 -0.021 106.382 -0.518 105.655 -0.405 L 105.861 0.913 L 106.067 2.23 Z M 0 1.825 L 0.219 3.14 C 14.663 0.733 30.953 0.727 49.104 3.147 L 49.28 1.825 L 49.456 0.504 C 31.104 -1.943 14.54 -1.95 -0.219 0.51 L 0 1.825 Z M 49.28 1.825 L 49.104 3.147 C 67.491 5.598 86.48 5.29 106.067 2.23 L 105.861 0.913 L 105.655 -0.405 C 86.304 2.619 67.573 2.919 49.456 0.504 L 49.28 1.825 Z",
    fill: "rgb(168,208,192)",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 101.298,
    height: 3.285,
    viewBox: "0 0 101.298 3.285",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 45.63,
      width: 101.298,
      height: 3.285,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 1.825 C 12.776 -0.608 28.29 -0.608 46.542 1.825 C 64.794 4.259 83.046 3.65 101.298 0",
    fill: "rgb(0,0,0)",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M -0.249 0.515 C -0.973 0.653 -1.448 1.351 -1.31 2.075 C -1.172 2.798 -0.474 3.273 0.249 3.135 L 0 1.825 L -0.249 0.515 Z M 101.559 1.307 C 102.281 1.163 102.75 0.461 102.605 -0.261 C 102.461 -0.984 101.758 -1.452 101.036 -1.307 L 101.298 0 L 101.559 1.307 Z M 0 1.825 L 0.249 3.135 C 12.84 0.737 28.202 0.725 46.366 3.147 L 46.542 1.825 L 46.718 0.504 C 28.379 -1.942 12.712 -1.953 -0.249 0.515 L 0 1.825 Z M 46.542 1.825 L 46.366 3.147 C 64.765 5.6 83.165 4.986 101.559 1.307 L 101.298 0 L 101.036 -1.307 C 82.927 2.314 64.823 2.917 46.718 0.504 L 46.542 1.825 Z",
    fill: "rgb(168,208,192)",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 32,
    height: 18.133,
    viewBox: "0 0 32 18.133",
    fill: "none",
    style: {
      position: "absolute",
      left: 50.133,
      top: 64,
      width: 32,
      height: 18.133,
      opacity: 0.7,
      color: "rgb(168,216,240)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16 18.133 C 24.837 18.133 32 14.074 32 9.067 C 32 4.059 24.837 0 16 0 C 7.163 0 0 4.059 0 9.067 C 0 14.074 7.163 18.133 16 18.133 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 25.600,
    height: 17.067,
    viewBox: "0 0 25.600 17.067",
    fill: "none",
    style: {
      position: "absolute",
      left: 66.133,
      top: 60.8,
      width: 25.6,
      height: 17.067,
      opacity: 0.65,
      color: "rgb(184,224,248)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 12.8 17.067 C 19.869 17.067 25.6 13.246 25.6 8.533 C 25.6 3.821 19.869 0 12.8 0 C 5.731 0 0 3.821 0 8.533 C 0 13.246 5.731 17.067 12.8 17.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 36.267,
    height: 20.267,
    viewBox: "0 0 36.267 20.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 128,
      top: 70.4,
      width: 36.267,
      height: 20.267,
      opacity: 0.65,
      color: "rgb(168,216,240)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 18.133 20.267 C 28.148 20.267 36.267 15.73 36.267 10.133 C 36.267 4.537 28.148 0 18.133 0 C 8.119 0 0 4.537 0 10.133 C 0 15.73 8.119 20.267 18.133 20.267 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 25.600,
    height: 17.067,
    viewBox: "0 0 25.600 17.067",
    fill: "none",
    style: {
      position: "absolute",
      left: 146.133,
      top: 68.267,
      width: 25.6,
      height: 17.067,
      opacity: 0.6,
      color: "rgb(184,224,248)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 12.8 17.067 C 19.869 17.067 25.6 13.246 25.6 8.533 C 25.6 3.821 19.869 0 12.8 0 C 5.731 0 0 3.821 0 8.533 C 0 13.246 5.731 17.067 12.8 17.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 146.133,
    height: 90.667,
    viewBox: "0 0 146.133 90.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 146.133,
      width: 146.133,
      height: 90.667,
      color: "rgb(138,200,88)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 73.067 90.667 C 113.42 90.667 146.133 70.37 146.133 45.333 C 146.133 20.296 113.42 0 73.067 0 C 32.713 0 0 20.296 0 45.333 C 0 70.37 32.713 90.667 73.067 90.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 128,
    height: 82.133,
    viewBox: "0 0 128 82.133",
    fill: "none",
    style: {
      position: "absolute",
      left: 91.733,
      top: 157.867,
      width: 128,
      height: 82.133,
      color: "rgb(120,184,72)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 64 82.133 C 99.346 82.133 128 63.747 128 41.067 C 128 18.386 99.346 0 64 0 C 28.654 0 0 18.386 0 41.067 C 0 63.747 28.654 82.133 64 82.133 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 182.400,
    height: 72.533,
    viewBox: "0 0 182.400 72.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 23.466,
      top: 173.867,
      width: 182.4,
      height: 72.533,
      color: "rgb(154,208,96)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 91.2 72.533 C 141.568 72.533 182.4 56.296 182.4 36.267 C 182.4 16.237 141.568 0 91.2 0 C 40.832 0 0 16.237 0 36.267 C 0 56.296 40.832 72.533 91.2 72.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 136.533,
    height: 37.333,
    viewBox: "0 0 136.533 37.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 45.866,
      top: 199.467,
      width: 136.533,
      height: 37.333,
      color: "rgb(126,192,80)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 136.533 0 L 0 0 L 0 37.333 L 136.533 37.333 L 136.533 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 136.533,
    height: 25.600,
    viewBox: "0 0 136.533 25.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 45.866,
      top: 211.2,
      width: 136.533,
      height: 25.6,
      color: "rgb(138,204,90)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 136.533 0 L 0 0 L 0 25.6 L 136.533 25.6 L 136.533 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 63.421,
      top: 216.284,
      width: 102.018,
      height: 18.708,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 102.01786804199219,
      height: 18.708148956298828,
      clipPath: "inset(0px 0.000px 0px -0.000px)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 80.308,
    height: 28.747,
    viewBox: "0 0 80.308 28.747",
    fill: "none",
    style: {
      position: "absolute",
      left: 9.941,
      top: -7.757,
      width: 80.308,
      height: 28.747,
      opacity: 0.7,
      color: "rgb(212,168,96)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -3.771 24.975 C -5.854 27.058 -5.854 30.435 -3.771 32.518 C -1.688 34.601 1.688 34.601 3.771 32.518 L 0 28.747 L -3.771 24.975 Z M 31.941 3.194 L 29.685 -1.639 L 29.556 -1.579 L 29.431 -1.512 L 31.941 3.194 Z M 54.756 3.194 L 58.087 -0.971 L 57.954 -1.077 L 57.814 -1.175 L 54.756 3.194 Z M 76.344 32.314 C 78.314 34.504 81.687 34.681 83.876 32.711 C 86.065 30.74 86.243 27.368 84.272 25.179 L 80.308 28.747 L 76.344 32.314 Z M 0 28.747 L 3.771 32.518 C 15.779 20.51 25.995 12.41 34.451 7.9 L 31.941 3.194 L 29.431 -1.512 C 19.635 3.713 8.557 12.647 -3.771 24.975 L 0 28.747 Z M 31.941 3.194 L 34.196 8.027 C 42.291 4.25 47.715 4.776 51.697 7.563 L 54.756 3.194 L 57.814 -1.175 C 49.628 -6.905 39.842 -6.379 29.685 -1.639 L 31.941 3.194 Z M 54.756 3.194 L 51.424 7.359 C 57.148 11.938 65.424 20.181 76.344 32.314 L 80.308 28.747 L 84.272 25.179 C 73.29 12.976 64.531 4.184 58.087 -0.971 L 54.756 3.194 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 53.285,
      top: 213.547,
      width: 120.463,
      height: 9.126,
      opacity: 0.55,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 1.825,
    height: 5.476,
    viewBox: "0 0 1.825 5.476",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 1.825,
      height: 5.476,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.218 5.678 C 1.33 6.013 1.692 6.194 2.028 6.083 C 2.363 5.971 2.544 5.608 2.432 5.273 L 1.825 5.476 L 1.218 5.678 Z M 0.607 -0.202 C 0.495 -0.538 0.133 -0.719 -0.202 -0.607 C -0.538 -0.495 -0.719 -0.133 -0.607 0.202 L 0 0 L 0.607 -0.202 Z M 1.825 5.476 L 2.432 5.273 L 0.607 -0.202 L 0 0 L -0.607 0.202 L 1.218 5.678 L 1.825 5.476 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.825,
    height: 5.476,
    viewBox: "0 0 1.825 5.476",
    fill: "none",
    style: {
      position: "absolute",
      left: 7.301,
      top: 0,
      width: 1.825,
      height: 5.476,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.607 5.273 C -0.719 5.608 -0.538 5.971 -0.202 6.083 C 0.133 6.194 0.495 6.013 0.607 5.678 L 0 5.476 L -0.607 5.273 Z M 2.432 0.202 C 2.544 -0.133 2.363 -0.495 2.028 -0.607 C 1.692 -0.719 1.33 -0.538 1.218 -0.202 L 1.825 0 L 2.432 0.202 Z M 0 5.476 L 0.607 5.678 L 2.432 0.202 L 1.825 0 L 1.218 -0.202 L -0.607 5.273 L 0 5.476 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.825,
    height: 5.476,
    viewBox: "0 0 1.825 5.476",
    fill: "none",
    style: {
      position: "absolute",
      left: 16.427,
      top: 3.65,
      width: 1.825,
      height: 5.476,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.218 5.678 C 1.33 6.013 1.692 6.194 2.028 6.083 C 2.363 5.971 2.544 5.608 2.432 5.273 L 1.825 5.476 L 1.218 5.678 Z M 0.607 -0.202 C 0.495 -0.538 0.133 -0.719 -0.202 -0.607 C -0.538 -0.495 -0.719 -0.133 -0.607 0.202 L 0 0 L 0.607 -0.202 Z M 1.825 5.476 L 2.432 5.273 L 0.607 -0.202 L 0 0 L -0.607 0.202 L 1.218 5.678 L 1.825 5.476 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.825,
    height: 5.476,
    viewBox: "0 0 1.825 5.476",
    fill: "none",
    style: {
      position: "absolute",
      left: 23.728,
      top: 2.737,
      width: 1.825,
      height: 5.476,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.607 5.273 C -0.719 5.608 -0.538 5.971 -0.202 6.083 C 0.133 6.194 0.495 6.013 0.607 5.678 L 0 5.476 L -0.607 5.273 Z M 2.432 0.202 C 2.544 -0.133 2.363 -0.495 2.028 -0.607 C 1.692 -0.719 1.33 -0.538 1.218 -0.202 L 1.825 0 L 2.432 0.202 Z M 0 5.476 L 0.607 5.678 L 2.432 0.202 L 1.825 0 L 1.218 -0.202 L -0.607 5.273 L 0 5.476 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.825,
    height: 5.476,
    viewBox: "0 0 1.825 5.476",
    fill: "none",
    style: {
      position: "absolute",
      left: 91.259,
      top: 1.825,
      width: 1.825,
      height: 5.476,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.218 5.678 C 1.33 6.013 1.692 6.194 2.028 6.083 C 2.363 5.971 2.544 5.608 2.432 5.273 L 1.825 5.476 L 1.218 5.678 Z M 0.607 -0.202 C 0.495 -0.538 0.133 -0.719 -0.202 -0.607 C -0.538 -0.495 -0.719 -0.133 -0.607 0.202 L 0 0 L 0.607 -0.202 Z M 1.825 5.476 L 2.432 5.273 L 0.607 -0.202 L 0 0 L -0.607 0.202 L 1.218 5.678 L 1.825 5.476 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.825,
    height: 5.476,
    viewBox: "0 0 1.825 5.476",
    fill: "none",
    style: {
      position: "absolute",
      left: 98.56,
      top: 0.912,
      width: 1.825,
      height: 5.476,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.607 5.273 C -0.719 5.608 -0.538 5.971 -0.202 6.083 C 0.133 6.194 0.495 6.013 0.607 5.678 L 0 5.476 L -0.607 5.273 Z M 2.432 0.202 C 2.544 -0.133 2.363 -0.495 2.028 -0.607 C 1.692 -0.719 1.33 -0.538 1.218 -0.202 L 1.825 0 L 2.432 0.202 Z M 0 5.476 L 0.607 5.678 L 2.432 0.202 L 1.825 0 L 1.218 -0.202 L -0.607 5.273 L 0 5.476 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.825,
    height: 5.476,
    viewBox: "0 0 1.825 5.476",
    fill: "none",
    style: {
      position: "absolute",
      left: 111.336,
      top: 3.65,
      width: 1.825,
      height: 5.476,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.218 5.678 C 1.33 6.013 1.692 6.194 2.028 6.083 C 2.363 5.971 2.544 5.608 2.432 5.273 L 1.825 5.476 L 1.218 5.678 Z M 0.607 -0.202 C 0.495 -0.538 0.133 -0.719 -0.202 -0.607 C -0.538 -0.495 -0.719 -0.133 -0.607 0.202 L 0 0 L 0.607 -0.202 Z M 1.825 5.476 L 2.432 5.273 L 0.607 -0.202 L 0 0 L -0.607 0.202 L 1.218 5.678 L 1.825 5.476 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.825,
    height: 5.476,
    viewBox: "0 0 1.825 5.476",
    fill: "none",
    style: {
      position: "absolute",
      left: 118.637,
      top: 2.737,
      width: 1.825,
      height: 5.476,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.607 5.273 C -0.719 5.608 -0.538 5.971 -0.202 6.083 C 0.133 6.194 0.495 6.013 0.607 5.678 L 0 5.476 L -0.607 5.273 Z M 2.432 0.202 C 2.544 -0.133 2.363 -0.495 2.028 -0.607 C 1.692 -0.719 1.33 -0.538 1.218 -0.202 L 1.825 0 L 2.432 0.202 Z M 0 5.476 L 0.607 5.678 L 2.432 0.202 L 1.825 0 L 1.218 -0.202 L -0.607 5.273 L 0 5.476 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 34.133,
    height: 25.600,
    viewBox: "0 0 34.133 25.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 53.333,
      top: 184.533,
      width: 34.133,
      height: 25.6,
      color: "rgb(208,64,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 32.337 0 L 1.796 0 C 0.804 0 0 0.819 0 1.829 L 0 23.771 C 0 24.781 0.804 25.6 1.796 25.6 L 32.337 25.6 C 33.329 25.6 34.133 24.781 34.133 23.771 L 34.133 1.829 C 34.133 0.819 33.329 0 32.337 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 37.333,
    height: 19.200,
    viewBox: "0 0 37.333 19.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 50.133,
      top: 167.467,
      width: 37.333,
      height: 19.2,
      color: "rgb(200,144,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 19.2 L 37.333 19.2 L 20.444 0 L 0 19.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 12.776,
    height: 4.563,
    viewBox: "0 0 12.776 4.563",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.966,-0.259,0.259,0.966,58.761,173.393)",
      transformOrigin: "0 0",
      width: 12.776,
      height: 4.563,
      color: "rgb(184,120,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 11.864 0 L 0.913 0 C 0.409 0 0 0.409 0 0.913 L 0 3.65 C 0 4.154 0.409 4.563 0.913 4.563 L 11.864 4.563 C 12.368 4.563 12.776 4.154 12.776 3.65 L 12.776 0.913 C 12.776 0.409 12.368 0 11.864 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.951,
    height: 3.650,
    viewBox: "0 0 10.951 3.650",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.985,0.174,-0.174,0.985,71.537,168.830)",
      transformOrigin: "0 0",
      width: 10.951,
      height: 3.65,
      color: "rgb(184,120,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.039 0 L 0.913 0 C 0.409 0 0 0.409 0 0.913 L 0 2.738 C 0 3.242 0.409 3.65 0.913 3.65 L 10.039 3.65 C 10.543 3.65 10.951 3.242 10.951 2.738 L 10.951 0.913 C 10.951 0.409 10.543 0 10.039 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 9.600,
    height: 7.467,
    viewBox: "0 0 9.600 7.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 58.666,
      top: 193.066,
      width: 9.6,
      height: 7.467,
      opacity: 0.85,
      color: "rgb(144,200,224)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.64 0 L 0.96 0 C 0.43 0 0 0.418 0 0.933 L 0 6.533 C 0 7.049 0.43 7.467 0.96 7.467 L 8.64 7.467 C 9.17 7.467 9.6 7.049 9.6 6.533 L 9.6 0.933 C 9.6 0.418 9.17 0 8.64 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8.533,
    height: 7.467,
    viewBox: "0 0 8.533 7.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 73.6,
      top: 193.066,
      width: 8.533,
      height: 7.467,
      opacity: 0.85,
      color: "rgb(144,200,224)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.68 0 L 0.853 0 C 0.382 0 0 0.418 0 0.933 L 0 6.533 C 0 7.049 0.382 7.467 0.853 7.467 L 7.68 7.467 C 8.151 7.467 8.533 7.049 8.533 6.533 L 8.533 0.933 C 8.533 0.418 8.151 0 7.68 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.067,
    height: 14.933,
    viewBox: "0 0 1.067 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 62.933,
      top: 184.533,
      width: 1.067,
      height: 14.933,
      opacity: 0.6,
      color: "rgb(138,32,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.705 0.046 C 1.73 -0.307 1.465 -0.613 1.112 -0.638 C 0.76 -0.664 0.453 -0.398 0.428 -0.046 L 1.067 0 L 1.705 0.046 Z M -0.638 14.888 C -0.664 15.24 -0.398 15.547 -0.046 15.572 C 0.307 15.597 0.613 15.331 0.638 14.979 L 0 14.933 L -0.638 14.888 Z M 1.067 0 L 0.428 -0.046 L -0.638 14.888 L 0 14.933 L 0.638 14.979 L 1.705 0.046 L 1.067 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 9.126,
    height: 4.563,
    viewBox: "0 0 9.126 4.563",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.906,-0.423,0.423,0.906,93.439,177.956)",
      transformOrigin: "0 0",
      width: 9.126,
      height: 4.563,
      color: "rgb(200,144,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.213 0 L 0.913 0 C 0.409 0 0 0.409 0 0.913 L 0 3.65 C 0 4.154 0.409 4.563 0.913 4.563 L 8.213 4.563 C 8.717 4.563 9.126 4.154 9.126 3.65 L 9.126 0.913 C 9.126 0.409 8.717 0 8.213 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.951,
    height: 4.563,
    viewBox: "0 0 10.951 4.563",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.966,0.259,-0.259,0.966,102.565,167.917)",
      transformOrigin: "0 0",
      width: 10.951,
      height: 4.563,
      color: "rgb(184,120,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.039 0 L 0.913 0 C 0.409 0 0 0.409 0 0.913 L 0 3.65 C 0 4.154 0.409 4.563 0.913 4.563 L 10.039 4.563 C 10.543 4.563 10.951 4.154 10.951 3.65 L 10.951 0.913 C 10.951 0.409 10.543 0 10.039 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.301,
    height: 3.650,
    viewBox: "0 0 7.301 3.650",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.985,-0.174,0.174,0.985,86.139,164.267)",
      transformOrigin: "0 0",
      width: 7.301,
      height: 3.65,
      color: "rgb(208,64,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.388 0 L 0.913 0 C 0.409 0 0 0.409 0 0.913 L 0 2.738 C 0 3.242 0.409 3.65 0.913 3.65 L 6.388 3.65 C 6.892 3.65 7.301 3.242 7.301 2.738 L 7.301 0.913 C 7.301 0.409 6.892 0 6.388 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.476,
    height: 3.650,
    viewBox: "0 0 5.476 3.650",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.940,0.342,-0.342,0.940,109.866,175.218)",
      transformOrigin: "0 0",
      width: 5.476,
      height: 3.65,
      color: "rgb(200,144,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.563 0 L 0.913 0 C 0.409 0 0 0.409 0 0.913 L 0 2.738 C 0 3.242 0.409 3.65 0.913 3.65 L 4.563 3.65 C 5.067 3.65 5.476 3.242 5.476 2.738 L 5.476 0.913 C 5.476 0.409 5.067 0 4.563 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.467,
    height: 34.133,
    viewBox: "0 0 7.467 34.133",
    fill: "none",
    style: {
      position: "absolute",
      left: 133.333,
      top: 173.867,
      width: 7.467,
      height: 34.133,
      color: "rgb(138,88,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.856 34.676 C 5.155 36.118 6.567 37.044 8.009 36.744 C 9.451 36.445 10.377 35.033 10.078 33.591 L 7.467 34.133 L 4.856 34.676 Z M 2.598 -0.6 C 2.267 -2.035 0.835 -2.93 -0.6 -2.598 C -2.035 -2.267 -2.93 -0.835 -2.598 0.6 L 0 0 L 2.598 -0.6 Z M 7.467 34.133 L 10.078 33.591 C 7.585 21.597 5.092 10.2 2.598 -0.6 L 0 0 L -2.598 0.6 C -0.114 11.358 2.37 22.716 4.856 34.676 L 7.467 34.133 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 25.600,
    height: 22.400,
    viewBox: "0 0 25.600 22.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 117.333,
      top: 154.667,
      width: 25.6,
      height: 22.4,
      color: "rgb(74,154,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 12.8 22.4 C 19.869 22.4 25.6 17.386 25.6 11.2 C 25.6 5.014 19.869 0 12.8 0 C 5.731 0 0 5.014 0 11.2 C 0 17.386 5.731 22.4 12.8 22.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 18.133,
    height: 16,
    viewBox: "0 0 18.133 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 112,
      top: 154.667,
      width: 18.133,
      height: 16,
      opacity: 0.7,
      color: "rgb(90,170,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.067 16 C 14.074 16 18.133 12.418 18.133 8 C 18.133 3.582 14.074 0 9.067 0 C 4.059 0 0 3.582 0 8 C 0 12.418 4.059 16 9.067 16 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.467,
    height: 30.933,
    viewBox: "0 0 7.467 30.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 151.466,
      top: 179.2,
      width: 7.467,
      height: 30.933,
      color: "rgb(138,88,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.387 31.408 C 5.649 32.556 6.792 33.275 7.941 33.013 C 9.09 32.751 9.809 31.608 9.547 30.459 L 7.467 30.933 L 5.387 31.408 Z M 2.066 -0.53 C 1.774 -1.671 0.611 -2.359 -0.53 -2.066 C -1.671 -1.774 -2.359 -0.611 -2.066 0.53 L 0 0 L 2.066 -0.53 Z M 7.467 30.933 L 9.547 30.459 C 7.054 19.525 4.561 9.195 2.066 -0.53 L 0 0 L -2.066 0.53 C 0.417 10.214 2.902 20.506 5.387 31.408 L 7.467 30.933 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 21.333,
    height: 18.133,
    viewBox: "0 0 21.333 18.133",
    fill: "none",
    style: {
      position: "absolute",
      left: 137.6,
      top: 162.133,
      width: 21.333,
      height: 18.133,
      color: "rgb(58,138,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.667 18.133 C 16.558 18.133 21.333 14.074 21.333 9.067 C 21.333 4.059 16.558 0 10.667 0 C 4.776 0 0 4.059 0 9.067 C 0 14.074 4.776 18.133 10.667 18.133 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 17.067,
    height: 14.933,
    viewBox: "0 0 17.067 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 132.266,
      top: 161.066,
      width: 17.067,
      height: 14.933,
      opacity: 0.65,
      color: "rgb(74,154,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.533 14.933 C 13.246 14.933 17.067 11.59 17.067 7.467 C 17.067 3.343 13.246 0 8.533 0 C 3.821 0 0 3.343 0 7.467 C 0 11.59 3.821 14.933 8.533 14.933 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 18.133,
    height: 12.800,
    viewBox: "0 0 18.133 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 163.2,
      top: 196.267,
      width: 18.133,
      height: 12.8,
      opacity: 0.8,
      color: "rgb(74,154,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.067 12.8 C 14.074 12.8 18.133 9.935 18.133 6.4 C 18.133 2.865 14.074 0 9.067 0 C 4.059 0 0 2.865 0 6.4 C 0 9.935 4.059 12.8 9.067 12.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 14.933,
    height: 10.667,
    viewBox: "0 0 14.933 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 156.8,
      top: 199.467,
      width: 14.933,
      height: 10.667,
      opacity: 0.6,
      color: "rgb(90,170,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.467 10.667 C 11.59 10.667 14.933 8.279 14.933 5.333 C 14.933 2.388 11.59 0 7.467 0 C 3.343 0 0 2.388 0 5.333 C 0 8.279 3.343 10.667 7.467 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 87.467,
    height: 28.800,
    viewBox: "0 0 87.467 28.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 88.533,
      top: 72.533,
      width: 87.467,
      height: 28.8,
      opacity: 0.6,
      color: "rgb(192,144,144)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 87.467 14.4 L 85.867 14.4 C 85.867 15.679 85.08 17.16 83.047 18.743 C 81.034 20.309 78.022 21.79 74.157 23.063 C 66.444 25.602 55.687 27.2 43.733 27.2 L 43.733 28.8 L 43.733 30.4 C 55.932 30.4 67.043 28.774 75.158 26.102 C 79.207 24.769 82.599 23.146 85.013 21.268 C 87.406 19.405 89.067 17.097 89.067 14.4 L 87.467 14.4 Z M 43.733 28.8 L 43.733 27.2 C 31.779 27.2 21.023 25.602 13.31 23.063 C 9.444 21.79 6.432 20.309 4.42 18.743 C 2.387 17.16 1.6 15.679 1.6 14.4 L 0 14.4 L -1.6 14.4 C -1.6 17.097 0.061 19.405 2.454 21.268 C 4.867 23.146 8.26 24.769 12.309 26.102 C 20.424 28.774 31.534 30.4 43.733 30.4 L 43.733 28.8 Z M 0 14.4 L 1.6 14.4 C 1.6 13.121 2.387 11.64 4.42 10.057 C 6.432 8.491 9.444 7.01 13.31 5.737 C 21.023 3.198 31.779 1.6 43.733 1.6 L 43.733 0 L 43.733 -1.6 C 31.534 -1.6 20.424 0.026 12.309 2.698 C 8.26 4.031 4.867 5.654 2.454 7.532 C 0.061 9.395 -1.6 11.703 -1.6 14.4 L 0 14.4 Z M 43.733 0 L 43.733 1.6 C 55.687 1.6 66.444 3.198 74.157 5.737 C 78.022 7.01 81.034 8.491 83.047 10.057 C 85.08 11.64 85.867 13.121 85.867 14.4 L 87.467 14.4 L 89.067 14.4 C 89.067 11.703 87.406 9.395 85.013 7.532 C 82.599 5.654 79.207 4.031 75.158 2.698 C 67.043 0.026 55.932 -1.6 43.733 -1.6 L 43.733 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 58.667,
    height: 18.133,
    viewBox: "0 0 58.667 18.133",
    fill: "none",
    style: {
      position: "absolute",
      left: 103.466,
      top: 84.267,
      width: 58.667,
      height: 18.133,
      opacity: 0.55,
      color: "rgb(184,136,136)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 58.667 9.067 L 57.333 9.067 C 57.333 9.69 56.921 10.535 55.575 11.519 C 54.257 12.483 52.264 13.406 49.681 14.204 C 44.533 15.795 37.338 16.8 29.333 16.8 L 29.333 18.133 L 29.333 19.467 C 37.529 19.467 45.001 18.442 50.469 16.752 C 53.195 15.909 55.498 14.879 57.148 13.672 C 58.771 12.487 60 10.947 60 9.067 L 58.667 9.067 Z M 29.333 18.133 L 29.333 16.8 C 21.329 16.8 14.134 15.795 8.985 14.204 C 6.403 13.406 4.41 12.483 3.092 11.519 C 1.746 10.535 1.333 9.69 1.333 9.067 L 0 9.067 L -1.333 9.067 C -1.333 10.947 -0.104 12.487 1.518 13.672 C 3.169 14.879 5.472 15.909 8.198 16.752 C 13.666 18.442 21.138 19.467 29.333 19.467 L 29.333 18.133 Z M 0 9.067 L 1.333 9.067 C 1.333 8.443 1.746 7.598 3.092 6.614 C 4.41 5.651 6.403 4.728 8.985 3.929 C 14.134 2.338 21.329 1.333 29.333 1.333 L 29.333 0 L 29.333 -1.333 C 21.138 -1.333 13.666 -0.308 8.198 1.382 C 5.472 2.224 3.169 3.255 1.518 4.461 C -0.104 5.647 -1.333 7.187 -1.333 9.067 L 0 9.067 Z M 29.333 0 L 29.333 1.333 C 37.338 1.333 44.533 2.338 49.681 3.929 C 52.264 4.728 54.257 5.651 55.575 6.614 C 56.921 7.598 57.333 8.443 57.333 9.067 L 58.667 9.067 L 60 9.067 C 60 7.187 58.771 5.647 57.148 4.461 C 55.498 3.255 53.195 2.224 50.469 1.382 C 45.001 -0.308 37.529 -1.333 29.333 -1.333 L 29.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 43.733,
    height: 13.867,
    viewBox: "0 0 43.733 13.867",
    fill: "none",
    style: {
      position: "absolute",
      left: 110.933,
      top: 91.733,
      width: 43.733,
      height: 13.867,
      opacity: 0.5,
      color: "rgb(168,120,120)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 43.733 6.933 L 42.667 6.933 C 42.667 7.4 42.367 8.035 41.375 8.779 C 40.402 9.508 38.926 10.21 37.006 10.819 C 33.179 12.033 27.827 12.8 21.867 12.8 L 21.867 13.867 L 21.867 14.933 C 27.983 14.933 33.564 14.149 37.651 12.853 C 39.689 12.207 41.415 11.415 42.655 10.486 C 43.876 9.57 44.8 8.381 44.8 6.933 L 43.733 6.933 Z M 21.867 13.867 L 21.867 12.8 C 15.907 12.8 10.554 12.033 6.727 10.819 C 4.807 10.21 3.331 9.508 2.358 8.779 C 1.366 8.035 1.067 7.4 1.067 6.933 L 0 6.933 L -1.067 6.933 C -1.067 8.381 -0.143 9.57 1.079 10.486 C 2.318 11.415 4.045 12.207 6.082 12.853 C 10.169 14.149 15.75 14.933 21.867 14.933 L 21.867 13.867 Z M 0 6.933 L 1.067 6.933 C 1.067 6.466 1.366 5.832 2.358 5.088 C 3.331 4.359 4.807 3.656 6.727 3.048 C 10.554 1.834 15.907 1.067 21.867 1.067 L 21.867 0 L 21.867 -1.067 C 15.75 -1.067 10.169 -0.282 6.082 1.014 C 4.045 1.66 2.318 2.452 1.079 3.381 C -0.143 4.297 -1.067 5.486 -1.067 6.933 L 0 6.933 Z M 21.867 0 L 21.867 1.067 C 27.827 1.067 33.179 1.834 37.006 3.048 C 38.926 3.656 40.402 4.359 41.375 5.088 C 42.367 5.832 42.667 6.466 42.667 6.933 L 43.733 6.933 L 44.8 6.933 C 44.8 5.486 43.876 4.297 42.655 3.381 C 41.415 2.452 39.689 1.66 37.651 1.014 C 33.564 -0.282 27.983 -1.067 21.867 -1.067 L 21.867 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 75.733,
    height: 94.933,
    viewBox: "0 0 75.733 94.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 92.8,
      top: 87.467,
      width: 75.733,
      height: 94.933,
      opacity: 0.82,
      color: "rgb(192,160,160)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.449 0 C -0.821 14.605 -1.126 30.427 2.534 47.467 C 4.974 59.638 10.464 71.809 19.004 83.979 C 22.664 88.848 25.714 92.499 28.154 94.933 C 30.594 92.499 32.424 88.848 33.644 83.979 C 38.524 71.809 42.184 59.638 44.624 47.467 C 48.284 30.427 58.653 14.605 75.733 0 L 3.449 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 36.267,
    height: 92.800,
    viewBox: "0 0 36.267 92.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 108.8,
      top: 89.6,
      width: 36.267,
      height: 92.8,
      opacity: 0.7,
      color: "rgb(154,120,120)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.297 0 C -0.366 14.557 -0.977 29.72 1.465 45.49 C 3.297 57.621 6.35 69.752 10.624 81.882 C 11.845 85.522 12.455 89.161 12.455 92.8 C 13.066 89.161 13.676 85.522 14.287 81.882 C 16.729 69.752 18.561 57.621 19.782 45.49 C 21.003 29.72 26.498 14.557 36.267 0 L 3.297 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 64,
    height: 3.200,
    viewBox: "0 0 64 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 99.2,
      top: 94.933,
      width: 64,
      height: 3.2,
      opacity: 0.7,
      color: "rgb(216,176,176)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.329 2.074 C -0.951 2.255 -1.308 2.906 -1.126 3.529 C -0.945 4.151 -0.294 4.508 0.329 4.326 L 0 3.2 L -0.329 2.074 Z M 63.823 4.36 C 64.464 4.457 65.062 4.017 65.16 3.377 C 65.257 2.736 64.817 2.138 64.177 2.04 L 64 3.2 L 63.823 4.36 Z M 0 3.2 L 0.329 4.326 C 14.707 0.133 35.833 0.101 63.823 4.36 L 64 3.2 L 64.177 2.04 C 36.091 -2.234 14.551 -2.266 -0.329 2.074 L 0 3.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 64,
    height: 4.267,
    viewBox: "0 0 64 4.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 97.066,
      top: 105.6,
      width: 64,
      height: 4.267,
      opacity: 0.65,
      color: "rgb(208,168,168)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.387 3.273 C -0.936 3.486 -1.208 4.104 -0.994 4.653 C -0.781 5.202 -0.162 5.474 0.387 5.261 L 0 4.267 L -0.387 3.273 Z M 63.788 5.312 C 64.365 5.429 64.928 5.056 65.045 4.479 C 65.163 3.901 64.789 3.338 64.212 3.221 L 64 4.267 L 63.788 5.312 Z M 0 4.267 L 0.387 5.261 C 14.724 -0.315 35.808 -0.365 63.788 5.312 L 64 4.267 L 64.212 3.221 C 36.116 -2.479 14.533 -2.53 -0.387 3.273 L 0 4.267 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 59.733,
    height: 3.200,
    viewBox: "0 0 59.733 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 97.066,
      top: 117.333,
      width: 59.733,
      height: 3.2,
      opacity: 0.6,
      color: "rgb(200,160,160)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.294 2.286 C -0.799 2.448 -1.076 2.989 -0.914 3.494 C -0.752 3.999 -0.211 4.276 0.294 4.114 L 0 3.2 L -0.294 2.286 Z M 59.581 4.148 C 60.104 4.232 60.597 3.876 60.681 3.352 C 60.765 2.829 60.409 2.336 59.886 2.252 L 59.733 3.2 L 59.581 4.148 Z M 0 3.2 L 0.294 4.114 C 13.344 -0.081 33.068 -0.113 59.581 4.148 L 59.733 3.2 L 59.886 2.252 C 33.302 -2.02 13.204 -2.053 -0.294 2.286 L 0 3.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 55.467,
    height: 3.200,
    viewBox: "0 0 55.467 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 98.133,
      top: 128,
      width: 55.467,
      height: 3.2,
      opacity: 0.55,
      color: "rgb(192,152,152)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.271 2.391 C -0.718 2.541 -0.959 3.024 -0.809 3.471 C -0.659 3.918 -0.176 4.159 0.271 4.009 L 0 3.2 L -0.271 2.391 Z M 55.319 4.04 C 55.783 4.122 56.225 3.812 56.307 3.348 C 56.389 2.884 56.079 2.441 55.615 2.36 L 55.467 3.2 L 55.319 4.04 Z M 0 3.2 L 0.271 4.009 C 12.796 -0.189 31.112 -0.219 55.319 4.04 L 55.467 3.2 L 55.615 2.36 C 31.326 -1.914 12.665 -1.945 -0.271 2.391 L 0 3.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 48,
    height: 3.200,
    viewBox: "0 0 48 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 100.266,
      top: 138.667,
      width: 48,
      height: 3.2,
      opacity: 0.5,
      color: "rgb(184,144,144)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.279 2.45 C -0.693 2.604 -0.904 3.065 -0.75 3.479 C -0.596 3.893 -0.135 4.104 0.279 3.95 L 0 3.2 L -0.279 2.45 Z M 47.837 3.983 C 48.27 4.073 48.693 3.795 48.783 3.363 C 48.873 2.93 48.595 2.507 48.163 2.417 L 48 3.2 L 47.837 3.983 Z M 0 3.2 L 0.279 3.95 C 11.541 -0.239 27.364 -0.272 47.837 3.983 L 48 3.2 L 48.163 2.417 C 27.58 -1.861 11.402 -1.894 -0.279 2.45 L 0 3.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 40.533,
    height: 3.200,
    viewBox: "0 0 40.533 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 102.4,
      top: 148.267,
      width: 40.533,
      height: 3.2,
      opacity: 0.48,
      color: "rgb(176,136,136)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.282 2.509 C -0.664 2.665 -0.847 3.101 -0.691 3.482 C -0.535 3.864 -0.099 4.047 0.282 3.891 L 0 3.2 L -0.282 2.509 Z M 40.347 3.923 C 40.747 4.026 41.154 3.785 41.256 3.386 C 41.359 2.987 41.119 2.58 40.719 2.477 L 40.533 3.2 L 40.347 3.923 Z M 0 3.2 L 0.282 3.891 C 10.515 -0.291 23.845 -0.323 40.347 3.923 L 40.533 3.2 L 40.719 2.477 C 24.058 -1.81 10.366 -1.843 -0.282 2.509 L 0 3.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 30.933,
    height: 3.200,
    viewBox: "0 0 30.933 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 106.666,
      top: 157.867,
      width: 30.933,
      height: 3.2,
      opacity: 0.45,
      color: "rgb(168,128,128)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.287 2.628 C -0.603 2.787 -0.731 3.172 -0.572 3.487 C -0.413 3.803 -0.028 3.931 0.287 3.772 L 0 3.2 L -0.287 2.628 Z M 30.721 3.804 C 31.054 3.921 31.42 3.746 31.537 3.412 C 31.654 3.079 31.479 2.714 31.146 2.596 L 30.933 3.2 L 30.721 3.804 Z M 0 3.2 L 0.287 3.772 C 8.575 -0.392 18.694 -0.426 30.721 3.804 L 30.933 3.2 L 31.146 2.596 C 18.911 -1.707 8.408 -1.741 -0.287 2.628 L 0 3.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 22.400,
    height: 2.133,
    viewBox: "0 0 22.400 2.133",
    fill: "none",
    style: {
      position: "absolute",
      left: 109.866,
      top: 167.467,
      width: 22.4,
      height: 2.133,
      opacity: 0.42,
      color: "rgb(160,120,120)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.244 1.6 C -0.539 1.734 -0.668 2.083 -0.534 2.377 C -0.399 2.672 -0.051 2.802 0.244 2.667 L 0 2.133 L -0.244 1.6 Z M 22.218 2.691 C 22.526 2.792 22.857 2.623 22.958 2.315 C 23.058 2.007 22.89 1.676 22.582 1.576 L 22.4 2.133 L 22.218 2.691 Z M 0 2.133 L 0.244 2.667 C 6.292 -0.098 13.598 -0.124 22.218 2.691 L 22.4 2.133 L 22.582 1.576 C 13.779 -1.299 6.152 -1.324 -0.244 1.6 L 0 2.133 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 25.600,
    height: 7.467,
    viewBox: "0 0 25.600 7.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 64,
      top: 72.533,
      width: 25.6,
      height: 7.467,
      opacity: 0.55,
      color: "rgb(192,144,144)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 24.837 8.56 C 25.441 8.981 26.272 8.834 26.693 8.23 C 27.115 7.626 26.967 6.795 26.363 6.373 L 25.6 7.467 L 24.837 8.56 Z M -0.747 1.061 C -1.357 1.473 -1.517 2.302 -1.104 2.912 C -0.692 3.522 0.137 3.682 0.747 3.269 L 0 2.165 L -0.747 1.061 Z M 25.6 7.467 L 26.363 6.373 C 15.335 -1.324 6.105 -3.575 -0.747 1.061 L 0 2.165 L 0.747 3.269 C 6.086 -0.343 13.922 0.942 24.837 8.56 L 25.6 7.467 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 25.600,
    height: 7.467,
    viewBox: "0 0 25.600 7.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 60.8,
      top: 90.667,
      width: 25.6,
      height: 7.467,
      opacity: 0.45,
      color: "rgb(184,136,136)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 25.41 1.879 C 25.989 1.984 26.544 1.6 26.65 1.02 C 26.755 0.44 26.37 -0.115 25.79 -0.22 L 25.6 0.83 L 25.41 1.879 Z M -0.86 6.835 C -1.208 7.31 -1.106 7.977 -0.632 8.326 C -0.157 8.675 0.511 8.573 0.86 8.098 L 0 7.467 L -0.86 6.835 Z M 25.6 0.83 L 25.79 -0.22 C 13.425 -2.464 4.369 -0.282 -0.86 6.835 L 0 7.467 L 0.86 8.098 C 5.383 1.941 13.394 -0.302 25.41 1.879 L 25.6 0.83 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 13.867,
    height: 16,
    viewBox: "0 0 13.867 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 168.533,
      top: 64,
      width: 13.867,
      height: 16,
      opacity: 0.5,
      color: "rgb(192,144,144)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.788 14.924 C -1.382 15.36 -1.511 16.194 -1.076 16.788 C -0.64 17.382 0.194 17.511 0.788 17.076 L 0 16 L -0.788 14.924 Z M 15.162 0.316 C 15.336 -0.4 14.898 -1.121 14.182 -1.295 C 13.467 -1.47 12.746 -1.031 12.571 -0.316 L 13.867 0 L 15.162 0.316 Z M 0 16 L 0.788 17.076 C 8.907 11.128 13.886 5.552 15.162 0.316 L 13.867 0 L 12.571 -0.316 C 11.536 3.93 7.271 9.02 -0.788 14.924 L 0 16 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 12.800,
    height: 8.533,
    viewBox: "0 0 12.800 8.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 169.6,
      top: 93.867,
      width: 12.8,
      height: 8.533,
      opacity: 0.4,
      color: "rgb(184,136,136)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.348 -0.06 C -0.905 0.132 -1.201 0.74 -1.008 1.297 C -0.816 1.853 -0.208 2.149 0.348 1.956 L 0 0.948 L -0.348 -0.06 Z M 11.747 8.703 C 11.84 9.284 12.388 9.68 12.969 9.586 C 13.551 9.493 13.947 8.946 13.853 8.364 L 12.8 8.533 L 11.747 8.703 Z M 0 0.948 L 0.348 1.956 C 3.875 0.737 6.399 0.833 8.142 1.866 C 9.882 2.897 11.16 5.05 11.747 8.703 L 12.8 8.533 L 13.853 8.364 C 13.221 4.431 11.756 1.528 9.23 0.031 C 6.705 -1.465 3.439 -1.369 -0.348 -0.06 L 0 0.948 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 22.400,
    height: 4.267,
    viewBox: "0 0 22.400 4.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 74.666,
      top: 126.933,
      width: 22.4,
      height: 4.267,
      opacity: 0.4,
      color: "rgb(176,128,128)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 22.22 2.01 C 22.741 2.109 23.244 1.767 23.343 1.246 C 23.442 0.725 23.1 0.223 22.58 0.124 L 22.4 1.067 L 22.22 2.01 Z M -0.722 3.635 C -1.072 4.034 -1.031 4.64 -0.632 4.989 C -0.233 5.338 0.373 5.298 0.722 4.899 L 0 4.267 L -0.722 3.635 Z M 22.4 1.067 L 22.58 0.124 C 16.923 -0.954 12.142 -1.238 8.264 -0.684 C 4.38 -0.129 1.339 1.278 -0.722 3.635 L 0 4.267 L 0.722 4.899 C 2.394 2.988 4.954 1.729 8.536 1.217 C 12.125 0.704 16.677 0.954 22.22 2.01 L 22.4 1.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 20.267,
    height: 4.267,
    viewBox: "0 0 20.267 4.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 148.266,
      top: 132.267,
      width: 20.267,
      height: 4.267,
      opacity: 0.38,
      color: "rgb(176,128,128)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.341 1.503 C -0.837 1.691 -1.086 2.245 -0.897 2.741 C -0.709 3.237 -0.155 3.486 0.341 3.297 L 0 2.4 L -0.341 1.503 Z M 19.495 4.838 C 19.811 5.264 20.412 5.354 20.838 5.038 C 21.264 4.723 21.354 4.122 21.038 3.695 L 20.267 4.267 L 19.495 4.838 Z M 0 2.4 L 0.341 3.297 C 5.185 1.457 9.174 0.73 12.348 1.023 C 15.483 1.311 17.832 2.591 19.495 4.838 L 20.267 4.267 L 21.038 3.695 C 19.017 0.964 16.145 -0.556 12.524 -0.889 C 8.943 -1.219 4.641 -0.39 -0.341 1.503 L 0 2.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 40.533,
    height: 12.800,
    viewBox: "0 0 40.533 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 100.266,
      top: 178.133,
      width: 40.533,
      height: 12.8,
      opacity: 0.55,
      color: "rgb(184,160,144)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 20.267 12.8 C 31.46 12.8 40.533 9.935 40.533 6.4 C 40.533 2.865 31.46 0 20.267 0 C 9.074 0 0 2.865 0 6.4 C 0 9.935 9.074 12.8 20.267 12.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 25.600,
    height: 7.467,
    viewBox: "0 0 25.600 7.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 107.733,
      top: 180.267,
      width: 25.6,
      height: 7.467,
      opacity: 0.45,
      color: "rgb(200,176,160)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 12.8 7.467 C 19.869 7.467 25.6 5.795 25.6 3.733 C 25.6 1.671 19.869 0 12.8 0 C 5.731 0 0 1.671 0 3.733 C 0 5.795 5.731 7.467 12.8 7.467 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 36.267,
    height: 3.200,
    viewBox: "0 0 36.267 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 102.4,
      top: 179.2,
      width: 36.267,
      height: 3.2,
      opacity: 0.5,
      color: "rgb(208,184,160)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.393 2.503 C -0.778 2.721 -0.914 3.209 -0.697 3.593 C -0.479 3.978 0.009 4.114 0.393 3.897 L 0 3.2 L -0.393 2.503 Z M 18.133 1.152 L 17.877 1.91 L 18.133 1.997 L 18.39 1.91 L 18.133 1.152 Z M 35.873 3.897 C 36.258 4.114 36.746 3.978 36.963 3.593 C 37.181 3.209 37.045 2.721 36.66 2.503 L 36.267 3.2 L 35.873 3.897 Z M 0 3.2 L 0.393 3.897 C 6.259 0.584 12.068 -0.058 17.877 1.91 L 18.133 1.152 L 18.39 0.394 C 12.11 -1.734 5.83 -1.011 -0.393 2.503 L 0 3.2 Z M 18.133 1.152 L 18.39 1.91 C 24.199 -0.058 30.007 0.584 35.873 3.897 L 36.267 3.2 L 36.66 2.503 C 30.437 -1.011 24.157 -1.734 17.877 0.394 L 18.133 1.152 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 64.237,
      top: 91.715,
      width: 113.646,
      height: 68.897,
      opacity: 0.7,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 7.301,
    height: 3.650,
    viewBox: "0 0 7.301 3.650",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.866,-0.500,0.500,0.866,10.951,43.348)",
      transformOrigin: "0 0",
      width: 7.301,
      height: 3.65,
      color: "rgb(232,160,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.388 0 L 0.913 0 C 0.409 0 0 0.409 0 0.913 L 0 2.738 C 0 3.242 0.409 3.65 0.913 3.65 L 6.388 3.65 C 6.892 3.65 7.301 3.242 7.301 2.738 L 7.301 0.913 C 7.301 0.409 6.892 0 6.388 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.476,
    height: 2.738,
    viewBox: "0 0 5.476 2.738",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.940,0.342,-0.342,0.940,1.825,56.125)",
      transformOrigin: "0 0",
      width: 5.476,
      height: 2.738,
      color: "rgb(208,64,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.563 0 L 0.913 0 C 0.409 0 0 0.409 0 0.913 L 0 1.825 C 0 2.329 0.409 2.738 0.913 2.738 L 4.563 2.738 C 5.067 2.738 5.476 2.329 5.476 1.825 L 5.476 0.913 C 5.476 0.409 5.067 0 4.563 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.388,
    height: 2.738,
    viewBox: "0 0 6.388 2.738",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.966,-0.259,0.259,0.966,100.384,49.737)",
      transformOrigin: "0 0",
      width: 6.388,
      height: 2.738,
      color: "rgb(168,200,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.476 0 L 0.913 0 C 0.409 0 0 0.409 0 0.913 L 0 1.825 C 0 2.329 0.409 2.738 0.913 2.738 L 5.476 2.738 C 5.98 2.738 6.388 2.329 6.388 1.825 L 6.388 0.913 C 6.388 0.409 5.98 0 5.476 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.563,
    height: 2.738,
    viewBox: "0 0 4.563 2.738",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.906,0.423,-0.423,0.906,109.510,61.600)",
      transformOrigin: "0 0",
      width: 4.563,
      height: 2.738,
      color: "rgb(64,144,208)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.65 0 L 0.913 0 C 0.409 0 0 0.409 0 0.913 L 0 1.825 C 0 2.329 0.409 2.738 0.913 2.738 L 3.65 2.738 C 4.154 2.738 4.563 2.329 4.563 1.825 L 4.563 0.913 C 4.563 0.409 4.154 0 3.65 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.476,
    height: 2.738,
    viewBox: "0 0 5.476 2.738",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.985,0.174,-0.174,0.985,14.601,65.251)",
      transformOrigin: "0 0",
      width: 5.476,
      height: 2.738,
      color: "rgb(200,160,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.563 0 L 0.913 0 C 0.409 0 0 0.409 0 0.913 L 0 1.825 C 0 2.329 0.409 2.738 0.913 2.738 L 4.563 2.738 C 5.067 2.738 5.476 2.329 5.476 1.825 L 5.476 0.913 C 5.476 0.409 5.067 0 4.563 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.476,
    height: 2.738,
    viewBox: "0 0 5.476 2.738",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.940,-0.342,0.342,0.940,96.734,31.485)",
      transformOrigin: "0 0",
      width: 5.476,
      height: 2.738,
      color: "rgb(208,80,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.563 0 L 0.913 0 C 0.409 0 0 0.409 0 0.913 L 0 1.825 C 0 2.329 0.409 2.738 0.913 2.738 L 4.563 2.738 C 5.067 2.738 5.476 2.329 5.476 1.825 L 5.476 0.913 C 5.476 0.409 5.067 0 4.563 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.476,
    height: 1.369,
    viewBox: "0 0 5.476 1.369",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 7.301,
      width: 5.476,
      height: 1.369,
      color: "rgb(106,138,112)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.566 0.803 C -0.878 1.116 -0.878 1.622 -0.566 1.935 C -0.253 2.247 0.253 2.247 0.566 1.935 L 0 1.369 L -0.566 0.803 Z M 4.91 1.935 C 5.222 2.247 5.729 2.247 6.041 1.935 C 6.354 1.622 6.354 1.116 6.041 0.803 L 5.476 1.369 L 4.91 1.935 Z M 0 1.369 L 0.566 1.935 C 1.391 1.109 2.112 0.8 2.738 0.8 C 3.363 0.8 4.084 1.109 4.91 1.935 L 5.476 1.369 L 6.041 0.803 C 5.041 -0.197 3.937 -0.8 2.738 -0.8 C 1.538 -0.8 0.434 -0.197 -0.566 0.803 L 0 1.369 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.476,
    height: 1.369,
    viewBox: "0 0 5.476 1.369",
    fill: "none",
    style: {
      position: "absolute",
      left: 10.951,
      top: 0,
      width: 5.476,
      height: 1.369,
      color: "rgb(106,138,112)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.566 0.803 C -0.878 1.116 -0.878 1.622 -0.566 1.935 C -0.253 2.247 0.253 2.247 0.566 1.935 L 0 1.369 L -0.566 0.803 Z M 4.91 1.935 C 5.222 2.247 5.729 2.247 6.041 1.935 C 6.354 1.622 6.354 1.116 6.041 0.803 L 5.476 1.369 L 4.91 1.935 Z M 0 1.369 L 0.566 1.935 C 1.391 1.109 2.112 0.8 2.738 0.8 C 3.363 0.8 4.084 1.109 4.91 1.935 L 5.476 1.369 L 6.041 0.803 C 5.041 -0.197 3.937 -0.8 2.738 -0.8 C 1.538 -0.8 0.434 -0.197 -0.566 0.803 L 0 1.369 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.476,
    height: 1.369,
    viewBox: "0 0 5.476 1.369",
    fill: "none",
    style: {
      position: "absolute",
      left: 98.559,
      top: 14.602,
      width: 5.476,
      height: 1.369,
      color: "rgb(106,138,112)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.566 0.803 C -0.878 1.116 -0.878 1.622 -0.566 1.935 C -0.253 2.247 0.253 2.247 0.566 1.935 L 0 1.369 L -0.566 0.803 Z M 4.91 1.935 C 5.222 2.247 5.729 2.247 6.041 1.935 C 6.354 1.622 6.354 1.116 6.041 0.803 L 5.476 1.369 L 4.91 1.935 Z M 0 1.369 L 0.566 1.935 C 1.391 1.109 2.112 0.8 2.738 0.8 C 3.363 0.8 4.084 1.109 4.91 1.935 L 5.476 1.369 L 6.041 0.803 C 5.041 -0.197 3.937 -0.8 2.738 -0.8 C 1.538 -0.8 0.434 -0.197 -0.566 0.803 L 0 1.369 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.476,
    height: 1.369,
    viewBox: "0 0 5.476 1.369",
    fill: "none",
    style: {
      position: "absolute",
      left: 107.685,
      top: 3.651,
      width: 5.476,
      height: 1.369,
      color: "rgb(106,138,112)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.566 0.803 C -0.878 1.116 -0.878 1.622 -0.566 1.935 C -0.253 2.247 0.253 2.247 0.566 1.935 L 0 1.369 L -0.566 0.803 Z M 4.91 1.935 C 5.222 2.247 5.729 2.247 6.041 1.935 C 6.354 1.622 6.354 1.116 6.041 0.803 L 5.476 1.369 L 4.91 1.935 Z M 0 1.369 L 0.566 1.935 C 1.391 1.109 2.112 0.8 2.738 0.8 C 3.363 0.8 4.084 1.109 4.91 1.935 L 5.476 1.369 L 6.041 0.803 C 5.041 -0.197 3.937 -0.8 2.738 -0.8 C 1.538 -0.8 0.434 -0.197 -0.566 0.803 L 0 1.369 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 69.333,
    height: 21.333,
    viewBox: "0 0 69.333 21.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 97.066,
      top: 76.8,
      width: 69.333,
      height: 21.333,
      opacity: 0.8,
      color: "rgb(196,160,160)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 34.667 21.333 C 53.813 21.333 69.333 16.558 69.333 10.667 C 69.333 4.776 53.813 0 34.667 0 C 15.521 0 0 4.776 0 10.667 C 0 16.558 15.521 21.333 34.667 21.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body2 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 160,
      height: 213.333,
      overflow: "hidden",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -5.333,
      top: 0,
      width: 170.667,
      height: 277.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 277.333,
    viewBox: "0 0 160 277.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 0,
      width: 160,
      height: 277.333,
      color: "rgb(200,184,154)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 145.067 0 L 14.933 0 C 6.686 0 0 6.686 0 14.933 L 0 262.4 C 0 270.647 6.686 277.333 14.933 277.333 L 145.067 277.333 C 153.314 277.333 160 270.647 160 262.4 L 160 14.933 C 160 6.686 153.314 0 145.067 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 170.667,
    height: 85.333,
    viewBox: "0 0 170.667 85.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 10.667,
      width: 170.667,
      height: 85.333,
      opacity: 0.5,
      color: "rgb(212,192,160)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 85.333 85.333 C 132.462 85.333 170.667 66.231 170.667 42.667 C 170.667 19.103 132.462 0 85.333 0 C 38.205 0 0 19.103 0 42.667 C 0 66.231 38.205 85.333 85.333 85.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 96,
    height: 59.733,
    viewBox: "0 0 96 59.733",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 12.8,
      width: 96,
      height: 59.733,
      opacity: 0.4,
      color: "rgb(200,176,144)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 48 59.733 C 74.51 59.733 96 46.362 96 29.867 C 96 13.372 74.51 0 48 0 C 21.49 0 0 13.372 0 29.867 C 0 46.362 21.49 59.733 48 59.733 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 85.333,
    height: 51.200,
    viewBox: "0 0 85.333 51.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 80,
      top: 22.4,
      width: 85.333,
      height: 51.2,
      opacity: 0.35,
      color: "rgb(200,176,144)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 42.667 51.2 C 66.231 51.2 85.333 39.738 85.333 25.6 C 85.333 11.462 66.231 0 42.667 0 C 19.103 0 0 11.462 0 25.6 C 0 39.738 19.103 51.2 42.667 51.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 149.333,
    height: 106.667,
    viewBox: "0 0 149.333 106.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 10.666,
      top: 16,
      width: 149.333,
      height: 106.667,
      opacity: 0.5,
      color: "rgb(138,112,80)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 74.667 0 L 149.333 106.667 L 0 106.667 L 74.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 64,
    height: 53.333,
    viewBox: "0 0 64 53.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 53.333,
      top: 16,
      width: 64,
      height: 53.333,
      opacity: 0.4,
      color: "rgb(160,128,96)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 32 0 L 64 53.333 L 0 53.333 L 32 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 17.067,
    height: 23.467,
    viewBox: "0 0 17.067 23.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 28.8,
      top: 83.2,
      width: 17.067,
      height: 23.467,
      opacity: 0.7,
      color: "rgb(45,90,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.533 0 L 17.067 23.467 L 0 23.467 L 8.533 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 17.067,
    height: 23.467,
    viewBox: "0 0 17.067 23.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 48,
      top: 74.667,
      width: 17.067,
      height: 23.467,
      opacity: 0.75,
      color: "rgb(26,74,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.533 0 L 17.067 23.467 L 0 23.467 L 8.533 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.400,
    height: 12.800,
    viewBox: "0 0 6.400 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 34.133,
      top: 106.667,
      width: 6.4,
      height: 12.8,
      opacity: 0.5,
      color: "rgb(74,46,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.267 0 L 2.133 0 C 0.955 0 0 0.955 0 2.133 L 0 10.667 C 0 11.845 0.955 12.8 2.133 12.8 L 4.267 12.8 C 5.445 12.8 6.4 11.845 6.4 10.667 L 6.4 2.133 C 6.4 0.955 5.445 0 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.400,
    height: 12.800,
    viewBox: "0 0 6.400 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 53.333,
      top: 98.133,
      width: 6.4,
      height: 12.8,
      opacity: 0.5,
      color: "rgb(74,46,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.267 0 L 2.133 0 C 0.955 0 0 0.955 0 2.133 L 0 10.667 C 0 11.845 0.955 12.8 2.133 12.8 L 4.267 12.8 C 5.445 12.8 6.4 11.845 6.4 10.667 L 6.4 2.133 C 6.4 0.955 5.445 0 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 149.333,
    height: 99.075,
    viewBox: "0 0 149.333 99.075",
    fill: "none",
    style: {
      position: "absolute",
      left: 10.666,
      top: 93.867,
      width: 149.333,
      height: 99.075,
      color: "rgb(160,120,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 23.467 C 17.778 9.244 37.333 5.689 58.667 12.8 C 80 19.911 101.333 15.644 122.667 0 L 149.333 7.467 L 149.333 92.8 C 124.444 99.911 99.556 100.978 74.667 96 C 49.778 90.311 24.889 91.022 0 98.133 L 0 23.467 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 149.333,
    height: 70.275,
    viewBox: "0 0 149.333 70.275",
    fill: "none",
    style: {
      position: "absolute",
      left: 10.666,
      top: 122.667,
      width: 149.333,
      height: 70.275,
      opacity: 0.8,
      color: "rgb(138,96,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 13.867 C 21.333 4.622 42.667 2.489 64 7.467 C 85.333 13.156 106.667 10.667 128 0 L 149.333 5.333 L 149.333 64 C 124.444 71.111 99.556 72.178 74.667 67.2 C 49.778 61.511 24.889 62.222 0 69.333 L 0 13.867 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2.438,
    height: 28.800,
    viewBox: "0 0 2.438 28.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 62.933,
      top: 93.867,
      width: 2.438,
      height: 28.8,
      color: "rgb(90,48,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.36 -0.323 C 2.182 -1.038 1.458 -1.472 0.743 -1.294 C 0.029 -1.115 -0.405 -0.391 -0.227 0.323 L 1.067 0 L 2.36 -0.323 Z M -1.288 28.456 C -1.478 29.168 -1.055 29.899 -0.344 30.088 C 0.368 30.278 1.099 29.855 1.288 29.144 L 0 28.8 L -1.288 28.456 Z M 1.067 0 L -0.227 0.323 C 1.839 8.588 1.513 17.953 -1.288 28.456 L 0 28.8 L 1.288 29.144 C 4.176 18.313 4.561 8.478 2.36 -0.323 L 1.067 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2.844,
    height: 32,
    viewBox: "0 0 2.844 32",
    fill: "none",
    style: {
      position: "absolute",
      left: 88.533,
      top: 87.467,
      width: 2.844,
      height: 32,
      opacity: 0.7,
      color: "rgb(90,48,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.189 -0.151 C 3.106 -0.734 2.566 -1.139 1.982 -1.056 C 1.399 -0.973 0.994 -0.432 1.077 0.151 L 2.133 0 L 3.189 -0.151 Z M -1.035 31.741 C -1.178 32.313 -0.83 32.892 -0.259 33.035 C 0.313 33.178 0.892 32.83 1.035 32.259 L 0 32 L -1.035 31.741 Z M 2.133 0 L 1.077 0.151 C 2.477 9.949 1.782 20.475 -1.035 31.741 L 0 32 L 1.035 32.259 C 3.907 20.769 4.634 9.962 3.189 -0.151 L 2.133 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.819,0.574,-0.574,0.819,109.726,70.750)",
      transformOrigin: "0 0",
      width: 21.333,
      height: 40.533,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 21.333,
    height: 25.600,
    viewBox: "0 0 21.333 25.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 21.333,
      height: 25.6,
      opacity: 0.8,
      color: "rgb(45,90,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.667 0 L 21.333 25.6 L 0 25.6 L 10.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.400,
    height: 14.933,
    viewBox: "0 0 6.400 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 7.466,
      top: 25.6,
      width: 6.4,
      height: 14.933,
      opacity: 0.7,
      color: "rgb(74,46,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.267 0 L 2.133 0 C 0.955 0 0 0.955 0 2.133 L 0 12.8 C 0 13.978 0.955 14.933 2.133 14.933 L 4.267 14.933 C 5.445 14.933 6.4 13.978 6.4 12.8 L 6.4 2.133 C 6.4 0.955 5.445 0 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.643,0.766,-0.766,0.643,137.291,87.179)",
      transformOrigin: "0 0",
      width: 17.067,
      height: 34.132,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 17.067,
    height: 21.333,
    viewBox: "0 0 17.067 21.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 17.067,
      height: 21.333,
      opacity: 0.7,
      color: "rgb(26,74,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.533 0 L 17.067 21.333 L 0 21.333 L 8.533 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 12.800,
    viewBox: "0 0 5.333 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.867,
      top: 21.333,
      width: 5.333,
      height: 12.8,
      opacity: 0.6,
      color: "rgb(74,46,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.2 0 L 2.133 0 C 0.955 0 0 0.955 0 2.133 L 0 10.667 C 0 11.845 0.955 12.8 2.133 12.8 L 3.2 12.8 C 4.378 12.8 5.333 11.845 5.333 10.667 L 5.333 2.133 C 5.333 0.955 4.378 0 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 29.867,
    height: 19.200,
    viewBox: "0 0 29.867 19.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 11.733,
      top: 177.066,
      width: 29.867,
      height: 19.2,
      opacity: 0.9,
      color: "rgb(122,80,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14.933 19.2 C 23.181 19.2 29.867 14.902 29.867 9.6 C 29.867 4.298 23.181 0 14.933 0 C 6.686 0 0 4.298 0 9.6 C 0 14.902 6.686 19.2 14.933 19.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 25.600,
    height: 17.067,
    viewBox: "0 0 25.600 17.067",
    fill: "none",
    style: {
      position: "absolute",
      left: 45.866,
      top: 192,
      width: 25.6,
      height: 17.067,
      opacity: 0.85,
      color: "rgb(106,64,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 12.8 17.067 C 19.869 17.067 25.6 13.246 25.6 8.533 C 25.6 3.821 19.869 0 12.8 0 C 5.731 0 0 3.821 0 8.533 C 0 13.246 5.731 17.067 12.8 17.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 34.133,
    height: 21.333,
    viewBox: "0 0 34.133 21.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 73.6,
      top: 181.333,
      width: 34.133,
      height: 21.333,
      opacity: 0.88,
      color: "rgb(138,96,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 17.067 21.333 C 26.492 21.333 34.133 16.558 34.133 10.667 C 34.133 4.776 26.492 0 17.067 0 C 7.641 0 0 4.776 0 10.667 C 0 16.558 7.641 21.333 17.067 21.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 27.733,
    height: 17.067,
    viewBox: "0 0 27.733 17.067",
    fill: "none",
    style: {
      position: "absolute",
      left: 110.933,
      top: 189.867,
      width: 27.733,
      height: 17.067,
      opacity: 0.82,
      color: "rgb(122,80,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 13.867 17.067 C 21.525 17.067 27.733 13.246 27.733 8.533 C 27.733 3.821 21.525 0 13.867 0 C 6.208 0 0 3.821 0 8.533 C 0 13.246 6.208 17.067 13.867 17.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 21.333,
    height: 14.933,
    viewBox: "0 0 21.333 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 138.666,
      top: 179.2,
      width: 21.333,
      height: 14.933,
      opacity: 0.8,
      color: "rgb(106,64,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.667 14.933 C 16.558 14.933 21.333 11.59 21.333 7.467 C 21.333 3.343 16.558 0 10.667 0 C 4.776 0 0 3.343 0 7.467 C 0 11.59 4.776 14.933 10.667 14.933 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 17.067,
    height: 10.667,
    viewBox: "0 0 17.067 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 34.133,
      top: 203.733,
      width: 17.067,
      height: 10.667,
      opacity: 0.75,
      color: "rgb(154,112,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.533 10.667 C 13.246 10.667 17.067 8.279 17.067 5.333 C 17.067 2.388 13.246 0 8.533 0 C 3.821 0 0 2.388 0 5.333 C 0 8.279 3.821 10.667 8.533 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 19.200,
    height: 10.667,
    viewBox: "0 0 19.200 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 65.066,
      top: 208,
      width: 19.2,
      height: 10.667,
      opacity: 0.72,
      color: "rgb(122,80,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.6 10.667 C 14.902 10.667 19.2 8.279 19.2 5.333 C 19.2 2.388 14.902 0 9.6 0 C 4.298 0 0 2.388 0 5.333 C 0 8.279 4.298 10.667 9.6 10.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 14.933,
    height: 8.533,
    viewBox: "0 0 14.933 8.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 102.4,
      top: 206.933,
      width: 14.933,
      height: 8.533,
      opacity: 0.7,
      color: "rgb(138,96,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.467 8.533 C 11.59 8.533 14.933 6.623 14.933 4.267 C 14.933 1.91 11.59 0 7.467 0 C 3.343 0 0 1.91 0 4.267 C 0 6.623 3.343 8.533 7.467 8.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 145.067,
    height: 42.667,
    viewBox: "0 0 145.067 42.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 12.8,
      top: 197.333,
      width: 145.067,
      height: 42.667,
      opacity: 0.55,
      color: "rgb(200,170,128)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 72.533 42.667 C 112.592 42.667 145.067 33.115 145.067 21.333 C 145.067 9.551 112.592 0 72.533 0 C 32.474 0 0 9.551 0 21.333 C 0 33.115 32.474 42.667 72.533 42.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 64,
    height: 29.867,
    viewBox: "0 0 64 29.867",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 209.066,
      width: 64,
      height: 29.867,
      opacity: 0.45,
      color: "rgb(212,184,144)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 32 29.867 C 49.673 29.867 64 23.181 64 14.933 C 64 6.686 49.673 0 32 0 C 14.327 0 0 6.686 0 14.933 C 0 23.181 14.327 29.867 32 29.867 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 59.733,
    height: 25.600,
    viewBox: "0 0 59.733 25.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 101.333,
      top: 209.066,
      width: 59.733,
      height: 25.6,
      opacity: 0.4,
      color: "rgb(212,184,144)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 29.867 25.6 C 46.362 25.6 59.733 19.869 59.733 12.8 C 59.733 5.731 46.362 0 29.867 0 C 13.372 0 0 5.731 0 12.8 C 0 19.869 13.372 25.6 29.867 25.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 13.866,
      top: 179.2,
      width: 108.8,
      height: 25.6,
      opacity: 0.4,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 10.667,
    height: 12.800,
    viewBox: "0 0 10.667 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 10.667,
      height: 12.8,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 11.281 0.512 C 11.564 0.173 11.518 -0.332 11.179 -0.615 C 10.839 -0.897 10.335 -0.852 10.052 -0.512 L 10.667 0 L 11.281 0.512 Z M -0.615 12.288 C -0.897 12.627 -0.852 13.132 -0.512 13.415 C -0.173 13.697 0.332 13.652 0.615 13.312 L 0 12.8 L -0.615 12.288 Z M 10.667 0 L 10.052 -0.512 L -0.615 12.288 L 0 12.8 L 0.615 13.312 L 11.281 0.512 L 10.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 12.800,
    height: 12.800,
    viewBox: "0 0 12.800 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 29.867,
      top: 12.8,
      width: 12.8,
      height: 12.8,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 13.366 0.566 C 13.678 0.253 13.678 -0.253 13.366 -0.566 C 13.053 -0.878 12.547 -0.878 12.234 -0.566 L 12.8 0 L 13.366 0.566 Z M -0.566 12.234 C -0.878 12.547 -0.878 13.053 -0.566 13.366 C -0.253 13.678 0.253 13.678 0.566 13.366 L 0 12.8 L -0.566 12.234 Z M 12.8 0 L 12.234 -0.566 L -0.566 12.234 L 0 12.8 L 0.566 13.366 L 13.366 0.566 L 12.8 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 13.867,
    height: 13.867,
    viewBox: "0 0 13.867 13.867",
    fill: "none",
    style: {
      position: "absolute",
      left: 60.8,
      top: 4.267,
      width: 13.867,
      height: 13.867,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14.432 0.566 C 14.745 0.253 14.745 -0.253 14.432 -0.566 C 14.12 -0.878 13.613 -0.878 13.301 -0.566 L 13.867 0 L 14.432 0.566 Z M -0.566 13.301 C -0.878 13.613 -0.878 14.12 -0.566 14.432 C -0.253 14.745 0.253 14.745 0.566 14.432 L 0 13.867 L -0.566 13.301 Z M 13.867 0 L 13.301 -0.566 L -0.566 13.301 L 0 13.867 L 0.566 14.432 L 14.432 0.566 L 13.867 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 12.800,
    height: 12.800,
    viewBox: "0 0 12.800 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 96,
      top: 10.667,
      width: 12.8,
      height: 12.8,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 13.366 0.566 C 13.678 0.253 13.678 -0.253 13.366 -0.566 C 13.053 -0.878 12.547 -0.878 12.234 -0.566 L 12.8 0 L 13.366 0.566 Z M -0.566 12.234 C -0.878 12.547 -0.878 13.053 -0.566 13.366 C -0.253 13.678 0.253 13.678 0.566 13.366 L 0 12.8 L -0.566 12.234 Z M 12.8 0 L 12.234 -0.566 L -0.566 12.234 L 0 12.8 L 0.566 13.366 L 13.366 0.566 L 12.8 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))));
  const __body3 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 160,
      height: 213.333,
      overflow: "hidden",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 160,
      height: 277.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 277.333,
    viewBox: "0 0 160 277.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 160,
      height: 277.333,
      color: "rgb(245,216,128)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 145.067 0 L 14.933 0 C 6.686 0 0 6.686 0 14.933 L 0 262.4 C 0 270.647 6.686 277.333 14.933 277.333 L 145.067 277.333 C 153.314 277.333 160 270.647 160 262.4 L 160 14.933 C 160 6.686 153.314 0 145.067 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 53.333,
    height: 52.267,
    viewBox: "0 0 53.333 52.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 53.333,
      top: 27.733,
      width: 53.333,
      height: 52.267,
      opacity: 0.6,
      color: "rgb(240,160,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 26.667 52.267 C 41.394 52.267 53.333 40.566 53.333 26.133 C 53.333 11.7 41.394 0 26.667 0 C 11.939 0 0 11.7 0 26.133 C 0 40.566 11.939 52.267 26.667 52.267 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 36.267,
    height: 37.333,
    viewBox: "0 0 36.267 37.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 61.867,
      top: 34.133,
      width: 36.267,
      height: 37.333,
      opacity: 0.85,
      color: "rgb(244,184,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 18.133 37.333 C 28.148 37.333 36.267 28.976 36.267 18.667 C 36.267 8.357 28.148 0 18.133 0 C 8.119 0 0 8.357 0 18.667 C 0 28.976 8.119 37.333 18.133 37.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 25.600,
    height: 24.533,
    viewBox: "0 0 25.600 24.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 67.2,
      top: 41.6,
      width: 25.6,
      height: 24.533,
      opacity: 0.95,
      color: "rgb(248,208,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 12.8 24.533 C 19.869 24.533 25.6 19.041 25.6 12.267 C 25.6 5.492 19.869 0 12.8 0 C 5.731 0 0 5.492 0 12.267 C 0 19.041 5.731 24.533 12.8 24.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 45.396,
      top: 14.933,
      width: 69.21,
      height: 66.133,
      opacity: 0.55,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 6.152,
    viewBox: "-1.600 0 3.200 6.152",
    fill: "none",
    style: {
      position: "absolute",
      left: 34.604,
      top: 0,
      width: 3.200000286102295,
      height: 6.152,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.6 6.152 C -1.6 7.036 -0.884 7.752 0 7.752 C 0.884 7.752 1.6 7.036 1.6 6.152 L 0 6.152 L -1.6 6.152 Z M 1.6 0 C 1.6 -0.884 0.884 -1.6 0 -1.6 C -0.884 -1.6 -1.6 -0.884 -1.6 0 L 0 0 L 1.6 0 Z M 0 6.152 L 1.6 6.152 L 1.6 0 L 0 0 L -1.6 0 L -1.6 6.152 L 0 6.152 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.614,
    height: 4.614,
    viewBox: "0 0 4.614 4.614",
    fill: "none",
    style: {
      position: "absolute",
      left: 53.829,
      top: 7.69,
      width: 4.614,
      height: 4.614,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.131 3.483 C -1.756 4.107 -1.756 5.12 -1.131 5.745 C -0.507 6.37 0.507 6.37 1.131 5.745 L 0 4.614 L -1.131 3.483 Z M 5.745 1.131 C 6.37 0.507 6.37 -0.507 5.745 -1.131 C 5.12 -1.756 4.107 -1.756 3.483 -1.131 L 4.614 0 L 5.745 1.131 Z M 0 4.614 L 1.131 5.745 L 5.745 1.131 L 4.614 0 L 3.483 -1.131 L -1.131 3.483 L 0 4.614 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.152,
    height: 3.200,
    viewBox: "0 -1.600 6.152 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 63.058,
      top: 30.759,
      width: 6.152,
      height: 3.200000286102295,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -1.6 C -0.884 -1.6 -1.6 -0.884 -1.6 0 C -1.6 0.884 -0.884 1.6 0 1.6 L 0 0 L 0 -1.6 Z M 6.152 1.6 C 7.036 1.6 7.752 0.884 7.752 0 C 7.752 -0.884 7.036 -1.6 6.152 -1.6 L 6.152 0 L 6.152 1.6 Z M 0 0 L 0 1.6 L 6.152 1.6 L 6.152 0 L 6.152 -1.6 L 0 -1.6 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.614,
    height: 4.614,
    viewBox: "0 0 4.614 4.614",
    fill: "none",
    style: {
      position: "absolute",
      left: 56.904,
      top: 50.754,
      width: 4.614,
      height: 4.614,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.131 -1.131 C 0.507 -1.756 -0.507 -1.756 -1.131 -1.131 C -1.756 -0.507 -1.756 0.507 -1.131 1.131 L 0 0 L 1.131 -1.131 Z M 3.483 5.745 C 4.107 6.37 5.12 6.37 5.745 5.745 C 6.37 5.12 6.37 4.107 5.745 3.483 L 4.614 4.614 L 3.483 5.745 Z M 0 0 L -1.131 1.131 L 3.483 5.745 L 4.614 4.614 L 5.745 3.483 L 1.131 -1.131 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 6.152,
    viewBox: "-1.600 0 3.200 6.152",
    fill: "none",
    style: {
      position: "absolute",
      left: 34.604,
      top: 59.981,
      width: 3.200000286102295,
      height: 6.152,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.6 0 C 1.6 -0.884 0.884 -1.6 0 -1.6 C -0.884 -1.6 -1.6 -0.884 -1.6 0 L 0 0 L 1.6 0 Z M -1.6 6.152 C -1.6 7.036 -0.884 7.752 0 7.752 C 0.884 7.752 1.6 7.036 1.6 6.152 L 0 6.152 L -1.6 6.152 Z M 0 0 L -1.6 0 L -1.6 6.152 L 0 6.152 L 1.6 6.152 L 1.6 0 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.614,
    height: 4.614,
    viewBox: "0 0 4.614 4.614",
    fill: "none",
    style: {
      position: "absolute",
      left: 7.69,
      top: 50.754,
      width: 4.614,
      height: 4.614,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.745 1.131 C 6.37 0.507 6.37 -0.507 5.745 -1.131 C 5.12 -1.756 4.107 -1.756 3.483 -1.131 L 4.614 0 L 5.745 1.131 Z M -1.131 3.483 C -1.756 4.107 -1.756 5.12 -1.131 5.745 C -0.507 6.37 0.507 6.37 1.131 5.745 L 0 4.614 L -1.131 3.483 Z M 4.614 0 L 3.483 -1.131 L -1.131 3.483 L 0 4.614 L 1.131 5.745 L 5.745 1.131 L 4.614 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.152,
    height: 3.200,
    viewBox: "0 -1.600 6.152 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 30.759,
      width: 6.152,
      height: 3.200000286102295,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.152 1.6 C 7.036 1.6 7.752 0.884 7.752 0 C 7.752 -0.884 7.036 -1.6 6.152 -1.6 L 6.152 0 L 6.152 1.6 Z M 0 -1.6 C -0.884 -1.6 -1.6 -0.884 -1.6 0 C -1.6 0.884 -0.884 1.6 0 1.6 L 0 0 L 0 -1.6 Z M 6.152 0 L 6.152 -1.6 L 0 -1.6 L 0 0 L 0 1.6 L 6.152 1.6 L 6.152 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.614,
    height: 4.614,
    viewBox: "0 0 4.614 4.614",
    fill: "none",
    style: {
      position: "absolute",
      left: 10.765,
      top: 7.69,
      width: 4.614,
      height: 4.614,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.483 5.745 C 4.107 6.37 5.12 6.37 5.745 5.745 C 6.37 5.12 6.37 4.107 5.745 3.483 L 4.614 4.614 L 3.483 5.745 Z M 1.131 -1.131 C 0.507 -1.756 -0.507 -1.756 -1.131 -1.131 C -1.756 -0.507 -1.756 0.507 -1.131 1.131 L 0 0 L 1.131 -1.131 Z M 4.614 4.614 L 5.745 3.483 L 1.131 -1.131 L 0 0 L -1.131 1.131 L 3.483 5.745 L 4.614 4.614 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 99.200,
    height: 4.267,
    viewBox: "0 0 99.200 4.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 29.867,
      top: 83.2,
      width: 99.2,
      height: 4.267,
      opacity: 0.35,
      color: "rgb(240,192,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.183 2.125 C -0.613 2.226 -0.88 2.657 -0.779 3.087 C -0.677 3.517 -0.247 3.784 0.183 3.682 L 0 2.904 L -0.183 2.125 Z M 99.383 2.142 C 99.813 2.04 100.08 1.61 99.979 1.18 C 99.877 0.749 99.447 0.483 99.017 0.584 L 99.2 1.363 L 99.383 2.142 Z M 0 2.904 L 0.183 3.682 C 15.325 0.116 31.749 -0.144 49.464 2.922 L 49.6 2.133 L 49.736 1.345 C 31.841 -1.752 15.198 -1.498 -0.183 2.125 L 0 2.904 Z M 49.6 2.133 L 49.464 2.922 C 67.359 6.019 84.002 5.765 99.383 2.142 L 99.2 1.363 L 99.017 0.584 C 83.875 4.151 67.451 4.411 49.736 1.345 L 49.6 2.133 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 99.200,
    height: 5.333,
    viewBox: "0 0 99.200 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 29.867,
      top: 90.667,
      width: 99.2,
      height: 5.333,
      opacity: 0.25,
      color: "rgb(240,192,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.181 3.016 C -0.52 3.116 -0.714 3.471 -0.614 3.81 C -0.514 4.149 -0.158 4.343 0.181 4.244 L 0 3.63 L -0.181 3.016 Z M 99.381 2.318 C 99.72 2.218 99.914 1.862 99.814 1.523 C 99.714 1.184 99.358 0.99 99.019 1.09 L 99.2 1.704 L 99.381 2.318 Z M 0 3.63 L 0.181 4.244 C 15.326 -0.216 31.749 -0.54 49.465 3.292 L 49.6 2.667 L 49.735 2.041 C 31.841 -1.83 15.198 -1.513 -0.181 3.016 L 0 3.63 Z M 49.6 2.667 L 49.465 3.292 C 67.359 7.163 84.002 6.846 99.381 2.318 L 99.2 1.704 L 99.019 1.09 C 83.874 5.549 67.451 5.874 49.735 2.041 L 49.6 2.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 46.933,
    viewBox: "0 0 4.267 46.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 35.2,
      top: 89.6,
      width: 4.267,
      height: 46.933,
      opacity: 0.8,
      color: "rgb(106,64,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.438 0 L 1.829 0 C 0.819 0 0 1.051 0 2.347 L 0 44.587 C 0 45.883 0.819 46.933 1.829 46.933 L 2.438 46.933 C 3.448 46.933 4.267 45.883 4.267 44.587 L 4.267 2.347 C 4.267 1.051 3.448 0 2.438 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 9.600,
    height: 9.600,
    viewBox: "0 0 9.600 9.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 27.733,
      top: 89.6,
      width: 9.6,
      height: 9.6,
      opacity: 0.75,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.092 11.108 C 8.925 11.942 10.275 11.942 11.108 11.108 C 11.942 10.275 11.942 8.925 11.108 8.092 L 9.6 9.6 L 8.092 11.108 Z M 1.508 -1.508 C 0.675 -2.342 -0.675 -2.342 -1.508 -1.508 C -2.342 -0.675 -2.342 0.675 -1.508 1.508 L 0 0 L 1.508 -1.508 Z M 9.6 9.6 L 11.108 8.092 L 1.508 -1.508 L 0 0 L -1.508 1.508 L 8.092 11.108 L 9.6 9.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 11.733,
    height: 6.400,
    viewBox: "0 0 11.733 6.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 37.333,
      top: 97.067,
      width: 11.733,
      height: 6.4,
      opacity: 0.7,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.894 4.761 C -1.799 5.255 -2.132 6.389 -1.639 7.294 C -1.145 8.199 -0.011 8.532 0.894 8.039 L 0 6.4 L -0.894 4.761 Z M 12.627 1.639 C 13.532 1.145 13.866 0.011 13.372 -0.894 C 12.878 -1.799 11.745 -2.132 10.839 -1.639 L 11.733 0 L 12.627 1.639 Z M 0 6.4 L 0.894 8.039 L 12.627 1.639 L 11.733 0 L 10.839 -1.639 L -0.894 4.761 L 0 6.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.667,
    height: 5.333,
    viewBox: "0 0 10.667 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 26.667,
      top: 105.6,
      width: 10.667,
      height: 5.333,
      opacity: 0.65,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.951 6.764 C 10.741 7.16 11.703 6.839 12.098 6.049 C 12.493 5.259 12.173 4.297 11.382 3.902 L 10.667 5.333 L 9.951 6.764 Z M 0.716 -1.431 C -0.075 -1.826 -1.036 -1.506 -1.431 -0.716 C -1.826 0.075 -1.506 1.036 -0.716 1.431 L 0 0 L 0.716 -1.431 Z M 10.667 5.333 L 11.382 3.902 L 0.716 -1.431 L 0 0 L -0.716 1.431 L 9.951 6.764 L 10.667 5.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 12.800,
    height: 4.267,
    viewBox: "0 0 12.800 4.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 37.333,
      top: 110.933,
      width: 12.8,
      height: 4.267,
      opacity: 0.6,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.422 3.002 C -1.12 3.235 -1.498 3.99 -1.265 4.688 C -1.032 5.387 -0.277 5.764 0.422 5.532 L 0 4.267 L -0.422 3.002 Z M 13.222 1.265 C 13.92 1.032 14.298 0.277 14.065 -0.422 C 13.832 -1.12 13.077 -1.498 12.378 -1.265 L 12.8 0 L 13.222 1.265 Z M 0 4.267 L 0.422 5.532 L 13.222 1.265 L 12.8 0 L 12.378 -1.265 L -0.422 3.002 L 0 4.267 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 39.467,
    viewBox: "0 0 4.267 39.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 118.4,
      top: 97.067,
      width: 4.267,
      height: 39.467,
      opacity: 0.75,
      color: "rgb(90,56,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.438 0 L 1.829 0 C 0.819 0 0 1.019 0 2.277 L 0 37.19 C 0 38.447 0.819 39.467 1.829 39.467 L 2.438 39.467 C 3.448 39.467 4.267 38.447 4.267 37.19 L 4.267 2.277 C 4.267 1.019 3.448 0 2.438 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 9.600,
    height: 6.400,
    viewBox: "0 0 9.600 6.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 110.933,
      top: 97.067,
      width: 9.6,
      height: 6.4,
      opacity: 0.7,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.565 7.953 C 9.422 8.525 10.581 8.293 11.153 7.435 C 11.725 6.578 11.493 5.419 10.635 4.847 L 9.6 6.4 L 8.565 7.953 Z M 1.035 -1.553 C 0.178 -2.125 -0.981 -1.893 -1.553 -1.035 C -2.125 -0.178 -1.893 0.981 -1.035 1.553 L 0 0 L 1.035 -1.553 Z M 9.6 6.4 L 10.635 4.847 L 1.035 -1.553 L 0 0 L -1.035 1.553 L 8.565 7.953 L 9.6 6.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 9.600,
    height: 8.533,
    viewBox: "0 0 9.600 8.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 120.533,
      top: 102.4,
      width: 9.6,
      height: 8.533,
      opacity: 0.65,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -1.063 7.337 C -1.723 7.925 -1.783 8.936 -1.196 9.596 C -0.609 10.257 0.403 10.316 1.063 9.729 L 0 8.533 L -1.063 7.337 Z M 10.663 1.196 C 11.323 0.609 11.383 -0.403 10.796 -1.063 C 10.209 -1.723 9.197 -1.783 8.537 -1.196 L 9.6 0 L 10.663 1.196 Z M 0 8.533 L 1.063 9.729 L 10.663 1.196 L 9.6 0 L 8.537 -1.196 L -1.063 7.337 L 0 8.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.667,
    height: 4.267,
    viewBox: "0 0 10.667 4.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 109.867,
      top: 112,
      width: 10.667,
      height: 4.267,
      opacity: 0.6,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.171 5.505 C 10.855 5.778 11.631 5.446 11.905 4.762 C 12.178 4.078 11.846 3.302 11.162 3.029 L 10.667 4.267 L 10.171 5.505 Z M 0.495 -1.238 C -0.189 -1.511 -0.964 -1.179 -1.238 -0.495 C -1.511 0.189 -1.179 0.964 -0.495 1.238 L 0 0 L 0.495 -1.238 Z M 10.667 4.267 L 11.162 3.029 L 0.495 -1.238 L 0 0 L -0.495 1.238 L 10.171 5.505 L 10.667 4.267 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 80,
    viewBox: "0 0 160 80",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 133.333,
      width: 160,
      height: 80,
      opacity: 0.5,
      color: "rgb(200,144,42)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 160 0 L 0 0 L 0 80 L 160 80 L 160 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 66.133,
    viewBox: "0 0 160 66.133",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 147.2,
      width: 160,
      height: 66.133,
      opacity: 0.4,
      color: "rgb(176,120,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 160 0 L 0 0 L 0 66.133 L 160 66.133 L 160 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 45.867,
    viewBox: "0 0 160 45.867",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 167.467,
      width: 160,
      height: 45.867,
      opacity: 0.35,
      color: "rgb(160,96,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 160 0 L 0 0 L 0 45.867 L 160 45.867 L 160 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 30.016,
      top: 133.358,
      width: 99.969,
      height: 56.906,
      opacity: 0.8,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 1.758,
    height: 56.905,
    viewBox: "0 0 1.758 56.905",
    fill: "none",
    style: {
      position: "absolute",
      left: 48.996,
      top: 0,
      width: 1.758,
      height: 56.905,
      color: "rgb(106,56,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.032 0.223 C 2.155 -0.353 1.788 -0.92 1.212 -1.043 C 0.636 -1.166 0.069 -0.8 -0.054 -0.223 L 0.989 0 L 2.032 0.223 Z M 1.758 23.07 L 2.806 23.266 L 2.849 23.037 L 2.793 22.811 L 1.758 23.07 Z M 0.697 57.019 C 0.76 57.605 1.286 58.029 1.871 57.966 C 2.457 57.903 2.881 57.378 2.818 56.792 L 1.758 56.905 L 0.697 57.019 Z M 0.989 0 L -0.054 -0.223 C -1.631 7.136 -1.361 14.992 0.723 23.328 L 1.758 23.07 L 2.793 22.811 C 0.775 14.742 0.533 7.219 2.032 0.223 L 0.989 0 Z M 1.758 23.07 L 0.709 22.873 C -0.857 31.226 -0.845 42.625 0.697 57.019 L 1.758 56.905 L 2.818 56.792 C 1.285 42.477 1.296 31.319 2.806 23.266 L 1.758 23.07 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.589,
    height: 53.829,
    viewBox: "0 0 3.589 53.829",
    fill: "none",
    style: {
      position: "absolute",
      left: 12.303,
      top: 3.077,
      width: 3.589,
      height: 53.829,
      color: "rgb(106,56,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.136 -0.118 C 4.071 -0.703 3.544 -1.125 2.958 -1.06 C 2.373 -0.995 1.951 -0.468 2.016 0.118 L 3.076 0 L 4.136 -0.118 Z M 1.538 27.684 L 0.497 27.452 L 0.457 27.633 L 0.48 27.816 L 1.538 27.684 Z M -1.041 53.598 C -1.169 54.173 -0.806 54.743 -0.231 54.871 C 0.344 54.999 0.913 54.636 1.041 54.061 L 0 53.829 L -1.041 53.598 Z M 3.076 0 L 2.016 0.118 C 3.028 9.227 2.522 18.337 0.497 27.452 L 1.538 27.684 L 2.579 27.915 C 4.655 18.575 5.175 9.229 4.136 -0.118 L 3.076 0 Z M 1.538 27.684 L 0.48 27.816 C 1.488 35.881 0.987 44.473 -1.041 53.598 L 0 53.829 L 1.041 54.061 C 3.115 44.73 3.639 35.891 2.596 27.551 L 1.538 27.684 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.589,
    height: 55.367,
    viewBox: "0 0 3.589 55.367",
    fill: "none",
    style: {
      position: "absolute",
      left: 82.537,
      top: 1.539,
      width: 3.589,
      height: 55.367,
      color: "rgb(106,56,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.573 0.118 C 1.638 -0.468 1.216 -0.995 0.63 -1.06 C 0.045 -1.125 -0.482 -0.703 -0.547 -0.118 L 0.513 0 L 1.573 0.118 Z M 2.051 27.684 L 3.109 27.816 L 3.132 27.633 L 3.092 27.452 L 2.051 27.684 Z M 2.543 55.577 C 2.658 56.154 3.22 56.529 3.798 56.413 C 4.375 56.298 4.75 55.736 4.635 55.158 L 3.589 55.367 L 2.543 55.577 Z M 0.513 0 L -0.547 -0.118 C -1.586 9.229 -1.066 18.575 1.009 27.915 L 2.051 27.684 L 3.092 27.452 C 1.066 18.337 0.561 9.227 1.573 0.118 L 0.513 0 Z M 2.051 27.684 L 0.992 27.551 C -0.051 35.893 0.475 45.239 2.543 55.577 L 3.589 55.367 L 4.635 55.158 C 2.601 44.989 2.101 35.879 3.109 27.816 L 2.051 27.684 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 23.839,
    height: 2.746,
    viewBox: "0 0 23.839 2.746",
    fill: "none",
    style: {
      position: "absolute",
      left: 26.145,
      top: 6.921,
      width: 23.839,
      height: 2.746,
      color: "rgb(106,56,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 23.963 3.366 C 24.548 3.298 24.967 2.767 24.898 2.182 C 24.829 1.597 24.299 1.179 23.714 1.248 L 23.839 2.307 L 23.963 3.366 Z M 0.359 -1.005 C -0.196 -1.203 -0.806 -0.914 -1.005 -0.359 C -1.203 0.196 -0.914 0.806 -0.359 1.005 L 0 0 L 0.359 -1.005 Z M 23.839 2.307 L 23.714 1.248 C 15.137 2.257 7.359 1.496 0.359 -1.005 L 0 0 L -0.359 1.005 C 6.995 3.631 15.11 4.408 23.963 3.366 L 23.839 2.307 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 23.070,
    height: 3.460,
    viewBox: "0 0 23.070 3.460",
    fill: "none",
    style: {
      position: "absolute",
      left: 50.754,
      top: 16.918,
      width: 23.07,
      height: 3.46,
      color: "rgb(106,56,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.151 2.02 C -0.432 1.937 -0.973 2.342 -1.056 2.925 C -1.139 3.508 -0.734 4.049 -0.151 4.132 L 0 3.076 L 0.151 2.02 Z M 23.444 0.999 C 23.996 0.792 24.275 0.177 24.069 -0.375 C 23.862 -0.926 23.247 -1.206 22.695 -0.999 L 23.07 0 L 23.444 0.999 Z M 0 3.076 L -0.151 4.132 C 7.237 5.187 15.109 4.125 23.444 0.999 L 23.07 0 L 22.695 -0.999 C 14.626 2.027 7.118 3.015 0.151 2.02 L 0 3.076 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 20.763,
    height: 2.051,
    viewBox: "0 0 20.763 2.051",
    fill: "none",
    style: {
      position: "absolute",
      left: 29.222,
      top: 30.761,
      width: 20.763,
      height: 2.051,
      color: "rgb(106,56,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 20.904 2.595 C 21.488 2.517 21.898 1.981 21.82 1.397 C 21.742 0.813 21.206 0.403 20.622 0.481 L 20.763 1.538 L 20.904 2.595 Z M 0.337 -1.012 C -0.222 -1.198 -0.826 -0.896 -1.012 -0.337 C -1.198 0.222 -0.896 0.826 -0.337 1.012 L 0 0 L 0.337 -1.012 Z M 20.763 1.538 L 20.622 0.481 C 13.061 1.489 6.308 0.978 0.337 -1.012 L 0 0 L -0.337 1.012 C 5.996 3.123 13.084 3.638 20.904 2.595 L 20.763 1.538 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 24.608,
    height: 2.051,
    viewBox: "0 0 24.608 2.051",
    fill: "none",
    style: {
      position: "absolute",
      left: 50.754,
      top: 43.064,
      width: 24.608,
      height: 2.051,
      color: "rgb(106,56,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.132 0.48 C -0.452 0.406 -0.985 0.821 -1.058 1.406 C -1.131 1.99 -0.717 2.523 -0.132 2.596 L 0 1.538 L 0.132 0.48 Z M 24.866 1.035 C 25.438 0.892 25.785 0.313 25.643 -0.259 C 25.5 -0.83 24.921 -1.178 24.349 -1.035 L 24.608 0 L 24.866 1.035 Z M 0 1.538 L -0.132 2.596 C 8.204 3.638 16.539 3.117 24.866 1.035 L 24.608 0 L 24.349 -1.035 C 16.271 0.985 8.201 1.488 0.132 0.48 L 0 1.538 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 15.380,
    height: 2.051,
    viewBox: "0 0 15.380 2.051",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 13.074,
      width: 15.38,
      height: 2.051,
      color: "rgb(106,56,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 15.555 2.59 C 16.136 2.493 16.529 1.944 16.432 1.363 C 16.335 0.782 15.786 0.389 15.204 0.486 L 15.38 1.538 L 15.555 2.59 Z M 0.477 -0.954 C -0.05 -1.218 -0.691 -1.004 -0.954 -0.477 C -1.218 0.05 -1.004 0.691 -0.477 0.954 L 0 0 L 0.477 -0.954 Z M 15.38 1.538 L 15.204 0.486 C 9.196 1.487 4.315 0.965 0.477 -0.954 L 0 0 L -0.477 0.954 C 3.887 3.136 9.26 3.639 15.555 2.59 L 15.38 1.538 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 18.456,
    height: 2.051,
    viewBox: "0 0 18.456 2.051",
    fill: "none",
    style: {
      position: "absolute",
      left: 13.842,
      top: 27.684,
      width: 18.456,
      height: 2.051,
      color: "rgb(106,56,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.175 0.486 C -0.406 0.389 -0.955 0.782 -1.052 1.363 C -1.149 1.944 -0.756 2.493 -0.175 2.59 L 0 1.538 L 0.175 0.486 Z M 18.793 1.012 C 19.352 0.826 19.654 0.222 19.468 -0.337 C 19.281 -0.896 18.677 -1.198 18.119 -1.012 L 18.456 0 L 18.793 1.012 Z M 0 1.538 L -0.175 2.59 C 6.155 3.645 12.483 3.115 18.793 1.012 L 18.456 0 L 18.119 -1.012 C 12.125 0.986 6.149 1.481 0.175 0.486 L 0 1.538 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 16.918,
    height: 2.051,
    viewBox: "0 0 16.918 2.051",
    fill: "none",
    style: {
      position: "absolute",
      left: 83.051,
      top: 11.792,
      width: 16.918,
      height: 2.051,
      color: "rgb(106,56,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.175 -0.539 C -0.756 -0.443 -1.149 0.107 -1.052 0.688 C -0.955 1.269 -0.406 1.662 0.175 1.565 L 0 0.513 L -0.175 -0.539 Z M 16.522 3.041 C 17.069 3.26 17.689 2.994 17.908 2.447 C 18.127 1.9 17.861 1.279 17.314 1.06 L 16.918 2.051 L 16.522 3.041 Z M 0 0.513 L 0.175 1.565 C 6.16 0.567 11.599 1.072 16.522 3.041 L 16.918 2.051 L 17.314 1.06 C 11.983 -1.072 6.144 -1.593 -0.175 -0.539 L 0 0.513 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 16.918,
    height: 2.051,
    viewBox: "0 0 16.918 2.051",
    fill: "none",
    style: {
      position: "absolute",
      left: 67.671,
      top: 26.147,
      width: 16.918,
      height: 2.051,
      color: "rgb(106,56,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 17.127 2.584 C 17.705 2.468 18.079 1.906 17.964 1.329 C 17.848 0.751 17.286 0.376 16.709 0.492 L 16.918 1.538 L 17.127 2.584 Z M 0.337 -1.012 C -0.222 -1.198 -0.826 -0.896 -1.012 -0.337 C -1.198 0.222 -0.896 0.826 -0.337 1.012 L 0 0 L 0.337 -1.012 Z M 16.918 1.538 L 16.709 0.492 C 11.803 1.473 6.355 0.994 0.337 -1.012 L 0 0 L -0.337 1.012 C 5.949 3.107 11.779 3.653 17.127 2.584 L 16.918 1.538 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.152,
    height: 4.922,
    viewBox: "0 0 6.152 4.922",
    fill: "none",
    style: {
      position: "absolute",
      left: 24.607,
      top: 9.228,
      width: 6.152,
      height: 4.922,
      opacity: 0.6,
      color: "rgb(106,56,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.106 0.477 C 7.369 -0.05 7.156 -0.691 6.629 -0.954 C 6.102 -1.218 5.461 -1.004 5.198 -0.477 L 6.152 0 L 7.106 0.477 Z M 0.477 3.66 C -0.05 3.396 -0.691 3.61 -0.954 4.137 C -1.218 4.664 -1.004 5.305 -0.477 5.568 L 0 4.614 L 0.477 3.66 Z M 6.152 0 L 5.198 -0.477 C 4.197 1.525 3.262 2.757 2.436 3.376 C 2.036 3.676 1.695 3.808 1.406 3.844 C 1.125 3.879 0.823 3.833 0.477 3.66 L 0 4.614 L -0.477 5.568 C 0.203 5.908 0.926 6.054 1.67 5.961 C 2.406 5.869 3.09 5.552 3.716 5.083 C 4.941 4.164 6.056 2.576 7.106 0.477 L 6.152 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.152,
    height: 4.187,
    viewBox: "0 0 6.152 4.187",
    fill: "none",
    style: {
      position: "absolute",
      left: 70.747,
      top: 14.612,
      width: 6.152,
      height: 4.187,
      opacity: 0.6,
      color: "rgb(106,56,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.926 -0.529 C 0.634 -1.041 -0.018 -1.218 -0.529 -0.926 C -1.041 -0.634 -1.218 0.018 -0.926 0.529 L 0 0 L 0.926 -0.529 Z M 6.629 4.799 C 7.156 4.536 7.369 3.895 7.106 3.368 C 6.843 2.841 6.202 2.627 5.675 2.891 L 6.152 3.845 L 6.629 4.799 Z M 0 0 L -0.926 0.529 C 0.133 2.382 1.265 3.779 2.511 4.557 C 3.83 5.382 5.25 5.489 6.629 4.799 L 6.152 3.845 L 5.675 2.891 C 5.003 3.227 4.372 3.205 3.641 2.748 C 2.836 2.245 1.918 1.207 0.926 -0.529 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 7.467,
    viewBox: "0 0 160 7.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 174.933,
      width: 160,
      height: 7.467,
      opacity: 0.3,
      color: "rgb(138,80,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.23 6.153 C -0.955 6.28 -1.44 6.971 -1.313 7.697 C -1.186 8.422 -0.496 8.907 0.23 8.78 L 0 7.467 L -0.23 6.153 Z M 160.23 1.313 C 160.955 1.186 161.44 0.496 161.313 -0.23 C 161.186 -0.955 160.496 -1.44 159.77 -1.313 L 160 0 L 160.23 1.313 Z M 0 7.467 L 0.23 8.78 C 28.573 3.82 55.116 2.585 79.867 5.06 L 80 3.733 L 80.133 2.407 C 55.106 -0.096 28.316 1.158 -0.23 6.153 L 0 7.467 Z M 80 3.733 L 79.867 5.06 C 104.894 7.563 131.684 6.309 160.23 1.313 L 160 0 L 159.77 -1.313 C 131.427 3.647 104.884 4.882 80.133 2.407 L 80 3.733 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 57.7,
      top: 125.668,
      width: 40.755,
      height: 9.228,
      opacity: 0.55,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 3.076,
    height: 7.690,
    viewBox: "0 0 3.076 7.690",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 1.538,
      width: 3.076,
      height: 7.69,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.076 7.69 C 2.051 3.589 1.025 1.025 0 0 Z",
    fill: "rgb(0,0,0)",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 2.3 7.884 C 2.407 8.313 2.841 8.573 3.27 8.466 C 3.699 8.359 3.959 7.925 3.852 7.496 L 3.076 7.69 L 2.3 7.884 Z M 0.566 -0.566 C 0.253 -0.878 -0.253 -0.878 -0.566 -0.566 C -0.878 -0.253 -0.878 0.253 -0.566 0.566 L 0 0 L 0.566 -0.566 Z M 3.076 7.69 L 3.852 7.496 C 3.335 5.426 2.812 3.722 2.281 2.394 C 1.758 1.087 1.196 0.065 0.566 -0.566 L 0 0 L -0.566 0.566 C -0.171 0.96 0.293 1.733 0.795 2.989 C 1.289 4.224 1.792 5.852 2.3 7.884 L 3.076 7.69 Z",
    fill: "rgb(138,96,32)",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.025,
    height: 8.459,
    viewBox: "0 0 1.025 8.459",
    fill: "none",
    style: {
      position: "absolute",
      left: 8.202,
      top: 0,
      width: 1.025,
      height: 8.459,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.256 8.459 C -0.256 4.358 0 1.538 1.025 0 Z",
    fill: "rgb(0,0,0)",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M -0.537 8.558 C -0.483 8.997 -0.083 9.308 0.356 9.253 C 0.794 9.198 1.105 8.798 1.05 8.36 L 0.256 8.459 L -0.537 8.558 Z M 1.691 0.444 C 1.936 0.076 1.837 -0.421 1.469 -0.666 C 1.101 -0.911 0.605 -0.811 0.36 -0.444 L 1.025 0 L 1.691 0.444 Z M 0.256 8.459 L 1.05 8.36 C 0.798 6.343 0.74 4.674 0.861 3.341 C 0.983 1.999 1.281 1.058 1.691 0.444 L 1.025 0 L 0.36 -0.444 C -0.256 0.48 -0.598 1.718 -0.733 3.196 C -0.868 4.682 -0.798 6.474 -0.537 8.558 L 0.256 8.459 Z",
    fill: "rgb(138,96,32)",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.076,
    height: 8.459,
    viewBox: "0 0 3.076 8.459",
    fill: "none",
    style: {
      position: "absolute",
      left: 29.221,
      top: 0.769,
      width: 3.076,
      height: 8.459,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.076 8.459 C 2.051 3.845 1.025 1.025 0 0 Z",
    fill: "rgb(0,0,0)",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 2.295 8.632 C 2.391 9.064 2.818 9.336 3.25 9.24 C 3.681 9.144 3.953 8.717 3.857 8.285 L 3.076 8.459 L 2.295 8.632 Z M 0.566 -0.566 C 0.253 -0.878 -0.253 -0.878 -0.566 -0.566 C -0.878 -0.253 -0.878 0.253 -0.566 0.566 L 0 0 L 0.566 -0.566 Z M 3.076 8.459 L 3.857 8.285 C 3.34 5.961 2.819 4.066 2.29 2.61 C 1.771 1.184 1.21 0.079 0.566 -0.566 L 0 0 L -0.566 0.566 C -0.185 0.947 0.28 1.764 0.786 3.157 C 1.282 4.521 1.786 6.342 2.295 8.632 L 3.076 8.459 Z",
    fill: "rgb(138,96,32)",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.076,
    height: 8.459,
    viewBox: "0 0 3.076 8.459",
    fill: "none",
    style: {
      position: "absolute",
      left: 37.679,
      top: 0,
      width: 3.076,
      height: 8.459,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 8.459 C 1.025 3.845 2.051 1.025 3.076 0 Z",
    fill: "rgb(0,0,0)",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M -0.781 8.285 C -0.877 8.717 -0.605 9.144 -0.174 9.24 C 0.258 9.336 0.685 9.064 0.781 8.632 L 0 8.459 L -0.781 8.285 Z M 3.642 0.566 C 3.954 0.253 3.954 -0.253 3.642 -0.566 C 3.329 -0.878 2.823 -0.878 2.51 -0.566 L 3.076 0 L 3.642 0.566 Z M 0 8.459 L 0.781 8.632 C 1.29 6.342 1.794 4.521 2.29 3.157 C 2.796 1.764 3.261 0.947 3.642 0.566 L 3.076 0 L 2.51 -0.566 C 1.866 0.079 1.305 1.184 0.786 2.61 C 0.257 4.066 -0.265 5.961 -0.781 8.285 L 0 8.459 Z",
    fill: "rgb(138,96,32)",
    fillRule: "nonzero"
  })))));
  const __body4 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 160,
      height: 98,
      overflow: "hidden",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 160.001,
      height: 98.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0.001,
      top: 0,
      width: 160,
      height: 98.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 160,
      height: 98.66666412353516,
      clipPath: "inset(0.000px 0.000px 0px -0.000px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -5.334,
      top: -9.067,
      width: 189.334,
      height: 107.734,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 98.667,
    viewBox: "0 0 160 98.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 9.067,
      width: 160,
      height: 98.667
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 160 0 L 0 0 L 0 98.667 L 160 98.667 L 160 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 80,
    height: 40.533,
    viewBox: "0 0 80 40.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 2.667,
      top: 7.467,
      width: 80,
      height: 40.533,
      color: "rgb(26,42,58)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 40 40.533 C 62.091 40.533 80 31.46 80 20.267 C 80 9.074 62.091 0 40 0 C 17.909 0 0 9.074 0 20.267 C 0 31.46 17.909 40.533 40 40.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 96,
    height: 44.800,
    viewBox: "0 0 96 44.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 42.667,
      top: 0,
      width: 96,
      height: 44.8,
      color: "rgb(21,30,46)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 48 44.8 C 74.51 44.8 96 34.771 96 22.4 C 96 10.029 74.51 0 48 0 C 21.49 0 0 10.029 0 22.4 C 0 34.771 21.49 44.8 48 44.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 74.667,
    height: 37.333,
    viewBox: "0 0 74.667 37.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 106.667,
      top: 10.667,
      width: 74.667,
      height: 37.333,
      color: "rgb(26,40,56)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 37.333 37.333 C 57.952 37.333 74.667 28.976 74.667 18.667 C 74.667 8.357 57.952 0 37.333 0 C 16.715 0 0 8.357 0 18.667 C 0 28.976 16.715 37.333 37.333 37.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 85.333,
    height: 32,
    viewBox: "0 0 85.333 32",
    fill: "none",
    style: {
      position: "absolute",
      left: 26.667,
      top: 2.667,
      width: 85.333,
      height: 32,
      color: "rgb(14,24,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 42.667 32 C 66.231 32 85.333 24.837 85.333 16 C 85.333 7.163 66.231 0 42.667 0 C 19.103 0 0 7.163 0 16 C 0 24.837 19.103 32 42.667 32 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 69.333,
    height: 29.867,
    viewBox: "0 0 69.333 29.867",
    fill: "none",
    style: {
      position: "absolute",
      left: 88,
      top: 5.867,
      width: 69.333,
      height: 29.867,
      color: "rgb(14,24,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 34.667 29.867 C 53.813 29.867 69.333 23.181 69.333 14.933 C 69.333 6.686 53.813 0 34.667 0 C 15.521 0 0 6.686 0 14.933 C 0 23.181 15.521 29.867 34.667 29.867 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 53.333,
    height: 26.667,
    viewBox: "0 0 53.333 26.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 10.667,
      width: 53.333,
      height: 26.667,
      color: "rgb(18,30,46)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 26.667 26.667 C 41.394 26.667 53.333 20.697 53.333 13.333 C 53.333 5.97 41.394 0 26.667 0 C 11.939 0 0 5.97 0 13.333 C 0 20.697 11.939 26.667 26.667 26.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 58.667,
    height: 29.867,
    viewBox: "0 0 58.667 29.867",
    fill: "none",
    style: {
      position: "absolute",
      left: 130.667,
      top: 11.2,
      width: 58.667,
      height: 29.867,
      color: "rgb(18,30,46)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 29.333 29.867 C 45.534 29.867 58.667 23.181 58.667 14.933 C 58.667 6.686 45.534 0 29.333 0 C 13.133 0 0 6.686 0 14.933 C 0 23.181 13.133 29.867 29.333 29.867 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 76.800,
    height: 21.333,
    viewBox: "0 0 76.800 21.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 4.267,
      top: 25.067,
      width: 76.8,
      height: 21.333,
      opacity: 0.8,
      color: "rgb(32,48,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 38.4 21.333 C 59.608 21.333 76.8 16.558 76.8 10.667 C 76.8 4.776 59.608 0 38.4 0 C 17.192 0 0 4.776 0 10.667 C 0 16.558 17.192 21.333 38.4 21.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 90.667,
    height: 23.467,
    viewBox: "0 0 90.667 23.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 53.333,
      top: 21.334,
      width: 90.667,
      height: 23.467,
      opacity: 0.75,
      color: "rgb(26,42,58)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 45.333 23.467 C 70.37 23.467 90.667 18.213 90.667 11.733 C 90.667 5.253 70.37 0 45.333 0 C 20.296 0 0 5.253 0 11.733 C 0 18.213 20.296 23.467 45.333 23.467 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 69.333,
    height: 19.200,
    viewBox: "0 0 69.333 19.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 109.333,
      top: 27.2,
      width: 69.333,
      height: 19.2,
      opacity: 0.7,
      color: "rgb(32,48,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 34.667 19.2 C 53.813 19.2 69.333 14.902 69.333 9.6 C 69.333 4.298 53.813 0 34.667 0 C 15.521 0 0 4.298 0 9.6 C 0 14.902 15.521 19.2 34.667 19.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 24.533,
    viewBox: "0 0 5.333 24.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 33.067,
      top: 34.667,
      width: 5.333,
      height: 24.533,
      opacity: 0.95,
      color: "rgb(248,240,144)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.722 0.152 C 4.806 -0.1 4.67 -0.372 4.418 -0.455 C 4.167 -0.539 3.895 -0.403 3.811 -0.152 L 4.267 0 L 4.722 0.152 Z M 0 12.8 L -0.455 12.648 L -0.717 13.433 L 0.094 13.271 L 0 12.8 Z M 5.333 11.733 L 5.776 11.918 L 6.123 11.086 L 5.239 11.263 L 5.333 11.733 Z M -0.443 24.349 C -0.545 24.593 -0.429 24.874 -0.185 24.976 C 0.06 25.078 0.341 24.963 0.443 24.718 L 0 24.533 L -0.443 24.349 Z M 4.267 0 L 3.811 -0.152 L -0.455 12.648 L 0 12.8 L 0.455 12.952 L 4.722 0.152 L 4.267 0 Z M 0 12.8 L 0.094 13.271 L 5.427 12.204 L 5.333 11.733 L 5.239 11.263 L -0.094 12.329 L 0 12.8 Z M 5.333 11.733 L 4.89 11.549 L -0.443 24.349 L 0 24.533 L 0.443 24.718 L 5.776 11.918 L 5.333 11.733 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 24.533,
    viewBox: "0 0 5.333 24.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 33.067,
      top: 34.667,
      width: 5.333,
      height: 24.533,
      opacity: 0.6,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.393 0.042 C 4.416 -0.028 4.379 -0.103 4.309 -0.126 C 4.239 -0.15 4.163 -0.112 4.14 -0.042 L 4.267 0 L 4.393 0.042 Z M 0 12.8 L -0.126 12.758 L -0.199 12.976 L 0.026 12.931 L 0 12.8 Z M 5.333 11.733 L 5.456 11.785 L 5.553 11.553 L 5.307 11.603 L 5.333 11.733 Z M -0.123 24.482 C -0.151 24.55 -0.119 24.628 -0.051 24.656 C 0.017 24.685 0.095 24.653 0.123 24.585 L 0 24.533 L -0.123 24.482 Z M 4.267 0 L 4.14 -0.042 L -0.126 12.758 L 0 12.8 L 0.126 12.842 L 4.393 0.042 L 4.267 0 Z M 0 12.8 L 0.026 12.931 L 5.359 11.864 L 5.333 11.733 L 5.307 11.603 L -0.026 12.669 L 0 12.8 Z M 5.333 11.733 L 5.21 11.682 L -0.123 24.482 L 0 24.533 L 0.123 24.585 L 5.456 11.785 L 5.333 11.733 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 19.200,
    viewBox: "0 0 4.267 19.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 123.733,
      top: 30.4,
      width: 4.267,
      height: 19.2,
      opacity: 0.85,
      color: "rgb(240,240,128)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.579 0.126 C 3.649 -0.083 3.536 -0.31 3.326 -0.379 C 3.117 -0.449 2.89 -0.336 2.821 -0.126 L 3.2 0 L 3.579 0.126 Z M 0 9.6 L -0.379 9.474 L -0.58 10.076 L 0.05 9.997 L 0 9.6 Z M 4.267 9.067 L 4.635 9.222 L 4.904 8.584 L 4.217 8.67 L 4.267 9.067 Z M -0.369 19.045 C -0.454 19.248 -0.359 19.483 -0.155 19.569 C 0.048 19.654 0.283 19.559 0.369 19.355 L 0 19.2 L -0.369 19.045 Z M 3.2 0 L 2.821 -0.126 L -0.379 9.474 L 0 9.6 L 0.379 9.726 L 3.579 0.126 L 3.2 0 Z M 0 9.6 L 0.05 9.997 L 4.316 9.464 L 4.267 9.067 L 4.217 8.67 L -0.05 9.203 L 0 9.6 Z M 4.267 9.067 L 3.898 8.911 L -0.369 19.045 L 0 19.2 L 0.369 19.355 L 4.635 9.222 L 4.267 9.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 7.467,
      top: 41.067,
      width: 151.467,
      height: 30.933,
      opacity: 0.55,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 151.467,
      height: 30.933,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 5.333,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 10.667,
      top: 1.067,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 20.267,
      top: 4.267,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 32,
      top: 0,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 41.6,
      top: 3.2,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 52.267,
      top: 0,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 62.933,
      top: 2.133,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 73.6,
      top: 0,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 84.267,
      top: 3.2,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 94.933,
      top: 0,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 105.6,
      top: 2.133,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 116.267,
      top: 0,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 126.933,
      top: 3.2,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 137.6,
      top: 1.067,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 148.267,
      top: 4.267,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 14.933,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 16,
      top: 12.8,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 26.667,
      top: 16,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 37.333,
      top: 13.867,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 48,
      top: 14.933,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 58.667,
      top: 12.8,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 69.333,
      top: 16,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 80,
      top: 13.867,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 90.667,
      top: 14.933,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 101.333,
      top: 12.8,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 112,
      top: 16,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 122.667,
      top: 13.867,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 133.333,
      top: 14.933,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 14.933,
    viewBox: "0 0 3.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 144,
      top: 12.8,
      width: 3.2,
      height: 14.933,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.461 0.056 C 3.492 -0.088 3.4 -0.23 3.256 -0.261 C 3.112 -0.292 2.97 -0.2 2.939 -0.056 L 3.2 0 L 3.461 0.056 Z M -0.261 14.877 C -0.292 15.021 -0.2 15.163 -0.056 15.194 C 0.088 15.225 0.23 15.133 0.261 14.989 L 0 14.933 L -0.261 14.877 Z M 3.2 0 L 2.939 -0.056 L -0.261 14.877 L 0 14.933 L 0.261 14.989 L 3.461 0.056 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 18.667,
    viewBox: "0 0 3.200 18.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 14.933,
      top: 61.334,
      width: 3.2,
      height: 18.667,
      opacity: 0.9,
      color: "rgb(24,40,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.2 0 L 0 0 L 0 18.667 L 3.2 18.667 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.733,
    height: 22.400,
    viewBox: "0 0 3.733 22.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 36.267,
      top: 58.134,
      width: 3.733,
      height: 22.4,
      opacity: 0.85,
      color: "rgb(24,40,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.733 0 L 0 0 L 0 22.4 L 3.733 22.4 L 3.733 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 25.600,
    viewBox: "0 0 4.267 25.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 62.933,
      top: 56,
      width: 4.267,
      height: 25.6,
      opacity: 0.9,
      color: "rgb(24,40,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.267 0 L 0 0 L 0 25.6 L 4.267 25.6 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.733,
    height: 21.333,
    viewBox: "0 0 3.733 21.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 89.6,
      top: 59.2,
      width: 3.733,
      height: 21.333,
      opacity: 0.85,
      color: "rgb(24,40,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.733 0 L 0 0 L 0 21.333 L 3.733 21.333 L 3.733 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 24.533,
    viewBox: "0 0 4.267 24.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 116.267,
      top: 57.067,
      width: 4.267,
      height: 24.533,
      opacity: 0.9,
      color: "rgb(24,40,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.267 0 L 0 0 L 0 24.533 L 4.267 24.533 L 4.267 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 20.267,
    viewBox: "0 0 3.200 20.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 142.933,
      top: 60.267,
      width: 3.2,
      height: 20.267,
      opacity: 0.8,
      color: "rgb(24,40,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.2 0 L 0 0 L 0 20.267 L 3.2 20.267 L 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 21.333,
    height: 14.933,
    viewBox: "0 0 21.333 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.867,
      top: 50.667,
      width: 21.333,
      height: 14.933,
      opacity: 0.9,
      color: "rgb(14,40,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.667 14.933 C 16.558 14.933 21.333 11.59 21.333 7.467 C 21.333 3.343 16.558 0 10.667 0 C 4.776 0 0 3.343 0 7.467 C 0 11.59 4.776 14.933 10.667 14.933 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 27.733,
    height: 19.200,
    viewBox: "0 0 27.733 19.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 24.533,
      top: 44.267,
      width: 27.733,
      height: 19.2,
      opacity: 0.95,
      color: "rgb(10,34,20)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 13.867 19.2 C 21.525 19.2 27.733 14.902 27.733 9.6 C 27.733 4.298 21.525 0 13.867 0 C 6.208 0 0 4.298 0 9.6 C 0 14.902 6.208 19.2 13.867 19.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 17.067,
    height: 12.800,
    viewBox: "0 0 17.067 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 22.4,
      top: 50.667,
      width: 17.067,
      height: 12.8,
      opacity: 0.7,
      color: "rgb(18,42,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.533 12.8 C 13.246 12.8 17.067 9.935 17.067 6.4 C 17.067 2.865 13.246 0 8.533 0 C 3.821 0 0 2.865 0 6.4 C 0 9.935 3.821 12.8 8.533 12.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 32,
    height: 23.467,
    viewBox: "0 0 32 23.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 49.067,
      top: 38.934,
      width: 32,
      height: 23.467,
      opacity: 0.9,
      color: "rgb(14,40,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16 23.467 C 24.837 23.467 32 18.213 32 11.733 C 32 5.253 24.837 0 16 0 C 7.163 0 0 5.253 0 11.733 C 0 18.213 7.163 23.467 16 23.467 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 19.200,
    height: 14.933,
    viewBox: "0 0 19.200 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 46.933,
      top: 47.467,
      width: 19.2,
      height: 14.933,
      opacity: 0.7,
      color: "rgb(18,42,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.6 14.933 C 14.902 14.933 19.2 11.59 19.2 7.467 C 19.2 3.343 14.902 0 9.6 0 C 4.298 0 0 3.343 0 7.467 C 0 11.59 4.298 14.933 9.6 14.933 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 25.600,
    height: 17.067,
    viewBox: "0 0 25.600 17.067",
    fill: "none",
    style: {
      position: "absolute",
      left: 78.933,
      top: 46.4,
      width: 25.6,
      height: 17.067,
      opacity: 0.85,
      color: "rgb(10,34,20)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 12.8 17.067 C 19.869 17.067 25.6 13.246 25.6 8.533 C 25.6 3.821 19.869 0 12.8 0 C 5.731 0 0 3.821 0 8.533 C 0 13.246 5.731 17.067 12.8 17.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 29.867,
    height: 21.333,
    viewBox: "0 0 29.867 21.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 103.467,
      top: 41.067,
      width: 29.867,
      height: 21.333,
      opacity: 0.9,
      color: "rgb(14,40,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14.933 21.333 C 23.181 21.333 29.867 16.558 29.867 10.667 C 29.867 4.776 23.181 0 14.933 0 C 6.686 0 0 4.776 0 10.667 C 0 16.558 6.686 21.333 14.933 21.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 17.067,
    height: 12.800,
    viewBox: "0 0 17.067 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 102.4,
      top: 49.6,
      width: 17.067,
      height: 12.8,
      opacity: 0.65,
      color: "rgb(18,42,30)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.533 12.8 C 13.246 12.8 17.067 9.935 17.067 6.4 C 17.067 2.865 13.246 0 8.533 0 C 3.821 0 0 2.865 0 6.4 C 0 9.935 3.821 12.8 8.533 12.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 23.467,
    height: 16,
    viewBox: "0 0 23.467 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 133.333,
      top: 48,
      width: 23.467,
      height: 16,
      opacity: 0.8,
      color: "rgb(10,34,20)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 11.733 16 C 18.213 16 23.467 12.418 23.467 8 C 23.467 3.582 18.213 0 11.733 0 C 5.253 0 0 3.582 0 8 C 0 12.418 5.253 16 11.733 16 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 41.358,
    viewBox: "0 0 160 41.358",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 66.376,
      width: 160,
      height: 41.358,
      opacity: 0.95,
      color: "rgb(30,74,112)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 5.624 C 10.667 1.358 21.333 1.002 32 4.558 C 42.667 8.113 53.333 7.758 64 3.491 C 74.667 -0.776 85.333 -0.776 96 3.491 C 106.667 7.758 117.333 7.758 128 3.491 C 138.667 -0.776 149.333 -1.131 160 2.424 L 160 41.358 L 0 41.358 L 0 5.624 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 34.667,
    viewBox: "0 0 160 34.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 73.067,
      width: 160,
      height: 34.667,
      opacity: 0.85,
      color: "rgb(24,61,96)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 4.267 C 12.444 0.711 24.889 0.711 37.333 4.267 C 49.778 7.822 62.222 7.467 74.667 3.2 C 87.111 -1.067 99.556 -1.067 112 3.2 C 124.444 7.467 136.889 7.467 149.333 3.2 C 154.667 1.067 158.222 0.711 160 2.133 L 160 34.667 L 0 34.667 L 0 4.267 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 28.267,
    viewBox: "0 0 160 28.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 79.467,
      width: 160,
      height: 28.267,
      opacity: 0.8,
      color: "rgb(20,46,80)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 4.267 C 14.222 0.711 28.444 0.711 42.667 4.267 C 56.889 7.822 71.111 7.467 85.333 3.2 C 99.556 -1.067 113.778 -1.067 128 3.2 C 140.444 6.756 151.111 7.111 160 4.267 L 160 28.267 L 0 28.267 L 0 4.267 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 157.867,
    height: 7.341,
    viewBox: "0 0 157.867 7.341",
    fill: "none",
    style: {
      position: "absolute",
      left: 6.4,
      top: 68.415,
      width: 157.867,
      height: 7.341,
      opacity: 0.6,
      color: "rgb(74,144,200)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.138 4.276 C -0.345 4.352 -0.452 4.582 -0.376 4.79 C -0.299 4.997 -0.07 5.103 0.138 5.027 L 0 4.652 L -0.138 4.276 Z M 128 3.585 L 127.854 3.213 L 127.841 3.218 L 128 3.585 Z M 157.77 1.84 C 157.984 1.893 158.201 1.763 158.255 1.549 C 158.308 1.335 158.178 1.117 157.964 1.064 L 157.867 1.452 L 157.77 1.84 Z M 0 4.652 L 0.138 5.027 C 10.715 1.149 21.285 1.149 31.862 5.027 L 32 4.652 L 32.138 4.276 C 21.382 0.333 10.618 0.333 -0.138 4.276 L 0 4.652 Z M 32 4.652 L 31.862 5.027 C 42.628 8.975 53.401 8.614 64.159 3.952 L 64 3.585 L 63.841 3.218 C 53.266 7.801 42.706 8.151 32.138 4.276 L 32 4.652 Z M 64 3.585 L 64.159 3.952 C 74.724 -0.626 85.276 -0.626 95.841 3.952 L 96 3.585 L 96.159 3.218 C 85.391 -1.448 74.609 -1.448 63.841 3.218 L 64 3.585 Z M 96 3.585 L 95.841 3.952 C 106.609 8.618 117.391 8.618 128.159 3.952 L 128 3.585 L 127.841 3.218 C 117.276 7.796 106.724 7.796 96.159 3.218 L 96 3.585 Z M 128 3.585 L 128.146 3.957 C 138.028 0.075 147.898 -0.628 157.77 1.84 L 157.867 1.452 L 157.964 1.064 C 147.924 -1.446 137.883 -0.727 127.854 3.213 L 128 3.585 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 157.867,
    height: 6.691,
    viewBox: "0 0 157.867 6.691",
    fill: "none",
    style: {
      position: "absolute",
      left: 6.4,
      top: 75.2,
      width: 157.867,
      height: 6.691,
      opacity: 0.45,
      color: "rgb(58,122,176)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.093 3.96 C -0.262 4.012 -0.358 4.19 -0.306 4.359 C -0.255 4.529 -0.076 4.624 0.093 4.573 L 0 4.267 L -0.093 3.96 Z M 113.067 3.2 L 113.173 2.898 L 113.17 2.897 L 113.067 3.2 Z M 148.267 3.2 L 148.379 3.5 L 148.395 3.494 L 148.41 3.486 L 148.267 3.2 Z M 157.689 2.4 C 157.836 2.498 158.035 2.458 158.133 2.311 C 158.231 2.164 158.191 1.965 158.044 1.867 L 157.867 2.133 L 157.689 2.4 Z M 0 4.267 L 0.093 4.573 C 11.764 1.036 23.79 1.035 36.179 4.574 L 36.267 4.267 L 36.355 3.959 C 23.854 0.388 11.703 0.386 -0.093 3.96 L 0 4.267 Z M 36.267 4.267 L 36.179 4.574 C 48.689 8.149 61.554 7.789 74.765 3.504 L 74.667 3.2 L 74.568 2.896 C 61.469 7.144 48.734 7.496 36.355 3.959 L 36.267 4.267 Z M 74.667 3.2 L 74.765 3.504 C 87.859 -0.742 100.587 -0.74 112.963 3.503 L 113.067 3.2 L 113.17 2.897 C 100.657 -1.393 87.786 -1.391 74.568 2.896 L 74.667 3.2 Z M 113.067 3.2 L 112.96 3.502 C 125.116 7.792 136.927 7.794 148.379 3.5 L 148.267 3.2 L 148.154 2.9 C 136.851 7.139 125.195 7.141 113.173 2.898 L 113.067 3.2 Z M 148.267 3.2 L 148.41 3.486 C 152.661 1.361 155.711 1.081 157.689 2.4 L 157.867 2.133 L 158.044 1.867 C 155.755 0.341 152.406 0.773 148.124 2.914 L 148.267 3.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 9.600,
    viewBox: "0 0 3.200 9.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 26.667,
      top: 74.134,
      width: 3.2,
      height: 9.6,
      opacity: 0.4,
      color: "rgb(240,232,96)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.213 -0.16 C 0.125 -0.278 -0.042 -0.302 -0.16 -0.213 C -0.278 -0.125 -0.302 0.042 -0.213 0.16 L 0 0 L 0.213 -0.16 Z M 3.2 4.267 L 3.116 4.52 L 3.926 4.79 L 3.413 4.107 L 3.2 4.267 Z M 0 3.2 L 0.084 2.947 L -0.526 2.743 L -0.239 3.319 L 0 3.2 Z M 2.961 9.719 C 3.027 9.851 3.188 9.904 3.319 9.839 C 3.451 9.773 3.504 9.612 3.439 9.481 L 3.2 9.6 L 2.961 9.719 Z M 0 0 L -0.213 0.16 L 2.987 4.427 L 3.2 4.267 L 3.413 4.107 L 0.213 -0.16 L 0 0 Z M 3.2 4.267 L 3.284 4.014 L 0.084 2.947 L 0 3.2 L -0.084 3.453 L 3.116 4.52 L 3.2 4.267 Z M 0 3.2 L -0.239 3.319 L 2.961 9.719 L 3.2 9.6 L 3.439 9.481 L 0.239 3.081 L 0 3.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8.533,
    height: 2.667,
    viewBox: "0 0 8.533 2.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.990,-0.139,0.139,0.990,18.133,74.667)",
      transformOrigin: "0 0",
      width: 8.533,
      height: 2.667,
      opacity: 0.8,
      color: "rgb(74,46,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.467 0 L 1.067 0 C 0.478 0 0 0.478 0 1.067 L 0 1.6 C 0 2.189 0.478 2.667 1.067 2.667 L 7.467 2.667 C 8.056 2.667 8.533 2.189 8.533 1.6 L 8.533 1.067 C 8.533 0.478 8.056 0 7.467 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.667,
    height: 2.133,
    viewBox: "0 0 10.667 2.133",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.996,0.087,-0.087,0.996,74.667,71.467)",
      transformOrigin: "0 0",
      width: 10.667,
      height: 2.133,
      opacity: 0.75,
      color: "rgb(58,40,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.6 0 L 1.067 0 C 0.478 0 0 0.478 0 1.067 C 0 1.656 0.478 2.133 1.067 2.133 L 9.6 2.133 C 10.189 2.133 10.667 1.656 10.667 1.067 C 10.667 0.478 10.189 0 9.6 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.467,
    height: 2.133,
    viewBox: "0 0 7.467 2.133",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.998,-0.070,0.070,0.998,122.667,75.200)",
      transformOrigin: "0 0",
      width: 7.467,
      height: 2.133,
      opacity: 0.7,
      color: "rgb(74,48,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.4 0 L 1.067 0 C 0.478 0 0 0.478 0 1.067 C 0 1.656 0.478 2.133 1.067 2.133 L 6.4 2.133 C 6.989 2.133 7.467 1.656 7.467 1.067 C 7.467 0.478 6.989 0 6.4 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8.533,
    height: 3.200,
    viewBox: "0 0 8.533 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.995,0.105,-0.105,0.995,43.924,76.363)",
      transformOrigin: "0 0",
      width: 8.533,
      height: 3.2,
      opacity: 0.65,
      color: "rgb(26,58,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.267 3.2 C 6.623 3.2 8.533 2.484 8.533 1.6 C 8.533 0.716 6.623 0 4.267 0 C 1.91 0 0 0.716 0 1.6 C 0 2.484 1.91 3.2 4.267 3.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.667,
    height: 3.200,
    viewBox: "0 0 10.667 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.996,-0.087,0.087,0.996,95.881,80.471)",
      transformOrigin: "0 0",
      width: 10.667,
      height: 3.2,
      opacity: 0.6,
      color: "rgb(26,58,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.333 3.2 C 8.279 3.2 10.667 2.484 10.667 1.6 C 10.667 0.716 8.279 0 5.333 0 C 2.388 0 0 0.716 0 1.6 C 0 2.484 2.388 3.2 5.333 3.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))))), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 98.667,
    viewBox: "0 0 160 98.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 160,
      height: 98.667,
      color: "rgb(26,58,90)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.4 0 L 6.4 0.4 L 153.6 0.4 L 153.6 0 L 153.6 -0.4 L 6.4 -0.4 L 6.4 0 Z M 153.6 0 L 153.6 0.4 C 156.914 0.4 159.6 3.086 159.6 6.4 L 160 6.4 L 160.4 6.4 C 160.4 2.644 157.356 -0.4 153.6 -0.4 L 153.6 0 Z M 160 6.4 L 159.6 6.4 L 159.6 92.267 L 160 92.267 L 160.4 92.267 L 160.4 6.4 L 160 6.4 Z M 160 92.267 L 159.6 92.267 C 159.6 95.58 156.914 98.267 153.6 98.267 L 153.6 98.667 L 153.6 99.067 C 157.356 99.067 160.4 96.022 160.4 92.267 L 160 92.267 Z M 153.6 98.667 L 153.6 98.267 L 6.4 98.267 L 6.4 98.667 L 6.4 99.067 L 153.6 99.067 L 153.6 98.667 Z M 6.4 98.667 L 6.4 98.267 C 3.086 98.267 0.4 95.58 0.4 92.267 L 0 92.267 L -0.4 92.267 C -0.4 96.022 2.644 99.067 6.4 99.067 L 6.4 98.667 Z M 0 92.267 L 0.4 92.267 L 0.4 6.4 L 0 6.4 L -0.4 6.4 L -0.4 92.267 L 0 92.267 Z M 0 6.4 L 0.4 6.4 C 0.4 3.086 3.086 0.4 6.4 0.4 L 6.4 0 L 6.4 -0.4 C 2.644 -0.4 -0.4 2.644 -0.4 6.4 L 0 6.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __body5 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 160,
      height: 98,
      overflow: "hidden",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 160,
      height: 98.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 160,
      height: 98.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 160,
      height: 98.66666412353516,
      clipPath: "inset(0.000px 0.000px 0px -0.000px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -192.002,
      top: -16,
      width: 384,
      height: 442.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 98.667,
    viewBox: "0 0 160 98.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 192.001,
      top: 16,
      width: 160,
      height: 98.667
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 160 0 L 0 0 L 0 98.667 L 160 98.667 L 160 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 213.333,
    height: 138.667,
    viewBox: "0 0 213.333 138.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 165.334,
      top: 0,
      width: 213.333,
      height: 138.667,
      opacity: 0.5,
      color: "rgb(24,14,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 106.667 138.667 C 165.577 138.667 213.333 107.625 213.333 69.333 C 213.333 31.042 165.577 0 106.667 0 C 47.756 0 0 31.042 0 69.333 C 0 107.625 47.756 138.667 106.667 138.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 170.667,
    height: 112,
    viewBox: "0 0 170.667 112",
    fill: "none",
    style: {
      position: "absolute",
      left: 186.668,
      top: 13.333,
      width: 170.667,
      height: 112,
      opacity: 0.55,
      color: "rgb(30,18,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 85.333 112 C 132.462 112 170.667 86.928 170.667 56 C 170.667 25.072 132.462 0 85.333 0 C 38.205 0 0 25.072 0 56 C 0 86.928 38.205 112 85.333 112 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 133.333,
    height: 87.467,
    viewBox: "0 0 133.333 87.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 205.334,
      top: 25.6,
      width: 133.333,
      height: 87.467,
      opacity: 0.6,
      color: "rgb(38,22,80)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 66.667 87.467 C 103.486 87.467 133.333 67.887 133.333 43.733 C 133.333 19.58 103.486 0 66.667 0 C 29.848 0 0 19.58 0 43.733 C 0 67.887 29.848 87.467 66.667 87.467 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 96,
    height: 64,
    viewBox: "0 0 96 64",
    fill: "none",
    style: {
      position: "absolute",
      left: 224.001,
      top: 37.333,
      width: 96,
      height: 64,
      opacity: 0.65,
      color: "rgb(46,26,94)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 48 64 C 74.51 64 96 49.673 96 32 C 96 14.327 74.51 0 48 0 C 21.49 0 0 14.327 0 32 C 0 49.673 21.49 64 48 64 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 64,
    height: 42.667,
    viewBox: "0 0 64 42.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 240.001,
      top: 48,
      width: 64,
      height: 42.667,
      opacity: 0.7,
      color: "rgb(54,30,108)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 32 42.667 C 49.673 42.667 64 33.115 64 21.333 C 64 9.551 49.673 0 32 0 C 14.327 0 0 9.551 0 21.333 C 0 33.115 14.327 42.667 32 42.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 38.400,
    height: 25.600,
    viewBox: "0 0 38.400 25.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 252.801,
      top: 56.533,
      width: 38.4,
      height: 25.6,
      opacity: 0.8,
      color: "rgb(62,34,120)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 19.2 25.6 C 29.804 25.6 38.4 19.869 38.4 12.8 C 38.4 5.731 29.804 0 19.2 0 C 8.596 0 0 5.731 0 12.8 C 0 19.869 8.596 25.6 19.2 25.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 19.200,
    height: 12.800,
    viewBox: "0 0 19.200 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 262.401,
      top: 62.933,
      width: 19.2,
      height: 12.8,
      opacity: 0.95,
      color: "rgb(18,8,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.6 12.8 C 14.902 12.8 19.2 9.935 19.2 6.4 C 19.2 2.865 14.902 0 9.6 0 C 4.298 0 0 2.865 0 6.4 C 0 9.935 4.298 12.8 9.6 12.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8.533,
    height: 5.333,
    viewBox: "0 0 8.533 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 267.734,
      top: 66.667,
      width: 8.533,
      height: 5.333,
      opacity: 0.7,
      color: "rgb(216,232,248)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.267 5.333 C 6.623 5.333 8.533 4.139 8.533 2.667 C 8.533 1.194 6.623 0 4.267 0 C 1.91 0 0 1.194 0 2.667 C 0 4.139 1.91 5.333 4.267 5.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 2.667,
    viewBox: "0 0 4.267 2.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 269.868,
      top: 68,
      width: 4.267,
      height: 2.667,
      opacity: 0.9,
      color: "rgb(240,244,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.133 2.667 C 3.312 2.667 4.267 2.07 4.267 1.333 C 4.267 0.597 3.312 0 2.133 0 C 0.955 0 0 0.597 0 1.333 C 0 2.07 0.955 2.667 2.133 2.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 5.333,
      width: 384,
      height: 437.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 384,
      height: 437.3333435058594,
      clipPath: "inset(0px 0px 0px 0.000px)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 104.762,
    height: 69.667,
    viewBox: "0 0 104.762 69.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 197.334,
      top: 34.333,
      width: 104.762,
      height: 69.667,
      opacity: 0.45,
      color: "rgb(74,48,144)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.259 1.965 C -0.83 2.108 -1.178 2.687 -1.035 3.259 C -0.892 3.83 -0.313 4.178 0.259 4.035 L 0 3 L -0.259 1.965 Z M 64 8.333 L 63.59 9.318 L 63.597 9.321 L 63.604 9.324 L 64 8.333 Z M 101.333 40.333 L 102.314 39.913 L 102.301 39.884 L 102.287 39.856 L 101.333 40.333 Z M 97.912 68.912 C 97.496 69.329 97.496 70.004 97.912 70.421 C 98.329 70.837 99.004 70.837 99.421 70.421 L 98.667 69.667 L 97.912 68.912 Z M 0 3 L 0.259 4.035 C 21.358 -1.24 42.457 0.512 63.59 9.318 L 64 8.333 L 64.41 7.349 C 42.877 -1.624 21.309 -3.427 -0.259 1.965 L 0 3 Z M 64 8.333 L 63.604 9.324 C 81.191 16.359 93.408 26.867 100.379 40.81 L 101.333 40.333 L 102.287 39.856 C 95.037 25.355 82.364 14.53 64.396 7.343 L 64 8.333 Z M 101.333 40.333 L 100.353 40.754 C 102.975 46.872 104.028 52.245 103.604 56.903 C 103.183 61.537 101.296 65.529 97.912 68.912 L 98.667 69.667 L 99.421 70.421 C 103.148 66.694 105.261 62.24 105.729 57.097 C 106.194 51.977 105.025 46.24 102.314 39.913 L 101.333 40.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))), /*#__PURE__*/React.createElement("svg", {
    width: 97.067,
    height: 38.613,
    viewBox: "0 0 97.067 38.613",
    fill: "none",
    style: {
      position: "absolute",
      left: 201.601,
      top: 45.653,
      width: 97.067,
      height: 38.613,
      opacity: 0.38,
      color: "rgb(90,58,160)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.216 2.643 C -0.642 2.763 -0.89 3.204 -0.77 3.63 C -0.651 4.055 -0.209 4.303 0.216 4.184 L 0 3.413 L -0.216 2.643 Z M 60.8 7.68 L 60.49 8.417 L 60.496 8.42 L 60.503 8.423 L 60.8 7.68 Z M 96.344 38.956 C 96.533 39.355 97.01 39.525 97.409 39.336 C 97.808 39.147 97.979 38.67 97.79 38.271 L 97.067 38.613 L 96.344 38.956 Z M 0 3.413 L 0.216 4.184 C 20.3 -1.454 40.382 -0.049 60.49 8.417 L 60.8 7.68 L 61.11 6.943 C 40.685 -1.657 20.233 -3.097 -0.216 2.643 L 0 3.413 Z M 60.8 7.68 L 60.503 8.423 C 78.148 15.481 90.052 25.674 96.344 38.956 L 97.067 38.613 L 97.79 38.271 C 91.281 24.53 79.008 14.101 61.097 6.937 L 60.8 7.68 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 5.333,
      width: 384,
      height: 437.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 384,
      height: 437.3333435058594,
      clipPath: "inset(0px 0px 0px 0.000px)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 76.267,
    height: 69.825,
    viewBox: "0 0 76.267 69.825",
    fill: "none",
    style: {
      position: "absolute",
      left: 270.401,
      top: 34.176,
      width: 76.267,
      height: 69.825,
      opacity: 0.4,
      color: "rgb(74,48,144)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 75.892 4.157 C 76.444 4.363 77.059 4.084 77.265 3.532 C 77.472 2.981 77.193 2.366 76.641 2.159 L 76.267 3.158 L 75.892 4.157 Z M 32.533 7.425 L 33.03 8.368 L 33.038 8.364 L 33.046 8.36 L 32.533 7.425 Z M 3.733 38.358 L 2.75 37.944 L 2.747 37.952 L 3.733 38.358 Z M 2.803 70.346 C 3.09 70.86 3.741 71.043 4.255 70.755 C 4.769 70.467 4.952 69.817 4.664 69.303 L 3.733 69.825 L 2.803 70.346 Z M 76.267 3.158 L 76.641 2.159 C 62.091 -3.297 47.19 -1.818 32.021 6.489 L 32.533 7.425 L 33.046 8.36 C 47.744 0.311 61.998 -1.054 75.892 4.157 L 76.267 3.158 Z M 32.533 7.425 L 32.037 6.481 C 18.317 13.702 8.539 24.195 2.75 37.944 L 3.733 38.358 L 4.716 38.772 C 10.305 25.498 19.728 15.37 33.03 8.368 L 32.533 7.425 Z M 3.733 38.358 L 2.747 37.952 C -2.317 50.249 -2.378 61.095 2.803 70.346 L 3.733 69.825 L 4.664 69.303 C -0.111 60.776 -0.172 50.644 4.72 38.764 L 3.733 38.358 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))), /*#__PURE__*/React.createElement("svg", {
    width: 68.267,
    height: 35.793,
    viewBox: "0 0 68.267 35.793",
    fill: "none",
    style: {
      position: "absolute",
      left: 274.134,
      top: 46.341,
      width: 68.267,
      height: 35.793,
      opacity: 0.35,
      color: "rgb(90,58,160)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 67.956 4.53 C 68.363 4.701 68.833 4.51 69.004 4.103 C 69.175 3.696 68.984 3.227 68.577 3.055 L 68.267 3.793 L 67.956 4.53 Z M 27.2 5.926 L 26.835 5.214 L 26.827 5.218 L 26.82 5.222 L 27.2 5.926 Z M -0.746 35.503 C -0.906 35.914 -0.702 36.378 -0.29 36.538 C 0.122 36.698 0.585 36.494 0.746 36.083 L 0 35.793 L -0.746 35.503 Z M 68.267 3.793 L 68.577 3.055 C 54.833 -2.732 40.897 -1.997 26.835 5.214 L 27.2 5.926 L 27.565 6.638 C 41.237 -0.373 54.678 -1.061 67.956 4.53 L 68.267 3.793 Z M 27.2 5.926 L 26.82 5.222 C 13.513 12.415 4.307 22.51 -0.746 35.503 L 0 35.793 L 0.746 36.083 C 5.648 23.476 14.576 13.659 27.58 6.63 L 27.2 5.926 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 153.600,
    height: 6.982,
    viewBox: "0 0 153.600 6.982",
    fill: "none",
    style: {
      position: "absolute",
      left: 197.334,
      top: 23.176,
      width: 153.6,
      height: 6.982,
      opacity: 0.4,
      color: "rgb(58,40,128)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.261 2.183 C -0.984 2.328 -1.452 3.03 -1.307 3.752 C -1.163 4.474 -0.461 4.943 0.261 4.798 L 0 3.491 L -0.261 2.183 Z M 128 2.424 L 127.677 3.718 L 127.707 3.725 L 127.739 3.732 L 128 2.424 Z M 154.022 3.689 C 154.72 3.456 155.098 2.701 154.865 2.003 C 154.632 1.304 153.877 0.926 153.178 1.159 L 153.6 2.424 L 154.022 3.689 Z M 0 3.491 L 0.261 4.798 C 14.288 1.993 28.31 2.343 42.343 5.851 L 42.667 4.558 L 42.99 3.264 C 28.578 -0.339 14.156 -0.7 -0.261 2.183 L 0 3.491 Z M 42.667 4.558 L 42.343 5.851 C 56.801 9.466 71.268 9.103 85.716 4.768 L 85.333 3.491 L 84.95 2.214 C 70.955 6.412 56.976 6.761 42.99 3.264 L 42.667 4.558 Z M 85.333 3.491 L 85.716 4.768 C 99.712 0.569 113.69 0.221 127.677 3.718 L 128 2.424 L 128.323 1.131 C 113.865 -2.484 99.399 -2.121 84.95 2.214 L 85.333 3.491 Z M 128 2.424 L 127.739 3.732 C 138.508 5.885 147.306 5.928 154.022 3.689 L 153.6 2.424 L 153.178 1.159 C 147.094 3.187 138.826 3.23 128.261 1.117 L 128 2.424 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 153.600,
    height: 8.041,
    viewBox: "0 0 153.600 8.041",
    fill: "none",
    style: {
      position: "absolute",
      left: 197.334,
      top: 30.113,
      width: 153.6,
      height: 8.041,
      opacity: 0.35,
      color: "rgb(46,32,112)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.231 2.979 C -0.806 3.107 -1.169 3.677 -1.041 4.252 C -0.913 4.827 -0.344 5.19 0.231 5.062 L 0 4.021 L -0.231 2.979 Z M 130.667 2.954 L 130.992 1.938 L 130.982 1.935 L 130.973 1.932 L 130.667 2.954 Z M 154.033 3.929 C 154.572 3.689 154.814 3.059 154.575 2.521 C 154.335 1.982 153.705 1.74 153.167 1.979 L 153.6 2.954 L 154.033 3.929 Z M 0 4.021 L 0.231 5.062 C 16.072 1.542 30.997 1.9 45.027 6.109 L 45.333 5.087 L 45.64 4.065 C 31.225 -0.259 15.928 -0.612 -0.231 2.979 L 0 4.021 Z M 45.333 5.087 L 45.027 6.109 C 59.468 10.441 73.921 10.078 88.352 5.027 L 88 4.021 L 87.648 3.014 C 73.635 7.918 59.643 8.266 45.64 4.065 L 45.333 5.087 Z M 88 4.021 L 88.352 5.027 C 102.365 0.123 116.357 -0.225 130.36 3.976 L 130.667 2.954 L 130.973 1.932 C 116.532 -2.4 102.079 -2.037 87.648 3.014 L 88 4.021 Z M 130.667 2.954 L 130.342 3.97 C 139.396 6.867 147.324 6.91 154.033 3.929 L 153.6 2.954 L 153.167 1.979 C 147.076 4.686 139.716 4.73 130.992 1.938 L 130.667 2.954 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 153.600,
    height: 7.222,
    viewBox: "0 0 153.600 7.222",
    fill: "none",
    style: {
      position: "absolute",
      left: 197.334,
      top: 36,
      width: 153.6,
      height: 7.222,
      opacity: 0.3,
      color: "rgb(58,40,128)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.183 3.085 C -0.688 3.186 -1.016 3.678 -0.915 4.183 C -0.814 4.688 -0.322 5.016 0.183 4.915 L 0 4 L -0.183 3.085 Z M 133.333 3.467 L 133.045 4.354 L 133.049 4.356 L 133.333 3.467 Z M 154.042 4.822 C 154.496 4.577 154.666 4.011 154.422 3.558 C 154.177 3.104 153.611 2.934 153.158 3.178 L 153.6 4 L 154.042 4.822 Z M 0 4 L 0.183 4.915 C 17.85 1.382 33.699 1.569 47.753 5.433 L 48 4.533 L 48.247 3.633 C 33.856 -0.324 17.705 -0.493 -0.183 3.085 L 0 4 Z M 48 4.533 L 47.753 5.433 C 62.153 9.393 76.562 9.032 90.955 4.354 L 90.667 3.467 L 90.378 2.579 C 76.327 7.146 62.291 7.495 48.247 3.633 L 48 4.533 Z M 90.667 3.467 L 90.955 4.354 C 104.99 -0.207 119.01 -0.207 133.045 4.354 L 133.333 3.467 L 133.622 2.579 C 119.212 -2.104 104.788 -2.104 90.378 2.579 L 90.667 3.467 Z M 133.333 3.467 L 133.049 4.356 C 142.006 7.222 149.076 7.496 154.042 4.822 L 153.6 4 L 153.158 3.178 C 148.879 5.482 142.439 5.4 133.618 2.578 L 133.333 3.467 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 20.267,
    viewBox: "0 0 5.333 20.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 253.868,
      top: 52.267,
      width: 5.333,
      height: 20.267,
      opacity: 0.9,
      color: "rgb(248,244,160)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.706 0.169 C 3.799 -0.111 3.648 -0.413 3.369 -0.506 C 3.089 -0.599 2.787 -0.448 2.694 -0.169 L 3.2 0 L 3.706 0.169 Z M 0 9.6 L -0.506 9.431 L -0.797 10.303 L 0.105 10.123 L 0 9.6 Z M 5.333 8.533 L 5.819 8.754 L 6.25 7.806 L 5.229 8.01 L 5.333 8.533 Z M -0.486 20.046 C -0.607 20.314 -0.489 20.63 -0.221 20.752 C 0.047 20.874 0.364 20.756 0.486 20.487 L 0 20.267 L -0.486 20.046 Z M 3.2 0 L 2.694 -0.169 L -0.506 9.431 L 0 9.6 L 0.506 9.769 L 3.706 0.169 L 3.2 0 Z M 0 9.6 L 0.105 10.123 L 5.438 9.056 L 5.333 8.533 L 5.229 8.01 L -0.105 9.077 L 0 9.6 Z M 5.333 8.533 L 4.848 8.313 L -0.486 20.046 L 0 20.267 L 0.486 20.487 L 5.819 8.754 L 5.333 8.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 20.267,
    viewBox: "0 0 5.333 20.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 253.868,
      top: 52.267,
      width: 5.333,
      height: 20.267,
      opacity: 0.5,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.352 0.051 C 3.38 -0.033 3.334 -0.124 3.251 -0.152 C 3.167 -0.18 3.076 -0.134 3.048 -0.051 L 3.2 0 L 3.352 0.051 Z M 0 9.6 L -0.152 9.549 L -0.239 9.811 L 0.031 9.757 L 0 9.6 Z M 5.333 8.533 L 5.479 8.6 L 5.608 8.315 L 5.302 8.376 L 5.333 8.533 Z M -0.146 20.2 C -0.182 20.281 -0.147 20.376 -0.066 20.412 C 0.014 20.449 0.109 20.413 0.146 20.333 L 0 20.267 L -0.146 20.2 Z M 3.2 0 L 3.048 -0.051 L -0.152 9.549 L 0 9.6 L 0.152 9.651 L 3.352 0.051 L 3.2 0 Z M 0 9.6 L 0.031 9.757 L 5.365 8.69 L 5.333 8.533 L 5.302 8.376 L -0.031 9.443 L 0 9.6 Z M 5.333 8.533 L 5.188 8.467 L -0.146 20.2 L 0 20.267 L 0.146 20.333 L 5.479 8.6 L 5.333 8.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 16,
    viewBox: "0 0 4.267 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 284.801,
      top: 50.133,
      width: 4.267,
      height: 16,
      opacity: 0.8,
      color: "rgb(240,232,128)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.544 0.117 C 2.608 -0.109 2.477 -0.346 2.251 -0.41 C 2.024 -0.475 1.788 -0.344 1.723 -0.117 L 2.133 0 L 2.544 0.117 Z M 0 7.467 L -0.41 7.349 L -0.588 7.97 L 0.053 7.89 L 0 7.467 Z M 4.267 6.933 L 4.669 7.075 L 4.899 6.424 L 4.214 6.51 L 4.267 6.933 Z M 0.664 15.858 C 0.586 16.08 0.702 16.324 0.925 16.402 C 1.147 16.481 1.391 16.364 1.469 16.142 L 1.067 16 L 0.664 15.858 Z M 2.133 0 L 1.723 -0.117 L -0.41 7.349 L 0 7.467 L 0.41 7.584 L 2.544 0.117 L 2.133 0 Z M 0 7.467 L 0.053 7.89 L 4.32 7.357 L 4.267 6.933 L 4.214 6.51 L -0.053 7.043 L 0 7.467 Z M 4.267 6.933 L 3.864 6.791 L 0.664 15.858 L 1.067 16 L 1.469 16.142 L 4.669 7.075 L 4.267 6.933 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 29.973,
    viewBox: "0 0 160 29.973",
    fill: "none",
    style: {
      position: "absolute",
      left: 192.001,
      top: 84.693,
      width: 160,
      height: 29.973,
      opacity: 0.95,
      color: "rgb(10,32,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 4.907 C 7.111 0.64 14.222 0.64 21.333 4.907 C 28.444 9.173 35.556 9.173 42.667 4.907 C 49.778 0.64 56.889 0.284 64 3.84 C 71.111 7.396 78.222 7.396 85.333 3.84 C 92.444 0.284 99.556 0.284 106.667 3.84 C 113.778 7.396 120.889 7.396 128 3.84 C 136.889 -0.427 147.556 -1.138 160 1.707 L 160 29.973 L 0 29.973 L 0 4.907 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 23.733,
    viewBox: "0 0 160 23.733",
    fill: "none",
    style: {
      position: "absolute",
      left: 192.001,
      top: 90.933,
      width: 160,
      height: 23.733,
      opacity: 0.9,
      color: "rgb(8,24,56)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 4 C 8.889 -0.267 17.778 -0.267 26.667 4 C 35.556 8.267 44.444 8.267 53.333 4 C 62.222 -0.267 71.111 -0.444 80 3.467 C 88.889 7.378 97.778 7.378 106.667 3.467 C 117.333 -1.156 128 -1.156 138.667 3.467 C 147.556 6.667 154.667 6.311 160 2.4 L 160 23.733 L 0 23.733 L 0 4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 18.272,
    viewBox: "0 0 160 18.272",
    fill: "none",
    style: {
      position: "absolute",
      left: 192.001,
      top: 96.394,
      width: 160,
      height: 18.272,
      opacity: 0.85,
      color: "rgb(6,16,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 3.872 C 10.667 -0.039 21.333 -0.039 32 3.872 C 42.667 7.784 53.333 7.784 64 3.872 C 74.667 -0.039 85.333 -0.216 96 3.339 C 106.667 6.895 117.333 6.895 128 3.339 C 138.667 -0.928 149.333 -1.105 160 2.806 L 160 18.272 L 0 18.272 L 0 3.872 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 157.867,
    height: 7.930,
    viewBox: "0 0 157.867 7.930",
    fill: "none",
    style: {
      position: "absolute",
      left: 193.068,
      top: 85.67,
      width: 157.867,
      height: 7.93,
      opacity: 0.55,
      color: "rgb(106,144,192)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.193 4.646 C -0.386 4.752 -0.457 4.996 -0.35 5.189 C -0.244 5.383 -0.001 5.453 0.193 5.347 L 0 4.996 L -0.193 4.646 Z M 112 3.93 L 112.158 3.562 L 112.151 3.56 L 112 3.93 Z M 134.4 3.396 L 134.572 3.758 L 134.579 3.754 L 134.4 3.396 Z M 157.73 2.172 C 157.938 2.248 158.167 2.141 158.243 1.933 C 158.318 1.726 158.211 1.496 158.003 1.421 L 157.867 1.796 L 157.73 2.172 Z M 0 4.996 L 0.193 5.347 C 7.181 1.503 14.328 1.499 21.681 5.351 L 21.867 4.996 L 22.052 4.642 C 14.472 0.672 7.041 0.667 -0.193 4.646 L 0 4.996 Z M 21.867 4.996 L 21.681 5.351 C 29.264 9.323 36.869 9.323 44.452 5.351 L 44.267 4.996 L 44.081 4.642 C 36.731 8.492 29.403 8.492 22.052 4.642 L 21.867 4.996 Z M 44.267 4.996 L 44.452 5.351 C 51.817 1.493 59.158 1.147 66.509 4.297 L 66.667 3.93 L 66.824 3.562 C 59.242 0.313 51.65 0.678 44.081 4.642 L 44.267 4.996 Z M 66.667 3.93 L 66.509 4.297 C 74.076 7.541 81.657 7.541 89.224 4.297 L 89.067 3.93 L 88.909 3.562 C 81.543 6.719 74.19 6.719 66.824 3.562 L 66.667 3.93 Z M 89.067 3.93 L 89.224 4.297 C 96.588 1.142 104.121 1.139 111.849 4.3 L 112 3.93 L 112.151 3.56 C 104.235 0.321 96.479 0.318 88.909 3.562 L 89.067 3.93 Z M 112 3.93 L 111.842 4.297 C 119.417 7.544 127.004 7.362 134.572 3.758 L 134.4 3.396 L 134.228 3.035 C 126.863 6.542 119.516 6.716 112.158 3.562 L 112 3.93 Z M 134.4 3.396 L 134.579 3.754 C 142.308 -0.111 150.017 -0.632 157.73 2.172 L 157.867 1.796 L 158.003 1.421 C 150.072 -1.463 142.136 -0.919 134.221 3.039 L 134.4 3.396 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 157.867,
    height: 7.339,
    viewBox: "0 0 157.867 7.339",
    fill: "none",
    style: {
      position: "absolute",
      left: 193.068,
      top: 92.533,
      width: 157.867,
      height: 7.339,
      opacity: 0.4,
      color: "rgb(90,128,176)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.133 4.242 C -0.294 4.316 -0.365 4.506 -0.291 4.667 C -0.217 4.827 -0.027 4.898 0.133 4.824 L 0 4.533 L -0.133 4.242 Z M 109.867 3.467 L 109.991 3.762 L 110.001 3.757 L 109.867 3.467 Z M 138.667 3.467 L 138.524 3.753 L 138.53 3.756 L 138.537 3.759 L 138.667 3.467 Z M 158.022 2.68 C 158.177 2.594 158.232 2.399 158.146 2.245 C 158.061 2.09 157.866 2.034 157.711 2.12 L 157.867 2.4 L 158.022 2.68 Z M 0 4.533 L 0.133 4.824 C 8.579 0.953 17.374 0.949 26.542 4.828 L 26.667 4.533 L 26.791 4.239 C 17.471 0.295 8.488 0.291 -0.133 4.242 L 0 4.533 Z M 26.667 4.533 L 26.542 4.828 C 35.871 8.775 45.209 8.594 54.534 4.291 L 54.4 4 L 54.266 3.709 C 45.102 7.939 35.951 8.114 26.791 4.239 L 26.667 4.533 Z M 54.4 4 L 54.534 4.291 C 63.698 0.061 72.849 -0.114 82.009 3.761 L 82.133 3.467 L 82.258 3.172 C 72.929 -0.775 63.591 -0.594 54.266 3.709 L 54.4 4 Z M 82.133 3.467 L 82.009 3.761 C 91.333 7.706 100.667 7.706 109.991 3.761 L 109.867 3.467 L 109.742 3.172 C 100.577 7.049 91.423 7.049 82.258 3.172 L 82.133 3.467 Z M 109.867 3.467 L 110.001 3.757 C 119.875 -0.827 129.372 -0.823 138.524 3.753 L 138.667 3.467 L 138.81 3.18 C 129.472 -1.488 119.77 -1.484 109.732 3.176 L 109.867 3.467 Z M 138.667 3.467 L 138.537 3.759 C 145.033 6.646 151.539 6.282 158.022 2.68 L 157.867 2.4 L 157.711 2.12 C 151.394 5.63 145.1 5.976 138.797 3.174 L 138.667 3.467 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 204.801,
      top: 90.774,
      width: 133.867,
      height: 7.253,
      opacity: 0.3,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 6.400,
    height: 2.133,
    viewBox: "0 0 6.400 2.133",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0.96,
      width: 6.4,
      height: 2.133,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.2 2.133 C 4.967 2.133 6.4 1.656 6.4 1.067 C 6.4 0.478 4.967 0 3.2 0 C 1.433 0 0 0.478 0 1.067 C 0 1.656 1.433 2.133 3.2 2.133 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 1.920,
    viewBox: "0 0 5.333 1.920",
    fill: "none",
    style: {
      position: "absolute",
      left: 21.867,
      top: 5.333,
      width: 5.333,
      height: 1.92,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 1.92 C 4.139 1.92 5.333 1.49 5.333 0.96 C 5.333 0.43 4.139 0 2.667 0 C 1.194 0 0 0.43 0 0.96 C 0 1.49 1.194 1.92 2.667 1.92 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.467,
    height: 2.347,
    viewBox: "0 0 7.467 2.347",
    fill: "none",
    style: {
      position: "absolute",
      left: 42.133,
      top: 0.853,
      width: 7.467,
      height: 2.347,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.733 2.347 C 5.795 2.347 7.467 1.821 7.467 1.173 C 7.467 0.525 5.795 0 3.733 0 C 1.671 0 0 0.525 0 1.173 C 0 1.821 1.671 2.347 3.733 2.347 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 1.920,
    viewBox: "0 0 5.333 1.920",
    fill: "none",
    style: {
      position: "absolute",
      left: 64.533,
      top: 4.266,
      width: 5.333,
      height: 1.92,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 1.92 C 4.139 1.92 5.333 1.49 5.333 0.96 C 5.333 0.43 4.139 0 2.667 0 C 1.194 0 0 0.43 0 0.96 C 0 1.49 1.194 1.92 2.667 1.92 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.400,
    height: 2.133,
    viewBox: "0 0 6.400 2.133",
    fill: "none",
    style: {
      position: "absolute",
      left: 85.333,
      top: 0.426,
      width: 6.4,
      height: 2.133,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.2 2.133 C 4.967 2.133 6.4 1.656 6.4 1.067 C 6.4 0.478 4.967 0 3.2 0 C 1.433 0 0 0.478 0 1.067 C 0 1.656 1.433 2.133 3.2 2.133 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.467,
    height: 2.347,
    viewBox: "0 0 7.467 2.347",
    fill: "none",
    style: {
      position: "absolute",
      left: 106.133,
      top: 4.053,
      width: 7.467,
      height: 2.347,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.733 2.347 C 5.795 2.347 7.467 1.821 7.467 1.173 C 7.467 0.525 5.795 0 3.733 0 C 1.671 0 0 0.525 0 1.173 C 0 1.821 1.671 2.347 3.733 2.347 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 1.920,
    viewBox: "0 0 5.333 1.920",
    fill: "none",
    style: {
      position: "absolute",
      left: 128.533,
      top: 0,
      width: 5.333,
      height: 1.92,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 1.92 C 4.139 1.92 5.333 1.49 5.333 0.96 C 5.333 0.43 4.139 0 2.667 0 C 1.194 0 0 0.43 0 0.96 C 0 1.49 1.194 1.92 2.667 1.92 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 197.761,
      top: 16.533,
      width: 149.334,
      height: 6.294,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 1.280,
    height: 1.280,
    viewBox: "0 0 1.280 1.280",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 3.093,
      width: 1.28,
      height: 1.28,
      opacity: 0.8,
      color: "rgb(200,216,248)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.64 1.28 C 0.993 1.28 1.28 0.993 1.28 0.64 C 1.28 0.287 0.993 0 0.64 0 C 0.287 0 0 0.287 0 0.64 C 0 0.993 0.287 1.28 0.64 1.28 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 0.853,
    height: 0.853,
    viewBox: "0 0 0.853 0.853",
    fill: "none",
    style: {
      position: "absolute",
      left: 9.813,
      top: 0.107,
      width: 0.853,
      height: 0.853,
      opacity: 0.6,
      color: "rgb(200,216,248)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.427 0.853 C 0.662 0.853 0.853 0.662 0.853 0.427 C 0.853 0.191 0.662 0 0.427 0 C 0.191 0 0 0.191 0 0.427 C 0 0.662 0.191 0.853 0.427 0.853 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.067,
    height: 1.067,
    viewBox: "0 0 1.067 1.067",
    fill: "none",
    style: {
      position: "absolute",
      left: 19.307,
      top: 4.267,
      width: 1.067,
      height: 1.067,
      opacity: 0.7,
      color: "rgb(200,216,248)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.533 1.067 C 0.828 1.067 1.067 0.828 1.067 0.533 C 1.067 0.239 0.828 0 0.533 0 C 0.239 0 0 0.239 0 0.533 C 0 0.828 0.239 1.067 0.533 1.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.280,
    height: 1.280,
    viewBox: "0 0 1.280 1.280",
    fill: "none",
    style: {
      position: "absolute",
      left: 140.8,
      top: 2.027,
      width: 1.28,
      height: 1.28,
      opacity: 0.8,
      color: "rgb(200,216,248)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.64 1.28 C 0.993 1.28 1.28 0.993 1.28 0.64 C 1.28 0.287 0.993 0 0.64 0 C 0.287 0 0 0.287 0 0.64 C 0 0.993 0.287 1.28 0.64 1.28 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 0.853,
    height: 0.853,
    viewBox: "0 0 0.853 0.853",
    fill: "none",
    style: {
      position: "absolute",
      left: 148.48,
      top: 5.44,
      width: 0.853,
      height: 0.853,
      opacity: 0.6,
      color: "rgb(200,216,248)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.427 0.853 C 0.662 0.853 0.853 0.662 0.853 0.427 C 0.853 0.191 0.662 0 0.427 0 C 0.191 0 0 0.191 0 0.427 C 0 0.662 0.191 0.853 0.427 0.853 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.067,
    height: 1.067,
    viewBox: "0 0 1.067 1.067",
    fill: "none",
    style: {
      position: "absolute",
      left: 145.707,
      top: 0,
      width: 1.067,
      height: 1.067,
      opacity: 0.7,
      color: "rgb(200,216,248)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.533 1.067 C 0.828 1.067 1.067 0.828 1.067 0.533 C 1.067 0.239 0.828 0 0.533 0 C 0.239 0 0 0.239 0 0.533 C 0 0.828 0.239 1.067 0.533 1.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))))))));
  const __body6 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 160,
      height: 98,
      overflow: "hidden",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0.001,
      top: 0,
      width: 160,
      height: 98.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 160,
      height: 98.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 160,
      height: 98.66666412353516,
      clipPath: "inset(0.000px 0.000px 0px -0.000px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -5.334,
      top: -2.667,
      width: 176,
      height: 101.334,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 98.667,
    viewBox: "0 0 160 98.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 2.667,
      width: 160,
      height: 98.667
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 160 0 L 0 0 L 0 98.667 L 160 98.667 L 160 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 82.074,
    viewBox: "0 0 160 82.074",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 19.26,
      width: 160,
      height: 82.074,
      opacity: 0.6,
      color: "rgb(74,64,56)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 26.074 C 14.222 6.519 28.444 2.074 42.667 12.741 C 53.333 3.852 64 2.074 74.667 7.407 C 87.111 -1.481 99.556 -2.37 112 4.741 C 124.444 -0.593 136.889 -0.948 149.333 3.674 C 156.444 1.541 160 1.541 160 3.674 L 160 82.074 L 0 82.074 L 0 26.074 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 79.600,
    viewBox: "0 0 160 79.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 21.733,
      width: 160,
      height: 79.6,
      opacity: 0.5,
      color: "rgb(58,48,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 28.933 C 12.444 11.156 24.889 6.711 37.333 15.6 C 47.289 7.422 57.6 5.467 68.267 9.733 C 78.933 1.911 89.956 0.844 101.333 6.533 C 113.422 -0.578 125.867 -1.644 138.667 3.333 C 147.556 -0.222 154.667 -0.933 160 1.2 L 160 79.6 L 0 79.6 L 0 28.933 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 149.333,
    height: 58.667,
    viewBox: "0 0 149.333 58.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 26.667,
      top: 0,
      width: 149.333,
      height: 58.667,
      opacity: 0.35,
      color: "rgb(192,168,128)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 74.667 58.667 C 115.904 58.667 149.333 45.534 149.333 29.333 C 149.333 13.133 115.904 0 74.667 0 C 33.429 0 0 13.133 0 29.333 C 0 45.534 33.429 58.667 74.667 58.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 96,
    height: 42.667,
    viewBox: "0 0 96 42.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 10.667,
      top: 16,
      width: 96,
      height: 42.667,
      opacity: 0.3,
      color: "rgb(184,152,112)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 48 42.667 C 74.51 42.667 96 33.115 96 21.333 C 96 9.551 74.51 0 48 0 C 21.49 0 0 9.551 0 21.333 C 0 33.115 21.49 42.667 48 42.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 74.667,
    height: 40.533,
    viewBox: "0 0 74.667 40.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 101.333,
      top: 11.733,
      width: 74.667,
      height: 40.533,
      opacity: 0.28,
      color: "rgb(192,168,128)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 37.333 40.533 C 57.952 40.533 74.667 31.46 74.667 20.267 C 74.667 9.074 57.952 0 37.333 0 C 16.715 0 0 9.074 0 20.267 C 0 31.46 16.715 40.533 37.333 40.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 46.933,
    height: 31.105,
    viewBox: "0 0 46.933 31.105",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 14.229,
      width: 46.933,
      height: 31.105,
      color: "rgb(26,48,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 20.438 C 8.889 13.327 17.778 11.194 26.667 14.038 C 21.333 9.06 23.111 7.283 32 8.705 C 26.667 3.016 28.444 1.949 37.333 5.505 C 33.778 -0.54 36.978 -1.606 46.933 2.305 L 46.933 31.105 L 0 31.105 L 0 20.438 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 4.267,
      top: 21.333,
      width: 48,
      height: 25.067,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 12.800,
    height: 11.733,
    viewBox: "0 0 12.800 11.733",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 13.333,
      width: 12.8,
      height: 11.733,
      color: "rgb(26,48,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.4 0 L 12.8 11.733 L 0 11.733 L 6.4 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 14.933,
    height: 12.800,
    viewBox: "0 0 14.933 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 9.6,
      top: 8,
      width: 14.933,
      height: 12.8,
      color: "rgb(26,48,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.467 0 L 14.933 12.8 L 0 12.8 L 7.467 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 14.933,
    height: 13.867,
    viewBox: "0 0 14.933 13.867",
    fill: "none",
    style: {
      position: "absolute",
      left: 21.333,
      top: 3.733,
      width: 14.933,
      height: 13.867,
      color: "rgb(26,48,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.467 0 L 14.933 13.867 L 0 13.867 L 7.467 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 14.933,
    height: 13.333,
    viewBox: "0 0 14.933 13.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 33.067,
      top: 0,
      width: 14.933,
      height: 13.333,
      color: "rgb(26,48,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.467 0 L 14.933 13.333 L 0 13.333 L 7.467 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 60.034,
    viewBox: "0 0 160 60.034",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 19.433,
      width: 160,
      height: 60.034,
      color: "rgb(122,96,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 17.901 C 10.667 9.723 22.222 7.945 34.667 12.568 C 45.333 17.19 56.889 15.412 69.333 7.234 C 81.778 -0.944 94.222 -2.188 106.667 3.501 C 117.333 8.479 127.111 7.945 136 1.901 L 160 5.634 L 160 52.568 C 144 58.968 128 60.39 112 56.834 C 94.222 52.568 77.333 52.568 61.333 56.834 C 43.556 61.101 26.667 61.101 10.667 56.834 C 6.4 55.768 2.844 54.701 0 53.634 L 0 17.901 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 45.562,
    viewBox: "0 0 160 45.562",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 33.905,
      width: 160,
      height: 45.562,
      opacity: 0.85,
      color: "rgb(106,80,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 14.095 C 12.444 6.984 25.778 5.74 40 10.362 C 52.444 14.629 65.422 13.206 78.933 6.095 C 92.089 -1.016 104.889 -1.905 117.333 3.429 C 127.289 8.051 137.067 7.162 146.667 0.762 L 160 3.429 L 160 38.095 C 144 44.495 128 45.917 112 42.362 C 94.222 38.095 77.333 38.095 61.333 42.362 C 43.556 46.629 26.667 46.629 10.667 42.362 C 6.4 41.295 2.844 40.229 0 39.162 L 0 14.095 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 11.335,
    viewBox: "0 0 160 11.335",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 34.499,
      width: 160,
      height: 11.335,
      opacity: 0.5,
      color: "rgb(154,120,80)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.156 9.399 C -0.36 9.486 -0.455 9.721 -0.368 9.924 C -0.282 10.127 -0.047 10.222 0.156 10.136 L 0 9.768 L -0.156 9.399 Z M 85.333 5.501 L 85.505 5.862 L 85.512 5.859 L 85.333 5.501 Z M 125.333 3.901 L 125.492 3.534 L 125.492 3.534 L 125.333 3.901 Z M 160.13 4.813 C 160.339 4.741 160.45 4.514 160.378 4.305 C 160.307 4.096 160.079 3.984 159.87 4.056 L 160 4.434 L 160.13 4.813 Z M 0 9.768 L 0.156 10.136 C 14.29 4.129 28.409 3.601 42.535 8.545 L 42.667 8.168 L 42.799 7.79 C 28.48 2.778 14.155 3.317 -0.156 9.399 L 0 9.768 Z M 42.667 8.168 L 42.535 8.545 C 56.861 13.559 71.192 12.661 85.505 5.862 L 85.333 5.501 L 85.162 5.14 C 71.03 11.852 56.917 12.731 42.799 7.79 L 42.667 8.168 Z M 85.333 5.501 L 85.512 5.859 C 98.924 -0.847 112.134 -1.371 125.175 4.268 L 125.333 3.901 L 125.492 3.534 C 112.222 -2.205 98.765 -1.662 85.154 5.143 L 85.333 5.501 Z M 125.333 3.901 L 125.174 4.268 C 135.945 8.935 147.604 9.107 160.13 4.813 L 160 4.434 L 159.87 4.056 C 147.507 8.295 136.055 8.111 125.492 3.534 L 125.333 3.901 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 13.077,
    viewBox: "0 0 160 13.077",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 41.643,
      width: 160,
      height: 13.077,
      opacity: 0.42,
      color: "rgb(138,104,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.12 11.393 C -0.284 11.46 -0.363 11.646 -0.297 11.81 C -0.23 11.974 -0.044 12.053 0.12 11.987 L 0 11.69 L -0.12 11.393 Z M 130.667 3.69 L 130.54 3.984 L 130.548 3.987 L 130.667 3.69 Z M 160.119 5.054 C 160.283 4.988 160.363 4.802 160.297 4.638 C 160.231 4.474 160.045 4.394 159.881 4.46 L 160 4.757 L 160.119 5.054 Z M 0 11.69 L 0.12 11.987 C 14.984 5.97 30.017 5.44 45.234 10.394 L 45.333 10.09 L 45.432 9.786 C 30.072 4.785 14.883 5.321 -0.12 11.393 L 0 11.69 Z M 45.333 10.09 L 45.234 10.394 C 60.605 15.399 75.45 14.147 89.749 6.64 L 89.6 6.357 L 89.451 6.073 C 75.306 13.5 60.639 14.737 45.432 9.786 L 45.333 10.09 Z M 89.6 6.357 L 89.749 6.64 C 103.897 -0.788 117.484 -1.662 130.54 3.984 L 130.667 3.69 L 130.794 3.396 C 117.538 -2.336 103.747 -1.432 89.451 6.073 L 89.6 6.357 Z M 130.667 3.69 L 130.548 3.987 C 141.275 8.278 151.139 8.646 160.119 5.054 L 160 4.757 L 159.881 4.46 C 151.083 7.979 141.392 7.636 130.786 3.393 L 130.667 3.69 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 13.963,
    viewBox: "0 0 160 13.963",
    fill: "none",
    style: {
      position: "absolute",
      left: 5.333,
      top: 50.274,
      width: 160,
      height: 13.963,
      opacity: 0.35,
      color: "rgb(122,88,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.089 11.875 C -0.228 11.924 -0.301 12.077 -0.251 12.216 C -0.202 12.354 -0.049 12.427 0.089 12.378 L 0 12.126 L -0.089 11.875 Z M 134.4 3.593 L 134.289 3.836 L 134.295 3.838 L 134.4 3.593 Z M 160.119 4.898 C 160.251 4.832 160.304 4.672 160.239 4.54 C 160.173 4.409 160.012 4.355 159.881 4.421 L 160 4.66 L 160.119 4.898 Z M 0 12.126 L 0.089 12.378 C 16.036 6.708 31.977 6.354 47.921 11.314 L 48 11.06 L 48.079 10.805 C 32.023 5.81 15.964 6.167 -0.089 11.875 L 0 12.126 Z M 48 11.06 L 47.921 11.314 C 63.988 16.313 79.351 14.884 93.993 7.028 L 93.867 6.793 L 93.741 6.558 C 79.227 14.346 64.012 15.762 48.079 10.805 L 48 11.06 Z M 93.867 6.793 L 93.993 7.028 C 108.514 -0.764 121.937 -1.811 134.289 3.836 L 134.4 3.593 L 134.511 3.35 C 121.974 -2.38 108.375 -1.294 93.741 6.558 L 93.867 6.793 Z M 134.4 3.593 L 134.295 3.838 C 144.295 8.124 152.915 8.5 160.119 4.898 L 160 4.66 L 159.881 4.421 C 152.863 7.93 144.416 7.595 134.505 3.348 L 134.4 3.593 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.840,
    height: 18.133,
    viewBox: "0 0 3.840 18.133",
    fill: "none",
    style: {
      position: "absolute",
      left: 52.267,
      top: 17.6,
      width: 3.84,
      height: 18.133,
      color: "rgb(74,48,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.607 -0.521 C 0.32 -0.856 -0.185 -0.895 -0.521 -0.607 C -0.856 -0.32 -0.895 0.185 -0.607 0.521 L 0 0 L 0.607 -0.521 Z M 1.391 17.836 C 1.226 18.246 1.426 18.712 1.836 18.876 C 2.246 19.04 2.712 18.841 2.876 18.43 L 2.133 18.133 L 1.391 17.836 Z M 0 0 L -0.607 0.521 C 1.431 2.899 2.603 5.508 2.939 8.36 C 3.275 11.22 2.776 14.373 1.391 17.836 L 2.133 18.133 L 2.876 18.43 C 4.335 14.782 4.903 11.358 4.528 8.173 C 4.152 4.981 2.836 2.079 0.607 -0.521 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.752,
    height: 20.267,
    viewBox: "0 0 4.752 20.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 64,
      top: 14.4,
      width: 4.752,
      height: 20.267,
      opacity: 0.8,
      color: "rgb(74,48,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.502 -0.439 C 0.259 -0.716 -0.162 -0.744 -0.439 -0.502 C -0.716 -0.259 -0.744 0.162 -0.502 0.439 L 0 0 L 0.502 -0.439 Z M 2.573 20.039 C 2.448 20.385 2.626 20.767 2.972 20.893 C 3.318 21.019 3.701 20.841 3.827 20.494 L 3.2 20.267 L 2.573 20.039 Z M 0 0 L -0.502 0.439 C 4.297 5.923 5.345 12.417 2.573 20.039 L 3.2 20.267 L 3.827 20.494 C 6.744 12.472 5.658 5.454 0.502 -0.439 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.752,
    height: 20.267,
    viewBox: "0 0 4.752 20.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 76.8,
      top: 12.267,
      width: 4.752,
      height: 20.267,
      opacity: 0.65,
      color: "rgb(58,40,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.401 -0.351 C 0.207 -0.573 -0.13 -0.595 -0.351 -0.401 C -0.573 -0.207 -0.595 0.13 -0.401 0.351 L 0 0 L 0.401 -0.351 Z M 2.699 20.084 C 2.598 20.361 2.741 20.667 3.018 20.768 C 3.295 20.869 3.601 20.726 3.701 20.449 L 3.2 20.267 L 2.699 20.084 Z M 0 0 L -0.401 0.351 C 4.433 5.877 5.485 12.422 2.699 20.084 L 3.2 20.267 L 3.701 20.449 C 6.604 12.467 5.522 5.501 0.401 -0.351 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.941,0.338,-0.862,0.507,74.024,9.090)",
      transformOrigin: "0 0",
      width: 22.276,
      height: 31.819,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 3.574,
    height: 20.235,
    viewBox: "0 0 3.574 20.235",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.949,0.315,0.357,0.934,10.419,11.790)",
      transformOrigin: "0 0",
      width: 3.574,
      height: 20.235,
      color: "rgb(90,56,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.383 0 L 1.191 0 C 0.533 0 0 0.647 0 1.445 L 0 18.79 C 0 19.588 0.533 20.235 1.191 20.235 L 2.383 20.235 C 3.041 20.235 3.574 19.588 3.574 18.79 L 3.574 1.445 C 3.574 0.647 3.041 0 2.383 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 17.730,
    height: 15.336,
    viewBox: "0 0 17.730 15.336",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.950,0.312,0.354,0.935,0.000,0)",
      transformOrigin: "0 0",
      width: 17.73,
      height: 15.336,
      color: "rgb(42,72,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.865 15.336 C 13.761 15.336 17.73 11.903 17.73 7.668 C 17.73 3.433 13.761 0 8.865 0 C 3.969 0 0 3.433 0 7.668 C 0 11.903 3.969 15.336 8.865 15.336 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.836,0.549,-0.952,0.306,93.324,7.288)",
      transformOrigin: "0 0",
      width: 18.252,
      height: 24.295,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 4.151,
    height: 13.967,
    viewBox: "0 0 4.151 13.967",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.936,0.353,0.293,0.956,8.171,9.478)",
      transformOrigin: "0 0",
      width: 4.151,
      height: 13.967,
      color: "rgb(74,48,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.491 0 L 1.661 0 C 0.743 0 0 0.568 0 1.27 L 0 12.697 C 0 13.398 0.743 13.967 1.661 13.967 L 2.491 13.967 C 3.408 13.967 4.151 13.398 4.151 12.697 L 4.151 1.27 C 4.151 0.568 3.408 0 2.491 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 16.617,
    height: 9.276,
    viewBox: "0 0 16.617 9.276",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.937,0.349,0.289,0.957,0.000,0)",
      transformOrigin: "0 0",
      width: 16.617,
      height: 9.276,
      color: "rgb(34,56,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.308 9.276 C 12.897 9.276 16.617 7.199 16.617 4.638 C 16.617 2.076 12.897 0 8.308 0 C 3.72 0 0 2.076 0 4.638 C 0 7.199 3.72 9.276 8.308 9.276 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.924,0.382,-0.891,0.454,108.923,1.834)",
      transformOrigin: "0 0",
      width: 21.221,
      height: 29.069,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 3.947,
    height: 17.891,
    viewBox: "0 0 3.947 17.891",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.942,0.336,0.354,0.935,9.725,11.011)",
      transformOrigin: "0 0",
      width: 3.947,
      height: 17.891,
      color: "rgb(90,56,24)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.631 0 L 1.316 0 C 0.589 0 0 0.641 0 1.431 L 0 16.46 C 0 17.251 0.589 17.891 1.316 17.891 L 2.631 17.891 C 3.358 17.891 3.947 17.251 3.947 16.46 L 3.947 1.431 C 3.947 0.641 3.358 0 2.631 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 17.561,
    height: 13.226,
    viewBox: "0 0 17.561 13.226",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0.942,0.336,0.354,0.935,0.000,-0.000)",
      transformOrigin: "0 0",
      width: 17.561,
      height: 13.226,
      color: "rgb(42,72,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.781 13.226 C 13.63 13.226 17.561 10.265 17.561 6.613 C 17.561 2.961 13.63 0 8.781 0 C 3.931 0 0 2.961 0 6.613 C 0 10.265 3.931 13.226 8.781 13.226 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 23.467,
    height: 16,
    viewBox: "0 0 23.467 16",
    fill: "none",
    style: {
      position: "absolute",
      left: 6.933,
      top: 62.933,
      width: 23.467,
      height: 16,
      opacity: 0.95,
      color: "rgb(106,80,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 11.733 16 C 18.213 16 23.467 12.418 23.467 8 C 23.467 3.582 18.213 0 11.733 0 C 5.253 0 0 3.582 0 8 C 0 12.418 5.253 16 11.733 16 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 14.933,
    height: 9.600,
    viewBox: "0 0 14.933 9.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 9.6,
      top: 62.933,
      width: 14.933,
      height: 9.6,
      opacity: 0.8,
      color: "rgb(122,96,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.467 9.6 C 11.59 9.6 14.933 7.451 14.933 4.8 C 14.933 2.149 11.59 0 7.467 0 C 3.343 0 0 2.149 0 4.8 C 0 7.451 3.343 9.6 7.467 9.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 19.200,
    height: 12.800,
    viewBox: "0 0 19.200 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 33.067,
      top: 70.933,
      width: 19.2,
      height: 12.8,
      opacity: 0.92,
      color: "rgb(90,64,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.6 12.8 C 14.902 12.8 19.2 9.935 19.2 6.4 C 19.2 2.865 14.902 0 9.6 0 C 4.298 0 0 2.865 0 6.4 C 0 9.935 4.298 12.8 9.6 12.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 26.667,
    height: 17.067,
    viewBox: "0 0 26.667 17.067",
    fill: "none",
    style: {
      position: "absolute",
      left: 56,
      top: 64.533,
      width: 26.667,
      height: 17.067,
      opacity: 0.9,
      color: "rgb(106,80,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 13.333 17.067 C 20.697 17.067 26.667 13.246 26.667 8.533 C 26.667 3.821 20.697 0 13.333 0 C 5.97 0 0 3.821 0 8.533 C 0 13.246 5.97 17.067 13.333 17.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 21.333,
    height: 13.867,
    viewBox: "0 0 21.333 13.867",
    fill: "none",
    style: {
      position: "absolute",
      left: 86.4,
      top: 69.333,
      width: 21.333,
      height: 13.867,
      opacity: 0.88,
      color: "rgb(90,64,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.667 13.867 C 16.558 13.867 21.333 10.763 21.333 6.933 C 21.333 3.104 16.558 0 10.667 0 C 4.776 0 0 3.104 0 6.933 C 0 10.763 4.776 13.867 10.667 13.867 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 23.467,
    height: 14.933,
    viewBox: "0 0 23.467 14.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 113.6,
      top: 64.533,
      width: 23.467,
      height: 14.933,
      opacity: 0.9,
      color: "rgb(106,80,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 11.733 14.933 C 18.213 14.933 23.467 11.59 23.467 7.467 C 23.467 3.343 18.213 0 11.733 0 C 5.253 0 0 3.343 0 7.467 C 0 11.59 5.253 14.933 11.733 14.933 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 17.067,
    height: 11.733,
    viewBox: "0 0 17.067 11.733",
    fill: "none",
    style: {
      position: "absolute",
      left: 144,
      top: 68.8,
      width: 17.067,
      height: 11.733,
      opacity: 0.85,
      color: "rgb(90,64,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.533 11.733 C 13.246 11.733 17.067 9.107 17.067 5.867 C 17.067 2.627 13.246 0 8.533 0 C 3.821 0 0 2.627 0 5.867 C 0 9.107 3.821 11.733 8.533 11.733 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.667,
    height: 7.467,
    viewBox: "0 0 10.667 7.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 24.533,
      top: 77.867,
      width: 10.667,
      height: 7.467,
      opacity: 0.8,
      color: "rgb(122,96,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.333 7.467 C 8.279 7.467 10.667 5.795 10.667 3.733 C 10.667 1.671 8.279 0 5.333 0 C 2.388 0 0 1.671 0 3.733 C 0 5.795 2.388 7.467 5.333 7.467 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8.533,
    height: 5.333,
    viewBox: "0 0 8.533 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 51.733,
      top: 81.067,
      width: 8.533,
      height: 5.333,
      opacity: 0.75,
      color: "rgb(106,80,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.267 5.333 C 6.623 5.333 8.533 4.139 8.533 2.667 C 8.533 1.194 6.623 0 4.267 0 C 1.91 0 0 1.194 0 2.667 C 0 4.139 1.91 5.333 4.267 5.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 11.733,
    height: 7.467,
    viewBox: "0 0 11.733 7.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 76.8,
      top: 78.933,
      width: 11.733,
      height: 7.467,
      opacity: 0.78,
      color: "rgb(122,96,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.867 7.467 C 9.107 7.467 11.733 5.795 11.733 3.733 C 11.733 1.671 9.107 0 5.867 0 C 2.627 0 0 1.671 0 3.733 C 0 5.795 2.627 7.467 5.867 7.467 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 9.600,
    height: 6.400,
    viewBox: "0 0 9.600 6.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 105.067,
      top: 78.4,
      width: 9.6,
      height: 6.4,
      opacity: 0.72,
      color: "rgb(106,80,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.8 6.4 C 7.451 6.4 9.6 4.967 9.6 3.2 C 9.6 1.433 7.451 0 4.8 0 C 2.149 0 0 1.433 0 3.2 C 0 4.967 2.149 6.4 4.8 6.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.667,
    height: 6.400,
    viewBox: "0 0 10.667 6.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 133.333,
      top: 79.467,
      width: 10.667,
      height: 6.4,
      opacity: 0.75,
      color: "rgb(122,96,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.333 6.4 C 8.279 6.4 10.667 4.967 10.667 3.2 C 10.667 1.433 8.279 0 5.333 0 C 2.388 0 0 1.433 0 3.2 C 0 4.967 2.388 6.4 5.333 6.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.467,
    height: 4.267,
    viewBox: "0 0 7.467 4.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 157.333,
      top: 77.333,
      width: 7.467,
      height: 4.267,
      opacity: 0.7,
      color: "rgb(106,80,40)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.733 4.267 C 5.795 4.267 7.467 3.312 7.467 2.133 C 7.467 0.955 5.795 0 3.733 0 C 1.671 0 0 0.955 0 2.133 C 0 3.312 1.671 4.267 3.733 4.267 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 170.667,
    height: 30.933,
    viewBox: "0 0 170.667 30.933",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 65.6,
      width: 170.667,
      height: 30.933,
      opacity: 0.5,
      color: "rgb(208,184,144)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 85.333 30.933 C 132.462 30.933 170.667 24.009 170.667 15.467 C 170.667 6.925 132.462 0 85.333 0 C 38.205 0 0 6.925 0 15.467 C 0 24.009 38.205 30.933 85.333 30.933 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 74.667,
    height: 12.800,
    viewBox: "0 0 74.667 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 82.667,
      width: 74.667,
      height: 12.8,
      opacity: 0.4,
      color: "rgb(200,168,128)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 37.333 12.8 C 57.952 12.8 74.667 9.935 74.667 6.4 C 74.667 2.865 57.952 0 37.333 0 C 16.715 0 0 2.865 0 6.4 C 0 9.935 16.715 12.8 37.333 12.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 69.333,
    height: 12.800,
    viewBox: "0 0 69.333 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 104,
      top: 81.6,
      width: 69.333,
      height: 12.8,
      opacity: 0.38,
      color: "rgb(200,168,128)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 34.667 12.8 C 53.813 12.8 69.333 9.935 69.333 6.4 C 69.333 2.865 53.813 0 34.667 0 C 15.521 0 0 2.865 0 6.4 C 0 9.935 15.521 12.8 34.667 12.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 7.467,
      top: 66.667,
      width: 144,
      height: 16,
      opacity: 0.35,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 8.533,
    height: 9.600,
    viewBox: "0 0 8.533 9.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 8.533,
      height: 9.6,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.832 0.266 C 8.979 0.101 8.964 -0.152 8.799 -0.299 C 8.634 -0.446 8.381 -0.431 8.234 -0.266 L 8.533 0 L 8.832 0.266 Z M -0.299 9.334 C -0.446 9.499 -0.431 9.752 -0.266 9.899 C -0.101 10.046 0.152 10.031 0.299 9.866 L 0 9.6 L -0.299 9.334 Z M 8.533 0 L 8.234 -0.266 L -0.299 9.334 L 0 9.6 L 0.299 9.866 L 8.832 0.266 L 8.533 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8.533,
    height: 9.600,
    viewBox: "0 0 8.533 9.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 25.6,
      top: 6.4,
      width: 8.533,
      height: 9.6,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.832 0.266 C 8.979 0.101 8.964 -0.152 8.799 -0.299 C 8.634 -0.446 8.381 -0.431 8.234 -0.266 L 8.533 0 L 8.832 0.266 Z M -0.299 9.334 C -0.446 9.499 -0.431 9.752 -0.266 9.899 C -0.101 10.046 0.152 10.031 0.299 9.866 L 0 9.6 L -0.299 9.334 Z M 8.533 0 L 8.234 -0.266 L -0.299 9.334 L 0 9.6 L 0.299 9.866 L 8.832 0.266 L 8.533 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 9.600,
    height: 10.667,
    viewBox: "0 0 9.600 10.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 51.2,
      top: 2.133,
      width: 9.6,
      height: 10.667,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.897 0.268 C 10.045 0.103 10.032 -0.15 9.868 -0.297 C 9.703 -0.445 9.45 -0.432 9.303 -0.268 L 9.6 0 L 9.897 0.268 Z M -0.297 10.399 C -0.445 10.563 -0.432 10.816 -0.268 10.964 C -0.103 11.112 0.15 11.098 0.297 10.934 L 0 10.667 L -0.297 10.399 Z M 9.6 0 L 9.303 -0.268 L -0.297 10.399 L 0 10.667 L 0.297 10.934 L 9.897 0.268 L 9.6 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 9.600,
    height: 9.600,
    viewBox: "0 0 9.600 9.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 78.933,
      top: 5.333,
      width: 9.6,
      height: 9.6,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.883 0.283 C 10.039 0.127 10.039 -0.127 9.883 -0.283 C 9.727 -0.439 9.473 -0.439 9.317 -0.283 L 9.6 0 L 9.883 0.283 Z M -0.283 9.317 C -0.439 9.473 -0.439 9.727 -0.283 9.883 C -0.127 10.039 0.127 10.039 0.283 9.883 L 0 9.6 L -0.283 9.317 Z M 9.6 0 L 9.317 -0.283 L -0.283 9.317 L 0 9.6 L 0.283 9.883 L 9.883 0.283 L 9.6 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 9.067,
    height: 9.600,
    viewBox: "0 0 9.067 9.600",
    fill: "none",
    style: {
      position: "absolute",
      left: 107.733,
      top: 1.067,
      width: 9.067,
      height: 9.6,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.357 0.275 C 9.509 0.114 9.502 -0.139 9.341 -0.291 C 9.181 -0.442 8.928 -0.435 8.776 -0.275 L 9.067 0 L 9.357 0.275 Z M -0.291 9.325 C -0.442 9.486 -0.435 9.739 -0.275 9.891 C -0.114 10.042 0.139 10.035 0.291 9.875 L 0 9.6 L -0.291 9.325 Z M 9.067 0 L 8.776 -0.275 L -0.291 9.325 L 0 9.6 L 0.291 9.875 L 9.357 0.275 L 9.067 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8.533,
    height: 8.533,
    viewBox: "0 0 8.533 8.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 135.467,
      top: 4.267,
      width: 8.533,
      height: 8.533,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.816 0.283 C 8.972 0.127 8.972 -0.127 8.816 -0.283 C 8.66 -0.439 8.407 -0.439 8.25 -0.283 L 8.533 0 L 8.816 0.283 Z M -0.283 8.25 C -0.439 8.407 -0.439 8.66 -0.283 8.816 C -0.127 8.972 0.127 8.972 0.283 8.816 L 0 8.533 L -0.283 8.25 Z M 8.533 0 L 8.25 -0.283 L -0.283 8.25 L 0 8.533 L 0.283 8.816 L 8.816 0.283 L 8.533 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))))))));
  const __body7 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 160,
      height: 98,
      overflow: "hidden",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 160,
      height: 98.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 160,
      height: 98.667,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 160,
      height: 98.66666412353516,
      clipPath: "inset(0.000px 0.000px 0px -0.000px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -192,
      top: -122.667,
      width: 384,
      height: 437.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 98.667,
    viewBox: "0 0 160 98.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 192,
      top: 122.667,
      width: 160,
      height: 98.667
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 160 0 L 0 0 L 0 98.667 L 160 98.667 L 160 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 55.467,
    height: 55.467,
    viewBox: "0 0 55.467 55.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 244.266,
      top: 120.534,
      width: 55.467,
      height: 55.467,
      opacity: 0.25,
      color: "rgb(248,192,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 27.733 55.467 C 43.05 55.467 55.467 43.05 55.467 27.733 C 55.467 12.417 43.05 0 27.733 0 C 12.417 0 0 12.417 0 27.733 C 0 43.05 12.417 55.467 27.733 55.467 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 42.667,
    height: 42.667,
    viewBox: "0 0 42.667 42.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 250.666,
      top: 126.934,
      width: 42.667,
      height: 42.667,
      opacity: 0.45,
      color: "rgb(244,176,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.333 42.667 C 33.115 42.667 42.667 33.115 42.667 21.333 C 42.667 9.551 33.115 0 21.333 0 C 9.551 0 0 9.551 0 21.333 C 0 33.115 9.551 42.667 21.333 42.667 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 32,
    height: 32,
    viewBox: "0 0 32 32",
    fill: "none",
    style: {
      position: "absolute",
      left: 256,
      top: 132.267,
      width: 32,
      height: 32,
      opacity: 0.7,
      color: "rgb(240,160,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16 32 C 24.837 32 32 24.837 32 16 C 32 7.163 24.837 0 16 0 C 7.163 0 0 7.163 0 16 C 0 24.837 7.163 32 16 32 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 21.333,
    height: 21.333,
    viewBox: "0 0 21.333 21.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 261.333,
      top: 137.6,
      width: 21.333,
      height: 21.333,
      opacity: 0.9,
      color: "rgb(248,192,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.667 21.333 C 16.558 21.333 21.333 16.558 21.333 10.667 C 21.333 4.776 16.558 0 10.667 0 C 4.776 0 0 4.776 0 10.667 C 0 16.558 4.776 21.333 10.667 21.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 12.800,
    height: 12.800,
    viewBox: "0 0 12.800 12.800",
    fill: "none",
    style: {
      position: "absolute",
      left: 265.6,
      top: 141.867,
      width: 12.8,
      height: 12.8,
      opacity: 0.95,
      color: "rgb(255,248,160)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.4 12.8 C 9.935 12.8 12.8 9.935 12.8 6.4 C 12.8 2.865 9.935 0 6.4 0 C 2.865 0 0 2.865 0 6.4 C 0 9.935 2.865 12.8 6.4 12.8 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 238.933,
      top: 119.467,
      width: 66.133,
      height: 61.866,
      opacity: 0.55,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 1.600,
    height: 6.400,
    viewBox: "-0.800 0 1.600 6.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 33.067,
      top: 0,
      width: 1.6000001430511475,
      height: 6.4,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.8 6.4 C -0.8 6.842 -0.442 7.2 0 7.2 C 0.442 7.2 0.8 6.842 0.8 6.4 L 0 6.4 L -0.8 6.4 Z M 0.8 0 C 0.8 -0.442 0.442 -0.8 0 -0.8 C -0.442 -0.8 -0.8 -0.442 -0.8 0 L 0 0 L 0.8 0 Z M 0 6.4 L 0.8 6.4 L 0.8 0 L 0 0 L -0.8 0 L -0.8 6.4 L 0 6.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 5.333,
    viewBox: "0 0 4.267 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 48,
      top: 5.333,
      width: 4.267,
      height: 5.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.521 4.917 C -0.751 5.204 -0.704 5.624 -0.416 5.854 C -0.129 6.084 0.291 6.037 0.521 5.75 L 0 5.333 L -0.521 4.917 Z M 4.787 0.416 C 5.017 0.129 4.971 -0.291 4.683 -0.521 C 4.396 -0.751 3.976 -0.704 3.746 -0.416 L 4.267 0 L 4.787 0.416 Z M 0 5.333 L 0.521 5.75 L 4.787 0.416 L 4.267 0 L 3.746 -0.416 L -0.521 4.917 L 0 5.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 3.200,
    viewBox: "0 0 5.333 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 57.6,
      top: 18.133,
      width: 5.333,
      height: 3.2,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.343 2.628 C -0.659 2.818 -0.761 3.227 -0.572 3.543 C -0.382 3.859 0.027 3.961 0.343 3.772 L 0 3.2 L -0.343 2.628 Z M 5.676 0.572 C 5.992 0.382 6.094 -0.027 5.905 -0.343 C 5.716 -0.659 5.306 -0.761 4.99 -0.572 L 5.333 0 L 5.676 0.572 Z M 0 3.2 L 0.343 3.772 L 5.676 0.572 L 5.333 0 L 4.99 -0.572 L -0.343 2.628 L 0 3.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.400,
    height: 1.333,
    viewBox: "0 -0.667 6.400 1.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 59.734,
      top: 36.267,
      width: 6.4,
      height: 1.3333333730697632,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -0.667 C -0.368 -0.667 -0.667 -0.368 -0.667 0 C -0.667 0.368 -0.368 0.667 0 0.667 L 0 0 L 0 -0.667 Z M 6.4 0.667 C 6.768 0.667 7.067 0.368 7.067 0 C 7.067 -0.368 6.768 -0.667 6.4 -0.667 L 6.4 0 L 6.4 0.667 Z M 0 0 L 0 0.667 L 6.4 0.667 L 6.4 0 L 6.4 -0.667 L 0 -0.667 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 4.267,
    viewBox: "0 0 5.333 4.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 53.334,
      top: 49.067,
      width: 5.333,
      height: 4.267,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.333 -0.416 C 0.103 -0.6 -0.232 -0.563 -0.416 -0.333 C -0.6 -0.103 -0.563 0.232 -0.333 0.416 L 0 0 L 0.333 -0.416 Z M 5 4.683 C 5.23 4.867 5.566 4.83 5.75 4.6 C 5.934 4.37 5.897 4.034 5.667 3.85 L 5.333 4.267 L 5 4.683 Z M 0 0 L -0.333 0.416 L 5 4.683 L 5.333 4.267 L 5.667 3.85 L 0.333 -0.416 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.600,
    height: 6.400,
    viewBox: "-0.800 0 1.600 6.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 33.067,
      top: 55.467,
      width: 1.6000001430511475,
      height: 6.4,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.8 0 C 0.8 -0.442 0.442 -0.8 0 -0.8 C -0.442 -0.8 -0.8 -0.442 -0.8 0 L 0 0 L 0.8 0 Z M -0.8 6.4 C -0.8 6.842 -0.442 7.2 0 7.2 C 0.442 7.2 0.8 6.842 0.8 6.4 L 0 6.4 L -0.8 6.4 Z M 0 0 L -0.8 0 L -0.8 6.4 L 0 6.4 L 0.8 6.4 L 0.8 0 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 4.267,
    viewBox: "0 0 5.333 4.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 7.467,
      top: 49.067,
      width: 5.333,
      height: 4.267,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.667 0.416 C 5.897 0.232 5.934 -0.103 5.75 -0.333 C 5.566 -0.563 5.23 -0.6 5 -0.416 L 5.333 0 L 5.667 0.416 Z M -0.333 3.85 C -0.563 4.034 -0.6 4.37 -0.416 4.6 C -0.232 4.83 0.103 4.867 0.333 4.683 L 0 4.267 L -0.333 3.85 Z M 5.333 0 L 5 -0.416 L -0.333 3.85 L 0 4.267 L 0.333 4.683 L 5.667 0.416 L 5.333 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 6.400,
    height: 1.333,
    viewBox: "0 -0.667 6.400 1.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 36.267,
      width: 6.4,
      height: 1.3333333730697632,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.4 0.667 C 6.768 0.667 7.067 0.368 7.067 0 C 7.067 -0.368 6.768 -0.667 6.4 -0.667 L 6.4 0 L 6.4 0.667 Z M 0 -0.667 C -0.368 -0.667 -0.667 -0.368 -0.667 0 C -0.667 0.368 -0.368 0.667 0 0.667 L 0 0 L 0 -0.667 Z M 6.4 0 L 6.4 -0.667 L 0 -0.667 L 0 0 L 0 0.667 L 6.4 0.667 L 6.4 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 3.200,
    viewBox: "0 0 5.333 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 3.2,
      top: 18.133,
      width: 5.333,
      height: 3.2,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.99 3.772 C 5.306 3.961 5.716 3.859 5.905 3.543 C 6.094 3.227 5.992 2.818 5.676 2.628 L 5.333 3.2 L 4.99 3.772 Z M 0.343 -0.572 C 0.027 -0.761 -0.382 -0.659 -0.572 -0.343 C -0.761 -0.027 -0.659 0.382 -0.343 0.572 L 0 0 L 0.343 -0.572 Z M 5.333 3.2 L 5.676 2.628 L 0.343 -0.572 L 0 0 L -0.343 0.572 L 4.99 3.772 L 5.333 3.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 5.333,
    viewBox: "0 0 4.267 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 13.867,
      top: 5.333,
      width: 4.267,
      height: 5.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.746 5.75 C 3.976 6.037 4.396 6.084 4.683 5.854 C 4.971 5.624 5.017 5.204 4.787 4.917 L 4.267 5.333 L 3.746 5.75 Z M 0.521 -0.416 C 0.291 -0.704 -0.129 -0.751 -0.416 -0.521 C -0.704 -0.291 -0.751 0.129 -0.521 0.416 L 0 0 L 0.521 -0.416 Z M 4.267 5.333 L 4.787 4.917 L 0.521 -0.416 L 0 0 L -0.521 0.416 L 3.746 5.75 L 4.267 5.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 157.867,
    height: 3.733,
    viewBox: "0 0 157.867 3.733",
    fill: "none",
    style: {
      position: "absolute",
      left: 193.066,
      top: 180.534,
      width: 157.867,
      height: 3.733,
      opacity: 0.3,
      color: "rgb(240,192,80)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.072 1.473 C -0.29 1.513 -0.433 1.722 -0.393 1.939 C -0.353 2.156 -0.145 2.3 0.072 2.26 L 0 1.867 L -0.072 1.473 Z M 126.933 1.867 L 126.864 2.261 L 126.868 2.261 L 126.933 1.867 Z M 157.937 2.26 C 158.154 2.222 158.299 2.014 158.26 1.796 C 158.222 1.579 158.014 1.434 157.796 1.473 L 157.867 1.867 L 157.937 2.26 Z M 0 1.867 L 0.072 2.26 C 13.535 -0.22 27.353 -0.22 41.531 2.261 L 41.6 1.867 L 41.669 1.473 C 27.402 -1.024 13.488 -1.025 -0.072 1.473 L 0 1.867 Z M 41.6 1.867 L 41.531 2.261 C 55.799 4.758 70.068 4.758 84.336 2.261 L 84.267 1.867 L 84.198 1.473 C 70.021 3.954 55.846 3.954 41.669 1.473 L 41.6 1.867 Z M 84.267 1.867 L 84.336 2.261 C 98.512 -0.22 112.688 -0.22 126.864 2.261 L 126.933 1.867 L 127.002 1.473 C 112.734 -1.024 98.466 -1.024 84.198 1.473 L 84.267 1.867 Z M 126.933 1.867 L 126.868 2.261 C 137.576 4.046 147.933 4.047 157.937 2.26 L 157.867 1.867 L 157.796 1.473 C 147.889 3.242 137.624 3.243 126.999 1.472 L 126.933 1.867 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 157.867,
    height: 3.733,
    viewBox: "0 0 157.867 3.733",
    fill: "none",
    style: {
      position: "absolute",
      left: 193.066,
      top: 185.867,
      width: 157.867,
      height: 3.733,
      opacity: 0.22,
      color: "rgb(232,184,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.055 1.551 C -0.229 1.582 -0.346 1.748 -0.315 1.922 C -0.285 2.096 -0.119 2.212 0.055 2.182 L 0 1.867 L -0.055 1.551 Z M 133.333 1.867 L 133.281 2.182 L 133.285 2.183 L 133.333 1.867 Z M 157.929 2.18 C 158.103 2.146 158.215 1.977 158.18 1.804 C 158.146 1.631 157.977 1.518 157.804 1.553 L 157.867 1.867 L 157.929 2.18 Z M 0 1.867 L 0.055 2.182 C 14.24 -0.3 28.781 -0.301 43.681 2.182 L 43.733 1.867 L 43.786 1.551 C 28.819 -0.944 14.204 -0.944 -0.055 1.551 L 0 1.867 Z M 43.733 1.867 L 43.681 2.182 C 58.649 4.677 73.618 4.677 88.586 2.182 L 88.533 1.867 L 88.481 1.551 C 73.582 4.034 58.684 4.034 43.786 1.551 L 43.733 1.867 Z M 88.533 1.867 L 88.586 2.182 C 103.484 -0.301 118.382 -0.301 133.281 2.182 L 133.333 1.867 L 133.386 1.551 C 118.418 -0.944 103.449 -0.944 88.481 1.551 L 88.533 1.867 Z M 133.333 1.867 L 133.285 2.183 C 142.556 3.609 150.773 3.612 157.929 2.18 L 157.867 1.867 L 157.804 1.553 C 150.738 2.966 142.6 2.968 133.382 1.55 L 133.333 1.867 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 157.867,
    height: 3.200,
    viewBox: "0 0 157.867 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 193.066,
      top: 190.4,
      width: 157.867,
      height: 3.2,
      opacity: 0.18,
      color: "rgb(224,176,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.038 1.336 C -0.184 1.357 -0.285 1.492 -0.264 1.638 C -0.243 1.784 -0.108 1.885 0.038 1.864 L 0 1.6 L -0.038 1.336 Z M 44.8 1.6 L 44.762 1.864 L 44.764 1.864 L 44.8 1.6 Z M 134.4 1.6 L 134.441 1.336 L 134.44 1.336 L 134.4 1.6 Z M 157.925 1.86 C 158.068 1.828 158.159 1.686 158.127 1.542 C 158.095 1.398 157.953 1.308 157.809 1.34 L 157.867 1.6 L 157.925 1.86 Z M 0 1.6 L 0.038 1.864 C 14.946 -0.266 29.854 -0.266 44.762 1.864 L 44.8 1.6 L 44.838 1.336 C 29.879 -0.801 14.921 -0.801 -0.038 1.336 L 0 1.6 Z M 44.8 1.6 L 44.764 1.864 C 60.432 4.001 75.745 4.001 90.704 1.864 L 90.667 1.6 L 90.629 1.336 C 75.721 3.466 60.457 3.466 44.836 1.336 L 44.8 1.6 Z M 90.667 1.6 L 90.704 1.864 C 105.613 -0.266 120.165 -0.266 134.36 1.864 L 134.4 1.6 L 134.44 1.336 C 120.191 -0.801 105.587 -0.801 90.629 1.336 L 90.667 1.6 Z M 134.4 1.6 L 134.359 1.864 C 143.624 3.289 151.482 3.292 157.925 1.86 L 157.867 1.6 L 157.809 1.34 C 151.452 2.752 143.665 2.756 134.441 1.336 L 134.4 1.6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 37.333,
    viewBox: "0 0 5.333 37.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 201.6,
      top: 176,
      width: 5.333,
      height: 37.333,
      color: "rgb(106,62,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.2 0 L 2.133 0 C 0.955 0 0 0.955 0 2.133 L 0 35.2 C 0 36.378 0.955 37.333 2.133 37.333 L 3.2 37.333 C 4.378 37.333 5.333 36.378 5.333 35.2 L 5.333 2.133 C 5.333 0.955 4.378 0 3.2 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.600,
    height: 5.333,
    viewBox: "0 0 1.600 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 202.666,
      top: 180.267,
      width: 1.6,
      height: 5.333,
      opacity: 0.6,
      color: "rgb(74,40,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.148 -0.222 C 0.025 -0.304 -0.14 -0.27 -0.222 -0.148 C -0.304 -0.025 -0.27 0.14 -0.148 0.222 L 0 0 L 0.148 -0.222 Z M -0.189 5.145 C -0.293 5.249 -0.293 5.418 -0.189 5.522 C -0.084 5.626 0.084 5.626 0.189 5.522 L 0 5.333 L -0.189 5.145 Z M 0 0 L -0.148 0.222 C 0.88 0.907 1.333 1.636 1.333 2.4 C 1.333 3.182 0.861 4.095 -0.189 5.145 L 0 5.333 L 0.189 5.522 C 1.273 4.438 1.867 3.395 1.867 2.4 C 1.867 1.387 1.253 0.515 0.148 -0.222 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.600,
    height: 5.867,
    viewBox: "0 0 1.600 5.867",
    fill: "none",
    style: {
      position: "absolute",
      left: 203.733,
      top: 189.334,
      width: 1.6,
      height: 5.867,
      opacity: 0.5,
      color: "rgb(74,40,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.171 -0.205 C 0.058 -0.299 -0.111 -0.284 -0.205 -0.171 C -0.299 -0.058 -0.284 0.111 -0.171 0.205 L 0 0 L 0.171 -0.205 Z M -0.189 5.678 C -0.293 5.782 -0.293 5.951 -0.189 6.055 C -0.084 6.159 0.084 6.159 0.189 6.055 L 0 5.867 L -0.189 5.678 Z M 0 0 L -0.171 0.205 C 0.862 1.065 1.333 1.93 1.333 2.8 C 1.333 3.677 0.855 4.635 -0.189 5.678 L 0 5.867 L 0.189 6.055 C 1.279 4.965 1.867 3.879 1.867 2.8 C 1.867 1.714 1.272 0.713 0.171 -0.205 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 9.067,
    height: 8.533,
    viewBox: "0 0 9.067 8.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 195.2,
      top: 170.667,
      width: 9.067,
      height: 8.533,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.153 9.504 C 8.689 10.009 9.533 9.983 10.038 9.447 C 10.542 8.911 10.517 8.067 9.98 7.562 L 9.067 8.533 L 8.153 9.504 Z M 0.914 -0.971 C 0.378 -1.476 -0.466 -1.45 -0.971 -0.914 C -1.476 -0.378 -1.45 0.466 -0.914 0.971 L 0 0 L 0.914 -0.971 Z M 9.067 8.533 L 9.98 7.562 L 0.914 -0.971 L 0 0 L -0.914 0.971 L 8.153 9.504 L 9.067 8.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 9.067,
    height: 8.533,
    viewBox: "0 0 9.067 8.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 204.266,
      top: 174.934,
      width: 9.067,
      height: 8.533,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.822 7.659 C -1.305 8.114 -1.328 8.873 -0.874 9.356 C -0.42 9.838 0.34 9.861 0.822 9.407 L 0 8.533 L -0.822 7.659 Z M 9.889 0.874 C 10.372 0.42 10.395 -0.34 9.941 -0.822 C 9.486 -1.305 8.727 -1.328 8.244 -0.874 L 9.067 0 L 9.889 0.874 Z M 0 8.533 L 0.822 9.407 L 9.889 0.874 L 9.067 0 L 8.244 -0.874 L -0.822 7.659 L 0 8.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.133,
    height: 6.400,
    viewBox: "0 0 10.133 6.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 194.133,
      top: 182.4,
      width: 10.133,
      height: 6.4,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.564 7.302 C 10.062 7.616 10.721 7.468 11.035 6.97 C 11.35 6.472 11.201 5.813 10.703 5.498 L 10.133 6.4 L 9.564 7.302 Z M 0.57 -0.902 C 0.072 -1.216 -0.587 -1.068 -0.902 -0.57 C -1.216 -0.072 -1.068 0.587 -0.57 0.902 L 0 0 L 0.57 -0.902 Z M 10.133 6.4 L 10.703 5.498 L 0.57 -0.902 L 0 0 L -0.57 0.902 L 9.564 7.302 L 10.133 6.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.133,
    height: 7.467,
    viewBox: "0 0 10.133 7.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 204.266,
      top: 185.6,
      width: 10.133,
      height: 7.467,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.554 6.715 C -0.969 7.021 -1.057 7.605 -0.751 8.02 C -0.446 8.435 0.139 8.524 0.554 8.218 L 0 7.467 L -0.554 6.715 Z M 10.687 0.751 C 11.102 0.446 11.19 -0.139 10.885 -0.554 C 10.579 -0.969 9.995 -1.057 9.58 -0.751 L 10.133 0 L 10.687 0.751 Z M 0 7.467 L 0.554 8.218 L 10.687 0.751 L 10.133 0 L 9.58 -0.751 L -0.554 6.715 L 0 7.467 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 5.333,
    viewBox: "0 0 4.267 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 190.933,
      top: 165.334,
      width: 4.267,
      height: 5.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.642 5.833 C 3.918 6.178 4.421 6.234 4.766 5.958 C 5.111 5.682 5.167 5.179 4.891 4.834 L 4.267 5.333 L 3.642 5.833 Z M 0.625 -0.5 C 0.349 -0.845 -0.155 -0.901 -0.5 -0.625 C -0.845 -0.349 -0.901 0.155 -0.625 0.5 L 0 0 L 0.625 -0.5 Z M 4.267 5.333 L 4.891 4.834 L 0.625 -0.5 L 0 0 L -0.625 0.5 L 3.642 5.833 L 4.267 5.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 6.400,
    viewBox: "0 0 3.200 6.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 195.2,
      top: 164.267,
      width: 3.2,
      height: 6.4,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.596 6.102 C -0.761 6.431 -0.627 6.832 -0.298 6.996 C 0.031 7.161 0.432 7.027 0.596 6.698 L 0 6.4 L -0.596 6.102 Z M 3.796 0.298 C 3.961 -0.031 3.827 -0.432 3.498 -0.596 C 3.169 -0.761 2.768 -0.627 2.604 -0.298 L 3.2 0 L 3.796 0.298 Z M 0 6.4 L 0.596 6.698 L 3.796 0.298 L 3.2 0 L 2.604 -0.298 L -0.596 6.102 L 0 6.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 6.400,
    viewBox: "0 0 4.267 6.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 213.333,
      top: 168.534,
      width: 4.267,
      height: 6.4,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.555 6.03 C -0.759 6.337 -0.676 6.75 -0.37 6.955 C -0.063 7.159 0.35 7.076 0.555 6.77 L 0 6.4 L -0.555 6.03 Z M 4.821 0.37 C 5.026 0.063 4.943 -0.35 4.636 -0.555 C 4.33 -0.759 3.916 -0.676 3.712 -0.37 L 4.267 0 L 4.821 0.37 Z M 0 6.4 L 0.555 6.77 L 4.821 0.37 L 4.267 0 L 3.712 -0.37 L -0.555 6.03 L 0 6.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.333,
    height: 3.200,
    viewBox: "0 0 5.333 3.200",
    fill: "none",
    style: {
      position: "absolute",
      left: 213.333,
      top: 171.734,
      width: 5.333,
      height: 3.2,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.274 2.743 C -0.527 2.894 -0.609 3.222 -0.457 3.474 C -0.306 3.727 0.022 3.809 0.274 3.657 L 0 3.2 L -0.274 2.743 Z M 5.608 0.457 C 5.86 0.306 5.942 -0.022 5.791 -0.274 C 5.639 -0.527 5.312 -0.609 5.059 -0.457 L 5.333 0 L 5.608 0.457 Z M 0 3.2 L 0.274 3.657 L 5.608 0.457 L 5.333 0 L 5.059 -0.457 L -0.274 2.743 L 0 3.2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.800,
    height: 34.667,
    viewBox: "0 0 4.800 34.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 334.933,
      top: 178.667,
      width: 4.8,
      height: 34.667,
      color: "rgb(90,52,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.667 0 L 2.133 0 C 0.955 0 0 0.955 0 2.133 L 0 32.533 C 0 33.712 0.955 34.667 2.133 34.667 L 2.667 34.667 C 3.845 34.667 4.8 33.712 4.8 32.533 L 4.8 2.133 C 4.8 0.955 3.845 0 2.667 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 9.600,
    height: 8.533,
    viewBox: "0 0 9.600 8.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 327.466,
      top: 173.867,
      width: 9.6,
      height: 8.533,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.803 9.43 C 9.298 9.871 10.057 9.826 10.497 9.331 C 10.937 8.835 10.893 8.077 10.397 7.636 L 9.6 8.533 L 8.803 9.43 Z M 0.797 -0.897 C 0.302 -1.337 -0.457 -1.293 -0.897 -0.797 C -1.337 -0.302 -1.293 0.457 -0.797 0.897 L 0 0 L 0.797 -0.897 Z M 9.6 8.533 L 10.397 7.636 L 0.797 -0.897 L 0 0 L -0.797 0.897 L 8.803 9.43 L 9.6 8.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 9.600,
    height: 8.533,
    viewBox: "0 0 9.600 8.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 337.066,
      top: 178.134,
      width: 9.6,
      height: 8.533,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.709 7.736 C -1.149 8.127 -1.189 8.802 -0.797 9.242 C -0.406 9.682 0.268 9.722 0.709 9.331 L 0 8.533 L -0.709 7.736 Z M 10.309 0.797 C 10.749 0.406 10.789 -0.268 10.397 -0.709 C 10.006 -1.149 9.332 -1.189 8.891 -0.797 L 9.6 0 L 10.309 0.797 Z M 0 8.533 L 0.709 9.331 L 10.309 0.797 L 9.6 0 L 8.891 -0.797 L -0.709 7.736 L 0 8.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 10.667,
    height: 6.400,
    viewBox: "0 0 10.667 6.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 326.4,
      top: 185.6,
      width: 10.667,
      height: 6.4,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.186 7.2 C 10.628 7.466 11.202 7.322 11.467 6.88 C 11.732 6.438 11.589 5.865 11.147 5.6 L 10.667 6.4 L 10.186 7.2 Z M 0.48 -0.8 C 0.038 -1.066 -0.535 -0.922 -0.8 -0.48 C -1.066 -0.038 -0.922 0.535 -0.48 0.8 L 0 0 L 0.48 -0.8 Z M 10.667 6.4 L 11.147 5.6 L 0.48 -0.8 L 0 0 L -0.48 0.8 L 10.186 7.2 L 10.667 6.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 5.333,
    viewBox: "0 0 4.267 5.333",
    fill: "none",
    style: {
      position: "absolute",
      left: 323.2,
      top: 168.534,
      width: 4.267,
      height: 5.333,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.684 5.8 C 3.941 6.122 4.411 6.174 4.733 5.916 C 5.055 5.659 5.107 5.189 4.85 4.867 L 4.267 5.333 L 3.684 5.8 Z M 0.583 -0.466 C 0.325 -0.788 -0.144 -0.841 -0.466 -0.583 C -0.788 -0.325 -0.841 0.144 -0.583 0.466 L 0 0 L 0.583 -0.466 Z M 4.267 5.333 L 4.85 4.867 L 0.583 -0.466 L 0 0 L -0.583 0.466 L 3.684 5.8 L 4.267 5.333 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 3.200,
    height: 6.400,
    viewBox: "0 0 3.200 6.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 327.466,
      top: 167.467,
      width: 3.2,
      height: 6.4,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.525 6.138 C -0.67 6.427 -0.552 6.78 -0.262 6.925 C 0.027 7.07 0.38 6.952 0.525 6.662 L 0 6.4 L -0.525 6.138 Z M 3.725 0.262 C 3.87 -0.027 3.752 -0.38 3.462 -0.525 C 3.173 -0.67 2.82 -0.552 2.675 -0.262 L 3.2 0 L 3.725 0.262 Z M 0 6.4 L 0.525 6.662 L 3.725 0.262 L 3.2 0 L 2.675 -0.262 L -0.525 6.138 L 0 6.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 4.267,
    height: 6.400,
    viewBox: "0 0 4.267 6.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 346.666,
      top: 171.734,
      width: 4.267,
      height: 6.4,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.555 6.03 C -0.759 6.337 -0.676 6.75 -0.37 6.955 C -0.063 7.159 0.35 7.076 0.555 6.77 L 0 6.4 L -0.555 6.03 Z M 4.821 0.37 C 5.026 0.063 4.943 -0.35 4.636 -0.555 C 4.33 -0.759 3.916 -0.676 3.712 -0.37 L 4.267 0 L 4.821 0.37 Z M 0 6.4 L 0.555 6.77 L 4.821 0.37 L 4.267 0 L 3.712 -0.37 L -0.555 6.03 L 0 6.4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 25.067,
    viewBox: "0 0 160 25.067",
    fill: "none",
    style: {
      position: "absolute",
      left: 192,
      top: 196.267,
      width: 160,
      height: 25.067,
      opacity: 0.9,
      color: "rgb(184,122,32)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 160 0 L 0 0 L 0 25.067 L 160 25.067 L 160 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 18.667,
    viewBox: "0 0 160 18.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 192,
      top: 202.667,
      width: 160,
      height: 18.667,
      opacity: 0.8,
      color: "rgb(168,104,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 160 0 L 0 0 L 0 18.667 L 160 18.667 L 160 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 160,
    height: 12.267,
    viewBox: "0 0 160 12.267",
    fill: "none",
    style: {
      position: "absolute",
      left: 192,
      top: 209.067,
      width: 160,
      height: 12.267,
      opacity: 0.7,
      color: "rgb(152,96,16)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 160 0 L 0 0 L 0 12.267 L 160 12.267 L 160 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 384,
      height: 437.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 384,
      height: 437.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 384,
      height: 437.3333435058594,
      clipPath: "inset(0px 0.000px 0px -0.000px)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 1.067,
    height: 25.067,
    viewBox: "0 0 1.067 25.067",
    fill: "none",
    style: {
      position: "absolute",
      left: 270.933,
      top: 196.267,
      width: 1.067,
      height: 25.067,
      opacity: 0.9,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.686 0.248 C 1.822 -0.094 1.656 -0.482 1.314 -0.619 C 0.972 -0.756 0.584 -0.589 0.448 -0.248 L 1.067 0 L 1.686 0.248 Z M 1.067 11.733 L 1.713 11.895 L 1.761 11.707 L 1.699 11.523 L 1.067 11.733 Z M 0.417 25.217 C 0.5 25.575 0.858 25.799 1.217 25.716 C 1.575 25.633 1.799 25.276 1.716 24.917 L 1.067 25.067 L 0.417 25.217 Z M 1.067 0 L 0.448 -0.248 C -1.043 3.479 -1.029 7.555 0.434 11.944 L 1.067 11.733 L 1.699 11.523 C 0.318 7.378 0.332 3.632 1.686 0.248 L 1.067 0 Z M 1.067 11.733 L 0.42 11.572 C -0.674 15.948 -0.671 20.5 0.417 25.217 L 1.067 25.067 L 1.716 24.917 C 0.671 20.389 0.674 16.052 1.713 11.895 L 1.067 11.733 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))), /*#__PURE__*/React.createElement("svg", {
    width: 42.667,
    height: 2.370,
    viewBox: "0 0 42.667 2.370",
    fill: "none",
    style: {
      position: "absolute",
      left: 229.333,
      top: 198.519,
      width: 42.667,
      height: 2.37,
      opacity: 0.85,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 42.72 2.546 C 43.013 2.516 43.227 2.255 43.197 1.962 C 43.168 1.669 42.907 1.455 42.614 1.484 L 42.667 2.015 L 42.72 2.546 Z M 21.333 0.948 L 21.438 0.425 L 21.429 0.423 L 21.333 0.948 Z M -0.143 0.968 C -0.427 1.046 -0.593 1.34 -0.514 1.624 C -0.435 1.908 -0.141 2.074 0.143 1.995 L 0 1.481 L -0.143 0.968 Z M 42.667 2.015 L 42.614 1.484 C 35.556 2.19 28.498 1.837 21.438 0.425 L 21.333 0.948 L 21.229 1.471 C 28.391 2.904 35.555 3.262 42.72 2.546 L 42.667 2.015 Z M 21.333 0.948 L 21.429 0.423 C 13.543 -1.01 6.349 -0.836 -0.143 0.968 L 0 1.481 L 0.143 1.995 C 6.451 0.243 13.479 0.062 21.238 1.473 L 21.333 0.948 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 43.733,
    height: 2.489,
    viewBox: "0 0 43.733 2.489",
    fill: "none",
    style: {
      position: "absolute",
      left: 272,
      top: 202.667,
      width: 43.733,
      height: 2.489,
      opacity: 0.82,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.048 1.602 C -0.245 1.576 -0.504 1.792 -0.531 2.085 C -0.558 2.378 -0.342 2.638 -0.048 2.664 L 0 2.133 L 0.048 1.602 Z M 22.4 1.067 L 22.305 0.542 L 22.295 0.544 L 22.4 1.067 Z M 43.618 1.587 C 43.905 1.651 44.19 1.47 44.254 1.182 C 44.318 0.895 44.137 0.61 43.849 0.546 L 43.733 1.067 L 43.618 1.587 Z M 0 2.133 L -0.048 2.664 C 7.821 3.38 15.339 3.023 22.505 1.59 L 22.4 1.067 L 22.295 0.544 C 15.239 1.955 7.824 2.309 0.048 1.602 L 0 2.133 Z M 22.4 1.067 L 22.495 1.591 C 30.262 0.179 37.3 0.183 43.618 1.587 L 43.733 1.067 L 43.849 0.546 C 37.367 -0.895 30.182 -0.89 22.305 0.542 L 22.4 1.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 384,
      height: 437.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 384,
      height: 437.3333435058594,
      clipPath: "inset(0px 0.000px 0px -0.000px)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 44.800,
    height: 2.489,
    viewBox: "0 0 44.800 2.489",
    fill: "none",
    style: {
      position: "absolute",
      left: 227.2,
      top: 208,
      width: 44.8,
      height: 2.489,
      opacity: 0.78,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 44.843 2.611 C 45.107 2.587 45.302 2.354 45.278 2.09 C 45.254 1.826 45.021 1.631 44.757 1.655 L 44.8 2.133 L 44.843 2.611 Z M -0.104 0.598 C -0.363 0.656 -0.526 0.912 -0.469 1.171 C -0.411 1.43 -0.155 1.593 0.104 1.535 L 0 1.067 L -0.104 0.598 Z M 44.8 2.133 L 44.757 1.655 C 36.978 2.362 29.199 2.009 21.419 0.594 L 21.333 1.067 L 21.247 1.539 C 29.112 2.969 36.978 3.326 44.843 2.611 L 44.8 2.133 Z M 21.333 1.067 L 21.419 0.594 C 13.547 -0.837 6.37 -0.841 -0.104 0.598 L 0 1.067 L 0.104 1.535 C 6.43 0.13 13.475 0.126 21.247 1.539 L 21.333 1.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 384,
      height: 437.333,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 384,
      height: 437.3333435058594,
      clipPath: "inset(0px 0.000px 0px -0.000px)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 46.933,
    height: 2.489,
    viewBox: "0 0 46.933 2.489",
    fill: "none",
    style: {
      position: "absolute",
      left: 272,
      top: 212.267,
      width: 46.933,
      height: 2.489,
      opacity: 0.75,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.04 1.655 C -0.224 1.633 -0.456 1.829 -0.478 2.093 C -0.5 2.358 -0.304 2.59 -0.04 2.612 L 0 2.133 L 0.04 1.655 Z M 46.839 1.537 C 47.099 1.589 47.352 1.421 47.404 1.161 C 47.456 0.901 47.287 0.648 47.027 0.596 L 46.933 1.067 L 46.839 1.537 Z M 0 2.133 L -0.04 2.612 C 8.532 3.326 16.752 2.969 24.619 1.539 L 24.533 1.067 L 24.447 0.594 C 16.67 2.009 8.534 2.363 0.04 1.655 L 0 2.133 Z M 24.533 1.067 L 24.619 1.539 C 32.388 0.126 39.793 0.128 46.839 1.537 L 46.933 1.067 L 47.027 0.596 C 39.852 -0.839 32.324 -0.838 24.447 0.594 L 24.533 1.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))), /*#__PURE__*/React.createElement("svg", {
    width: 12.800,
    height: 1.219,
    viewBox: "0 0 12.800 1.219",
    fill: "none",
    style: {
      position: "absolute",
      left: 216.533,
      top: 199.467,
      width: 12.8,
      height: 1.219,
      opacity: 0.7,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 12.897 0.921 C 13.111 0.868 13.242 0.651 13.188 0.436 C 13.134 0.222 12.917 0.092 12.703 0.145 L 12.8 0.533 L 12.897 0.921 Z M 0.126 -0.379 C -0.083 -0.449 -0.31 -0.336 -0.379 -0.126 C -0.449 0.083 -0.336 0.31 -0.126 0.379 L 0 0 L 0.126 -0.379 Z M 12.8 0.533 L 12.703 0.145 C 8.512 1.193 4.323 1.019 0.126 -0.379 L 0 0 L -0.126 0.379 C 4.211 1.825 8.555 2.007 12.897 0.921 L 12.8 0.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 13.867,
    height: 1.422,
    viewBox: "0 0 13.867 1.422",
    fill: "none",
    style: {
      position: "absolute",
      left: 315.733,
      top: 202.667,
      width: 13.867,
      height: 1.422,
      opacity: 0.68,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.057 0.671 C -0.162 0.639 -0.365 0.791 -0.396 1.01 C -0.427 1.229 -0.275 1.431 -0.057 1.463 L 0 1.067 L 0.057 0.671 Z M 13.993 0.379 C 14.203 0.31 14.316 0.083 14.246 -0.126 C 14.176 -0.336 13.95 -0.449 13.74 -0.379 L 13.867 0 L 13.993 0.379 Z M 0 1.067 L -0.057 1.463 C 4.975 2.181 9.661 1.824 13.993 0.379 L 13.867 0 L 13.74 -0.379 C 9.539 1.021 4.98 1.374 0.057 0.671 L 0 1.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 14.933,
    height: 1.219,
    viewBox: "0 0 14.933 1.219",
    fill: "none",
    style: {
      position: "absolute",
      left: 212.266,
      top: 208.534,
      width: 14.933,
      height: 1.219,
      opacity: 0.65,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 15.006 0.872 C 15.193 0.832 15.312 0.648 15.272 0.461 C 15.232 0.273 15.048 0.154 14.861 0.194 L 14.933 0.533 L 15.006 0.872 Z M 0.095 -0.333 C -0.089 -0.386 -0.281 -0.279 -0.333 -0.095 C -0.386 0.089 -0.279 0.281 -0.095 0.333 L 0 0 L 0.095 -0.333 Z M 14.933 0.533 L 14.861 0.194 C 9.939 1.249 5.019 1.074 0.095 -0.333 L 0 0 L -0.095 0.333 C 4.936 1.771 9.972 1.951 15.006 0.872 L 14.933 0.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 1.422,
    viewBox: "0 0 16 1.422",
    fill: "none",
    style: {
      position: "absolute",
      left: 318.933,
      top: 212.267,
      width: 16,
      height: 1.422,
      opacity: 0.62,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.049 0.723 C -0.141 0.696 -0.316 0.828 -0.343 1.018 C -0.37 1.207 -0.239 1.383 -0.049 1.41 L 0 1.067 L 0.049 0.723 Z M 16.084 0.336 C 16.27 0.29 16.383 0.102 16.336 -0.084 C 16.29 -0.27 16.102 -0.383 15.916 -0.336 L 16 0 L 16.084 0.336 Z M 0 1.067 L -0.049 1.41 C 4.98 2.128 10.359 1.768 16.084 0.336 L 16 0 L 15.916 -0.336 C 10.263 1.077 4.976 1.427 0.049 0.723 L 0 1.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.467,
    height: 2.844,
    viewBox: "0 0 7.467 2.844",
    fill: "none",
    style: {
      position: "absolute",
      left: 243.2,
      top: 199.467,
      width: 7.467,
      height: 2.844,
      opacity: 0.6,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.693 0.226 C 7.818 0.101 7.818 -0.101 7.693 -0.226 C 7.568 -0.351 7.365 -0.351 7.24 -0.226 L 7.467 0 L 7.693 0.226 Z M 0.178 1.867 C 0.03 1.769 -0.168 1.809 -0.266 1.956 C -0.364 2.103 -0.325 2.302 -0.178 2.4 L 0 2.133 L 0.178 1.867 Z M 7.467 0 L 7.24 -0.226 C 5.837 1.177 4.55 2.024 3.379 2.359 C 2.224 2.689 1.165 2.526 0.178 1.867 L 0 2.133 L -0.178 2.4 C 0.968 3.163 2.221 3.355 3.555 2.974 C 4.873 2.598 6.252 1.668 7.693 0.226 L 7.467 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.467,
    height: 2.844,
    viewBox: "0 0 7.467 2.844",
    fill: "none",
    style: {
      position: "absolute",
      left: 231.466,
      top: 202.667,
      width: 7.467,
      height: 2.844,
      opacity: 0.55,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.655 0.189 C 7.759 0.084 7.759 -0.084 7.655 -0.189 C 7.551 -0.293 7.382 -0.293 7.278 -0.189 L 7.467 0 L 7.655 0.189 Z M 0.148 1.911 C 0.025 1.83 -0.14 1.863 -0.222 1.985 C -0.304 2.108 -0.27 2.274 -0.148 2.355 L 0 2.133 L 0.148 1.911 Z M 7.467 0 L 7.278 -0.189 C 5.872 1.218 4.577 2.072 3.393 2.41 C 2.223 2.745 1.149 2.579 0.148 1.911 L 0 2.133 L -0.148 2.355 C 0.985 3.11 2.221 3.3 3.54 2.923 C 4.846 2.55 6.217 1.627 7.655 0.189 L 7.467 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.467,
    height: 2.844,
    viewBox: "0 0 7.467 2.844",
    fill: "none",
    style: {
      position: "absolute",
      left: 241.066,
      top: 209.067,
      width: 7.467,
      height: 2.844,
      opacity: 0.58,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.693 0.226 C 7.818 0.101 7.818 -0.101 7.693 -0.226 C 7.568 -0.351 7.365 -0.351 7.24 -0.226 L 7.467 0 L 7.693 0.226 Z M 0.178 1.867 C 0.03 1.769 -0.168 1.809 -0.266 1.956 C -0.364 2.103 -0.325 2.302 -0.178 2.4 L 0 2.133 L 0.178 1.867 Z M 7.467 0 L 7.24 -0.226 C 5.837 1.177 4.55 2.024 3.379 2.359 C 2.224 2.689 1.165 2.526 0.178 1.867 L 0 2.133 L -0.178 2.4 C 0.968 3.163 2.221 3.355 3.555 2.974 C 4.873 2.598 6.252 1.668 7.693 0.226 L 7.467 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.467,
    height: 2.844,
    viewBox: "0 0 7.467 2.844",
    fill: "none",
    style: {
      position: "absolute",
      left: 295.466,
      top: 203.734,
      width: 7.467,
      height: 2.844,
      opacity: 0.6,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.226 -0.226 C 0.101 -0.351 -0.101 -0.351 -0.226 -0.226 C -0.351 -0.101 -0.351 0.101 -0.226 0.226 L 0 0 L 0.226 -0.226 Z M 7.644 2.4 C 7.791 2.302 7.831 2.103 7.733 1.956 C 7.635 1.809 7.436 1.769 7.289 1.867 L 7.467 2.133 L 7.644 2.4 Z M 0 0 L -0.226 0.226 C 1.215 1.668 2.594 2.598 3.912 2.974 C 5.246 3.355 6.499 3.163 7.644 2.4 L 7.467 2.133 L 7.289 1.867 C 6.301 2.526 5.243 2.689 4.088 2.359 C 2.917 2.024 1.629 1.177 0.226 -0.226 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.467,
    height: 2.844,
    viewBox: "0 0 7.467 2.844",
    fill: "none",
    style: {
      position: "absolute",
      left: 307.2,
      top: 205.867,
      width: 7.467,
      height: 2.844,
      opacity: 0.55,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.189 -0.189 C 0.084 -0.293 -0.084 -0.293 -0.189 -0.189 C -0.293 -0.084 -0.293 0.084 -0.189 0.189 L 0 0 L 0.189 -0.189 Z M 7.615 2.355 C 7.737 2.274 7.77 2.108 7.689 1.985 C 7.607 1.863 7.441 1.83 7.319 1.911 L 7.467 2.133 L 7.615 2.355 Z M 0 0 L -0.189 0.189 C 1.25 1.627 2.621 2.55 3.927 2.923 C 5.246 3.3 6.482 3.11 7.615 2.355 L 7.467 2.133 L 7.319 1.911 C 6.318 2.579 5.243 2.745 4.073 2.41 C 2.89 2.072 1.595 1.218 0.189 -0.189 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.467,
    height: 2.844,
    viewBox: "0 0 7.467 2.844",
    fill: "none",
    style: {
      position: "absolute",
      left: 297.6,
      top: 213.334,
      width: 7.467,
      height: 2.844,
      opacity: 0.58,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.226 -0.226 C 0.101 -0.351 -0.101 -0.351 -0.226 -0.226 C -0.351 -0.101 -0.351 0.101 -0.226 0.226 L 0 0 L 0.226 -0.226 Z M 7.644 2.4 C 7.791 2.302 7.831 2.103 7.733 1.956 C 7.635 1.809 7.436 1.769 7.289 1.867 L 7.467 2.133 L 7.644 2.4 Z M 0 0 L -0.226 0.226 C 1.215 1.668 2.594 2.598 3.912 2.974 C 5.246 3.355 6.499 3.163 7.644 2.4 L 7.467 2.133 L 7.289 1.867 C 6.301 2.526 5.243 2.689 4.088 2.359 C 2.917 2.024 1.629 1.177 0.226 -0.226 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 2.400,
    height: 14.400,
    viewBox: "0 0 2.400 14.400",
    fill: "none",
    style: {
      position: "absolute",
      left: 208.8,
      top: 196.267,
      width: 2.4,
      height: 14.4,
      opacity: 0.65,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.829 0.215 C 2.948 -0.022 2.852 -0.311 2.615 -0.429 C 2.378 -0.548 2.089 -0.452 1.971 -0.215 L 2.4 0 L 2.829 0.215 Z M -0.209 14.463 C -0.174 14.726 0.067 14.911 0.33 14.876 C 0.593 14.841 0.777 14.599 0.742 14.337 L 0.267 14.4 L -0.209 14.463 Z M 2.4 0 L 1.971 -0.215 C -0.211 4.149 -0.931 9.047 -0.209 14.463 L 0.267 14.4 L 0.742 14.337 C 0.042 9.086 0.744 4.385 2.829 0.215 L 2.4 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 14.933,
    height: 1.422,
    viewBox: "0 0 14.933 1.422",
    fill: "none",
    style: {
      position: "absolute",
      left: 196.266,
      top: 200.534,
      width: 14.933,
      height: 1.422,
      opacity: 0.58,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14.99 1.463 C 15.209 1.431 15.361 1.229 15.329 1.01 C 15.298 0.791 15.095 0.639 14.877 0.671 L 14.933 1.067 L 14.99 1.463 Z M 0.11 -0.385 C -0.103 -0.445 -0.324 -0.322 -0.385 -0.11 C -0.445 0.103 -0.322 0.324 -0.11 0.385 L 0 0 L 0.11 -0.385 Z M 14.933 1.067 L 14.877 0.671 C 9.956 1.374 5.035 1.023 0.11 -0.385 L 0 0 L -0.11 0.385 C 4.92 1.822 9.955 2.182 14.99 1.463 L 14.933 1.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1.920,
    height: 13.867,
    viewBox: "0 0 1.920 13.867",
    fill: "none",
    style: {
      position: "absolute",
      left: 333.866,
      top: 197.334,
      width: 1.92,
      height: 13.867,
      opacity: 0.65,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.429 -0.215 C 0.311 -0.452 0.022 -0.548 -0.215 -0.429 C -0.452 -0.311 -0.548 -0.022 -0.429 0.215 L 0 0 L 0.429 -0.215 Z M 0.605 13.735 C 0.532 13.99 0.68 14.255 0.935 14.328 C 1.19 14.401 1.455 14.253 1.528 13.999 L 1.067 13.867 L 0.605 13.735 Z M 0 0 L -0.429 0.215 C 1.646 4.364 1.997 8.862 0.605 13.735 L 1.067 13.867 L 1.528 13.999 C 2.98 8.916 2.621 4.169 0.429 -0.215 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 14.933,
    height: 1.422,
    viewBox: "0 0 14.933 1.422",
    fill: "none",
    style: {
      position: "absolute",
      left: 333.866,
      top: 201.6,
      width: 14.933,
      height: 1.422,
      opacity: 0.58,
      color: "rgb(90,48,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.057 0.671 C -0.162 0.639 -0.365 0.791 -0.396 1.01 C -0.427 1.229 -0.275 1.431 -0.057 1.463 L 0 1.067 L 0.057 0.671 Z M 15.043 0.385 C 15.256 0.324 15.379 0.103 15.318 -0.11 C 15.257 -0.322 15.036 -0.445 14.823 -0.385 L 14.933 0 L 15.043 0.385 Z M 0 1.067 L -0.057 1.463 C 4.979 2.182 10.013 1.822 15.043 0.385 L 14.933 0 L 14.823 -0.385 C 9.898 1.023 4.977 1.374 0.057 0.671 L 0 1.067 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("svg", {
    width: 157.867,
    height: 5.653,
    viewBox: "0 0 157.867 5.653",
    fill: "none",
    style: {
      position: "absolute",
      left: 193.066,
      top: 199.68,
      width: 157.867,
      height: 5.653,
      opacity: 0.28,
      color: "rgb(138,80,8)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M -0.123 4.863 C -0.559 4.931 -0.858 5.339 -0.791 5.776 C -0.723 6.213 -0.314 6.512 0.123 6.444 L 0 5.653 L -0.123 4.863 Z M 126.933 1.92 L 127.065 2.709 L 127.069 2.708 L 126.933 1.92 Z M 157.73 1.642 C 158.165 1.717 158.579 1.426 158.655 0.99 C 158.731 0.555 158.439 0.141 158.004 0.065 L 157.867 0.853 L 157.73 1.642 Z M 0 5.653 L 0.123 6.444 C 20.676 3.255 41.586 2.723 62.854 4.849 L 62.933 4.053 L 63.013 3.257 C 41.614 1.117 20.568 1.652 -0.123 4.863 L 0 5.653 Z M 62.933 4.053 L 62.854 4.849 C 84.258 6.99 105.662 6.276 127.065 2.709 L 126.933 1.92 L 126.802 1.131 C 105.538 4.675 84.275 5.384 63.013 3.257 L 62.933 4.053 Z M 126.933 1.92 L 127.069 2.708 C 139.465 0.583 149.676 0.241 157.73 1.642 L 157.867 0.853 L 158.004 0.065 C 149.702 -1.379 139.291 -1.01 126.798 1.132 L 126.933 1.92 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 42.667,
    height: 8.533,
    viewBox: "0 0 42.667 8.533",
    fill: "none",
    style: {
      position: "absolute",
      left: 208,
      top: 185.067,
      width: 42.667,
      height: 8.533,
      opacity: 0.2,
      color: "rgb(208,160,64)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.333 8.533 C 33.115 8.533 42.667 6.623 42.667 4.267 C 42.667 1.91 33.115 0 21.333 0 C 9.551 0 0 1.91 0 4.267 C 0 6.623 9.551 8.533 21.333 8.533 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 37.333,
    height: 7.467,
    viewBox: "0 0 37.333 7.467",
    fill: "none",
    style: {
      position: "absolute",
      left: 296,
      top: 181.867,
      width: 37.333,
      height: 7.467,
      opacity: 0.18,
      color: "rgb(200,144,48)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 18.667 7.467 C 28.976 7.467 37.333 5.795 37.333 3.733 C 37.333 1.671 28.976 0 18.667 0 C 8.357 0 0 1.671 0 3.733 C 0 5.795 8.357 7.467 18.667 7.467 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))))));
  const __body8 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 160,
      height: 98,
      overflow: "hidden",
      borderRadius: 6,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-1d0b51938b0d9b33",
    style: {
      position: "absolute",
      left: -8.444,
      top: -0.221,
      width: 176,
      height: 98
    }
  }));
  const __body9 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 160,
      height: 98,
      overflow: "hidden",
      borderRadius: 6,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-83928a4e30c7d5f0",
    style: {
      position: "absolute",
      left: -106,
      top: -40.333,
      width: 266,
      height: 146
    }
  }));
  const __body10 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 160,
      height: 98,
      overflow: "hidden",
      borderRadius: 6,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -40,
      top: -14.333,
      width: 206,
      height: 112
    }
  }));
  const __body11 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 160,
      height: 98,
      overflow: "hidden",
      borderRadius: 6,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-22cf7464d36d3b46",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 175,
      height: 98
    }
  }));
  const __impls = {
    // figma: Property 1=Flood, opsi 2=No, Image=No
    "property1=flood|opsi2=false|image=false": __body0,
    // figma: Property 1=Tropical Typhoon, opsi 2=No, Image=No
    "property1=tropical typhoon|opsi2=false|image=false": __body1,
    // figma: Property 1=Landslide, opsi 2=No, Image=No
    "property1=landslide|opsi2=false|image=false": __body2,
    // figma: Property 1=Drought, opsi 2=No, Image=No
    "property1=drought|opsi2=false|image=false": __body3,
    // figma: Property 1=Flood, opsi 2=Yes, Image=No
    "property1=flood|opsi2=true|image=false": __body4,
    // figma: Property 1=Tropical Typhoon, opsi 2=Yes, Image=No
    "property1=tropical typhoon|opsi2=true|image=false": __body5,
    // figma: Property 1=Landslide, opsi 2=Yes, Image=No
    "property1=landslide|opsi2=true|image=false": __body6,
    // figma: Property 1=Drought, opsi 2=Yes, Image=No
    "property1=drought|opsi2=true|image=false": __body7,
    // figma: Property 1=Flood, opsi 2=No, Image=Yes
    "property1=flood|opsi2=false|image=true": __body8,
    // figma: Property 1=Tropical Typhoon, opsi 2=No, Image=Yes
    "property1=tropical typhoon|opsi2=false|image=true": __body9,
    // figma: Property 1=Landslide, opsi 2=No, Image=Yes
    "property1=landslide|opsi2=false|image=true": __body10,
    // figma: Property 1=Drought, opsi 2=No, Image=Yes
    "property1=drought|opsi2=false|image=true": __body11
  };
  return (__impls[__vkey_IconNaturalDisaster(props)] ?? __body3)();
}

// Globals for scripts loaded after this file.
window.IconLandCover = IconLandCover;
window.IconNaturalDisaster = IconNaturalDisaster;