import React, { Fragment, useState } from "react";
import Table from "./table";
import './task4.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {

    const [product, setproduct] = useState("");
    const [quantity, setquantity] = useState(1);
    const [price, setprice] = useState("");
    const [total, settotal] = useState("");
    const [list, setlist] = useState([]);
    const [options, setoptions] = useState([]); 

    const set_price_total = (select_product, select_quantity) => {

        const defalut_price = [
            {product : "Realme", value : 10000},
            {product : "Apple", value : 45000},
            {product : "Redmi", value : 20000},
            {product : "OnePlus", value : 50000},
            {product : "Samsung", value : 25000},
            {product : "LG", value : 15000},
            {product : "AC", value : 20000},
            {product : "Fridge", value : 9000},
            {product : "Fan", value : 2000}
        ];

        defalut_price.forEach(element => {
            if (select_product === element.product) {
                setprice(element.value);
                settotal(element.value * select_quantity);
            }
        });
        
    }

    const addData = (e) => {
        e.preventDefault();
        if (document.getElementsByTagName("select")[0].value !== "Select product" && document.getElementById("quantity").value !== '') {
            document.getElementsByTagName("select")[0].value = "Select product";
            document.getElementById("quantity").value = "";
            document.querySelector(".table_data").style.display = "block";
            setproduct("");
            setquantity(1);
            setprice("");
            settotal("");
            const obj = list.concat({
                pro : product,
                qua : quantity,
                pri : price,
                tot : total
            });
            setlist(obj);
        }
        else {
            toast.error("Please fill the details!", {autoClose: false});
        }
    }    

    const storeData = (e) => {
        e.preventDefault();
        document.querySelector(".table_data").style.display = "none";
        if (e.target.id === "submit_1") {
            const data = JSON.parse(localStorage.getItem("Shop 1"));
            if (data != null) {
                localStorage.setItem("Shop 1",JSON.stringify([...data,...list]));
            }
            else {
                localStorage.setItem("Shop 1",JSON.stringify(list));
            }
            setlist([]);
        }
        else if (e.target.id === "submit_2") {
            const data = JSON.parse(localStorage.getItem("Shop 2"));
            if (data != null) {
                localStorage.setItem("Shop 2",JSON.stringify([...data,...list]));
            }
            else {
                localStorage.setItem("Shop 2",JSON.stringify(list));
            }
            setlist([]);        
        }
        else {
            const data = JSON.parse(localStorage.getItem("Shop 3"));
            if (data != null) {
                localStorage.setItem("Shop 3",JSON.stringify([...data,...list]));
            }
            else {
                localStorage.setItem("Shop 3",JSON.stringify(list));
            }
            setlist([]);
        }
        toast.success("Submited Succesfull!", {autoClose: 2000})

    }   

    const btnClick = (event) => {
        document.getElementsByTagName("select")[0].value = "Select product";
        document.getElementById("quantity").value = "";
        setproduct("");
        setquantity(1);
        setprice("");
        settotal("");
        setlist([]);
        document.getElementById("form_conatainer").style.display = "block";
        if (event.target.id === "s1_btn") {

            setoptions(["Apple", "Realme", "Redmi"]);
            document.getElementById("submit_1").style.display = "inline-block";
            document.getElementById("submit_2").style.display = "none";
            document.getElementById("submit_3").style.display = "none";
        }
        else if (event.target.id === "s2_btn") {

            setoptions(["OnePlus", "Samsung", "LG"]);
            document.getElementById("submit_1").style.display = "none";
            document.getElementById("submit_2").style.display = "inline-block";
            document.getElementById("submit_3").style.display = "none";
        }
        else {

            setoptions(["AC", "Fan", "Fridge"]);
            document.getElementById("submit_1").style.display = "none";
            document.getElementById("submit_2").style.display = "none";
            document.getElementById("submit_3").style.display = "inline-block";
        }
    }
    
    const handlechange = (e) => {
        if (e.target.id === "quantity") {
            setquantity(Math.abs(parseInt(e.target.value)));
            set_price_total(product, e.target.value)
        }
        else {
            setproduct(e.target.value);
            set_price_total(e.target.value, 1)
        }
    }

    const deleteRow = (e) => {
        list.splice(e.target.id,1);
        setlist([...list]);
        console.log(list);
        if (list.length === 0) {
            document.querySelector(".table_data").style.display = "none";
        }
        toast.info("Row deleted");
    }

    return (

        <Fragment>
            <Table btnClick = {btnClick}/>
            <div className="form_conatainer" id="form_conatainer">   
                <form >
                    <select onChange={handlechange} >
                        <option>Select product</option >
                        <option>{options[0]}</option>
                        <option>{options[1]}</option>
                        <option>{options[2]}</option>
                    </select >
                    <input type="number" id = "quantity" placeholder="Enter Quantity" onChange={handlechange}/>
                    <input type="text" disabled value={price} />
                    <input type="text" disabled value={total} />
                    <button id="addbtn_1" onClick={addData}>&#43;</button>
                    <button id="submit_1" onClick={storeData} >Submit</button>
                    <button id="submit_2" onClick={storeData} >Submit</button>
                    <button id="submit_3" onClick={storeData} >Submit</button>
                </form>
            </div>

            <div className="table_data">
                <table>
                    <thead>
                        <tr>
                            <th className="th">Product</th>
                            <th className="th">Quantity</th>
                            <th className="th">Price</th>
                            <th className="th">Total</th>
                            <th className="th_btn"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        list.map((ele, index) => (
                            <tr key={index} className = {index}>
                                <td className="td">{ele.pro}</td>
                                <td className="td">{ele.qua}</td>
                                <td className="td">{ele.pri}</td>
                                <td className="td">{ele.tot}</td>
                                <td className="delete"><button id={index} onClick={deleteRow}>&minus;</button></td>
                            </tr>
                        ))    
                    }
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </Fragment>
    );
}

export default Form
