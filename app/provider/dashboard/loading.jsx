export default function Loading() {
  return (
    <div className="provider-shell">
      <div className="provider-header">
        <div className="provider-container py-4">
          <div className="h-6 w-40 animate-pulse rounded-md bg-slate-200" />
        </div>
      </div>

      <div className="provider-container py-6 md:py-8">
        <div className="mb-6 h-10 w-64 animate-pulse rounded-md bg-slate-200" />
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="provider-card h-28 animate-pulse bg-slate-100" />
          ))}
        </div>
        <div className="provider-card h-[28rem] animate-pulse bg-slate-100" />
      </div>
    </div>
  )
}
