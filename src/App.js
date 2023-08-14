import Bill from "./components/Bill";
import Fullbill from "./components/Fullbill";
import Nav from "./components/Navbar";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [bills, setBills] = useState([])



  const fetchingBills = () => {
    fetch('https://task-data.onrender.com/bills')
      .then(res => res.json())
      .then(data => setBills(data))
  }

  useEffect(() => {
    fetchingBills()
  }, [])

  const removeBill = (id) => {
    axios.delete(`https://task-data.onrender.com/bills/${id}`)
      .then(data => { fetchingBills() })
  }



  return (
    <div className="App">
      <Nav />
      <div className="w-100 text-center mb-3 mt-3">
        <h3>....Please fill inputs to try the app</h3>
        <h4>By mahmoud tamer (oceantech task)</h4>
        <div><a href="mailto:mahmoud.tamer.developer@gmail.com">mail mahmoud?</a></div>
      </div>
      <Bill
        fetchingBills={fetchingBills}
        bills={bills}

      />
      <div>
        <Fullbill removeBill={removeBill}
          bills={bills}
          fetchingBills={fetchingBills} />
      </div>

    </div>
  );
}

export default App;
