import Layout from '../components/Layout';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Slider,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getList } from './api/product';
import { useSnackbar } from 'notistack';

function valuetext(value) {
  return `$ ${value}`;
}

export default function Home() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [priceLow, setPriceLow] = useState(0);
  const [priceHigh, setPriceHigh] = useState(3000);
  const [data, setData] = useState([]);
  const [value, setValue] = useState([0, 3000]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [name, sku, priceLow, priceHigh]);

  const init = () => {
    closeSnackbar();
    try {
      getList(name, sku, priceLow, priceHigh)
        .then((res) => {
          if (res.success) {
            setData(res.data);
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        });
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const handleChange = (event, newValue) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    } else if (event.target.name === 'sku') {
      setSku(event.target.value);
    } else {
      console.log(3);
      setValue(newValue);
      setPriceLow(newValue[0]);
      setPriceHigh(newValue[1]);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <fieldset>
          <legend>Filters</legend>
          <Grid container spacing={3}>
            <Grid item md={2}>
              <TextField
                label="Name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                label="Sku"
                name="sku"
                value={sku}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={4}>
              <Typography>Price</Typography>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                min={0}
                step={1}
                max={3000}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </Grid>
          </Grid>
        </fieldset>
        <br />
        <Grid container spacing={3}>
          {data.map((product) => (
            <Grid item md={4} key={product.name} textAlign="center">
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                    <Typography>{product.sku}</Typography>
                    <Typography>${product.price}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}
