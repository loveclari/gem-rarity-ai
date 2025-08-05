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

  const handleAIClick = async () => {
    if (!selections.selectedShape || !selections.selectedCarat || 
        !selections.selectedClarity || !selections.selectedColor || 
        !selections.selectedCut) {
      setError('Please select all diamond attributes first.');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis('');

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

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get AI analysis');
      }

      setAnalysis(data.result);
    } catch (err: any) {
      setError(err.message || 'Failed to get AI analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-analysis-section">
      <div className="ai-header">
        <h3>🤖 AI Diamond Analysis</h3>
        <button
          onClick={handleAIClick}
          className="ai-button"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Get AI Analysis'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
        </div>
      )}

      {analysis && (
        <div className="analysis-result">
          <div className="analysis-header">
            <h4>💎 AI Analysis Result</h4>
            <div className="selected-diamond">
              <strong>Selected Diamond:</strong> {selections.selectedShape} {selections.selectedCarat} {selections.selectedClarity} {selections.selectedColor} {selections.selectedCut}
            </div>
          </div>
          <div className="analysis-content">
            <div className="analysis-text">
              {analysis.split('\n').map((paragraph, index) => (
                <p key={index} className="analysis-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="analysis-features">
              <h5>Key Features Analyzed:</h5>
              <ul>
                <li>✨ Shape and Cut Quality</li>
                <li>💎 Clarity and Color Grade</li>
                <li>⚖️ Carat Weight Impact</li>
                <li>🎯 Overall Value Assessment</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .ai-analysis-section {
          margin-top: 30px;
          padding: 20px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 15px;
          border: 1px solid #dee2e6;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
          font-size: 20px;
          font-weight: 600;
        }

        .ai-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }

        .ai-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
        }

        .ai-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .error-message {
          background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
          color: #721c24;
          padding: 15px 20px;
          border-radius: 10px;
          margin: 15px 0;
          border: 1px solid #f5c6cb;
          box-shadow: 0 2px 8px rgba(220, 53, 69, 0.1);
        }

        .analysis-result {
          background: white;
          padding: 25px;
          border-radius: 12px;
          border: 1px solid #dee2e6;
          margin-top: 20px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .analysis-header {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f8f9fa;
        }

        .analysis-header h4 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 18px;
          font-weight: 600;
        }

        .selected-diamond {
          background: #f8f9fa;
          padding: 10px 15px;
          border-radius: 8px;
          font-size: 14px;
          color: #495057;
          border-left: 4px solid #007bff;
        }

        .analysis-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 25px;
        }

        .analysis-text {
          line-height: 1.8;
        }

        .analysis-paragraph {
          margin: 0 0 15px 0;
          color: #495057;
          font-size: 15px;
          line-height: 1.7;
        }

        .analysis-features {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #dee2e6;
        }

        .analysis-features h5 {
          margin: 0 0 15px 0;
          color: #333;
          font-size: 16px;
          font-weight: 600;
        }

        .analysis-features ul {
          margin: 0;
          padding-left: 20px;
        }

        .analysis-features li {
          margin: 8px 0;
          color: #495057;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .analysis-content {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .ai-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
} 