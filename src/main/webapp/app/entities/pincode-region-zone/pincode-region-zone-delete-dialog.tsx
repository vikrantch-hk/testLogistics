import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IPincodeRegionZone } from 'app/shared/model/pincode-region-zone.model';
import { getEntity, deleteEntity } from './pincode-region-zone.reducer';

export interface IPincodeRegionZoneDeleteDialogProps {
  getEntity: ICrudGetAction<IPincodeRegionZone>;
  deleteEntity: ICrudDeleteAction<IPincodeRegionZone>;
  pincodeRegionZone: IPincodeRegionZone;
  match: any;
  history: any;
}

export class PincodeRegionZoneDeleteDialog extends React.Component<IPincodeRegionZoneDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.pincodeRegionZone.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { pincodeRegionZone } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>Confirm delete operation</ModalHeader>
        <ModalBody>Are you sure you want to delete this PincodeRegionZone?</ModalBody>
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

const mapStateToProps = ({ pincodeRegionZone }) => ({
  pincodeRegionZone: pincodeRegionZone.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(PincodeRegionZoneDeleteDialog);
