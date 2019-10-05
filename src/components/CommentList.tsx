import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Comment from './Comment'

interface IProps {
    comments: any[],
    onDeleteComment: any
}

class ComponentList extends Component<IProps, {}> {
    static propTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func
    }

    static defaultProps = {
        comments: []
    }

    handleDeleteComment(index: number) {
        if(this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }

    render() {
        return (
            <div>
                {this.props.comments.map((comment, i) =>
                    <Comment
                        comment={comment}
                        key={i}
                        index={i}
                        onDeleteComment={this.handleDeleteComment.bind(this)}
                    />
                )}
            </div>
        )
    }
}

export default ComponentList
