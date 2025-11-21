export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          KASPA-NEXUS 3.0
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Next Generation Blockchain Analytics Platform
        </p>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Version 1.0.1
          </h2>
          <p className="text-gray-600">
            Server erfolgreich konfiguriert und bereit f&uuml;r den Einsatz.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div className="bg-gray-50 rounded p-3">
              <div className="font-semibold">Node.js</div>
              <div>v20.19.5</div>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <div className="font-semibold">Next.js</div>
              <div>v15.0.3</div>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <div className="font-semibold">TypeScript</div>
              <div>v5.7.2</div>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <div className="font-semibold">Tailwind CSS</div>
              <div>v3.4.15</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
