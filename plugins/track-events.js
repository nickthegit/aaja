export default ({ $sanity }, inject) => {
  const trackEvent = async (type) => {
    try {
      const timestamp = new Date().getTime();
      return await fetch('https://kailhus-clickloggerserver.web.val.run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, timestamp }),
      });
    } catch (error) {
      return console.error('Analytics error:', error);
    }
  };
  inject('trackEvent', trackEvent)
}