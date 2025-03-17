function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

export const generateMetadata = () => {
  return {
    title: 'Mocca Admin | Orders',
  };
};

export default OrdersLayout;
