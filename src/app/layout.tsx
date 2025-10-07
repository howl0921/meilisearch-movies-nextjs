import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <title>MovieDB - 电影数据库</title>
        <meta
          name="description"
          content="探索精彩电影世界，发现您的下一部最爱影片"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
