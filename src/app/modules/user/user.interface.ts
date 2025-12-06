
import { Payment, Review, Role, Subscription, TravelPlan } from "../../../generated/prisma/client";


export type createUserInput = {
    name:string,
    email:string,
    password:string
}




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
  subscriptionActive :  Boolean    
  subscription?: Subscription | null; 
  travelPlans: TravelPlan[];          
  joinedPlans: TravelPlan[];          
  reviews: Review[];                 
  payments: Payment[];                
  createdAt: Date;
  updatedAt: Date;
};
