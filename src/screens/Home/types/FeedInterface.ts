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
  id: 13;
  main_id: 1;
  image: string | "";
  created_at: null;
  updated_at: null;
}
