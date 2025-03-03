const Prior = "http://localhost:3307"

const Posts = Prior + "/Posts"
        export const PostsFetchAll = Posts + "/FetchAll"
        export const PostsFetchOnID = Posts + "/FetchOnID"
        export const PostsFetchLikes = Posts + "/FetchLikes"

        export const PostsInsertManual = Posts + "/InsertManual"
        export const PostsInsertForward = Posts + "/InsertForward"

        export const PostsIncrementLikes = Posts + "/IncrementLikes"
        export const PostsDecrementLikes = Posts + "/DecrementLikes"

const Comments = Prior + "/Comments"
        export const CommentsFetchAll = Comments + "/Fetch"
        export const CommentsFetchOnID = Comments + "/FetchOnID"

        export const CommentsInsertManual = Comments + "/InsertManual"
        export const CommentsInsertForward = Comments + "/InsertForward"

        export const CommentsIncrementLikes = Comments + "/IncrementLikes"
        export const CommentsDecrementLikes = Comments + "/DecrementLikes"

const Users = Prior + "/Users"
        export const UsersFetchAll = Users + "/FetchAll"
        export const UsersFetchOnID = Users + "/FetchOnID"

        export const UsersInsertManual = Users + "/InsertManual"
        export const UsersInsertForward = Users + "/InsertFoward"
        export const UsersInsertBasic = Users + "/InsertBasic"

        export const UsersGetUsername = Users + "/GetUsername"
        export const UsersGetPassword = Users + "/GetPassword"
        export const UsersGetBio = Users + "/GetBio"
        export const UsersGetEmail = Users + "/GetEmail"

        export const UsersChangeUsername = Users + "/ChangeUsername"
        export const UsersChangePassword = Users + "/ChangePassword"
        export const UsersChangeBio = Users + "/ChangeBio"
        export const UsersChangeEmail = Users + "/ChangeEmail"