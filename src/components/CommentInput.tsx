import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IComment } from '../store/actions';

export interface IOnSubmit {
    (a: IComment): void
}

interface IProps {
    username: string
    onSubmit: IOnSubmit
    onUserNameInputBlur: (...args: any[]) => void
}

interface IStates {
    username: string
    content: string
}

class CommentInput extends Component<IProps, IStates> {
    static propTypes = {
        username: PropTypes.any,
        onSubmit: PropTypes.func,
        onUserNameInputBlur: PropTypes.func
    }

    static defaultProps = {
        username: ''
    }

    public textarea: HTMLTextAreaElement | null = null;

    constructor(props: IProps) {
        super(props)
        this.state = {
            username: props.username,
            content: ''
        }
    }

    componentDidMount() {
        this.textarea!.focus()
    }

    handleUsernameBlur(event: React.FocusEvent<HTMLInputElement>): void {
        const { value }: { value: number | string } = event.currentTarget
        if(this.props.onUserNameInputBlur) {
            this.props.onUserNameInputBlur(value)
        }
    }

    handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { value }: { value: number | string } = event.currentTarget
        this.setState({
            username: value
        })
    }

    handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        const { value }: { value: number | string } = event.currentTarget
        this.setState({
            content: value
        })
    }

    handleSubmit(): void {
        if(this.props.onSubmit) {
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                createTime: +new Date()
            })
        }
        this.setState({ content: '' })
    }

    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input
                            value={this.state.username}
                            onBlur={this.handleUsernameBlur.bind(this)}
                            onChange={this.handleUsernameChange.bind(this)}
                        />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea
                            ref={(textarea) => this.textarea = textarea}
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)} 
                        />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit.bind(this)}>发布</button>
                </div>
            </div>
        )
    }
}

export default CommentInput
