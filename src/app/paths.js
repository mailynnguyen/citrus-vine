const Prior = "http://localhost:3307"

const Posts = Prior + "/Posts"
export const PostsFetchAll = Posts + "/FetchAll"
export const PostsFetchLikes = Posts + "/FetchLikes"
export const PostsIncrementLikes = Posts + "/IncrementLikes"
export const PostsDecrementLikes = Posts + "/DecrementLikes"

const Comments = Prior + "/Comments"
export const CommentsFetchAll = Comments + "/Fetch"
export const CommentsIncrementLikes = Comments + "/IncrementLikes"
export const CommentsDecrementLikes = Comments + "/DecrementLikes"