import { INIT_COMMENTS, ADD_COMMENT, DELETE_COMMENT, IComment, ICommentAction, IStoreState } from './actions'

const defaultState: {
    comments: IComment[]
} = {
    comments: []
}

export default function (state: IStoreState = defaultState, action: ICommentAction): {
    comments: IComment[]
} {
    switch (action.type) {
        case INIT_COMMENTS:
            return { comments: action.comments }
        case ADD_COMMENT:
            return {
                comments: [...state.comments, action.comment]
            }
        case DELETE_COMMENT:
            return {
                comments: [
                    ...state.comments.slice(0, action.commentIndex),
                    ...state.comments.slice(action.commentIndex + 1)
                ]
            }
        default:
            return state
    }
}
