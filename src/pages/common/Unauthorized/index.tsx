
export default function Unauthorized() {
  return (
    <>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-gray-100">
        <div className="text-center animate-fadeIn max-w-md px-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/565/565547.png" 
            alt="Unauthorized Access"
            className="mx-auto w-48 animate-float shadow-lg rounded-lg"
          />
          <h1 className="text-6xl font-extrabold text-red-600 mt-6">
            Unauthorized
          </h1>
          <p className="text-lg text-gray-700 mt-2">
            You don't have permission to access this page.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="/login"
              className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-red-700"
            >
              Login
            </a>
            <a
              href="/"
              className="bg-gray-300 text-gray-800 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-gray-400"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
