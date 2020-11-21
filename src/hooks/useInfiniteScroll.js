import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = () => {
    if (!(window.innerHeight + window.pageYOffset >= document.body.scrollHeight) || isFetching) return;
    setIsFetching(true);
    console.log('hell2')
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => {
      console.log('called back');
    });
  }, [isFetching]);

  return [isFetching, setIsFetching];

};

export default useInfiniteScroll;