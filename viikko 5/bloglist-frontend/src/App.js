import React from 'react';
import Blog from './components/Blog';
import Togglable from "./components/Togglable";
import blogService from './services/blogs';
import loginService from './services/login';

const NewBlogForm = ({ addBlog, handleFieldChange, newTitle, newAuthor, newUrl}) => {
  return (
    <div>
      <h2>add new blog</h2>

      <form onSubmit={addBlog}>
        <input
          name={'newTitle'}
          placeholder={'Title'}
          value={newTitle}
          onChange={handleFieldChange}
        />
        <input
          name={'newAuthor'}
          placeholder={'Author'}
          value={newAuthor}
          onChange={handleFieldChange}
        />
        <input
          name={'newUrl'}
          placeholder={'URL'}
          value={newUrl}
          onChange={handleFieldChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

const LoginForm = ({login, handleFieldChange, username, password, error}) => {
  return (
    <div>
      {error !== null &&
      <p>{error}</p>}
      <h2>Kirjaudu sovellukseen</h2>
      <form onSubmit={login}>
        <div>
          käyttäjätunnus
          <input
            name={'username'}
            type="text"
            value={username}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          salasana
          <input
            name={'password'}
            type="password"
            value={password}
            onChange={handleFieldChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
};

class App extends React.Component {
  handleLogOut = () => {
    console.log('HELLO!');
    this.setState({
      user: null,
    });
    window.localStorage.clear();
  };
  addBlog = async (event) => {
    event.preventDefault();

    try {
      const blog = await blogService.create({
        title: this.state.newTitle,
        author: this.state.newAuthor,
        url: this.state.newUrl,
      });

      let blogs = this.state.blogs;
      blogs.push(blog);
      this.setState({
        blogs: blogs,
        info: 'Blogi lisättiin onnistuneesti',
      });
      setTimeout(() => {
        this.setState({error: null});
      }, 5000);
    } catch (exception) {
      console.log(exception);
      this.setState({
        error: 'Something went wrong...',
      });
    }
  };
  handleFieldChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };
  login = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      this.setState({username: '', password: '', user});
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      });
      setTimeout(() => {
        this.setState({error: null});
      }, 5000);
    }
  };

  constructor (props) {
    super(props);
    this.state = {
      blogs: [],
      username: '',
      password: '',
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      info: null,
      user: (window.localStorage.getItem('loggedUser')) ? JSON.parse(
        window.localStorage.getItem('loggedUser')) : null,
    };
  }

  componentDidMount () {
    blogService.getAll().then(blogs =>
      this.setState({blogs}),
    );

    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      this.setState({user});
      blogService.setToken(user.token);
    }
  }

  render () {
    if (this.state.user === null) {
      return (
        <LoginForm login={this.login} handleFieldChange={this.handleFieldChange} username={this.state.username} password={this.state.password} error={this.state.error}/>
      );
    }

    return (
      <div>
        {this.state.info !== null &&
        <p>{this.state.info}</p>}
        <div>
          <p>{this.state.user.name} logged in <button
            onClick={this.handleLogOut}>Log out</button></p>
        </div>
        <div>
          <Togglable buttonLabel="new blog">
          <NewBlogForm addBlog={this.addBlog} handleFieldChange={this.handleFieldChange} newTitle={this.state.newTitle} newAuthor={this.state.newAuthor} newUrl={this.state.newUrl} />
          </Togglable>
        </div>
        <h2>blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog}/>,
        )}
      </div>
    );
  }
}

export default App;
