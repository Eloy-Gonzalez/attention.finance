import React from 'react';

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <main>
        <h2>Welcome to Attention Finance!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}