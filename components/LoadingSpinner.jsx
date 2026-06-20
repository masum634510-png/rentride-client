const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-4 border-indigo-500/10 border-t-[var(--color-primary)] animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-4 border-purple-500/10 border-b-purple-400 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
    </div>
    <p className="text-[var(--color-text-muted)] text-sm animate-pulse">{message}</p>
  </div>
);
export default LoadingSpinner;
