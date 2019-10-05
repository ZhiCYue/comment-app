import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from '../reducers/comments'

interface IProps {
    comments: object[],
    onSubmit: any
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

    _loadUsername() {
        const username = localStorage.getItem('username')
        if(username) {
            this.setState({ username })
        }
    }

    _saveUsername(username: string) {
        localStorage.setItem('username', username)
    }

    handleSubmitComment(comment: any) {
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

const mapStateToProps = (state: any) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (comment: any) => {
            dispatch(addComment(comment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer as any)
