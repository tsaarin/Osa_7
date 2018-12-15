const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('blog tests', () => {
  describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
          'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
    test('should return total number of likes if list contains multiple blogs', () => {
      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(36)
    })
    test('should return 0 if list is empty', () => {
      const result = listHelper.totalLikes([])
      expect(result).toBe(0)
    })
  })

  describe('favouriteBlog', () => {
    test('should return most popular blog if it has the most likes', () => {
      const result = listHelper.favouriteBlog(blogs)
      expect(result).toEqual(blogs[2])
    })
    test('should return first of multiple blogs with a shared highest like count', () => {
      const blogsWithMultiplePopulars = blogs.concat({
        _id: 'differentid',
        title: 'Fun with Promises',
        author: 'Experience',
        url: 'dummyurl',
        likes: 12,
        __v: 0
      })

      const result = listHelper.favouriteBlog(blogsWithMultiplePopulars)
      expect(result).toEqual(blogs[2])
    })
    test('should return the first blog if no blog has any likes', () => {
      const badBlogs = JSON.parse(JSON.stringify(blogs))
      badBlogs.map(blog => {
        blog.likes = 0
        return blog
      })

      const result = listHelper.favouriteBlog(badBlogs)
      expect(result).toEqual(badBlogs[0])
    })
  })

  describe('mostBlogs', () => {
    test('should return the author with most blogs', () => {
      const result = listHelper.mostBlogs(blogs)
      const expected = {
        author: 'Robert C. Martin',
        blogs: 3
      }
      expect(result).toEqual(expected)
    })
    test('should return first of multiple authors with a shared highest blog count', () => {
      let blogsCopy = JSON.parse(JSON.stringify(blogs))
      blogsCopy.splice(-1, 1)

      const result = listHelper.mostBlogs(blogsCopy)
      const expected = {
        author: 'Robert C. Martin',
        blogs: 2
      }
      expect(result).toEqual(expected)
    })
  })

  describe('mostLikes', () => {
    test('should return the author with most likes', () => {
      const result = listHelper.mostLikes(blogs)
      const expected = {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
      expect(result).toEqual(expected)
    })
  })

  describe('popularitySortedBlogs', () => {
    test('should return blogs in decreasing order of likes', () => {
      const result = listHelper.popularitySortedBlogs(blogs)
      const mappedResult = result.map(blog => blog.title)
      const expectedOrderOfTitles =
        [
          'Canonical string reduction',
          'First class tests',
          'React patterns',
          'Go To Statement Considered Harmful',
          'Type wars',
          'TDD harms architecture'
        ]
      expect(mappedResult).toEqual(expectedOrderOfTitles)
    })
  })

  test('dummy is called', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})
