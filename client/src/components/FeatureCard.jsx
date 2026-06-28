function FeatureCard({ title, description }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );
}

export default FeatureCard;
