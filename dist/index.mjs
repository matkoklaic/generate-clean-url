const generateUrl = (baseUrl, params) => {
  let url = new URL(baseUrl);

  for (const [key, value] of Object.entries(params).sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    }
    if (a[0] > b[0]) {
      return 1;
    }
    return 0;
  })) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, encodeURIComponent(value));
    }
  }

  return url.toString();
};

export { generateUrl as default };
