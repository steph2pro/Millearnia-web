
import Interest from "../../data/models/Interest";
import InterestRequest from "../../data/models/InterestRequest";

export interface InterestRepository{
    createInterest(Interest: InterestRequest): Promise<Interest> 
    getInterests(): Promise<Interest[]> 
    getInterestById(InterestId: number): Promise<Interest>
    updateInterest(Interest: InterestRequest): Promise<Interest>
    deleteInterest(InterestId: number): Promise<string>
}