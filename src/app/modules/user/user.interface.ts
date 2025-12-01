export type createUserInput = {
    name:string,
    email:string,
    password:string
}

import { Payment, Review, Subscription, TravelPlan } from "../../../generated";
import { Role } from "../../../generated/enums";

export type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  profileImage: string | null;       
  bio: string | null;                
  travelInterests: string[];         
  visitedCountries: string[];       
  currentLocation: string | null;    
  role: Role;                         
  verified: boolean;
  subscription?: Subscription | null; 
  travelPlans: TravelPlan[];          
  joinedPlans: TravelPlan[];          
  reviews: Review[];                 
  payments: Payment[];                
  createdAt: Date;
  updatedAt: Date;
};
