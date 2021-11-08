import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getByUser } from './api/product';
import { getSeller } from './api/user';
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import { Store } from '../utils/store';
import { useSnackbar } from 'notistack';

export default function products() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [data, setData] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const [seller, setSeller] = React.useState(0);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    closeSnackbar();
    console.log(userInfo.toke);
    try {
      getByUser(seller, userInfo.token)
        .then((res) => {
          if (res.success) {
            console.log(res);
            setDataProducts(res.data);
          }
        })
        .catch((error) => {
          enqueueSnackbar(error, { variant: 'error' });
        });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }
  }, [seller]);

  const init = () => {
    closeSnackbar();
    try {
      getSeller()
        .then((res) => {
          if (res.success) {
            setData(res.data);
          }
        })
        .catch((error) => {
          enqueueSnackbar(error, { variant: 'error' });
        });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }
  };

  const handleChange = (event) => {
    setSeller(event.target.value);
  };

  return (
    <Layout title="Product View">
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={seller}
            label="Seller"
            onChange={handleChange}
          >
            <MenuItem value={0}>All Sellers</MenuItem>
            {data.map((user) => (
              <MenuItem key={user.id} value={user.id}>{user.fullName}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Layout>
  );
}
