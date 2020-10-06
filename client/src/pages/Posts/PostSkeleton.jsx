import React from 'react';
import ContentLoader from 'react-content-loader';

export const PostSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={600}
    viewBox="0 0 600 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="7" y="8" rx="3" ry="3" width="146" height="34" />
    <rect x="172" y="9" rx="3" ry="3" width="146" height="34" />
    <rect x="7" y="55" rx="3" ry="3" width="400" height="160" />
    <rect x="423" y="57" rx="3" ry="3" width="163" height="159" />
  </ContentLoader>
);
