import { Box } from '@mui/material'
import React from 'react'
import CheckoutSummary from '../../Component/Client/CheckoutSummary';
import Checkout from '../../Component/Client/Checkout';

const CheckoutPage = () => {
    return (
        <Box display='flex' p={4}>
            < Checkout />
            <CheckoutSummary />

        </Box>
    )
}

export default CheckoutPage
