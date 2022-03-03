import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, List, Container } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";

const ReviewOrder = () => {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState({});

  const fetchOrder = async () => {
    const response = await axios.get("https://reqres.in/api/orders/4"); // Needs dynamic value
    if (response.data.message) {
      toast.warn(response.data.message, { toastId: "message-box" });
      setOpen(false);
    } else {
      setOrder(response.data.order);  
    }
  };
  const orderList = order.products?.map((product) => {
    return (<List.Item key={product.id}>{product.name}</List.Item>)
    
  });

  // const OrderDetails = ({orderList}) => {
  //   return (
  //   <div data-cy="OrderSize">
  //     <h1> {OrderDetails.products.length}</h1>
  //     </div>
  //   )
  // }

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button onClick={fetchOrder} data-cy="show-order">
            Review Order
          </Button>
        }
      >
        <Modal.Header>Your Delicious Order</Modal.Header>
        <Modal.Content>
          <List data-cy="order-list">{orderList}</List>
        </Modal.Content>
        <Modal.Actions>
          <Container data-cy="total-cost"> Total {order.total}kr</Container>
          <Container data-cy="total-count"> Total {order.length}</Container>
        </Modal.Actions>
      </Modal>
      <ToastContainer data-cy="message-box" />
    </>
  );
};

export default ReviewOrder;
