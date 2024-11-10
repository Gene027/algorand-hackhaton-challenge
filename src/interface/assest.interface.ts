export interface AssetResponseData {
  asset_id: number;
  name: string;
  unit_name: string;
  fraction_decimals: number;
  total_supply: string;
  is_deleted: boolean;
  creator_address: string;
  url: string;
  logo: string;
  verification_tier: string;
  usd_value: string;
  is_collectible: boolean;
}

export interface AssetResponse {
  next: string | null;
  previous: string | null;
  results: AssetResponseData[];
}
