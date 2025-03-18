function ChatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

export const generateMetadata = () => {
  return {
    title: 'Mocca Admin | Chats',
  };
};

export default ChatsLayout;
