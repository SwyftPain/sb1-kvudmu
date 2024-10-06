"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // TODO: Fetch user sessions and payments from API
    // This is just mock data for now
    setSessions([
      { id: 1, topic: 'JavaScript Basics', date: '2024-03-15', duration: 60 },
      { id: 2, topic: 'TypeScript Introduction', date: '2024-03-20', duration: 90 },
    ]);
    setPayments([
      { id: 1, amount: 50, status: 'COMPLETED', date: '2024-03-10' },
      { id: 2, amount: 75, status: 'PENDING', date: '2024-03-18' },
    ]);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {sessions.map((session) => (
              <div key={session.id} className="mb-4">
                <h3 className="font-semibold">{session.topic}</h3>
                <p>Date: {session.date}</p>
                <p>Duration: {session.duration} minutes</p>
              </div>
            ))}
            <Button>Book New Session</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            {payments.map((payment) => (
              <div key={payment.id} className="mb-4">
                <p>Amount: ${payment.amount}</p>
                <p>Status: {payment.status}</p>
                <p>Date: {payment.date}</p>
              </div>
            ))}
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "100.00",
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  const name = details.payer.name.given_name;
                  alert(`Transaction completed by ${name}`);
                });
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}