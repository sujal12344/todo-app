

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-100px)] bg-gradient-to-r from-indigo-700 to-purple-300 dark:from-gray-950 dark:to-blue-950">{children}</div>
  );
};

export default AuthLayout;
