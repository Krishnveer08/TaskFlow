import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">

      <Navbar />

      <Hero />

      <section className="grid md:grid-cols-3 gap-8 px-10 mt-24">

        <FeatureCard
          title="🤖 AI Assistant"
          description="Smart AI suggestions for your daily work."
        />

        <FeatureCard
          title="📊 Analytics"
          description="Track productivity with beautiful charts."
        />

        <FeatureCard
          title="🔔 Smart Reminder"
          description="Never miss deadlines again."
        />

      </section>

      <Footer />

    </div>
  );
}

export default Home;