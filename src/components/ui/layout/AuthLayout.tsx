const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="sm:min-w-xl min-w-75 border border-[#3030303d] rounded-2xl px-4 py-1 shadow-md">
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
