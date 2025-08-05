'use client';

import { useState } from 'react';
import { SelectionState } from '@/types';

interface AIAnalysisProps {
  selections: SelectionState;
}

export default function AIAnalysis({ selections }: AIAnalysisProps) {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const getAIAnalysis = async () => {
    // Check if all selections are made
    const hasAllSelections = selections.selectedShape && selections.selectedCarat && selections.selectedClarity && selections.selectedColor && selections.selectedCut;
    
    if (!hasAllSelections) {
      setError('Please select all diamond attributes before getting AI analysis.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'recommendation',
          data: {
            shape: selections.selectedShape,
            carat: selections.selectedCarat,
            clarity: selections.selectedClarity,
            color: selections.selectedColor,
            cut: selections.selectedCut,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnalysis(data.result);
      } else {
        setError(data.error || 'Failed to get AI analysis');
      }
    } catch (err) {
      setError('Failed to connect to AI service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-analysis-section">
      <div className="ai-header">
        <h3>🤖 AI Diamond Analysis</h3>
        <button
          onClick={getAIAnalysis}
          disabled={loading}
          className="ai-button"
        >
          {loading ? 'Analyzing...' : 'Get AI Analysis'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {analysis && (
        <div className="analysis-result">
          <h4>AI Analysis:</h4>
          <div className="analysis-content">
            {analysis.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
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

        .ai-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .ai-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
          border: 1px solid #f5c6cb;
        }

        .analysis-result {
          background: white;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }

        .analysis-result h4 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 16px;
        }

        .analysis-content {
          line-height: 1.6;
          color: #495057;
        }

        .analysis-content p {
          margin: 8px 0;
        }
      `}</style>
    </div>
  );
} 