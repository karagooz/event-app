import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'; // Corrected import
import { axiosInstance } from '../../../../api/axiosInstance';

function TheatreDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    axiosInstance.get(`/eventList/${id}`)
      .then(res => {
        setDetail(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <h1>Id: {id}</h1>
      <hr />
      <h1>Name: {detail.name}</h1>
    </>
  );
}

export default TheatreDetail;