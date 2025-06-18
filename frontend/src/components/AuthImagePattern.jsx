const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <img
          src="https://i.pinimg.com/236x/37/8b/72/378b725a7299a84738cc83b1567dd335.jpg"
          alt="Shinchan"
          className="rounded-2xl shadow-lg mb-6 w-full h-auto object-cover"
        />
        <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
        <p className="text-base-content/70">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;