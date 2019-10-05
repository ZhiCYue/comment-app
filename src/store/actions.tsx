export const INIT_COMMENTS = 'INIT_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export interface IComment {
    username: string
    content: string
    createTime?: number
}

export interface IStoreState {
    comments: IComment[]
}

export interface IInitComments {
    type: typeof INIT_COMMENTS
    comments: IComment[]
}

export interface IAddComment {
    type: typeof ADD_COMMENT
    comment: IComment
}

export interface IDeleteComment {
    type: typeof DELETE_COMMENT
    commentIndex: number
}

export type ICommentAction = IInitComments | IAddComment | IDeleteComment

export const initComments = (comments: IComment[]): IInitComments => {
    return { type: INIT_COMMENTS, comments }
}

export const addComment = (comment: IComment): IAddComment => {
    return { type: ADD_COMMENT, comment }
}

export const deleteComment = (commentIndex: number): IDeleteComment => {
    return { type: DELETE_COMMENT, commentIndex }
}
