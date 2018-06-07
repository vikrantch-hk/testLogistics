import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { ICourierPricingEngine } from 'app/shared/model/courier-pricing-engine.model';
import { getEntity, deleteEntity } from './courier-pricing-engine.reducer';

export interface ICourierPricingEngineDeleteDialogProps {
  getEntity: ICrudGetAction<ICourierPricingEngine>;
  deleteEntity: ICrudDeleteAction<ICourierPricingEngine>;
  courierPricingEngine: ICourierPricingEngine;
  match: any;
  history: any;
}

export class CourierPricingEngineDeleteDialog extends React.Component<ICourierPricingEngineDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.courierPricingEngine.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { courierPricingEngine } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>Confirm delete operation</ModalHeader>
        <ModalBody>Are you sure you want to delete this CourierPricingEngine?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />&nbsp; Cancel
          </Button>
          <Button color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />&nbsp; Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ courierPricingEngine }) => ({
  courierPricingEngine: courierPricingEngine.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(CourierPricingEngineDeleteDialog);
