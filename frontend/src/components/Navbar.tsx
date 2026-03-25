
export default function Navbar() {
  return (
    <div className="w-full bg-white shadow">

      <div className="w-full px-8 py-3 flex items-center justify-between">

        {/* LEFT */}
        <div className="text-xl font-bold text-blue-600">
          CompanyPulse AI
        </div>

        {/* RIGHT */}
        <div className="flex gap-6 text-gray-700">

          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/about">About</a>

        </div>

      </div>

    </div>
  );
}
