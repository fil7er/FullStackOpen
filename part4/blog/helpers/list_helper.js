// Load the full build.
var _ = require('lodash');

const dummy = (blogs) => {
    return blogs;
  }

const totalLikes = (blogs) => {
    var total = 0;
    blogs.forEach(blog => {
        total += blog.likes;
    }
    );
    return total;
  }

const favoriteBlog = (blogs) => {
    var favorite = blogs[0];
    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog;
        }
    }
    );
    return favorite;
  }

const mostBlogs = (blogs) => {
    var authors = _.countBy(blogs, 'author');
    var mostBlogs = _.maxBy(_.keys(authors), function(o) { return authors[o]; });
    return {author: mostBlogs, blogs: authors[mostBlogs]};
  }


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }
  