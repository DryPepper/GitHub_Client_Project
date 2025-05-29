import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import MultiDropdown from 'components/ui/MultiDropdown';
import Loader from 'components/ui/Loader';
import Card from 'components/dummies/Card';
interface Props {
  children: React.ReactNode;
}

interface RepoDetailsProps {
  onBack: () => void;
  repo: any;
}

const fetchReposByOrg = async (orgName: string) => {
  const res = await fetch(`https://api.github.com/orgs/${orgName}/repos`);
  if (!res.ok) throw new Error('Failed to fetch organization repos');
  return res.json();
};
const fetchReposByUser = async (username: string) => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!res.ok) throw new Error('Failed to fetch user repos');
  return res.json();
};

const fetchRepoDetails = async (owner: string, repo: string) => {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
  if (!res.ok) throw new Error('Failed to fetch repo details');
  return res.json();
};

const RepoDetails: React.FC<RepoDetailsProps> = ({ onBack, repo }) => {
  return (
    <div className="repo-details">
      <div className="repo-header">
        <button className="back-btn" onClick={onBack}>&lt;</button>
        <img src={repo.owner?.avatar_url} alt={repo.name} className="repo-avatar" />
        <span className="repo-name">{repo.full_name}</span>
      </div>

      <div className="repo-section">
        <h3>Description</h3>
        <p>{repo.description || 'No description provided.'}</p>
      </div>

      <div className="repo-section">
        <h3>Default Branch</h3>
        <p>{repo.default_branch}</p>
      </div>
    </div>
  );
};

const Main: React.FC<Props> = ({ children }) => {
  interface SearchOption {
    label: string;
    value: string;
    type: 'user' | 'org';
  }
  
  const [selectedOrg, setSelectedOrg] = useState<SearchOption[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [repoList, setRepoList] = useState<any[]>([]);
  const [repoDetails, setRepoDetails] = useState<any | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!selectedOrg.length || !searchTerm.trim()) {
      alert('Please select whether you are searching by user or organization, and enter a name.');
      return;
    }
  
    setIsLoading(true);
    setRepoDetails(null);
    setShowResults(false);
  
    try {
      const selectedOption = selectedOrg[0];
  
      const repos =
        selectedOption.type === 'org' 
          ? await fetchReposByOrg(searchTerm.trim())
          : await fetchReposByUser(searchTerm.trim());
  
      setRepoList(repos);
      setShowResults(true);
    } catch (err) {
      console.error('API call failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Toaster />

      <header className="app-header">
        <div className="app-header-controls">
        <MultiDropdown
          onSelect={(selectedOptions) => setSelectedOrg(selectedOptions)}
          />

        </div>
      </header>

      <main className="main-content">
        <div className="org-search-container">
          <div className="org-search-box">
            <Input
              type="text"
              placeholder="Search repository..."
              className="org-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <Button className="org-search-button" onClick={handleSearch}>
              <>
              </>
            </Button>
          </div>

          {isLoading && <Loader size="m" />}

          {!isLoading && showResults && (
            <>
              {repoDetails ? (
                <RepoDetails  repo={repoDetails} onBack={() => setRepoDetails(null)} />
              ) : (
                <div className="repo-list">
                {repoList.map((repo) => (
                  <Card
                    key={repo.id}
                    image={repo.owner.avatar_url}
                    title={repo.name}
                    subtitle={repo.owner.login}
                    stars={repo.stargazers_count}
                    updatedAt={new Date(repo.updated_at).toLocaleDateString()}
                    onClick={async () => {
                      try {
                        const details = await fetchRepoDetails(repo.owner.login, repo.name);
                        setRepoDetails(details);
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                  />
                ))}
              </div>
              )}
            </>
          )}
        {children}
        </div>
      </main>
    </div>
  );
};

export default Main
