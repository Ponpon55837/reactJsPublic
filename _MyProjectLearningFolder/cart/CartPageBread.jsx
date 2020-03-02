import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const handleClick = (event) => {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const CartPageBread = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/"  onClick={handleClick}>
        Home
      </Link>
      <Link
        color="textPrimary"
        onClick={handleClick}
        aria-current="page"
        href="/cart/"
      >
        Cart
      </Link>
    </Breadcrumbs>
  );
}
export default CartPageBread
