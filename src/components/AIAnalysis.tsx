'use client';

import { useState } from 'react';
import { SelectionState } from '@/types';

interface AIAnalysisProps {
  selections: SelectionState;
}

export default function AIAnalysis({ selections }: AIAnalysisProps) {
  const [showInfo, setShowInfo] = useState(false);

  const handleAIClick = () => {
    setShowInfo(true);
  };

  return (
    <div className="ai-analysis-section">
      <div className="ai-header">
        <h3>🤖 AI Diamond Analysis</h3>
        <button
          onClick={handleAIClick}
          className="ai-button"
        >
          Get AI Analysis
        </button>
      </div>

      {showInfo && (
        <div className="info-message">
          <h4>AI Features</h4>
          <p>
            AI-powered diamond analysis is available in the full version of this app. 
            This static version includes all the diamond selection and rarity calculation features.
          </p>
          <p>
            <strong>Features included:</strong>
          </p>
          <ul>
            <li>✅ Diamond shape selection</li>
            <li>✅ Carat weight selection</li>
            <li>✅ Clarity grade selection</li>
            <li>✅ Color grade selection</li>
            <li>✅ Cut grade selection</li>
            <li>✅ Rarity calculations</li>
            <li>✅ Percentage analysis</li>
          </ul>
          <p>
            <em>For AI analysis, please run the app locally with the full Next.js server.</em>
          </p>
        </div>
      )}

      <style jsx>{`
        .ai-analysis-section {
          margin-top: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          border: 1px solid #e9ecef;
        }

        .ai-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .ai-header h3 {
          margin: 0;
          color: #333;
          font-size: 18px;
        }

        .ai-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .ai-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .info-message {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }

        .info-message h4 {
          margin: 0 0 15px 0;
          color: #333;
          font-size: 16px;
        }

        .info-message p {
          margin: 10px 0;
          line-height: 1.6;
          color: #495057;
        }

        .info-message ul {
          margin: 15px 0;
          padding-left: 20px;
        }

        .info-message li {
          margin: 5px 0;
          color: #495057;
        }

        .info-message em {
          color: #6c757d;
          font-style: italic;
        }
      `}</style>
    </div>
  );
} 