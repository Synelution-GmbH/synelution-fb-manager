import React from "react";
import PropTypes from "prop-types";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEye,
  faEyeSlash,
  faTimesCircle,
  faSmile,
  faInstagram,
  faFacebook,
  faClipboard,
  faClipboardCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export const AwesomeIcon = ({ ...props }) => {
  <FontAwesomeIcon {...props} icon={icon} />;
};
