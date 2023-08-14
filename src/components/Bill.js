import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import axios from 'axios';


import './bill.css'
const Bill = (props) => {
    const { fetchingBills, bills } = props;
    const [startDate, setStartDate] = useState('')
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [store, setStore] = useState('الرئيسي');
    const [buyerName, setBuyerName] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [accept, setAccept] = useState(false);




    async function handlsubmit(e) {
        let flag = true;
        e.preventDefault();
        setAccept(true);
        if (itemCode === '' || sellerName == "" || buyerName == "" || itemName == "" || itemPrice == '' || quantity === "") {
            flag = false
        } else flag = true
        try {
            if (flag) {
                let res = await axios.post('https://task-data.onrender.com/bills', {
                    item_code: itemCode,
                    item_name: itemName,
                    price: itemPrice,
                    quantity: quantity,
                    house: store,
                    buyer_name: buyerName,
                    seller_name: sellerName,
                    bill_date: startDate,
                    discount: 0
                }).then(res => { fetchingBills() })
                    .then(setSellerName('')
                        , setBuyerName(''),
                        setItemPrice(''),
                        setItemCode(''),
                        setQuantity(''),
                        setItemCode(''),
                        setAccept(false))
            }
        } catch (err) {

        }
    }

    return (
        <div>
            <Container>
                <div className='mt-3 mb-3'>
                    <h3>فاتورة بيع</h3>
                </div>
                <div className='main-bill-form'>
                    <form onSubmit={handlsubmit}>
                        <div style={{ gap: '12px' }} className='form-main-grid'>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='billNum'>رقم الفاطورة : </Form.Label>
                                <Form.Control style={{ height: '38px' }} type='number' id='billNum' />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='billdate'> تاريخ الفاطورة : </Form.Label>
                                <Form.Control onChange={(e) => setStartDate(e.target.value)} style={{ height: '38px' }} type='date' id='billdate' />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='billDate2'>تاريخ التوريد : </Form.Label>
                                <Form.Control style={{ height: '38px' }} type='date' id='billDate2' />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='name'> اسم البائع: </Form.Label>
                                <Form.Control

                                    value={sellerName}
                                    onChange={(e) => setSellerName(e.target.value)}
                                    style={{ height: '38px' }}
                                    type="text" id='name'
                                />

                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='name'> الفرع : </Form.Label>
                                <Form.Select
                                    style={{ height: '38px' }} size="md">
                                    <option>الرئيسي</option>
                                    <option>فرع مدينة نصر</option>
                                    <option>فرع القطامية</option>
                                    <option>فرع اخر</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='name'> المخزن : </Form.Label>
                                <Form.Select
                                    onChange={(e) => setStore(e.target.value)}
                                    defaultValue={store}
                                    style={{ height: '38px' }} size="md">
                                    <option value='الرئيسي'>الرئيسي</option>
                                    <option value='مدينة نصر'>فرع مدينة نصر</option>
                                    <option value="القطامية">فرع القطامية</option>
                                    <option value="اخر">فرع اخر</option>
                                </Form.Select>
                                {store == "" && accept && <p className='text-danger'>هذا الحقل اجباري</p>}
                            </Form.Group>
                        </div>
                        <div style={{ gap: '12px' }} className='second-main-form form-main-grid'>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='searchcust'>بحث بكود العميل الاختياري : </Form.Label>
                                <Form.Control placeholder='بحث بكود العميل الاختياري' style={{ height: '38px' }} type='number' id='searchcust' />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='custname'> اسم العميل : </Form.Label>
                                <Form.Control
                                    value={buyerName}

                                    onChange={(e) => setBuyerName(e.target.value)}
                                    style={{ height: '38px' }} type='text'
                                    id='custname'
                                />


                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='pricetype'> نوع السعر : </Form.Label>
                                <Form.Select id='pricetype' style={{ height: '38px' }} size="md">
                                    <option>جملة</option>
                                    <option>فردي</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='itemcode'> كود الصنف : </Form.Label>
                                <Form.Control
                                    value={itemCode}
                                    onChange={(e) => setItemCode(e.target.value)}
                                    style={{ height: '38px' }}
                                    type="text" id='itemcode' />
                                {itemCode == "" && accept && <p className='text-danger'>هذا الحقل اجباري</p>}
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='itemtype'> نوع الصنف</Form.Label>
                                <Form.Select style={{ height: '38px' }} size="md" id='itemtype'>
                                    <option>غير محدد</option>
                                </Form.Select>

                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='itemname'> اسم الصنف :</Form.Label>
                                <Form.Control
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                    type='text' style={{ height: '38px' }}
                                    size="md" id='itemname' />
                                {itemName == "" && accept && <p className='text-danger'>هذا الحقل اجباري</p>}
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='priceperone'> تمن الوحدة :</Form.Label>
                                <Form.Control
                                    value={itemPrice}
                                    onChange={(e) => setItemPrice(e.target.value)}
                                    style={{ height: '38px' }} type='number' id='priceperone' />
                                {itemPrice == "" && accept && <p className='text-danger'>هذا الحقل اجباري</p>}
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='quantity'> الكمية :</Form.Label>
                                <Form.Control
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    style={{ height: '38px' }} type='number' id='quantity' />
                                {quantity == "" && accept && <p className='text-danger'>هذا الحقل اجباري</p>}
                            </Form.Group>



                        </div>
                        <div><button type='submit'>اضف الي المبيعات</button> </div>
                    </form>

                </div>


            </Container>

        </div>

    )
}

export default Bill