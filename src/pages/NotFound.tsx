import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
      <h1 className="text-8xl font-bold text-gold md:text-9xl">404</h1>
      <p className="mt-4 text-2xl font-semibold text-white md:text-3xl">
        Page Not Found
      </p>
      <p className="mt-2 text-white/60">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 font-bold text-navy transition-all hover:bg-gold/90 hover:shadow-xl hover:shadow-gold/30 active:scale-95"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
