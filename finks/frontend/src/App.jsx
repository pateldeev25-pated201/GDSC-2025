import JobPostingList from "./components/JobPostingList"; // ✅ Keep only JobPostingList
import "./styles/App.css";

function App() {
  return (
    <div>
      <nav>
        <div className="container">
          <div className="nav-content">
            <span className="app-title">AI Resume Screening</span>
          </div>
        </div>
      </nav>
      <main className="container">
        <JobPostingList /> {/* ✅ Keep only JobPostingList */}
      </main>
    </div>
  );
}

export default App;
