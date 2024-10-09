import React, { Suspense, lazy } from "react";

// Create a lazy loading utility function
const lazyWithSuspense = (importFunc, fallback, displayName) => {
  const LazyComponent = lazy(importFunc);

  // Set the displayName for debugging
  LazyComponent.displayName = displayName;

  // Return a component wrapped in Suspense with fallback UI
  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default lazyWithSuspense;
