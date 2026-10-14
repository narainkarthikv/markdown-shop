import svgHandler from '../../api/github/[username]/[component].js';

export const handler = async (event) => {
  let statusCode = 200;
  const headers = {};
  let body = '';
  const res = {
    setHeader(name, value) {
      headers[name] = value;
    },
    status(code) {
      statusCode = code;
      return this;
    },
    send(value) {
      body = value;
      return this;
    },
    json(value) {
      headers['Content-Type'] = 'application/json; charset=utf-8';
      body = JSON.stringify(value);
      return this;
    },
    end(value = '') {
      body = value;
      return this;
    },
  };
  const route = event.path.match(/^\/api\/github\/([^/]+)\/([^/]+)$/);
  const req = {
    method: event.httpMethod,
    query: {
      ...(event.queryStringParameters || {}),
      username: route?.[1] || event.queryStringParameters?.username,
      component: route?.[2] || event.queryStringParameters?.component,
    },
  };
  await svgHandler(req, res);
  return { statusCode, headers, body };
};
