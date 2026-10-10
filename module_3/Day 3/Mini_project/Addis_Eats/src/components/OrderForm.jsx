import React from 'react'
import { useState } from 'react'
function OrderForm() {

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "Bole"
    });

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e){
        if(!/^\d{10}$/.test(form.phone)){
            alert("Please enter a valid phone number.");
            return;
        }
        e.preventDefault();
        console.log(form);
        alert(`Order Submitted for ${form.name} in ${form.address}`);
    }
  return (
    <div>
        <h2>Customer Information</h2>
        <form onSubmit={handleSubmit}>
            <label>Name: </label>
            <input 
                name = "name"
                value = {form.name}
                onChange = {handleChange}
                type = "text"
                placeholder = "Your Name" />
            <br />
            <label>Phone: </label>
            <input 
                name = "phone"
                value = {form.phone}
                onChange = {handleChange}
                type = "text"
                placeholder = "Your Phone Number" />
            <br />
            <label>Address: </label>
            <select name="address" value = "form.address" onChange={handleChange}>
                <option value="Bole">Bole</option>
                <option value="4 Kilo">4 Kilo</option>
                <option value="Mexico">Mexico</option>
                <option value="Megenagna">Megenagna</option>
                <option value="CMC">CMC</option>
                <option value="Lafto">Lafto</option>
                <option value="Kaliti">Kaliti</option>
                <option value="Summit">Summit</option>
                <option value="Gullele">Gullele</option>
                <option value="Kera">Kera</option>
                <option value="Lebu">Lebu</option>
            </select>
            <br />
            <button type = "submit">Submit</button>
        </form>
    </div>
  )
}

export default OrderForm