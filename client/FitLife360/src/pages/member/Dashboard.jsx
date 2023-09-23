import React from 'react';
import icon from '../../assets/icon.png'
import { FaHome } from 'react-icons/fa';


function Dashboard() {
  return (
    <div className="container overflow-hidden">
        <div className="navigation w-80 bg-blue-700 border-r border-blue-800 transition-all duration-500 ease-in-out fixed h-full border-l-8 overflow-hidden active:w-20">
            <ul className='absolute top-0 left-0 w-full'>
                <li className='relative w-full list-none rounded-l-lg hover:bg-white/20'>
                    <a href="#" className="relative w-full text-white flex items-center space-x-2 p-3 hover:text-blue-500">
                        <img src={icon} alt="logo" />
                    </a>
                </li>

                <li className='relative w-full list-none rounded-l-lg hover:bg-white'>
                    <a href="#" className="relative w-full text-white flex items-center space-x-2 p-3 hover:text-blue-500">
                        <span className="icon">
                            <FaHome size={20}/>
                        </span>
                        <span className="title">Dashboard</span>
                    </a>
                </li>

                <li className='relative w-full list-none rounded-l-lg hover:bg-white'>
                    <a href="#" className="flex items-center space-x-2 p-3">
                        <span className="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span className="title">Customers</span>
                    </a>
                </li>

                <li className='relative w-full list-none rounded-l-lg hover:bg-white'>
                    <a href="#" className="flex items-center space-x-2 p-3">
                        <span className="icon">
                            <ion-icon name="chatbubble-outline"></ion-icon>
                        </span>
                        <span className="title">Messages</span>
                    </a>
                </li>

                <li className='relative w-full list-none rounded-l-lg hover:bg-white'>
                    <a href="#" className="flex items-center space-x-2 p-3">
                        <span className="icon">
                            <ion-icon name="help-outline"></ion-icon>
                        </span>
                        <span className="title">Help</span>
                    </a>
                </li>

                <li className='relative w-full list-none rounded-l-lg hover:bg-white'>
                    <a href="#" className="flex items-center space-x-2 p-3">
                        <span className="icon">
                            <ion-icon name="settings-outline"></ion-icon>
                        </span>
                        <span className="title">Settings</span>
                    </a>
                </li>

                <li className='relative w-full list-none rounded-l-lg hover:bg-white'>
                    <a href="#" className="flex items-center space-x-2 p-3">
                        <span className="icon">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </span>
                        <span className="title">Password</span>
                    </a>
                </li>

                <li className='relative w-full list-none rounded-l-lg hover:bg-white mb-10 pointer-events-none'>
                    <a href="#" className="flex items-center space-x-2 p-3">
                        <span className="icon">
                            <ion-icon name="log-out-outline"></ion-icon>
                        </span>
                        <span className="title">Sign Out</span>
                    </a>
                </li>
            </ul>
        </div>

        {/* <!-- ========================= Main ==================== --> */}
        <div className="main">
            <div className="topbar">
                <div className="toggle">
                    <ion-icon name="menu-outline"></ion-icon>
                </div>

                <div className="search">
                    <label>
                        <input type="text" placeholder="Search here"/>
                        <ion-icon name="search-outline"></ion-icon>
                    </label>
                </div>

                <div className="user">
                    <img src="assets/imgs/customer01.jpg" alt=""/>
                </div>
            </div>

            {/* <!-- ======================= Cards ================== --> */}
            <div className="cardBox">
                <div className="card">
                    <div>
                        <div className="numbers">1,504</div>
                        <div className="cardName">Daily Views</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="eye-outline"></ion-icon>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">80</div>
                        <div className="cardName">Sales</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="cart-outline"></ion-icon>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">284</div>
                        <div className="cardName">Comments</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="chatbubbles-outline"></ion-icon>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">$7,842</div>
                        <div className="cardName">Earning</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="cash-outline"></ion-icon>
                    </div>
                </div>
            </div>

            {/* <!-- ================ Order Details List ================= --> */}
            <div className="details">
                <div className="recentOrders">
                    <div className="cardHeader">
                        <h2>Recent Orders</h2>
                        <a href="#" className="btn">View All</a>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Payment</td>
                                <td>Status</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Star Refrigerator</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span className="status delivered">Delivered</span></td>
                            </tr>

                            <tr>
                                <td>Dell Laptop</td>
                                <td>$110</td>
                                <td>Due</td>
                                <td><span className="status pending">Pending</span></td>
                            </tr>

                            <tr>
                                <td>Apple Watch</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span className="status return">Return</span></td>
                            </tr>

                            <tr>
                                <td>Addidas Shoes</td>
                                <td>$620</td>
                                <td>Due</td>
                                <td><span className="status inProgress">In Progress</span></td>
                            </tr>

                            <tr>
                                <td>Star Refrigerator</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span className="status delivered">Delivered</span></td>
                            </tr>

                            <tr>
                                <td>Dell Laptop</td>
                                <td>$110</td>
                                <td>Due</td>
                                <td><span className="status pending">Pending</span></td>
                            </tr>

                            <tr>
                                <td>Apple Watch</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span className="status return">Return</span></td>
                            </tr>

                            <tr>
                                <td>Addidas Shoes</td>
                                <td>$620</td>
                                <td>Due</td>
                                <td><span className="status inProgress">In Progress</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* <!-- ================= New Customers ================ --> */}
                <div className="recentCustomers">
                    <div className="cardHeader">
                        <h2>Recent Customers</h2>
                    </div>

                    <table>
                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt=""/></div>
                            </td>
                            <td>
                                <h4>David <br/> <span>Italy</span></h4>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src="assets/imgs/customer01.jpg" alt=""/></div>
                            </td>
                            <td>
                                <h4>Amit <br/> <span>India</span></h4>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt=""/></div>
                            </td>
                            <td>
                                <h4>David <br/> <span>Italy</span></h4>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src="assets/imgs/customer01.jpg" alt=""/></div>
                            </td>
                            <td>
                                <h4>Amit <br/> <span>India</span></h4>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt=""/></div>
                            </td>
                            <td>
                                <h4>David <br/> <span>Italy</span></h4>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src="assets/imgs/customer01.jpg" alt=""/></div>
                            </td>
                            <td>
                                <h4>Amit <br/> <span>India</span></h4>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src="assets/imgs/customer01.jpg" alt=""/></div>
                            </td>
                            <td>
                                <h4>David <br/> <span>Italy</span></h4>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt=""/></div>
                            </td>
                            <td>
                                <h4>Amit <br/> <span>India</span></h4>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;
