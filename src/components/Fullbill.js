import React, { useEffect, useRef, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import './bill.css'
import { useReactToPrint } from 'react-to-print';

function Fullbill(props) {
    const { bills, fetchingBills, removeBill } = props;
    const [ifinstallment, setIfInstallment] = useState(false)
    const [discount, setDiscount] = useState(0)
    const [payed, setPayed] = useState()
    const [remains, setRemains] = useState(0)
    const cashRef = useRef();
    const installmentRef = useRef();


    let totalProdsPrice = 0;
    let totalCounts = 0

    bills.length >= 1 && bills.map(bill => {
        return (
            totalProdsPrice += bill.price * bill.quantity,
            totalCounts += bill.quantity
        )

    });

    let totalAfterDisc = totalProdsPrice - discount;
    let Theremain = totalProdsPrice - payed;

    const componentRef = useRef();

    const handlPrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        onAfterPrint: () => alert('print success')
    })

    return (
        <>
            <div style={{ padding: "40px 0" }} ref={componentRef}>

                <Container> <div className='mt-3 mb-3'>
                    <div>تفاصيل الفاتورة :</div>
                    {bills && bills.map((bill, index) => {
                        return (
                            <div key={bill.id}>

                                {`منتج ${index + 1}) `} اسم العميل: {bill.buyer_name}  اسم البائع: {bill.seller_name} تاريخ الفاتورة : {bill.bill_date}
                            </div>
                        )
                    })}
                </div>
                    <table className='text-center w-100 table table-striped'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>كود الصنف</th>
                                <th>اسم الصنف</th>
                                <th>السعر</th>
                                <th>الكمية</th>
                                <th>اجمالي</th>
                                <th>المخزن</th>
                                <th>الخصم</th>
                                <th>السعر الاصلي</th>
                                <th>التاريخ</th>
                                <th>مسح</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills && bills.map((bill, index) => {
                                return (
                                    <tr key={bill.id}>
                                        <td>{index + 1}</td>
                                        <td>{bill.item_code}</td>
                                        <td>{bill.item_name}</td>
                                        <td>{bill.price} ج.م</td>
                                        <td>{bill.quantity}</td>
                                        <td>{bill.price * bill.quantity} ج.م</td>
                                        <td>{bill.house}</td>
                                        <td>{bill.discount}</td>
                                        <td>{bill.price * bill.quantity} ج.م</td>
                                        <td>{bill.bill_date}</td>
                                        <td onClick={() => removeBill(bill.id)} style={{ cursor: "pointer" }}>X</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table></Container >
                <Container className='bill-container'>
                    <div className='bill-card m-auto'>
                        <div className='card-p card-title d-flex justify-content-between align-items-center'>
                            <p> اجمالي الفاتورة</p>
                            <p> {totalProdsPrice} ج.م</p>
                        </div>
                        <div className='card-p card-quants cardBody justify-content-between align-items-center'>
                            <div className='cardBodychild d-flex d-flex justify-content-between align-items-center'>
                                <div>عدد القطع</div>
                                <div>{totalCounts}</div>
                            </div>
                            <div className='cardBodychild d-flex d-flex justify-content-between align-items-center'>
                                <div>عدد الاصناف</div>
                                <div>{bills.length}</div>
                            </div>
                        </div>
                        <div className='card-p d-flex justify-content-between align-items-center'>
                            <div>طريقة الدفع</div>
                            <div>
                                <label htmlFor='cash'> نقدي</label>
                                <input
                                    ref={cashRef}
                                    type='radio'
                                    id='cash'
                                    name='payment'
                                />
                            </div>
                            <div>
                                <label htmlFor='installment'> اجل</label>
                                <input ref={installmentRef} type='radio' id='installment' name='payment' />
                            </div>
                        </div>
                        <div className='card-p d-flex justify-content-between align-items-center'>
                            <div>
                                <label className='mb-2' htmlFor='priceperone'>خصومات؟ (ج.م): </label>
                                <Form.Control
                                    onChange={(e) => setDiscount(e.target.value)}
                                    style={{ height: '25px' }}
                                    type='number'
                                    id='priceperone' />
                            </div>

                            <div>
                                <label className='mb-2' htmlFor='priceperone'>تفاصيل الخصومات :</label>
                                <Form.Control
                                    style={{ height: '25px' }}
                                    type='text-area'
                                    id='priceperone' />
                            </div>
                        </div>
                    </div>
                    <div className='bill-card m-auto'>
                        <div className='card-p card-title d-flex justify-content-between align-items-center'>
                            <p> صافي الفاتورة</p>
                            <p> {totalAfterDisc} ج.م</p>
                        </div>
                        <div className='card-p  d-flex justify-content-between align-items-center'>
                            <div>
                                <label className='mb-2' htmlFor='priceperone'> المدفوع :</label>
                                <Form.Control
                                    onChange={(e) => setPayed(e.target.value)}
                                    style={{ height: '25px' }}
                                    type='number'
                                    id='priceperone' />
                            </div>
                            <div>
                                <label className='mb-2' htmlFor='remains'> المتبقي :</label>
                                <Form.Control
                                    value={Theremain}
                                    disabled={true}
                                    style={{ height: '25px' }}
                                    type='number'
                                    id='remains' />
                            </div>
                        </div>
                        <div className='card-p d-flex justify-content-between align-items-center'>
                            <div>
                                <input type='checkbox' id='taxbill' name='payment' />
                                <label className='m-2' htmlFor='taxbill'> فاطورة ضريبية</label>
                            </div>
                            <div>
                                <label className='mb-2' htmlFor='taxnum'> رقم الفاتورة الضريبية :</label>
                                <Form.Control
                                    style={{ height: '25px' }}
                                    type='number'
                                    id='taxnum' />
                            </div>
                        </div>

                    </div>
                </Container >

            </div >
            <div className='w-100 mb-3 mt-3 text-center'>
                <button onClick={handlPrint}>print</button>
            </div>
        </>
    )
}

export default Fullbill