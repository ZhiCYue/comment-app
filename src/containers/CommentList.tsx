import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CommentList from '../components/CommentList'
import { initComments, deleteComment, IStoreState, IComment, ICommentAction } from '../store/actions'
import { Dispatch } from 'redux'

interface IProps {
    comments: IComment[]
    initComments: (c: IComment[]) => void
    onDeleteComment: (i: number) => void
}

class CommentListContainer extends Component<IProps, {}> {
    static propTypes = {
        comments: PropTypes.array,
        initComments: PropTypes.func,
        onDeleteComment: PropTypes.func
    }

    componentDidMount() {
        this._loadComments()
    }

    private _loadComments() {
        let comments = localStorage.getItem('comments') as any
        comments = comments ? JSON.parse(comments) : []
        this.props.initComments(comments)
    }

    handleDeleteComment(index: number): void {
        const { comments } = this.props
        const newComments = [
            ...comments.slice(index, 1)
        ]
        localStorage.setItem('comments', JSON.stringify(newComments))
        if(this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }

    render() {
        return (
            <CommentList
                comments={this.props.comments}
                onDeleteComment={this.handleDeleteComment.bind(this)}
            ></CommentList>
        )
    }
}

const mapStateToProps = (state: IStoreState): object => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch: Dispatch<ICommentAction>): object => {
    return {
        initComments: (comments: IComment[]) => {
            dispatch(initComments(comments))
        },
        onDeleteComment: (commentIndex: number) => {
            dispatch(deleteComment(commentIndex))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer as any)
