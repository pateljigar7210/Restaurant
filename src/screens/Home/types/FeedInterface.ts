export interface IFeedData {
  id: number;
  title: string;
  phone_no: number;
  description: string;
  rating: number;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  long: string;
  lat: string;
  created_at: null;
  updated_at: null;
  img: img[];
}

export interface img {
  id: number;
  main_id: number;
  image: string | "";
  created_at: null;
  updated_at: null;
}
