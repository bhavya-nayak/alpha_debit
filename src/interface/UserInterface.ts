export interface UserBasicInterface {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_email_verified: boolean;
  date_of_birth?: Date | null;
  created_at: string;
}

export interface userContact extends UserBasicInterface {
  street_address: string;
  building: string | null;
  country_id: string;
  state: string | null;
  town: string | null;
  phone_number: string;
  zipcode: string;
}

export interface userSecureInfo extends userContact {
  sin_number: string;
  passport_number?: string;
  license_number?: string;
}
