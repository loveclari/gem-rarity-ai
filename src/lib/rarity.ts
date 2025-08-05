import gemData from '@/data/gemData';
import { RarityResult, GemData } from '@/types';

export function getGemData() {
  return gemData;
}

export function calculateRarity(
  shape: string,
  carat: string,
  clarity: string,
  color: string,
  cut: string,
  data: GemData[]
): RarityResult {
  // Filter data based on selections
  const filteredData = data.filter(item => 
    item.SHAPE_GROUP === shape &&
    item.CARAT_WEIGHT_GROUP === carat &&
    item.CLARITY_GRADE === clarity &&
    item.COLOR_GRADE === color &&
    item.CUT_GRADE === cut
  );

  // Calculate total count
  const totalCount = data.reduce((sum, item) => sum + item.Count, 0);
  
  // Calculate selected count
  const selectedCount = filteredData.reduce((sum, item) => sum + item.Count, 0);
  
  // Calculate percentage
  const percentage = totalCount > 0 ? ((selectedCount / totalCount) * 100).toFixed(2) : '0.00';
  
  // Calculate ratio
  const ratio = totalCount > 0 ? `1 in ${Math.round(totalCount / selectedCount)}` : '1 in 1';
  
  // Generate description
  const description = getRarityDescription(parseFloat(percentage));
  
  return {
    percentage: `${percentage}%`,
    ratio,
    description
  };
}

export function getRarityDescription(percentage: number): string {
  if (percentage >= 10) {
    return 'This is a very common diamond specification.';
  } else if (percentage >= 5) {
    return 'This is a moderately common diamond specification.';
  } else if (percentage >= 1) {
    return 'This is a relatively rare diamond specification.';
  } else if (percentage >= 0.1) {
    return 'This is a very rare diamond specification.';
  } else {
    return 'This is an extremely rare diamond specification!';
  }
} 