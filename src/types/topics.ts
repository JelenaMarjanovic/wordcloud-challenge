export interface Sentiment {
  positive: number;
  neutral: number;
  negative: number;
}

export interface Topic {
  id: string;
  label: string;
  volume: number;
  sentimentScore: number;
  sentiment: Sentiment;
}
