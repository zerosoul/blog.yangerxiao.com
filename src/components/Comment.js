import React, { Component } from 'react';
import { DiscussionEmbed } from 'disqus-react';

export default class Comment extends Component {
  render() {
    const { config } = this.props;
    return (
      <DiscussionEmbed shortname={`blog-yangerxiao-com`} config={config} />
    );
  }
}
