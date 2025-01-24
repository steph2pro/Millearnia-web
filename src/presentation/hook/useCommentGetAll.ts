import { useGetAllProfessions } from "../../domain/usecases/useGetAllProf";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";
import { useGetAllComments } from "../../domain/usecases/useCommentGetAll";

function useCommentGetAll() {
    const getAllComment = useGetAllComments(
        new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl())
    );

    return {
        commentsQuery: getAllComment,
    };
}

export default useCommentGetAll;
