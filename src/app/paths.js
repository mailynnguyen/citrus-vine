const Prior = "http://localhost:3307"

const Posts = Prior + "/Posts"
        export const PostsFetchAll = Posts + "/FetchAll"
        export const PostsFetchAscLikes = Posts + "/FetchAscLikes"
        export const PostsFetchDescLikes = Posts + "/FetchDescLikes"
        export const PostsFetchAscTimestamp = Posts + "/FetchOnAscTimestamp"
        export const PostsFetchDescTimestamp = Posts + "/FetchOnDescTimestamp"

        export const PostsFetchOnPostID = Posts + "/FetchOnPostID"
        export const PostsFetchOnUserID = Posts + "/FetchOnUserID"
        export const PostsFetchOnUsername = Posts + "/FetchOnUsername"
        export const PostsFetchAscTimestampOnUserID = Posts + "/FetchOnAscTimestampOnUserID"
        export const PostsFetchDescTimestampOnUserID = Posts + "/FetchOnDescTimestampOnUserID"
        export const PostsFetch10AscTimestamp = Posts + "/Fetch10AscTimestamp"
        export const PostsFetch10DescTimestamp = Posts + "/Fetch10AscTimestamp"
        export const PostsFetchAscLikesOnUserID = Posts + "/FetchOnAscLikesOnUserID"
        export const PostsFetchDescLikesOnUserID = Posts + "/FetchOnDescLikesOnUserID"

        export const PostsGetLikes = Posts + "/FetchLikes"

        export const PostsInsertManual = Posts + "/InsertManual"
        export const PostsInsertForward = Posts + "/InsertForward"

        export const PostsIncrementLikes = Posts + "/IncrementLikes"
        export const PostsDecrementLikes = Posts + "/DecrementLikes"

        export const PostDeleteOnPostID = Posts + "/DeleteOnPostID"

const Comments = Prior + "/Comments"
        export const CommentsFetchAll = Comments + "/Fetch"

        export const CommentsFetchOnID = Comments + "/FetchOnID"
        export const CommentsFetchOnUserID = Comments + "/FetchOnUserID"
        export const CommentsFetchOnPostID = Comments + "/FetchOnPostID"
        export const CommentsFetchAscLikesOnPostID = Comments + "/FetchAscLikes"
        export const CommentsFetchDescLikesOnPostID = Comments + "/FetchDescLikes"
        export const CommentsFetchOnUsername = Comments + "/FetchOnUsername"
        export const CommentsFetchAscTimestampOnPostID = Posts + "/FetchAscTimestampOnPostID"
        export const CommentsFetchDescTimestampOnPostID = Posts + "/FetchDescTimestampOnPostID"

        export const CommentsInsertManual = Comments + "/InsertManual"
        export const CommentsInsertForward = Comments + "/InsertForward"

        export const CommentsIncrementLikes = Comments + "/IncrementLikes"
        export const CommentsDecrementLikes = Comments + "/DecrementLikes"

        export const CommentsDeleteOnID = Comments + "/DeleteOnID"

const Users = Prior + "/Users"
        export const UsersFetchAll = Users + "/FetchAll"
        export const UsersFetchOnID = Users + "/FetchOnID"

        export const UsersInsertManual = Users + "/InsertManual"
        export const UsersInsertForward = Users + "/InsertFoward"
        export const UsersInsertBasic = Users + "/InsertBasic"

        export const UsersCheckUsernameExists = Users + "/CheckUsernameExists"
        export const UsersCheckEmailExists = Users + "/CheckEmailExists"

        export const UsersGetUsername = Users + "/GetUsername"
        export const UsersGetPassword = Users + "/GetPassword"
        export const UsersGetBio = Users + "/GetBio"
        export const UsersGetEmail = Users + "/GetEmail"

        export const UsersGetUserIDOnUsername = Users + "/GetUserIDOnUsername"

        export const UsersChangeUsername = Users + "/ChangeUsername"
        export const UsersChangePassword = Users + "/ChangePassword"
        export const UsersChangeBio = Users + "/ChangeBio"
        export const UsersChangeEmail = Users + "/ChangeEmail"

        export const UsersValidateAccount = Users + "/ValidateAccount"
        export const UsersDeleteAccount = Users + "/DeleteAccount"