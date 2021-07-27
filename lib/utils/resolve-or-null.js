'use strict';

module.exports = function (fn) {
  return {
    resolve: ({ params }) => {
      try {
        return fn.resolve({ params });
      } catch (error) {
        return { value: null };
      }
    },
  };
};
