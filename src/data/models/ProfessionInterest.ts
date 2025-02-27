import Interest from "./Interest";
import Profession from "./Profession";

type ProfessionInterest = {
    
    professionId: number;
    interestId: number;
    profession?: Profession;
    interest?: Interest;
}

export default ProfessionInterest;