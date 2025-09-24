import React, { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';

const BCSScoreCard = ({ currentScore, onScoreUpdate }) => {
  const [selectedScore, setSelectedScore] = useState(currentScore);

  const bcsGuidelines = [
    { score: 1, label: "Emaciated", description: "Severely underweight, ribs and spine prominent", color: "text-error" },
    { score: 2, label: "Thin", description: "Underweight, ribs easily felt", color: "text-warning" },
    { score: 3, label: "Ideal", description: "Optimal body condition, ribs felt with pressure", color: "text-success" },
    { score: 4, label: "Fat", description: "Overweight, ribs difficult to feel", color: "text-warning" },
    { score: 5, label: "Obese", description: "Severely overweight, ribs cannot be felt", color: "text-error" }
  ];

  const handleScoreSelect = (score) => {
    setSelectedScore(score);
    if (onScoreUpdate) {
      onScoreUpdate(score);
    }
  };

  const getCurrentGuideline = () => {
    return bcsGuidelines?.find(g => g?.score === selectedScore) || bcsGuidelines?.[2];
  };

  const currentGuideline = getCurrentGuideline();

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
          <Icon name="Activity" size={24} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Body Condition Score (BCS)</h3>
          <p className="text-sm text-muted-foreground">Interactive scoring system for body condition assessment</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Current Score Display */}
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-3xl font-bold text-foreground mb-1">{selectedScore}/5</div>
          <div className={`text-lg font-medium ${currentGuideline?.color}`}>
            {currentGuideline?.label}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {currentGuideline?.description}
          </p>
        </div>

        {/* Interactive Score Selection */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Select BCS Score</h4>
          <div className="grid grid-cols-5 gap-2">
            {bcsGuidelines?.map((guideline) => (
              <button
                key={guideline?.score}
                onClick={() => handleScoreSelect(guideline?.score)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedScore === guideline?.score
                    ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="text-lg font-bold text-foreground">{guideline?.score}</div>
                <div className={`text-xs font-medium ${guideline?.color}`}>
                  {guideline?.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Guidelines Reference */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">BCS Guidelines</h4>
          <div className="space-y-1">
            {bcsGuidelines?.map((guideline) => (
              <div key={guideline?.score} className="flex items-center space-x-3 p-2 rounded hover:bg-muted/50">
                <div className="w-6 h-6 flex items-center justify-center bg-muted rounded text-xs font-bold">
                  {guideline?.score}
                </div>
                <div className="flex-1">
                  <span className={`font-medium ${guideline?.color}`}>{guideline?.label}:</span>
                  <span className="text-sm text-muted-foreground ml-2">{guideline?.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BCSScoreCard;