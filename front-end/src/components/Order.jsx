import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Order.css';

function Order({ id, seller, date, status }) {
  const isDisabled = status !== 'Entregue';

  return (
    <div className="orderControll">
      <h4 data-testid="customer_order_details__element-order-details-label-order-id">
        PEDIDO:
        {' '}
        { id }
      </h4>
      <h4 data-testid="customer_order_details__element-order-details-label-seller-name">
        P. Vend
        {' '}
        { seller }
      </h4>
      <h4
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        { date }

      </h4>
      <h4
        data-testid={
          `customer_order_details__element-order-details-label-delivery-status${id}`
        }
      >
        { status }

      </h4>
      <button
        data-testid="customer_order_details__button-delivery-check"
        type="button"
        disabled={ isDisabled }
      >
        MARCAR COMO ENTREGUE
      </button>
    </div>
  );
}

Order.propTypes = {
  id: PropTypes.string.isRequired,
  seller: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Order;
