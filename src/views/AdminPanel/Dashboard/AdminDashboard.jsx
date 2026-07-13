import React, { useEffect, useState } from 'react';
import Spinner from '../../../Components/Spinner';
import axiosClient from '../../../axiosClient';
import SalesTrendChart from './SalesTrendChart';

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [nearExpireProducts, setNearExpireProducts] = useState([]);
    const [salesData, setSaleDatas] = useState([]);
    const [ordersSummary, setOrdersSummary] = useState({ totalOrders: 0, pendingOrders: 0, processingOrders: 0 });
    const [error, setError] = useState('');

    // const fetchExpireProducts = async () => {
    //     try {
    //         const response = await axiosClient.get('/dashboards/expire_products');
    //         setNearExpireProducts(response.data.data);
    //     } catch (error) {
    //         // console.error('Error fetching expire products:', error);
    //         setError('Failed to fetch expire products.');
    //     }
    // };

    // const fetchOrdersSummary = async () => {
    //     try {
    //         const response = await axiosClient.get('/dashboards/order_summary');
    //         setOrdersSummary(response.data.data);
    //     } catch (error) {
    //         // console.error('Error fetching orders summary:', error);
    //         setError('Failed to fetch order summary.');
    //     }
    // };

    // const fetchSaleData = async () => {
    //     try {
    //         const response = await axiosClient.get('/dashboards/monthly_sale_summary');
    //         setSaleDatas(response.data.data);
    //     } catch (error) {
    //         // console.error('Error fetching expire products:', error);
    //         setError('Failed to fetch expire products.');
    //     }
    // };

    

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         await Promise.all([fetchOrdersSummary(), fetchExpireProducts(), fetchSaleData()]);
    //         setLoading(false);
    //     };

    //     fetchData();
    // }, []);

    return (
        <div className="mx-auto p-3" style={{ width : "100%" }}>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
                {/* {loading ? (
                    <Spinner />
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : ( */}
                    {/* <> */}
                        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-blue-100 p-4 rounded-lg shadow">
                                <h3 className="text-xl font-medium">Total Orders</h3>
                                <p className="text-2xl font-bold">100</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-lg shadow">
                                <h3 className="text-xl font-medium">Pending Orders</h3>
                                <p className="text-2xl font-bold">345</p>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded-lg shadow">
                                <h3 className="text-xl font-medium">Processing Orders</h3>
                                <p className="text-2xl font-bold">345</p>
                            </div>
                        </div> */}
                        {/* <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                            <h2 className="text-lg font-semibold mb-4">Near Expire Product Batch</h2>
                            <div className="overflow-auto">
                                <table className='min-w-full bg-white'>
                                    <thead>
                                        <tr>
                                            <th className='border-b text-center p-2'>S.No</th>
                                            <th className='border-b text-center p-2'>Category</th>
                                            <th className='border-b text-center p-2'>Brand</th>
                                            <th className='border-b text-center p-2'>Product</th>
                                            <th className='border-b text-center p-2'>Variant</th>
                                            <th className='border-b text-center p-2'>Bar Code</th>
                                            <th className='border-b text-center p-2'>Stock</th>
                                            <th className='border-b text-center p-2'>Dispatch Qty</th>
                                            <th className='border-b text-center p-2'>Current Balance</th>
                                            <th className='border-b text-center p-2'>Expiry Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                                <td className='border-b text-center p-2'>3</td>
                                                <td className='border-b p-2'>Villa</td>
                                                <td className='border-b p-2'>Emmar</td>
                                                <td className='border-b p-2'>Villa 23</td>
                                                <td className='border-b p-2'>234556 sq</td>
                                                <td className='border-b p-2'>||\||///|||/\\\/\/\|/|/||</td>
                                                <td className='border-b p-2'>3</td>
                                                <td className='border-b p-2'>7</td>
                                                <td className='border-b p-2'>4</td>
                                                <td className='border-b p-2'>N/A</td>
                                            </tr>
                                                <tr >
                                                <td className='border-b text-center p-2'>3</td>
                                                <td className='border-b p-2'>Villa</td>
                                                <td className='border-b p-2'>Emmar</td>
                                                <td className='border-b p-2'>Villa 23</td>
                                                <td className='border-b p-2'>234556 sq</td>
                                                <td className='border-b p-2'>||\||///|||/\\\/\/\|/|/||</td>
                                                <td className='border-b p-2'>3</td>
                                                <td className='border-b p-2'>7</td>
                                                <td className='border-b p-2'>4</td>
                                                <td className='border-b p-2'>N/A</td>
                                            </tr>
                                                <tr >
                                                <td className='border-b text-center p-2'>3</td>
                                                <td className='border-b p-2'>Villa</td>
                                                <td className='border-b p-2'>Emmar</td>
                                                <td className='border-b p-2'>Villa 23</td>
                                                <td className='border-b p-2'>234556 sq</td>
                                                <td className='border-b p-2'>||\||///|||/\\\/\/\|/|/||</td>
                                                <td className='border-b p-2'>3</td>
                                                <td className='border-b p-2'>7</td>
                                                <td className='border-b p-2'>4</td>
                                                <td className='border-b p-2'>N/A</td>
                                            </tr>
                                                <tr >
                                                <td className='border-b text-center p-2'>3</td>
                                                <td className='border-b p-2'>Villa</td>
                                                <td className='border-b p-2'>Emmar</td>
                                                <td className='border-b p-2'>Villa 23</td>
                                                <td className='border-b p-2'>234556 sq</td>
                                                <td className='border-b p-2'>||\||///|||/\\\/\/\|/|/||</td>
                                                <td className='border-b p-2'>3</td>
                                                <td className='border-b p-2'>7</td>
                                                <td className='border-b p-2'>4</td>
                                                <td className='border-b p-2'>N/A</td>
                                            </tr>
                                                <tr >
                                                <td className='border-b text-center p-2'>3</td>
                                                <td className='border-b p-2'>Villa</td>
                                                <td className='border-b p-2'>Emmar</td>
                                                <td className='border-b p-2'>Villa 23</td>
                                                <td className='border-b p-2'>234556 sq</td>
                                                <td className='border-b p-2'>||\||///|||/\\\/\/\|/|/||</td>
                                                <td className='border-b p-2'>3</td>
                                                <td className='border-b p-2'>7</td>
                                                <td className='border-b p-2'>4</td>
                                                <td className='border-b p-2'>N/A</td>
                                            </tr>
                                                <tr >
                                                <td className='border-b text-center p-2'>3</td>
                                                <td className='border-b p-2'>Villa</td>
                                                <td className='border-b p-2'>Emmar</td>
                                                <td className='border-b p-2'>Villa 23</td>
                                                <td className='border-b p-2'>234556 sq</td>
                                                <td className='border-b p-2'>||\||///|||/\\\/\/\|/|/||</td>
                                                <td className='border-b p-2'>3</td>
                                                <td className='border-b p-2'>7</td>
                                                <td className='border-b p-2'>4</td>
                                                <td className='border-b p-2'>N/A</td>
                                            </tr>
                                                <tr >
                                                <td className='border-b text-center p-2'>3</td>
                                                <td className='border-b p-2'>Villa</td>
                                                <td className='border-b p-2'>Emmar</td>
                                                <td className='border-b p-2'>Villa 23</td>
                                                <td className='border-b p-2'>234556 sq</td>
                                                <td className='border-b p-2'>||\||///|||/\\\/\/\|/|/||</td>
                                                <td className='border-b p-2'>3</td>
                                                <td className='border-b p-2'>7</td>
                                                <td className='border-b p-2'>4</td>
                                                <td className='border-b p-2'>N/A</td>
                                            </tr>
                                                <tr >
                                                <td className='border-b text-center p-2'>3</td>
                                                <td className='border-b p-2'>Villa</td>
                                                <td className='border-b p-2'>Emmar</td>
                                                <td className='border-b p-2'>Villa 23</td>
                                                <td className='border-b p-2'>234556 sq</td>
                                                <td className='border-b p-2'>||\||///|||/\\\/\/\|/|/||</td>
                                                <td className='border-b p-2'>3</td>
                                                <td className='border-b p-2'>7</td>
                                                <td className='border-b p-2'>4</td>
                                                <td className='border-b p-2'>N/A</td>
                                            </tr>
                                                <tr >
                                                <td className='border-b text-center p-2'>3</td>
                                                <td className='border-b p-2'>Villa</td>
                                                <td className='border-b p-2'>Emmar</td>
                                                <td className='border-b p-2'>Villa 23</td>
                                                <td className='border-b p-2'>234556 sq</td>
                                                <td className='border-b p-2'>||\||///|||/\\\/\/\|/|/||</td>
                                                <td className='border-b p-2'>3</td>
                                                <td className='border-b p-2'>7</td>
                                                <td className='border-b p-2'>4</td>
                                                <td className='border-b p-2'>N/A</td>
                                            </tr>
                                                <tr >
                                                <td className='border-b text-center p-2'>3</td>
                                                <td className='border-b p-2'>Villa</td>
                                                <td className='border-b p-2'>Emmar</td>
                                                <td className='border-b p-2'>Villa 23</td>
                                                <td className='border-b p-2'>234556 sq</td>
                                                <td className='border-b p-2'>||\||///|||/\\\/\/\|/|/||</td>
                                                <td className='border-b p-2'>3</td>
                                                <td className='border-b p-2'>7</td>
                                                <td className='border-b p-2'>4</td>
                                                <td className='border-b p-2'>N/A</td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div> */}
                        {/* <SalesTrendChart data={salesData} /> */}
                    {/* </> */}
                {/* )} */}
            </div>
        </div>
    );
}
