import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DjangoImgSrc from '../../assets/images/django-logo-negative.png';
import api from '../store/api'

const Home = () => {
  // const dispatch = useDispatch();
  // const restCheck = useSelector((state) => state.restCheck);
  // useEffect(() => {
  //   const action = creators.fetchRestCheck();
  //   dispatch(action);
  // }, [dispatch]);

  // const [showBugComponent, setShowBugComponent] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  
  const getImages = async () => {
    if (prompt === '')
      return
      setLoading(true);
    const data = await api.get(`/api/rest/search?q=${prompt}`)
    setLoading(false);
    console.log(data);
    setData(data.data)
  }
  
  useEffect( () => {
    // do once
    fetchData();
    async function fetchData() {
      const res = await api.get('/api/rest/rest-check/');
      setLoading(false)
      if (res) {
        console.log(res.data.data)
      }
    }
  },[])
  return (
    <>
    <div style={{
      display:'flex',
      padding:20
    }}>
    <h1>Search AI Images</h1></div>
    <p>Search for generated images</p>
    <div style={{maxWidth:500,margin:'0 auto', padding:10}}>
    <Form.Label htmlFor="inputPassword5">Prompt</Form.Label>
      <div style={{display:'flex'}}><Form.Control
        type="input"
        id="prompt"
        aria-describedby="promptH"
        onChange={(e) => {
          setPrompt(e.target.value)
        }}
      />
      <Button 
        disabled={loading}
        variant='primary'
        onClick={()=>{getImages()}}
        >{loading ? 'loading..' : 'Go'}</Button></div>
      <Form.Text id="promptH" muted>
        Try Searching for treehouse, beach ...
      </Form.Text>
    
    </div> 
    <Link to='/welcome'>Click here to proceed</Link>
    <div className="items">
      {
        data && data.images && data.images.map( (i) => {
          return <div key={i.id} className='item'>
            <img src={i.srcSmall} />
            <p>{i.prompt}</p>
            </div>
        })
      }
    </div>
    </>
  );
};

export default Home;
