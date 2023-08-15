import React, { useState } from "react";
import "./styles.css";
import { tenuredData } from "./utils/constants";
export default function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [downPayment, setDownPayemt] = useState(0);
  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [fee, setFee] = useState(1);

  const calculateEMI = (downpayment) => {
    // to do
    // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
    if (!cost) return;

    const loanAmt = cost - downpayment;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);

    return Number(EMI / 12).toFixed(0);
  };

  const calculatedownPayment = (emi) => {
    if (!cost) return;
    const dpPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((dpPercent / 100) * cost).toFixed(0);
  };
  const updateEMI = (e) => {
    // to do
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayemt(dp.toFixed(0));
    const emi = calculateEMI(dp);
    setEmi(emi);
  };

  const updateDownPayment = (e) => {
    // to do
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));
    const dp = calculatedownPayment(emi);
    setEmi(dp);
  };

  return (
    <div className="App">
      <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        Emi Calculator
      </span>
      <span className="title">Total cost of assets</span>
      <input
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Total cost of the assest"
      />
      <span className="title">Interest Rate (in %)</span>
      <input
        type="number"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        placeholder="Total cost of the assest"
      />
      <span className="title">Processing Fee (in %)</span>
      <input
        type="number"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        placeholder="Total cost of the assest"
      />
      <span className="title">Down Payment</span>
      <div>
        <input
          className="slider"
          type="range"
          min="0"
          max={cost}
          value={downPayment}
          onChange={updateEMI}
          placeholder="Down Payment"
        />
        <div className="labels">
          <label>0%</label>
          <b>{downPayment}</b>
          <label>100%</label>
        </div>
      </div>
      <span className="title">Loan per Month</span>
      <div>
        <input
          className="slider"
          type="range"
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
          value={emi}
          onChange={updateDownPayment}
          placeholder="Emi"
        />
        <div className="labels">
          <label>{calculateEMI(cost)}</label>
          <b>{emi}</b>
          <label>{calculateEMI(0)}</label>
        </div>
      </div>
      <span className="title">Tenure</span>
      <div className={"tenureContainer"}>
        {tenuredData?.map((t) => (
          <button
            className={`tenure ${t === tenure ? "selected" : ""}`}
            onClick={() => setTenure(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
