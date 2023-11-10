/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [`${process.env.AMPLIFY_BUCKET}.s3.amazonaws.com`],
  },
};
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA(nextConfig);
