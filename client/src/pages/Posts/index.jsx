import React from 'react';
import { useLocation, useParams, useRouteMatch } from 'react-router';
import { Editor } from 'ui/components/Editor';
const Posts = () => {
  const location = useLocation();
  const params = useParams();
  let asd = useRouteMatch('/:customer/posts/:type/from/:from/to/:to');
  // console.log(params, location);
  console.log(asd);

  return (
    <>
      hi
      <Editor />
    </>
  );
};

export default Posts;
