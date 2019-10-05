import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import CommentInput, { IOnSubmit } from '../components/CommentInput'
import { addComment, IStoreState, IComment, ICommentAction } from '../store/actions'

interface IProps {
    comments: object[],
    onSubmit: IOnSubmit
}

interface IState {
    username: string
}

class CommentInputContainer extends Component<IProps, IState> {
    static propTypes = {
        comments: PropTypes.array,
        onSubmit: PropTypes.func
    }

    constructor(props: IProps) {
        super(props)
        this.state = { username: '' }
    }

    componentDidMount() {
        this._loadUsername()
    }

    private _loadUsername(): void {
        const username = localStorage.getItem('username')
        if(username) {
            this.setState({ username })
        }
    }

    private _saveUsername(username: string): void {
        localStorage.setItem('username', username)
    }

    handleSubmitComment(comment: IComment): void {
        if(!comment) return
        if(!comment.username) return alert('请输入用户名')
        if(!comment.content) return alert('请输入评论内容')
        const { comments } = this.props
        const newComments = [ ...comments, comment ]
        localStorage.setItem('comments', JSON.stringify(newComments))
        if(this.props.onSubmit) {
            this.props.onSubmit(comment)
        }
    }

    render() {
        return (
            <CommentInput
                username={this.state.username}
                onUserNameInputBlur={this._saveUsername.bind(this)}
                onSubmit={this.handleSubmitComment.bind(this)}
            />
        )
    }
}

const mapStateToProps = (state: IStoreState) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch: Dispatch<ICommentAction>) => {
    return {
        onSubmit: (comment: IComment) => {
            dispatch(addComment(comment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer as any)
