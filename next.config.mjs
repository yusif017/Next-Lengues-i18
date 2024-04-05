/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["az", "en", "ru"],
    defaultLocale: "az",
    localeDetection: false
  },

  env: {
    baseUrl: 'http://localhost:5296/',
    baseUrlPhoto: 'http://localhost:5296/uploads/',
   
},
images: {
  remotePatterns: [
      {
          protocol: 'https',
          hostname: 'cdn.pixabay.com',
      },
  ],},
async headers() {
  return [
    {
      source: '/api/fonts',
      headers: [
        {
          key: 'Content-Disposition',
          value: 'attachment; filename=Neue-Metana-Next-Free-Personal-Use.zip',
        },
      ],
    },
  ];
},
};

export default nextConfig;
