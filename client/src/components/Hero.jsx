import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="text-center mt-24 px-6">
      <h1 className="text-6xl font-bold">
        Organize Your Tasks Smarter
      </h1>

      <p className="text-gray-400 mt-6">
        AI-powered task management for students and professionals.
      </p>

      <Link
  to="/login"
  className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-xl font-bold transition inline-block mt-8"
>
  Get Started
</Link>
    </section>
  );
}

export default Hero;