const SendReservation = () => {
  const sendReservationRequest = async (reservationData) => {
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Reservation request successful:", result);
    } catch (error) {
      console.error("There was a problem with the reservation request:", error);
    }
  };

  return sendReservationRequest;
};

export default SendReservation;
