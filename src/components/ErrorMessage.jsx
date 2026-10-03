function ErrorMessage({ message }) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="text-4xl mb-4">
          ⚠️
        </div>

        <h2 className="text-xl font-semibold text-white mb-2">
          Something went wrong
        </h2>

        <p className="text-red-400">
          {message}
        </p>
      </div>
    </div>
  )
}

export default ErrorMessage