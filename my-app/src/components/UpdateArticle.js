import { Component } from 'react';
class UpdateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.data.title,
      desc: this.props.data.desc,
      id: this.props.data.id,
    };
  }
  inputFormHandler(e) {
    this.setState({ [e.target.name]: e.target.value }); // computed property name
  }
  render() {
    console.log('UpdateArticle 실행');
    return (
      <section>
        <article>
          <h2>Update Article</h2>
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              this.props.onSubmit(this.state.id, e.target.title.value, e.target.desc.value);
            }}
          >
            <p>
              <input
                type="text"
                name="title"
                placeholder="title"
                value={this.state.title}
                onChange={(e) => {
                  this.inputFormHandler(e);
                }}
              />
            </p>
            <p>
              <textarea
                name="desc"
                placeholder="description"
                onChange={(e) => {
                  this.inputFormHandler(e);
                }}
                value={this.state.desc}
              ></textarea>
            </p>
            <button type="submit">입력</button>
          </form>
        </article>
      </section>
    );
  }
}
export default UpdateArticle;
