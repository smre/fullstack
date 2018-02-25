const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let result = 0;
  blogs.forEach((blog) => {
    result += blog.likes;
  });
  return result;
};

const mostLiked = (blogs) => {
  let index = 0;
  let likes = 0;
  blogs.forEach((blog, i) => {
    if (blog.likes > likes) {
      index = i;
      likes = blog.likes;
    }
  });
  return blogs[index];
};

const mostBlogs = (blogs) => {
  if (blogs.length < 1) {
    return undefined;
  }
  let authors = [];
  blogs.forEach((blog) => {
    authors.push(blog.author);
  });

  let counts = {};
  let compare = 0;
  let mostFrequent;

  // find out most common
  for (let i = 0, len = authors.length; i < len; i++) {
    const blog = authors[i];

    if (counts[blog] === undefined) {
      counts[blog] = 1;
    } else {
      counts[blog] = counts[blog] + 1;
    }

    if (counts[blog] > compare) {
      compare = counts[blog];
      mostFrequent = authors[i];
    }
  }

  return { author: mostFrequent, blogs: counts[mostFrequent]};
};

const mostLikes = (blogs) => {
  if (blogs.length < 1) {
    return undefined;
  }

  let authors = [];
  blogs.forEach((blog) => {
    authors.push(blog.author);
  });

  authors = Array.from(new Set(authors));

  let likes = [];

  for (let i = 0; i < authors.length; i++) {
    likes[i] = 0;
    for (let j = 0; j < blogs.length; j++) {
      const blog = blogs[j];
      if (blog.author === authors[i]) {
        likes[i] += blog.likes;
      }
    }
  }

  let sorted = likes.slice();
  sorted.sort(function(a,b){return b - a});
  let index = likes.indexOf(sorted[0]);

  return { author: authors[index], likes: sorted[0] };
};

module.exports = {
  dummy,
  totalLikes,
  mostLiked,
  mostBlogs,
  mostLikes
};
