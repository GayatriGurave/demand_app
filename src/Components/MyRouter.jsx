
import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProducts from '../Pages/Products/AddProducts'
import ProductList from '../Pages/Products/ProductList'
import AddDistributer from '../Pages/Distributers/AddDistributer'
import DistributerList from '../Pages/Distributers/DistributerList'
import PendingOrders from '../Pages/Orders/PendingOrders'
import FullfillOrders from '../Pages/Orders/FullfillOrders'
import OverView from '../Pages/Dashboard/OverView'
import OrderDetails from '../Pages/Orders/OrderDetails'


const MyRouter = () => {
    return (
        <>
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>

                <Routes>
                    <Route path='/' element={<OverView />} />
                    <Route path='/dash/overview' element={<OverView />} />
                    <Route path='/products/addprod' element={<AddProducts />} />
                    <Route path='/products/prodlist' element={<ProductList />} />
                    <Route path='/dist/addDist' element={<AddDistributer />} />
                    <Route path='/dist/distlist' element={<DistributerList />} />
                    <Route path='/orders/pendord' element={<PendingOrders />} />
                    <Route path='/orders/fullfillord' element={<FullfillOrders />} />
                    <Route path='/order/details' element={<OrderDetails/>}/>
                </Routes>
            </Box>
        </>
    )
}

export default MyRouter