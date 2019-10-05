import React, { Component } from 'react'
import PropTypes from 'prop-types'

export interface IProps {
    comment: object,
    onDeleteComment: any,
    index: number
}

export interface IStates {
    timeString: string
}

class Comment extends Component<IProps, IStates> {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        onDeleteComment: PropTypes.func,
        index: PropTypes.number
    }

    private _timer: any;

    constructor(props: IProps) {
        super(props)
        this.state = { timeString: '' }
    }

    componentDidMount(): void {
        this._updateTimeString()
        this._timer = setInterval(
            this._updateTimeString.bind(this),
            5000
        )
    }

    componentWillUnmount(): void {
        clearInterval(this._timer)
    }

    private _updateTimeString(): void {
        const { comment }: { comment: any } = this.props
        const duration = (+Date.now() - comment.createTime) / 1000
        this.setState({
            timeString: duration > 60
                ? `${Math.round(duration / 60)} 分钟前`
                : `${Math.round(Math.max(duration, 1))} 秒前`
        })
    }

    private _getProcessedContent(content: string): string {
        return content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }

    handleDeleteComment(): void {
        if(this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index)
        }
    }

    render() {
        const comment: any = this.props.comment
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{comment.username} </span>：
                </div>
                <p dangerouslySetInnerHTML={{ __html: this._getProcessedContent(comment.content) }}></p>
                <span className='comment-createdtime'>
                    { this.state.timeString }
                </span>
                <span
                    onClick={this.handleDeleteComment.bind(this)}
                    className='comment-delete'>
                    删除
                </span>
            </div>
        )
    }
}

export default Comment
