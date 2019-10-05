import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../components/CommentList'
import { initComments, deleteComment } from '../reducers/comments'

interface IProps {
    comments: any[],
    initComments: any,
    onDeleteComment: any
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

    _loadComments() {
        let comments = localStorage.getItem('comments')
        comments = comments ? JSON.parse(comments) : []
        this.props.initComments(comments)
    }

    handleDeleteComment(index: number) {
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

const mapStateToProps = (state: any) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        initComments: (comments: any[]) => {
            dispatch(initComments(comments))
        },
        onDeleteComment: (commentIndex: number) => {
            dispatch(deleteComment(commentIndex))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer as any)
