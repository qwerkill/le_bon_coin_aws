import { Container } from '@mui/system';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './app/page/Home';
import PageForm from './app/page/PageForm';
import SinglePost from './app/page/SinglePost';

function App() {
  return (
    <Container sx={{pt:5}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/create" element={<PageForm/>} />
        <Route path="/posts/:id" element={<SinglePost/>} />
      </Routes>
    </BrowserRouter>
    </Container>
  );
}

export default App;