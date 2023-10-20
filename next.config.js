/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [`${process.env.AMPLIFY_BUCKET}.s3.amazonaws.com`],
  },
};

module.exports = nextConfig;
