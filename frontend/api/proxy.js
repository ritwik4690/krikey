import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = createProxyMiddleware({
  target: 'http://13.52.77.220:3000', // backend URL
  changeOrigin: true,
  secure: false, // Disable SSL verification 
});

export default proxy;
