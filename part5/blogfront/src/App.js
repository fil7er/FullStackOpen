import { useState, useEffect } from 'react'
import BlogCard from './components/content/BlogCard'
import blogService from './services/blogs'
import Menu from './components/nav/Menu'
import Grid from '@mui/material/Grid';
import './css/App.css'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { Box, Container, ScopedCssBaseline } from '@mui/material';
import Footer from './components/layoult/Footer';

const App = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <ScopedCssBaseline>
      <CssVarsProvider>
      <Menu />
      <Box mt={2}>
      <Container>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {blogs.map(blog =>
      <Grid item xs={2} sm={4} md={4} key={blog.id}>
        <BlogCard key={blog.id} blog={blog} />
      </Grid>
      )}
      </Grid>
      </Container>
      </Box>
      <Footer />
    </CssVarsProvider>
    </ScopedCssBaseline>
  )
}

export default App
