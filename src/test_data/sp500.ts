import sp500 from '../test_data/sp500.json'

export type Stock = {
  symbol: string;
  security: string;
  gics_sector: string;
  gics_sub_industry: string;
  /** ISO-8601 format */
  date_added: string;
  founded_year: string;
}

export const SP500: Stock[] = sp500;
