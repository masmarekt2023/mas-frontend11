import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  Button
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import PlanCard from "./PlanCard";
import axios from "axios";
import Apiconfigs from "../../../Apiconfig/Apiconfigs";

const Plans = () => {
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.2, triggerOnce: true });

  const [currencyType, setCurrencyType] = useState("MAS");
  const [billingType, setBillingType] = useState("monthly");
  const [plans, setPlans] = useState([]);

  useEffect(() => {
  const fetchPlans = async () => {
    try {
      const res = await axios.get(Apiconfigs.getpublicPlans); // لا توكن

      console.log("📥 Full API Response:", res.data);

      if (res.data.statusCode === 200) {
        const data = res.data.data;
        setPlans(data);
      }
    } catch (err) {
      console.error("❌ Error fetching plans:", err);
    }
  };

  fetchPlans();
}, []);


  return (
    <Box sx={{ background: (theme) => theme.custom.PageBackGround, padding: "20px 0" }}>
      <Container maxWidth="xl">

        {/* Banner */}
        <Box display="flex" justifyContent="center" alignItems="center" padding="10px" className="bunner-animaton">
          <Box position="relative" display="inline-block">
            <img src="/assets/Images/wave10.png" alt="Banner" style={{ display: 'block', transform: "scale(0.7)" }} />
            <Typography
              sx={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)', color: 'white',
                fontSize: '2.5rem', fontWeight: "bold",
                textShadow: "0px 0px 10px white"
              }}
            >
              Education Plans
            </Typography>
          </Box>
        </Box>

        {/* Switchers */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3, flexWrap: "wrap" }}>
          {["MAS", "USDT", "COIN"].map((currency) => (
            <Button
              key={currency}
              variant={currencyType === currency ? "contained" : "outlined"}
              onClick={() => setCurrencyType(currency)}
            >
              {currency}
            </Button>
          ))}
          {["monthly", "yearly"].map((type) => (
            <Button
              key={type}
              variant={billingType === type ? "contained" : "outlined"}
              onClick={() => setBillingType(type)}
            >
              {type === "monthly" ? "Monthly" : "Yearly"}
            </Button>
          ))}
        </Box>

        {/* Plans Grid */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "100vh",
            flexDirection: "column",
            padding: "40px 0",
          }}
        >
          <Grid container spacing={3} justifyContent="center" alignItems="center" maxWidth="lg">
            {plans.length === 0 ? (
              <Typography color="error" variant="h6">
                🚫 لا توجد خطط متاحة حالياً
              </Typography>
            ) : (
              plans
                .filter((plan) => plan?.price?.[currencyType]?.[billingType] !== undefined)
                .map((plan) => (
                  <Grid item key={plan._id} xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center" }}>
                    <PlanCard
                      plan={plan}
                      currencyType={currencyType}
                      billingType={billingType}
                    />
                  </Grid>
                ))
            )}
          </Grid>
        </Box>

      </Container>
    </Box>
  );
};

export default Plans;
