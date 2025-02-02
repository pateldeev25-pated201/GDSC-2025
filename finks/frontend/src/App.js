import JobPostingList from "./components/JobPostingList"; // ✅ Keep only JobPostingList
import './styles/App.css';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-800">AI Resume Screening</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <JobPostingList /> {/* ✅ Only JobPostingList, since it contains JobPostingForm */}
      </main>
    </div>
  );
}

export default App;
