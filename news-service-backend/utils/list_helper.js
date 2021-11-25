const dummy = () => {
  // ...
  return 1
}
const totalLikes = (blogs) => {
  var total = 0
  blogs.map((b) => {
    total += b.likes
  })
  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  var favBlog = {
    title: blogs[0].title,
    author: blogs[0].author,
    likes: blogs[0].likes
  }
  var favLikes = blogs[0].likes
  blogs.map((b) => {
    if (favLikes <= b.likes) {
      favBlog = {
        title: b.title,
        author: b.author,
        likes: b.likes
      }
      favLikes = b.likes
    }
  })
  return favBlog
}

const authorsBlogs = (blogs, author) => {
  if (blogs.length === 0) {
    return undefined
  }
  var numOfBlogs = 0
  blogs.map((b) => {
    if (author === b.author) {
      numOfBlogs += 1
    }
  })
  return numOfBlogs
}

const allAuthors = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  var authors = []
  blogs.map((b) => {
    if (!authors.includes(b.author)) {
      authors.push(b.author)
    }
  })
  return authors
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  var authors = allAuthors(blogs)
  var numOfBlogs = 0
  var author = ''
  authors.map((a) => {
    num = authorsBlogs(blogs, a)
    if (num > numOfBlogs) {
      numOfBlogs = num
      author = a
    }
  })

  return {
    author: author,
    blogs: numOfBlogs
  }
}

const authorsLikes = (blogs, author) => {
  if (blogs.length === 0) {
    return undefined
  }
  var numOfLikes = 0
  blogs.map((b) => {
    if (author === b.author) {
      numOfLikes += b.likes
    }
  })
  return numOfLikes
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  var authors = allAuthors(blogs)
  var numOfLikes = blogs[0].likes
  var author = blogs[0].author
  authors.map((a) => {
    num = authorsLikes(blogs, a)
    if (num > numOfLikes) {
      numOfLikes = num
      author = a
    }
  })

  return {
    author: author,
    likes: numOfLikes
  }
}

module.exports = {
  totalLikes, dummy, favoriteBlog, mostBlogs, mostLikes
}