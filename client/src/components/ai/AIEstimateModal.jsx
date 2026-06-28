function AIEstimateModal({
  open,
  onClose,
  loading,
  estimate,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-800 w-[600px] max-w-[90%] rounded-xl p-6">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-cyan-400">
            ✨ AI Task Estimate
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500"
          >
            ✖
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10">
            Generating Estimate...
          </div>
        ) : (
          <div className="whitespace-pre-wrap leading-7 text-gray-200">
            {estimate}
          </div>
        )}

      </div>
    </div>
  );
}

export default AIEstimateModal;