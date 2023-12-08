// TypedText.js
import React, { useEffect } from 'react';
import Typed from 'typed.js';

export const TypedText = ({ dynamicText }) => {
  useEffect(() => {
    // Create a new Typed instance
    const typed = new Typed('#typed-output', {
      strings: [`Stay ${dynamicText}`],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
      showCursor: false, // Set to true to show a blinking cursor
    });

    // Cleanup the Typed instance on component unmount
    return () => {
      typed.destroy();
    };
  }, [dynamicText]); // Re-run effect when dynamicText changes

  return <span id="typed-output">Stay </span>;
};


