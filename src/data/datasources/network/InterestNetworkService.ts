
import InterestRequest from "@/data/models/InterestRequest";
import Interest from "../../models/Cours";

export default interface InterestNetworkService{
    getInterests(): Promise<Interest[]>;
    createInterest(Interest: InterestRequest): Promise<Interest> 
    getInterests(): Promise<Interest[]> 
    getInterestById(InterestId: number): Promise<Interest>
    updateInterest(Interest: InterestRequest): Promise<Interest>
    deleteInterest(InterestId: number): Promise<string>
}
