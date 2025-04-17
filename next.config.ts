import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'p21-ad-sg.ibyteimg.com', 'api.mocca.io.vn', 'file.hauifood.com'],
  },
};

export default withNextIntl(nextConfig);
