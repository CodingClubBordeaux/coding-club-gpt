export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-neutral-900 text-white h-screen flex justify-center">
      <div className="w-full h-full flex flex-col">{children}</div>
    </div>
  );
};
