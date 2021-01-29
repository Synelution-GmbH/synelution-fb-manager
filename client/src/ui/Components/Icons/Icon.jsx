import React from 'react';
import PropTypes from 'prop-types';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faEye,
  faEyeSlash,
  faTimesCircle,
  faTimes,
  faSmile,
  faCopy,
  faClipboardCheck,
  faPlus,
  faCloudUploadAlt,
  faSearch,
  faSave,
  faTrashAlt,
  faPlay,
  faPause,
  faBell,
  faBellSlash,
  faCheckCircle,
  faLink,
  faGlobeAmericas,
  faPen,
  faImage,
  faRedo,
  faDownload,
  faComments,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';

import {
  faInstagram,
  faFacebook,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import {
  faChevronRight,
  faChevronLeft,
  igLike,
  igComment,
  igShare,
  igSave,
  faPreview,
} from './custom-icons';

library.add(
  faBriefcase,
  faRedo,
  faPreview,
  faEye,
  faEyeSlash,
  faTimesCircle,
  faTimes,
  faSmile,
  faInstagram,
  faFacebook,
  faFacebookSquare,
  faCopy,
  faClipboardCheck,
  faPlus,
  faCloudUploadAlt,
  faSearch,
  faSave,
  faTrashAlt,
  faPlay,
  faPause,
  faBell,
  faBellSlash,
  faCheckCircle,
  faChevronRight,
  faChevronLeft,
  faLink,
  faGlobeAmericas,
  faPen,
  faImage,
  igLike,
  igComment,
  igShare,
  faDownload,
  igSave,
  faComments
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
