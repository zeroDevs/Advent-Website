import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = () => {
    if (!(window.innerHeight + window.pageYOffset >= document.body.scrollHeight) || isFetching) return;
    setIsFetching(true);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => {
      console.log('called back');
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return [isFetching, setIsFetching];

};

export default useInfiniteScroll;