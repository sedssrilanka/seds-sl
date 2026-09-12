export interface Media {
  id?: string | number;
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  filename?: string | null;
  mimeType?: string | null;
}

export interface Category {
  id?: string | number;
  title: string;
  slug: string;
}

export interface Chapter {
  id?: string | number;
  name: string;
  slug: string;
  university?: string | null;
  description: string;
  logoDark?: Media | string | null;
  logoLight?: Media | string | null;
  mainImage?: Media | string | null;
  contactEmail?: string | null;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Division {
  id?: string | number;
  name: string;
  slug: string;
  lead?: string | null;
  icon?: string | null;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: Media | null;
  };
}

export interface Variant {
  id?: string;
  title?: string;
  price?: number;
  inventory?: number;
  options?: any[];
}

export interface Product {
  id?: string | number;
  title: string;
  slug: string;
  description?: string | any;
  priceInLKR: number;
  inStock?: boolean;
  enableVariants?: boolean;
  variants?:
    | {
        docs?: Variant[];
      }
    | any;
  inventory?: number;
  _status?: string;
  gallery?: Array<{
    image: Media | string;
    id?: string;
    variantOption?: any;
  }>;
  categories?: any[];
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: Media | null;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id?: string | number;
  name: string;
  slug: string;
  description: string;
  chapter?: Chapter | string | null;
  image?: Media | string | null;
  isFeatured?: boolean;
  customLink?: string | null;
  hero?: any;
  layout?: any[];
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id?: string | number;
  email: string;
  name?: string | null;
  roles?: string[];
}

export interface Page {
  id?: string | number;
  title: string;
  slug: string;
  description?: string | null;
  hero?: any;
  layout?: any[];
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: Media | null;
  };
}

export type Cart = {
  items?: Array<{
    id?: string;
    product?: Product;
    quantity?: number;
  }>;
};
