const generateURL = (params) => {
  const baseUrl = "http://testurl.bitfinx.com/";
  let url = new URL(baseUrl);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, encodeURIComponent(value));
    }
  }

  return url.toString();
};

export default generateURL;
