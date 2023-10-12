import React, { useEffect, useState } from 'react'
import Main from './Main'
import Loading from './components/Loading';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    setTimeout(() => {
      setLoading(false);
    }, 2700); // Replace with the actual loading logic

    // Add other initialization logic here
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        </>
      )
      }
      <Main/>
    </>
  )
}
