import { Http } from "../../../services/Http";
import Interest from "../../models/Cours";
import InterestRequest from "../../models/InterestRequest";
import InterestNetworkService from "./InterestNetworkService";


export default class InterestNetworkServiceImpl implements InterestNetworkService {
    

    async createInterest(Interest: InterestRequest): Promise<Interest> {
        const res = await Http.post<Interest>("interest-store", Interest);
        return await res.data;
      }
    async getInterests(): Promise<Interest[]> {
        const res = await Http.get<{interests  : Interest[]}>("interest-index");
        return await res.data.interests;
      }
      async getInterestById(InterestId: number): Promise<Interest> {
        const res = await Http.get<Interest>(`interest-show/${InterestId}`);
        return await res.data;
      }
      async updateInterest(Interest: InterestRequest): Promise<Interest> {
        const res = await Http.put<Interest>(`interest-update/${Interest.id}`, Interest);
        return await res.data;
      }
      
      async deleteInterest(InterestId: number): Promise<string> {
        const res = await Http.delete<string>(`interest-destroy/${InterestId}`);
        return await res.data;
      }


}