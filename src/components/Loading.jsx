function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-slate-700 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>

        <p className="text-slate-400">
          Loading...
        </p>
      </div>
    </div>
  )
}

export default Loading