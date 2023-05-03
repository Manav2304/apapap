import React, { useState } from "react";
import {
  Container,
  Title,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Button,
  DonationHeader,
} from "./style";
import {
  ADOPT_A_COW,
  ANNA_DAAN,
  FEED_COWS,
  VAISHNAV_BHOJAN,
} from "./constant";
import { Link } from "react-router-dom";

type Donation = {
  id: number;
  title: string;
  amount: number;
};

export const DonationPage: React.FC = () => {
    const [selectedDonations, setSelectedDonations] = useState<Donation[]>([]);
    const [customAmount, setCustomAmount] = useState<number>(0);
  
    const handleDonationSelect = (donation: Donation) => {
      if (selectedDonations.find((d) => d.id === donation.id)) {
        setSelectedDonations((prevState) =>
          prevState.filter((d) => d.id !== donation.id)
        );
      } else {
        setSelectedDonations((prevState) => [...prevState, donation]);
      }
    };
  
    const handleCustomAmountChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setCustomAmount(Number(event.target.value));
    };
  
    const totalDonationAmount = selectedDonations.reduce(
      (acc, curr) => acc + curr.amount,
      customAmount
    );
  
    const handlePaymentSuccess = (paymentId: string) => {
      console.log(`Payment success! Payment ID: ${paymentId}`);
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("Submit", {
        selectedDonations,
        customAmount,
        totalDonationAmount,
      });
    };  

  return (
    <Container>
      <Title>Donate Now</Title>
      <form onSubmit={handleSubmit}>
        {FEED_COWS.length > 0 && (
          <Table>
            <thead>
              <DonationHeader>Feed Cows</DonationHeader>
              <tr>
                <TableHeader>Select</TableHeader>
                <TableHeader>Donation</TableHeader>
                <TableHeader>Amount</TableHeader>
              </tr>
            </thead>
            <tbody>
              {FEED_COWS.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={
                        selectedDonations.find((d) => d.id === donation.id)
                          ? true
                          : false
                      }
                      onChange={() => handleDonationSelect(donation)}
                    />
                  </TableCell>
                  <TableCell>{donation.title}</TableCell>
                  <TableCell>₹{donation.amount} </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2}>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                  />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </tbody>
            <tfoot>
              <TableRow>
                <TableCell>Total Donation Amount</TableCell>
                <TableCell></TableCell>
                <TableCell>₹{totalDonationAmount} </TableCell>
              </TableRow>
            </tfoot>
          </Table>
        )}

        {ADOPT_A_COW.length > 0 && (
          <Table>
            <thead>
              <DonationHeader>Adopt a Cow</DonationHeader>
              <tr>
                <TableHeader>Select</TableHeader>
                <TableHeader>Donation</TableHeader>
                <TableHeader>Amount</TableHeader>
              </tr>
            </thead>
            <tbody>
            {ADOPT_A_COW.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={
                        selectedDonations.find((d) => d.id === donation.id)
                          ? true
                          : false
                      }
                      onChange={() => handleDonationSelect(donation)}
                    />
                  </TableCell>
                  <TableCell>{donation.title}</TableCell>
                  <TableCell>₹{donation.amount} </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}

        {ANNA_DAAN.length > 0 && (
          <Table>
            <thead>
              <DonationHeader>Anna Daan</DonationHeader>
              <tr>
                <TableHeader>Select</TableHeader>
                <TableHeader>Donation</TableHeader>
                <TableHeader>Amount</TableHeader>
              </tr>
            </thead>
            <tbody>
              {ANNA_DAAN.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={
                        selectedDonations.find((d) => d.id === donation.id)
                          ? true
                          : false
                      }
                      onChange={() => handleDonationSelect(donation)}
                    />
                  </TableCell>
                  <TableCell>{donation.title}</TableCell>
                  <TableCell>₹{donation.amount} </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}

        {VAISHNAV_BHOJAN.length > 0 && (
          <Table>
            <thead>
              <DonationHeader>Vaishnav Bhojan</DonationHeader>
              <tr>
                <TableHeader>Select</TableHeader>
                <TableHeader>Donation</TableHeader>
                <TableHeader>Amount</TableHeader>
              </tr>
            </thead>
            <tbody>
              {VAISHNAV_BHOJAN.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={
                        selectedDonations.find((d) => d.id === donation.id)
                          ? true
                          : false
                      }
                      onChange={() => handleDonationSelect(donation)}
                    />
                  </TableCell>
                  <TableCell>{donation.title}</TableCell>
                  <TableCell>₹{donation.amount} </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}

        <Button type="submit">Donate</Button>
      </form>

      <Link to="/">Go back to home</Link>
    </Container>
  );
};

