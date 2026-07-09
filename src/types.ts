export interface LinkMetadata {
  originalUrl: string;
  label?: string;
  createdAt: string;
  updatedAt?: string;
  clicks: number;
}

export interface ShortLink {
  code: string;
  originalUrl: string;
  metadata: LinkMetadata;
}
