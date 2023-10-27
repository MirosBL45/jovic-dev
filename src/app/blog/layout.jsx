import React from 'react';

function BlogLayout({ children }) {
  return (
    <div>
      <h4>Read My Blog Posts</h4>
      {children}
    </div>
  );
}

export default BlogLayout;
