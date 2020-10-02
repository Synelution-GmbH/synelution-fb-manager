import React from 'react';
import PropTypes from 'prop-types';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faEye,
  faEyeSlash,
  faTimesCircle,
  faSmile,
  faCopy,
  faClipboardCheck,
  faPlus,
  faCloudUploadAlt,
  faSearch,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

library.add(
  faEye,
  faEyeSlash,
  faTimesCircle,
  faSmile,
  faInstagram,
  faFacebook,
  faCopy,
  faClipboardCheck,
  faPlus,
  faCloudUploadAlt,
  faSearch,
  faSave
);

export const AwesomeIcon = ({ ...props }) => {
  return <FontAwesomeIcon {...props} icon={[props.prefix, props.icon]} />;
};

AwesomeIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  prefix: PropTypes.string,
};

AwesomeIcon.defaultProps = {
  prefix: 'fas',
};
